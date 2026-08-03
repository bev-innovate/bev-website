import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export type ImageSource = Image | { asset?: { _ref?: string } } | null | undefined;

/**
 * Resolves a Sanity image to a URL. Seed content stores plain string URLs (the existing
 * Wix media), so callers should use `resolveImage` which handles both shapes.
 */
export function urlFor(source: ImageSource, width = 1600) {
  if (!builder || !source) return null;
  return builder.image(source as Image).width(width).auto("format").fit("max").url();
}

export function resolveImage(source: ImageSource | string, width = 1600): string | null {
  if (!source) return null;
  if (typeof source === "string") return source;
  return urlFor(source, width);
}
