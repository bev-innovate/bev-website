import type { MetadataRoute } from "next";

import { getPosts, getProgrammes } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.betterearthventures.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programmes, posts] = await Promise.all([getProgrammes(), getPosts()]);

  const staticRoutes = ["", "/summit", "/programmes", "/climate-expeditions", "/news", "/about", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  return [
    ...staticRoutes,
    ...programmes.map((p) => ({
      url: `${base}/programmes/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${base}/news/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
