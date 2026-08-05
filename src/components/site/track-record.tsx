"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { Stat } from "@/lib/types";

/** Splits "370+" / "$500M" into prefix, number and suffix so only the digits animate. */
function parseValue(value: string) {
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: null, suffix: value };
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] };
}

/** Long enough to read as a count rather than a flicker. */
const COUNT_MS = 2400;

/**
 * Counts to `value` over {@link COUNT_MS}, staggered by `delay`.
 *
 * Driven by requestAnimationFrame off a wall-clock start, not a fixed-step interval:
 * a slow count on a busy main thread drifts badly when each tick assumes it fired on
 * time, and rAF also pauses in background tabs rather than burning through the animation
 * unseen.
 */
function CountUp({ value, play, delay = 0 }: { value: string; play: boolean; delay?: number }) {
  const { prefix, number, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!play || number === null || reduce) return;

    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start - delay * 1000;

      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const t = Math.min(elapsed / COUNT_MS, 1);
      // easeOutExpo: fast off the mark, a long settle into the final figure.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(number * eased);

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, number, reduce, delay]);

  if (number === null) return <>{value}</>;

  // Keep one decimal while counting on sub-10 figures, so "15" does not sit on 14 for
  // most of the animation. Whole numbers land exactly at the end either way.
  const shown =
    reduce || !play
      ? number
      : number < 10 && display < number
        ? display.toFixed(1)
        : Math.round(display);

  return (
    <>
      {prefix}
      {shown}
      {suffix}
    </>
  );
}

/**
 * "Our track record".
 *
 * Structure from Tailark's `stats/two` and `stats/four` blocks (MIT,
 * github.com/tailark/blocks): a plain heading over an unboxed `grid-cols-2 md:grid-cols-4`
 * of `text-primary` figures with `text-muted-foreground` labels. Dropping the boxed
 * hairline grid lets the numbers carry the section on their own.
 */
export function TrackRecord({
  stats,
  heading = "Our track record",
  intro,
}: {
  stats: Stat[];
  heading?: string;
  intro?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : undefined,
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="shell" ref={ref}>
        <motion.h2
          {...rise(0)}
          className="font-display text-3xl font-semibold text-ink lg:text-4xl"
        >
          {heading}
        </motion.h2>
        {intro ? (
          <motion.p
            {...rise(0.12)}
            className="mt-4 max-w-2xl text-lg leading-relaxed text-balance text-muted-foreground"
          >
            {intro}
          </motion.p>
        ) : null}

        <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-14 md:grid-cols-4">
          {stats.map((stat, i) => {
            // Each figure starts a beat after the last, so the row reads left to right.
            const delay = 0.25 + i * 0.12;
            return (
              <motion.div key={stat.label} {...rise(delay)}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <div className="font-display text-4xl font-bold text-primary tabular-nums">
                    <CountUp value={stat.value} play={inView} delay={delay} />
                  </div>
                  <p className="mt-1 text-muted-foreground">{stat.label}</p>
                  {stat.detail ? (
                    <p className="mt-1 text-sm leading-relaxed text-ink-faint">{stat.detail}</p>
                  ) : null}
                </dd>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
