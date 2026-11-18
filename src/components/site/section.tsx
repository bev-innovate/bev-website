import * as React from "react";

import { Text } from "@/components/ui/typography";
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
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {/* The shared type scale: eyebrow, title, then a lead-sized intro. */}
        {eyebrow ? (
          <Text variant="eyebrow" className="text-primary">
            {eyebrow}
          </Text>
        ) : null}
        <Text variant="title" className={cn(eyebrow && "mt-3")}>
          {title}
        </Text>
        {intro ? (
          <Text variant="lead" className="mt-5 text-muted-foreground">
            {intro}
          </Text>
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
