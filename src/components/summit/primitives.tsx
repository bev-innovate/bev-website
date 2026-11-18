import * as React from "react";

import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * Shared Field Notes primitives for the Summit page.
 *
 * The register: monospace specimen labels, hairline rules, annotation captions, and
 * numbered references. Everything reads as recorded evidence rather than marketing,
 * which is the right tone when most of the content is still unconfirmed.
 */

/** Small monospace label, optionally with a leading reference code. */
export function Label({
  children,
  refCode,
  className,
}: {
  children: React.ReactNode;
  refCode?: string;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-2 text-primary", className)}>
      {refCode ? <span className="text-muted-foreground">{refCode}</span> : null}
      {children}
    </p>
  );
}

/** Marks content that is not yet confirmed, rather than passing filler off as fact. */
export function Tbc({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary/30 px-2 py-0.5 text-xs font-medium text-primary",
        className,
      )}
    >
      TBC
    </span>
  );
}

/** Section heading. Deliberately bare: no eyebrow, no rule, no annotation. */
export function SectionHead({
  heading,
  intro,
  align = "left",
  onDark = false,
}: {
  heading: string;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Text variant="title" className={cn(onDark && "text-white")}>
        {heading}
      </Text>
      {intro ? (
        <Text
          variant="lead"
          className={cn("mt-5", onDark ? "text-white/85" : "text-muted-foreground", align === "center" && "mx-auto")}
        >
          {intro}
        </Text>
      ) : null}
    </div>
  );
}

/** Annotated caption, as printed under a plate in a field guide. */
export function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 flex gap-2 text-sm text-muted-foreground">
      <span aria-hidden className="text-primary">
        ↳
      </span>
      {children}
    </p>
  );
}
