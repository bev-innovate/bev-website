"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

const DAY = 24 * 60 * 60 * 1000;

/**
 * How far away the summit is, in words: "7 days to go", "Starts tomorrow", "Day 2 is on now".
 *
 * Counted in whole days against Singapore midnight, so the number changes at midnight where
 * the summit is held, which is the only clock that matters to someone deciding whether to
 * come. Once the last day is over it renders nothing.
 */
function label(now: number, start: number, days: number) {
  if (now < start) {
    const left = Math.ceil((start - now) / DAY);
    return left === 1 ? "Starts tomorrow" : `${left} days to go`;
  }
  const day = Math.floor((now - start) / DAY) + 1;
  return day <= days ? `Day ${day} is on now` : null;
}

// Rechecks once a minute: cheap, and close enough that the label flips over at midnight.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

/**
 * The page is prerendered, so a number baked in at build time would be wrong by the next
 * morning. The server renders nothing and the browser fills it in, so it is only ever
 * computed from the reader's own clock.
 */
export function SummitCountdown({
  /** Midnight on the first day, Singapore time, as an ISO string with its offset. */
  startsAt,
  days,
  className,
}: {
  startsAt: string;
  days: number;
  className?: string;
}) {
  const start = Date.parse(startsAt);
  const text = useSyncExternalStore(
    subscribe,
    () => label(Date.now(), start, days),
    () => null,
  );

  if (!text) return null;

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-sm font-semibold text-white backdrop-blur-sm",
        className,
      )}
    >
      <span aria-hidden className="relative flex size-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-yellow opacity-75 motion-reduce:animate-none" />
        <span className="relative size-2 rounded-full bg-yellow" />
      </span>
      {text}
    </p>
  );
}
