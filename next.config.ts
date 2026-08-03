import type { NextConfig } from "next";

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
    ];
  },
};

export default nextConfig;
