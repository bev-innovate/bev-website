/**
 * Exports the entire Wix Media Manager library to disk.
 *
 *   WIX_API_KEY=... WIX_SITE_ID=... npx tsx scripts/export-wix-media.ts
 *
 * Two phases, because they have different auth needs:
 *   1. LIST  — the Media Manager API needs an API key, and is cursor-paginated.
 *   2. FETCH — every file record carries a public static.wixstatic.com URL. That's the
 *              same URL the live site serves, so no credentials are needed to download.
 *
 * Output:
 *   wix-export/manifest.json          every file descriptor, for reference and re-runs
 *   wix-export/files/<folder>/<name>  the bytes, in the Media Manager's folder structure
 *
 * Resumable: files already on disk with a matching byte size are skipped, so an
 * interrupted run can simply be restarted.
 */

import { config } from "dotenv";

// tsx does not read .env files on its own, so load them explicitly.
// .env.local wins over .env, matching Next.js' precedence.
config({ path: ".env.local" });
config({ path: ".env" });

import { createWriteStream } from "node:fs";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const API_KEY = process.env.WIX_API_KEY;
const SITE_ID = process.env.WIX_SITE_ID ?? "437436eb-9514-4d79-bc04-ee8817d41591";

if (!API_KEY) {
  console.error(
    "Missing WIX_API_KEY.\n\n" +
      "Create one at https://manage.wix.com/account/api-keys with the\n" +
      "'Media Manager' permission, then re-run:\n\n" +
      "  WIX_API_KEY=xxx npx tsx scripts/export-wix-media.ts\n",
  );
  process.exit(1);
}

const OUT = path.resolve("wix-export");
const FILES_DIR = path.join(OUT, "files");

interface WixFile {
  id: string;
  displayName: string;
  url: string;
  parentFolderId?: string;
  sizeInBytes?: string;
  mediaType?: string;
  mimeType?: string;
  hash?: string;
}

interface WixFolder {
  id: string;
  displayName: string;
  parentFolderId?: string;
}

const headers = { Authorization: API_KEY!, "wix-site-id": SITE_ID };

async function wixGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} — ${await res.text()}`);
  }
  return (await res.json()) as T;
}

/** Walks a cursor-paginated Wix collection to exhaustion. */
async function listAll<T>(base: string, key: "files" | "folders"): Promise<T[]> {
  const out: T[] = [];
  let cursor: string | undefined;

  do {
    const url = new URL(base);
    url.searchParams.set("paging.limit", "100");
    if (cursor) url.searchParams.set("paging.cursor", cursor);

    const page = await wixGet<Record<string, unknown>>(url.toString());
    const items = (page[key] ?? []) as T[];
    out.push(...items);

    const next = page.nextCursor as { cursors?: { next?: string }; hasNext?: boolean } | undefined;
    cursor = next?.hasNext ? next.cursors?.next : undefined;
    process.stdout.write(`\r  ${key}: ${out.length}`);
  } while (cursor);

  process.stdout.write("\n");
  return out;
}

/** Rebuilds the Media Manager folder tree as filesystem paths. */
function buildFolderPaths(folders: WixFolder[]) {
  const byId = new Map(folders.map((f) => [f.id, f]));
  const cache = new Map<string, string>();

  const resolve = (id: string | undefined): string => {
    if (!id || id === "media-root") return "";
    const cached = cache.get(id);
    if (cached !== undefined) return cached;

    const folder = byId.get(id);
    if (!folder) return "";

    const parent = resolve(folder.parentFolderId);
    const safe = folder.displayName.replace(/[/\\:]/g, "-");
    const full = parent ? path.join(parent, safe) : safe;
    cache.set(id, full);
    return full;
  };

  return resolve;
}

async function download(file: WixFile, dest: string) {
  const res = await fetch(file.url);
  if (!res.ok || !res.body) throw new Error(`${res.status} ${res.statusText}`);
  await mkdir(path.dirname(dest), { recursive: true });
  await pipeline(Readable.fromWeb(res.body as Parameters<typeof Readable.fromWeb>[0]), createWriteStream(dest));
}

async function alreadyDownloaded(dest: string, expected?: string) {
  try {
    const info = await stat(dest);
    // No expected size recorded — presence is good enough.
    if (!expected) return info.size > 0;
    return info.size === Number(expected);
  } catch {
    return false;
  }
}

async function run() {
  await mkdir(FILES_DIR, { recursive: true });

  console.log("Listing Media Manager…");
  const folders = await listAll<WixFolder>(
    "https://www.wixapis.com/site-media/v1/folders",
    "folders",
  );
  const files = await listAll<WixFile>("https://www.wixapis.com/site-media/v1/files", "files");

  const folderPath = buildFolderPaths(folders);
  const totalBytes = files.reduce((sum, f) => sum + Number(f.sizeInBytes ?? 0), 0);

  console.log(
    `\n${files.length} files across ${folders.length} folders, ` +
      `${(totalBytes / 1024 / 1024).toFixed(1)} MB total\n`,
  );

  await writeFile(
    path.join(OUT, "manifest.json"),
    JSON.stringify({ exportedFrom: SITE_ID, folders, files }, null, 2),
  );

  let done = 0;
  let skipped = 0;
  const failures: { name: string; reason: string }[] = [];

  for (const file of files) {
    const safeName = file.displayName.replace(/[/\\:]/g, "-");
    const dest = path.join(FILES_DIR, folderPath(file.parentFolderId), safeName);

    if (await alreadyDownloaded(dest, file.sizeInBytes)) {
      skipped += 1;
      continue;
    }

    try {
      await download(file, dest);
      done += 1;
      process.stdout.write(`\r  downloaded ${done}  skipped ${skipped}  failed ${failures.length}`);
    } catch (error) {
      failures.push({ name: file.displayName, reason: (error as Error).message });
    }
  }

  console.log(`\n\nDownloaded ${done}, skipped ${skipped} (already present).`);

  if (failures.length) {
    console.log(`\n${failures.length} failed:`);
    for (const f of failures) console.log(`  - ${f.name}: ${f.reason}`);
    console.log("\nRe-run to retry only the missing files.");
  }

  const written = await readdir(FILES_DIR).catch(() => []);
  console.log(`\nOutput: ${FILES_DIR} (${written.length} top-level entries)`);
  console.log(`Manifest: ${path.join(OUT, "manifest.json")}`);
}

run().catch((error) => {
  console.error("\n", error);
  process.exit(1);
});
