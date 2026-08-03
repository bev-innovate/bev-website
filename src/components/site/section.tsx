import * as React from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {/*
          Plain accent-coloured lead-in rather than a letterspaced small-caps eyebrow.
          Borrowed from Tailark's `content/two` (MIT, github.com/tailark/blocks), where
          the section label is just `text-primary` set at body size.
        */}
        {eyebrow ? <span className="text-primary">{eyebrow}</span> : null}
        <h2
          className={cn(
            "font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-semibold tracking-[-0.015em] text-balance text-ink",
            eyebrow && "mt-4",
          )}
        >
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 text-lg leading-relaxed text-pretty text-ink-muted">{intro}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "canvas",
  ...props
}: React.HTMLAttributes<HTMLElement> & { tone?: "canvas" | "sunk" | "purple" }) {
  return (
    <section
      className={cn(
        "py-16 md:py-20",
        tone === "sunk" && "bg-canvas-sunk",
        tone === "purple" && "relative overflow-hidden bg-purple text-canvas",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
