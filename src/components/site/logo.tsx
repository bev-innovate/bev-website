import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Wordmark with a small "earth arc" glyph. Placeholder for the real brand asset —
 * drop the official SVG in here and the rest of the site inherits it.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Better Earth Ventures — home"
    >
      <svg viewBox="0 0 32 32" className="size-7 shrink-0" aria-hidden>
        <circle cx="16" cy="16" r="14" className="fill-forest" />
        <path
          d="M4 19.5c5-3.5 9-4 12-1.5s6 2 12-1"
          className="stroke-signal"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="16" cy="10" r="2.6" className="fill-signal" />
      </svg>
      <span className="font-display text-[1.0625rem] leading-none font-semibold tracking-tight text-ink">
        Better Earth
        <span className="block text-[0.6875rem] font-sans font-medium tracking-[0.18em] text-ink-faint uppercase">
          Ventures
        </span>
      </span>
    </Link>
  );
}
