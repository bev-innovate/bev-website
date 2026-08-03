/**
 * Converts source photography to WebP and writes it into `public/images/`.
 *
 *   npm run images                 # reads ./images
 *   npm run images -- path/to/src  # or any other folder
 *
 * Emits two widths per source — 1600px for full-bleed use and 800px for cards — plus a
 * manifest so the results can be wired up without guessing filenames.
 *
 * WebP at quality 78 is typically 60–75% smaller than the equivalent JPEG with no visible
 * difference at these sizes. Next.js will still serve AVIF to browsers that prefer it.
 */

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const SOURCE = path.resolve(process.argv[2] ?? "images");
const OUT = path.resolve("public/images");

/** Widths emitted per source image. */
const SIZES = [
  { suffix: "", width: 1600 },
  { suffix: "-sm", width: 800 },
];

const INPUT_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff", ".heic"]);

function slugify(name: string) {
  return name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Recursively collects image files, preserving folder structure as a prefix. */
async function collect(dir: string, base = ""): Promise<{ file: string; rel: string }[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const out: { file: string; rel: string }[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await collect(full, path.join(base, entry.name))));
    } else if (INPUT_EXT.has(path.extname(entry.name).toLowerCase())) {
      out.push({ file: full, rel: base });
    }
  }
  return out;
}

async function run() {
  try {
    await stat(SOURCE);
  } catch {
    console.error(
      `No such folder: ${SOURCE}\n\n` +
        `Put the source photography in ./images (or pass a path), then re-run.\n`,
    );
    process.exit(1);
  }

  const sources = await collect(SOURCE);
  if (!sources.length) {
    console.error(`No images found in ${SOURCE}`);
    process.exit(1);
  }

  await mkdir(OUT, { recursive: true });

  const manifest: Record<
    string,
    { src: string; srcSmall: string; width: number; height: number; savedPct: number }
  > = {};

  let before = 0;
  let after = 0;

  for (const { file, rel } of sources) {
    const info = await stat(file);
    before += info.size;

    const folder = rel ? slugify(rel) + "-" : "";
    const name = folder + slugify(path.basename(file));
    const image = sharp(file, { failOn: "none" }).rotate(); // honour EXIF orientation
    const meta = await image.metadata();

    const written: string[] = [];
    for (const size of SIZES) {
      const outName = `${name}${size.suffix}.webp`;
      const outPath = path.join(OUT, outName);

      // `withoutEnlargement` keeps small sources from being upscaled into mush.
      const buffer = await image
        .clone()
        .resize({ width: size.width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toBuffer();

      await writeFile(outPath, buffer);
      after += buffer.byteLength;
      written.push(`/images/${outName}`);
    }

    manifest[name] = {
      src: written[0],
      srcSmall: written[1],
      width: Math.min(meta.width ?? 1600, 1600),
      height: Math.round(
        ((meta.height ?? 900) * Math.min(meta.width ?? 1600, 1600)) / (meta.width ?? 1600),
      ),
      savedPct: 0,
    };

    console.log(`  ${path.basename(file)} → ${written[0]}`);
  }

  const saved = before === 0 ? 0 : Math.round((1 - after / before) * 100);
  for (const key of Object.keys(manifest)) manifest[key].savedPct = saved;

  await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));

  console.log(
    `\n${sources.length} images → ${sources.length * SIZES.length} WebP files.\n` +
      `${(before / 1024 / 1024).toFixed(1)} MB in, ${(after / 1024 / 1024).toFixed(1)} MB out ` +
      `(${saved}% smaller).\n` +
      `Manifest: public/images/manifest.json`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
