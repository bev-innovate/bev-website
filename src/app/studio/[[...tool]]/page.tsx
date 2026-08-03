import { isSanityConfigured } from "@/sanity/env";

import StudioClient from "./studio-client";

/**
 * Sanity Studio, embedded at /studio so editors and the site deploy together.
 *
 * Before a Sanity project exists the route renders setup instructions rather than a
 * studio that cannot connect to anything.
 */
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="shell max-w-2xl py-24">
        <h1 className="font-display text-3xl font-semibold text-ink">Studio not configured</h1>
        <p className="mt-4 text-ink-muted">
          Create a Sanity project, then set these environment variables and redeploy:
        </p>
        <pre className="mt-6 overflow-x-auto rounded-xl bg-canvas-sunk p-5 text-sm text-ink">
          {`NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=...   # only needed for the seed script`}
        </pre>
        <p className="mt-6 text-sm text-ink-faint">
          Run <code className="rounded bg-canvas-sunk px-1.5 py-0.5">npx sanity@latest init</code>{" "}
          from the project root to create the project and populate these values, then{" "}
          <code className="rounded bg-canvas-sunk px-1.5 py-0.5">npm run seed</code> to import the
          content in <code>src/lib/seed-content.ts</code>.
        </p>
      </div>
    );
  }

  return <StudioClient />;
}
