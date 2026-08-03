import createImageUrlBuilder from "@sanity/image-url";

import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/** Minimal shape of a Sanity image reference — avoids depending on the Studio package. */
export type ImageSource = { asset?: { _ref?: string; _type?: string } } | null | undefined;

/**
 * Resolves a Sanity image to a URL. Seed content stores plain string URLs (the existing
 * Wix media), so callers should use `resolveImage` which handles both shapes.
 */
export function urlFor(source: ImageSource, width = 1600) {
  if (!builder || !source) return null;
  return builder.image(source as never).width(width).auto("format").fit("max").url();
}

export function resolveImage(source: ImageSource | string, width = 1600): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  return urlFor(source, width);
}
