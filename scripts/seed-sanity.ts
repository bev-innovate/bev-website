/**
 * Imports the seed content into a Sanity dataset.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx SANITY_API_WRITE_TOKEN=yyy npm run seed
 *
 * Idempotent: every document gets a deterministic `_id`, so re-running updates rather
 * than duplicating. Images are uploaded from their current Wix URLs into Sanity's asset
 * pipeline, which is what finally cuts the dependency on the old site.
 */

import { createClient } from "@sanity/client";

import {
  companies,
  events,
  partners,
  people,
  posts,
  programmes,
  siteSettings,
} from "../src/lib/seed-content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN. See .env.example.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

/** Stable, human-readable document ids so re-runs are updates, not inserts. */
const id = (type: string, key: string) =>
  `${type}-${key.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

const assetCache = new Map<string, string>();

async function uploadImage(url: string | null | undefined) {
  if (!url) return undefined;

  const cached = assetCache.get(url);
  if (cached) return { _type: "image", asset: { _type: "reference", _ref: cached } };

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    const filename = url.split("/").pop()?.split("?")[0] ?? "image";
    const asset = await client.assets.upload("image", buffer, { filename });

    assetCache.set(url, asset._id);
    console.log(`  uploaded ${filename}`);
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (error) {
    console.warn(`  ! could not upload ${url}:`, (error as Error).message);
    return undefined;
  }
}

function keyed<T extends object>(items: T[] | undefined) {
  return items?.map((item, i) => ({ _key: `k${i}`, ...item }));
}

async function run() {
  const tx = client.transaction();

  console.log("Site settings…");
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    title: siteSettings.title,
    tagline: siteSettings.tagline,
    description: siteSettings.description,
    stats: keyed(siteSettings.stats),
    contact: siteSettings.contact,
    social: keyed(siteSettings.social),
    navigation: keyed(siteSettings.navigation),
  });

  console.log("Partners…");
  for (const partner of partners) {
    tx.createOrReplace({
      _id: id("partner", partner.name),
      _type: "partner",
      name: partner.name,
      url: partner.url,
      tier: partner.tier,
    });
  }

  console.log("Companies…");
  for (const company of companies) {
    tx.createOrReplace({
      _id: id("company", company.name),
      _type: "company",
      name: company.name,
      slug: { _type: "slug", current: company.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      country: company.country,
      vertical: company.vertical,
      blurb: company.blurb,
      url: company.url,
      womenCofounded: company.womenCofounded ?? false,
      cohortYear: company.cohortYear,
    });
  }

  console.log("People…");
  for (const item of people) {
    tx.createOrReplace({
      _id: id("person", item.name),
      _type: "person",
      name: item.name,
      role: item.role,
      group: item.group,
      bio: item.bio,
      linkedin: item.linkedin,
      order: item.order,
    });
  }

  await tx.commit();

  // Programmes and posts carry images, so they are uploaded one at a time.
  console.log("Programmes…");
  for (const programme of programmes) {
    const heroImage = await uploadImage(programme.heroImage);
    await client.createOrReplace({
      _id: id("programme", programme.slug),
      _type: "programme",
      title: programme.title,
      slug: { _type: "slug", current: programme.slug },
      kicker: programme.kicker,
      summary: programme.summary,
      status: programme.status,
      applyUrl: programme.applyUrl,
      applicationDeadline: programme.applicationDeadline,
      order: programme.order,
      heroImage,
      keyFacts: keyed(programme.keyFacts),
      verticals: keyed(programme.verticals),
      eligibility: programme.eligibility,
      benefits: programme.benefits,
      timeline: keyed(programme.timeline),
      faq: keyed(programme.faq),
      partners: programme.partners?.map((p, i) => ({
        _key: `p${i}`,
        _type: "reference",
        _ref: id("partner", p.name),
      })),
      cohort: programme.cohort?.map((c, i) => ({
        _key: `c${i}`,
        _type: "reference",
        _ref: id("company", c.name),
      })),
    });
    console.log(`  ${programme.slug}`);
  }

  console.log("Events…");
  for (const item of events) {
    const image = await uploadImage(item.image);
    await client.createOrReplace({
      _id: id("event", item.slug),
      _type: "event",
      title: item.title,
      slug: { _type: "slug", current: item.slug },
      startDate: item.startDate,
      endDate: item.endDate,
      location: item.location,
      summary: item.summary,
      registerUrl: item.registerUrl,
      image,
    });
  }

  console.log("Posts…");
  for (const post of posts) {
    const coverImage = await uploadImage(post.coverImage);
    await client.createOrReplace({
      _id: id("post", post.slug),
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime,
      category: post.category,
      tags: post.tags,
      featured: post.featured ?? false,
      coverImage,
      coverImageUrl: coverImage ? undefined : post.coverImage,
    });
    console.log(`  ${post.slug}`);
  }

  console.log("\nDone. Open /studio to review and fill in the article bodies.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
