/**
 * Sanity environment.
 *
 * The site is designed to run *before* a Sanity project exists: when the project id is
 * missing, `isSanityConfigured` is false and every data helper falls back to the seed
 * content in `src/lib/seed-content.ts`. That keeps the first draft deployable on day one
 * and makes the CMS an additive step rather than a blocker.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

export const isSanityConfigured = projectId.length > 0;

/** Studio lives at /studio so editors never need a second deployment. */
export const studioBasePath = "/studio";
