import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee with edge fade and pause-on-hover.
 * Children are rendered twice so the loop is seamless; the duplicate is hidden from
 * assistive tech.
 */
export function Marquee({
  children,
  duration = 45,
  gap = "3rem",
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  gap?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("group mask-fade-x relative flex w-full overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${duration}s`,
          "--marquee-gap": gap,
        } as React.CSSProperties
      }
    >
      <div
        className="flex w-max shrink-0 animate-[marquee_var(--marquee-duration)_linear_infinite] items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ gap }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
