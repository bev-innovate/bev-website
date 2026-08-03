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

/** "Our track record" — the teal stat band. */
export function TrackRecord({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-teal py-16 text-white md:py-20">
      <div className="shell" ref={ref}>
        <h2 className="eyebrow text-white/90">Our track record</h2>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="text-[clamp(2.25rem,5vw,3.25rem)] leading-none font-bold tracking-tight tabular-nums">
                  <CountUp value={stat.value} play={inView} />
                </p>
                <p className="mt-3 text-sm leading-snug font-semibold text-white/90">
                  {stat.label}
                </p>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
