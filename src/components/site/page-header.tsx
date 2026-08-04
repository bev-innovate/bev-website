import Image from "next/image";
import * as React from "react";

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

      <div className="shell relative py-16 md:py-20">
        {eyebrow ? <span className="text-white/70">{eyebrow}</span> : null}
        <h1
          className={cn(
            "max-w-4xl font-display text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance",
            eyebrow && "mt-4",
          )}
        >
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-pretty text-white/85">
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </header>
  );
}
