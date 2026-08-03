import * as React from "react";

import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("relative overflow-hidden pt-14 pb-16 md:pt-20 md:pb-20", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/4 size-[34rem] rounded-full bg-teal/12 blur-[120px]" />
        <div className="absolute -top-24 right-0 size-[26rem] rounded-full bg-yellow/16 blur-[110px]" />
      </div>

      <div className="shell">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.16em] text-orange uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-balance text-ink">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted">
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </header>
  );
}
