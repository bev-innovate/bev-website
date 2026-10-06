"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const accentActive = {
  purple: "bg-purple text-white",
  teal: "bg-teal text-white",
  orange: "bg-orange text-white",
} as const;

const accentDot = {
  purple: "bg-purple",
  teal: "bg-teal",
  orange: "bg-orange",
} as const;

/**
 * Three links that stay under the site header while the agenda scrolls past, so a reader
 * can go straight to their day without the other two being hidden behind tabs.
 *
 * The day currently filling the middle of the screen is lit in its own colour, using one
 * IntersectionObserver over the three day cards rather than a scroll handler.
 */
export function AgendaDayNav({
  days,
  className,
}: {
  days: { id: string; title: string; date: string; accent: keyof typeof accentActive }[];
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the viewport: whichever day crosses it is current.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const day of days) {
      const el = document.getElementById(day.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [days]);

  return (
    <nav
      aria-label="Agenda days"
      className={cn(
        "sticky top-[calc(4.5rem+1px)] z-30 -mx-5 border-b border-border bg-background/90 px-5 py-3 backdrop-blur-md md:-mx-8 md:px-8",
        className,
      )}
    >
      <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
        {days.map((day) => {
          const on = active === day.id;
          return (
            <li key={day.id} className="shrink-0">
              <a
                href={`#${day.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  on
                    ? cn("border-transparent", accentActive[day.accent])
                    : "border-border bg-background text-foreground hover:bg-muted",
                )}
              >
                {on ? null : (
                  <span aria-hidden className={cn("size-2 rounded-full", accentDot[day.accent])} />
                )}
                {day.title}
                <span
                  className={cn(
                    "hidden font-normal sm:inline",
                    on ? "text-white/80" : "text-muted-foreground",
                  )}
                >
                  {day.date}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
