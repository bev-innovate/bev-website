import Image from "next/image";
import * as React from "react";

import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * Page banner.
 *
 * One coloured band across every page, matching the Programmes hero: a photograph under a
 * purple wash, warmed toward orange on the right. `image` is optional; without one the
 * gradient carries the band on its own, which is what pages with no obvious hero shot use.
 *
 * The copy is unchanged from the plain version this replaces. Only the ground beneath it
 * is different, so News and About keep exactly the words they had.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Background photograph. Falls back to the gradient alone when absent. */
  image?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn("relative isolate overflow-hidden bg-purple text-white", className)}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        {image ? (
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : null}
        {/* Two layers: an opaque wash to hold contrast, then the brand gradient over it. */}
        <div className="absolute inset-0 bg-purple/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-deep via-purple/75 to-orange/30" />
      </div>

      {/*
        The banner is above the fold, so this runs on mount rather than on scroll. CSS
        keyframes rather than framer-motion: it keeps PageHeader a server component, and
        the reduced-motion rule in globals.css already collapses the duration to nothing.
      */}
      <div className="shell relative py-16 md:py-20">
        {eyebrow ? (
          <Text variant="eyebrow" className="animate-rise text-white/75">
            {eyebrow}
          </Text>
        ) : null}
        <Text
          variant="display"
          className={cn("max-w-5xl animate-rise text-white", eyebrow && "mt-4")}
          style={{ animationDelay: "0.1s" }}
        >
          {title}
        </Text>
        {intro ? (
          <Text
            variant="lead"
            className="mt-6 max-w-3xl animate-rise text-white/90"
            style={{ animationDelay: "0.22s" }}
          >
            {intro}
          </Text>
        ) : null}
        {children ? (
          <div className="mt-9 animate-rise" style={{ animationDelay: "0.34s" }}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
