import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Shared Field Notes primitives for the Summit page.
 *
 * The register: monospace specimen labels, hairline rules, annotation captions, and
 * numbered references. Everything reads as recorded evidence rather than marketing —
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
    <p className={cn("label-mono flex items-center gap-2 text-terracotta", className)}>
      {refCode ? <span className="text-ink-faint">{refCode}</span> : null}
      {children}
    </p>
  );
}

/** Marks content that is not yet confirmed, rather than passing filler off as fact. */
export function Tbc({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center rounded-sm border border-current px-1.5 py-0.5 text-[0.625rem] text-terracotta opacity-80",
        className,
      )}
    >
      TBC
    </span>
  );
}

/** Section heading with the measurement tick-rule beneath it. */
export function SectionHead({
  label,
  heading,
  intro,
  note,
  align = "left",
  onDark = false,
}: {
  label: string;
  heading: string;
  intro?: string;
  note?: string;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Label className={onDark ? "text-clay" : undefined}>{label}</Label>
      <div
        aria-hidden
        className={cn(
          "tick-rule mt-3 h-1.5",
          align === "center" ? "mx-auto w-24" : "w-24",
          onDark ? "text-clay/50" : "text-line-strong",
        )}
      />
      <h2
        className={cn(
          "display mt-5 text-[clamp(1.75rem,3.6vw,2.6rem)]",
          onDark ? "text-canvas" : "text-ink",
        )}
      >
        {heading}
      </h2>
      {intro ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            onDark ? "text-canvas/80" : "text-ink-muted",
          )}
        >
          {intro}
        </p>
      ) : null}
      {note ? (
        <p
          className={cn(
            "label-mono mt-4 normal-case",
            onDark ? "text-canvas/55" : "text-ink-faint",
          )}
          style={{ letterSpacing: "0.04em" }}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

/** Annotated caption, as printed under a plate in a field guide. */
export function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="label-mono mt-3 flex gap-2 normal-case text-ink-faint" style={{ letterSpacing: "0.04em" }}>
      <span aria-hidden className="text-terracotta">
        ↳
      </span>
      {children}
    </p>
  );
}
