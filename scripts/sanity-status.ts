/**
 * Reports what is actually in the Sanity dataset, and therefore which parts of the site
 * are CMS-driven and which are still falling back to src/lib/seed-content.ts.
 *
 *   npm run sanity:status
 *
 * The fallback is silent by design — the site renders either way — which is exactly why
 * it needs a way to be checked deliberately.
 */

import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  // Read tokens are optional for a public dataset; supplying one also covers a private one.
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
  useCdn: false,
});

/** Every type the site queries, and what falls back to seed content when it is empty. */
const types = [
  ["siteSettings", "nav, tagline, stats, contact details, footer"],
  ["programme", "/programmes and every programme page"],
  ["post", "/news and every article"],
  ["person", "team, experts and advisory board on /about"],
  ["partner", "logo marquees on / and /about"],
  ["company", "portfolio list on /climate-expeditions"],
  ["event", "upcoming events"],
] as const;

async function main() {
  console.log(`\nSanity: project ${projectId}, dataset ${dataset}\n`);

  const counts: Record<string, number> = await client.fetch(
    `{${types.map(([t]) => `"${t}": count(*[_type == "${t}"])`).join(", ")}}`,
  );

  let live = 0;
  for (const [type, covers] of types) {
    const n = counts[type] ?? 0;
    if (n > 0) live += 1;
    console.log(
      `  ${n > 0 ? "live " : "seed "}  ${String(n).padStart(3)}  ${type.padEnd(14)}  ${covers}`,
    );
  }

  console.log(
    `\n  ${live}/${types.length} document types are served from Sanity. ` +
      `The rest fall back to src/lib/seed-content.ts.\n`,
  );

  const assets: number = await client.fetch(`count(*[_type == "sanity.imageAsset"])`);
  console.log(`  ${assets} image assets uploaded.`);
  if (assets === 0) {
    console.log(
      "  Images are still served from public/images via the *ImageUrl fallbacks in the\n" +
        "  GROQ queries. Uploading assets in the Studio takes precedence automatically.",
    );
  }

  const settings = await client.fetch<{ contact?: { email?: string } } | null>(
    `*[_type == "siteSettings"][0]{contact}`,
  );
  if (settings?.contact?.email) {
    console.log(`\n  siteSettings contact email: ${settings.contact.email}`);
  }
  console.log("");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
