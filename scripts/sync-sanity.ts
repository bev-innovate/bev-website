/**
 * Syncs one document type from seed-content into Sanity.
 *
 *   npm run sync:people
 *   npm run sync:partners
 *
 * `npm run seed` rewrites the whole dataset, which is the wrong tool once editors have
 * started making changes in the Studio. This touches one type and nothing else.
 *
 * Documents present in Sanity but absent from seed-content are deleted, so removing an
 * entry from the file removes it from the site. That is the point, but it does mean a
 * document created only in the Studio will be wiped: add it to seed-content first.
 */

import { config } from "dotenv";

// tsx does not read .env files on its own, so load them explicitly.
config({ path: ".env.local" });
config({ path: ".env" });

import { createClient } from "next-sanity";

import { partners, people } from "../src/lib/seed-content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
  useCdn: false,
});

/**
 * Deterministic id from the name, so re-running updates in place rather than duplicating.
 *
 * Identical to `id()` in seed-sanity.ts, deliberately: a different scheme would make this
 * script delete every document the seed created and re-create it under a new id, which
 * breaks any reference pointing at the old one.
 */
const docId = (type: string, name: string) =>
  `${type}-${name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase()}`;

interface Target {
  type: string;
  items: { name: string }[];
  /** Maps a seed entry onto the document body. `_id` and `_type` are added by the caller. */
  toDoc: (item: never) => Record<string, unknown>;
}

const targets: Record<string, Target> = {
  people: {
    type: "person",
    items: people,
    // `photoUrl`, not `photo`: `photo` is a Sanity image asset, which has to be uploaded.
    // The query coalesces an uploaded asset over this string, so a Studio upload wins.
    toDoc: (person: (typeof people)[number]) => ({
      name: person.name,
      role: person.role,
      location: person.location,
      organisation: person.organisation,
      group: person.group,
      photoUrl: person.photo ?? undefined,
      bio: person.bio,
      linkedin: person.linkedin,
      order: person.order,
    }),
  },
  partners: {
    type: "partner",
    items: partners,
    // `logoUrl`, not `logo`: `logo` is a Sanity image asset, which has to be uploaded.
    // The query coalesces an uploaded asset over this string, so a Studio upload wins.
    toDoc: (partner: (typeof partners)[number]) => ({
      name: partner.name,
      logoUrl: partner.logo ?? undefined,
      url: partner.url,
      tier: partner.tier,
      order: partner.order,
      hidden: partner.hidden ?? false,
    }),
  },
};

async function main() {
  const key = process.argv[2];
  const target = key ? targets[key] : undefined;

  if (!target) {
    console.error(`Usage: tsx scripts/sync-sanity.ts <${Object.keys(targets).join("|")}>`);
    process.exit(1);
  }

  const wanted = new Map(
    target.items.map((item) => [docId(target.type, item.name), item]),
  );

  // `refs` counts what points at each document. Sanity refuses to delete a referenced
  // document, and rightly so: a programme's partner list would be left with a dangling
  // reference. Those are reported instead of deleted.
  const existing: { _id: string; name: string; refs: number }[] = await client.fetch(
    `*[_type == $type]{_id, name, "refs": count(*[references(^._id)])}`,
    { type: target.type },
  );

  const tx = client.transaction();

  for (const [id, item] of wanted) {
    tx.createOrReplace({
      _id: id,
      _type: target.type,
      ...target.toDoc(item as never),
    });
  }

  const stale = existing.filter((doc) => !wanted.has(doc._id));
  const removable = stale.filter((doc) => doc.refs === 0);
  const referenced = stale.filter((doc) => doc.refs > 0);

  for (const doc of removable) tx.delete(doc._id);

  await tx.commit();

  console.log(`Wrote ${wanted.size} ${target.type} documents.`);
  if (removable.length) {
    console.log(`Removed ${removable.length}: ${removable.map((d) => d.name).join(", ")}`);
  }
  if (referenced.length) {
    console.log(
      `Kept ${referenced.length} not in seed-content but referenced elsewhere: ` +
        referenced.map((d) => `${d.name} (${d.refs})`).join(", "),
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
