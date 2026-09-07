import type { MetadataRoute } from "next";

import { getPosts, getProgrammes } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.betterearthventures.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programmes, posts] = await Promise.all([getProgrammes(), getPosts()]);

  /** The legal pages change rarely and rank low, but people do search for them. */
  const legalRoutes = ["/privacy", "/terms"];

  const staticRoutes = [
    "",
    "/summit",
    "/programmes",
    "/climate-expeditions",
    "/news",
    "/about",
    "/contact",
    ...legalRoutes,
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: legalRoutes.includes(path) ? ("yearly" as const) : ("weekly" as const),
    priority: path === "" ? 1 : legalRoutes.includes(path) ? 0.3 : 0.8,
  }));

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
