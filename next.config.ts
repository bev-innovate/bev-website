import type { NextConfig } from "next";

/**
 * Vanity short links.
 *
 * These get printed on slides, turned into QR codes and read out loud, so they need to be
 * short and forgiving about how someone types them. Add a row and it starts working.
 *
 * Temporary (307) rather than permanent (308) on purpose. A 308 is cached by the browser
 * indefinitely and cannot be cleared remotely, and a short link is exactly the kind of
 * thing that gets repointed at a new form next year. Anyone who had already followed a
 * permanent one would keep landing on the dead destination.
 */
const shortLinks: { slug: string; destination: string; note: string }[] = [
  {
    slug: "SEL",
    destination: "https://airtable.com/appxKGcCrGkqLk1vM/pagfnfnmQ2qgkaAVC/form",
    note: "Airtable enquiry form",
  },
];

/**
 * Matches the slug in any casing, so /SEL, /sel and /Sel all land.
 *
 * Spelled out as character classes rather than relying on the router to match
 * case-insensitively: the generated route regex is what Vercel's edge replays, and an
 * explicit pattern behaves the same there as it does under `next start`. The captured
 * group is unused, and an absolute destination takes no path parameters, so nothing is
 * appended to the Airtable URL.
 */
function shortLinkRedirects() {
  return shortLinks.map(({ slug, destination }) => ({
    source: `/:code(${[...slug].map((c) => `[${c.toLowerCase()}${c.toUpperCase()}]`).join("")})`,
    destination,
    permanent: false,
  }));
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity's asset CDN — the destination for migrated media.
      { protocol: "https", hostname: "cdn.sanity.io" },
      // Wix media, still serving imported content until assets are migrated.
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  /*
    Preserve the Wix URL structure. These paths have inbound links from press coverage,
    partner sites and social posts, so they must not 404 after the cutover.
  */
  async redirects() {
    return [
      { source: "/post/:slug", destination: "/news/:slug", permanent: true },
      { source: "/blog", destination: "/news", permanent: true },
      { source: "/insights", destination: "/news", permanent: true },
      { source: "/insights/:slug", destination: "/news/:slug", permanent: true },
      { source: "/approach", destination: "/about", permanent: true },
      { source: "/climaccelerator", destination: "/programmes/climaccelerator", permanent: true },
      {
        source: "/womenfoufun",
        destination: "/programmes/women-founders-and-funders",
        permanent: true,
      },
      ...shortLinkRedirects(),
    ];
  },
};

export default nextConfig;
