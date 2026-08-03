/**
 * Syncs just the `person` documents from seed-content into Sanity.
 *
 *   npm run sync:people
 *
 * `npm run seed` rewrites the whole dataset, which is the wrong tool once editors have
 * started making changes in the Studio. This touches people and nothing else.
 *
 * People present in Sanity but absent from seed-content are deleted, so removing someone
 * from the file removes them from the site. That is the point, but it does mean a person
 * created only in the Studio will be wiped: add them to seed-content first.
 */

import { config } from "dotenv";

// tsx does not read .env files on its own, so load them explicitly.
config({ path: ".env.local" });
config({ path: ".env" });

import { createClient } from "next-sanity";

import { people } from "../src/lib/seed-content";

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

/** Deterministic id from the name, so re-running updates rather than duplicating. */
const id = (name: string) =>
  `person.${name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

async function main() {
  const wanted = new Map(people.map((person) => [id(person.name), person]));

  const existing: { _id: string; name: string }[] = await client.fetch(
    `*[_type == "person"]{_id, name}`,
  );

  const tx = client.transaction();

  for (const [docId, person] of wanted) {
    tx.createOrReplace({
      _id: docId,
      _type: "person",
      name: person.name,
      role: person.role,
      location: person.location,
      organisation: person.organisation,
      group: person.group,
      bio: person.bio,
      linkedin: person.linkedin,
      order: person.order,
    });
  }

  const stale = existing.filter((doc) => !wanted.has(doc._id));
  for (const doc of stale) tx.delete(doc._id);

  await tx.commit();

  console.log(`Wrote ${wanted.size} people.`);
  if (stale.length) {
    console.log(`Removed ${stale.length}: ${stale.map((d) => d.name).join(", ")}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
