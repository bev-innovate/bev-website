/**
 * Uploads an exported Wix media library into Sanity's asset pipeline.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=... SANITY_API_WRITE_TOKEN=... \
 *     npx tsx scripts/import-media-to-sanity.ts
 *
 * Run `export-wix-media.ts` first. This reads `wix-export/manifest.json`, uploads every
 * file from `wix-export/files/`, and writes `wix-export/sanity-assets.json` mapping the
 * original Wix URL to its new Sanity asset id and CDN url.
 *
 * That mapping is what lets you rewrite content references and switch off Wix: anywhere
 * a `static.wixstatic.com` URL appears, look it up and replace.
 *
 * Idempotent — Sanity deduplicates by file content hash, so re-running returns the same
 * asset ids rather than creating duplicates.
 */

import { config } from "dotenv";

// tsx does not read .env files on its own, so load them explicitly.
// .env.local wins over .env, matching Next.js' precedence.
config({ path: ".env.local" });
config({ path: ".env" });

import { createReadStream } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-01-01", useCdn: false });

const OUT = path.resolve("wix-export");

interface WixFile {
  id: string;
  displayName: string;
  url: string;
  parentFolderId?: string;
  mediaType?: string;
}

interface WixFolder {
  id: string;
  displayName: string;
  parentFolderId?: string;
}

function folderResolver(folders: WixFolder[]) {
  const byId = new Map(folders.map((f) => [f.id, f]));
  const resolve = (id: string | undefined): string => {
    if (!id || id === "media-root") return "";
    const folder = byId.get(id);
    if (!folder) return "";
    const parent = resolve(folder.parentFolderId);
    const safe = folder.displayName.replace(/[/\\:]/g, "-");
    return parent ? path.join(parent, safe) : safe;
  };
  return resolve;
}

async function run() {
  const manifest = JSON.parse(await readFile(path.join(OUT, "manifest.json"), "utf8")) as {
    folders: WixFolder[];
    files: WixFile[];
  };

  const resolve = folderResolver(manifest.folders);
  const mapping: Record<string, { assetId: string; url: string; originalName: string }> = {};
  const failures: { name: string; reason: string }[] = [];

  let done = 0;
  for (const file of manifest.files) {
    // Sanity's asset store handles images and files differently.
    const kind = file.mediaType === "IMAGE" ? "image" : "file";
    const safeName = file.displayName.replace(/[/\\:]/g, "-");
    const local = path.join(OUT, "files", resolve(file.parentFolderId), safeName);

    try {
      const asset = await client.assets.upload(kind, createReadStream(local), {
        filename: safeName,
      });
      mapping[file.url] = { assetId: asset._id, url: asset.url, originalName: file.displayName };
      done += 1;
      process.stdout.write(`\r  uploaded ${done}/${manifest.files.length}`);
    } catch (error) {
      failures.push({ name: file.displayName, reason: (error as Error).message });
    }
  }

  await writeFile(path.join(OUT, "sanity-assets.json"), JSON.stringify(mapping, null, 2));

  console.log(`\n\nUploaded ${done} of ${manifest.files.length}.`);
  console.log(`URL mapping written to ${path.join(OUT, "sanity-assets.json")}`);

  if (failures.length) {
    console.log(`\n${failures.length} failed:`);
    for (const f of failures) console.log(`  - ${f.name}: ${f.reason}`);
  }
}

run().catch((error) => {
  console.error("\n", error);
  process.exit(1);
});
