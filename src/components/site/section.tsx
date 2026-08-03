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
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.16em] text-orange uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] font-semibold tracking-[-0.015em] text-balance text-ink">
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
        "py-20 md:py-28",
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
