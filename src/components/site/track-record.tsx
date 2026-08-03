"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { Stat } from "@/lib/types";

/** Splits "370+" / "$500M" into prefix, number and suffix so only the digits animate. */
function parseValue(value: string) {
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: null, suffix: value };
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] };
}

function CountUp({ value, play }: { value: string; play: boolean }) {
  const { prefix, number, suffix } = parseValue(value);
  const [display, setDisplay] = useState(number ?? 0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!play || number === null || reduce) return;

    let frame = 0;
    const total = 40;
    const id = setInterval(() => {
      frame += 1;
      // Ease-out so the number decelerates into its final value.
      const progress = 1 - Math.pow(1 - frame / total, 3);
      setDisplay(Math.round(number * progress));
      if (frame >= total) clearInterval(id);
    }, 16);

    return () => clearInterval(id);
  }, [play, number, reduce]);

  if (number === null) return <>{value}</>;
  return (
    <>
      {prefix}
      {reduce || !play ? number : display}
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

  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="shell" ref={ref}>
        <h2 className="font-display text-3xl font-semibold text-ink lg:text-4xl">{heading}</h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-balance text-muted-foreground">
            {intro}
          </p>
        ) : null}

        <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-14 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <div className="font-display text-4xl font-bold text-primary tabular-nums">
                  <CountUp value={stat.value} play={inView} />
                </div>
                <p className="mt-1 text-muted-foreground">{stat.label}</p>
                {stat.detail ? (
                  <p className="mt-1 text-sm leading-relaxed text-ink-faint">{stat.detail}</p>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
