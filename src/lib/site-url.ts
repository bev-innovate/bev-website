/**
 * The site's public address, for the sitemap, robots.txt and social previews.
 *
 * Set NEXT_PUBLIC_SITE_URL to the real domain in production. Any trailing slash is dropped,
 * so "https://example.com/" cannot turn every path into "https://example.com//page".
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.betterearthventures.com"
).replace(/\/+$/, "");
