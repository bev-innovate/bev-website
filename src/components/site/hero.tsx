"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import type { Programme, Stat } from "@/lib/types";

const ease = [0.16, 1, 0.3, 1] as const;

function useStagger(reduce: boolean | null) {
  return (i: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.06 * i, ease },
        };
}

export function Hero({
  headline,
  intro,
  stats,
  featured,
}: {
  headline: string;
  intro: string;
  stats: Stat[];
  featured?: Programme;
}) {
  const reduce = useReducedMotion();
  const step = useStagger(reduce);

  return (
    <section className="grain relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Living background: two slow-drifting colour fields behind a soft grid. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 size-[46rem] rounded-full bg-leaf/16 blur-[130px] motion-safe:animate-pulse [animation-duration:14s]" />
        <div className="absolute -top-20 right-[-12rem] size-[38rem] rounded-full bg-signal/22 blur-[120px] motion-safe:animate-pulse [animation-duration:18s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,53,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,53,42,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="shell">
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            {featured ? (
              <motion.div {...step(0)}>
                <a
                  href={`/programmes/${featured.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-canvas-raised/80 py-1.5 pr-2 pl-3 text-sm backdrop-blur"
                >
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-moss" />
                  </span>
                  <span className="text-ink-muted">{featured.kicker ?? "Now open"}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest px-2.5 py-1 text-xs font-medium text-canvas">
                    {featured.title.split(" ").slice(0, 3).join(" ")}
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </motion.div>
            ) : null}

            <motion.h1
              {...step(1)}
              className="mt-7 font-display text-[clamp(2.6rem,7vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-balance text-ink"
            >
              {headline}
            </motion.h1>

            <motion.p
              {...step(2)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-muted"
            >
              {intro}
            </motion.p>

            <motion.div {...step(3)} className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/programmes" size="lg">
                Explore programmes
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/approach" size="lg" variant="outline">
                How we work
              </ButtonLink>
            </motion.div>
          </div>

          {/* Editorial image stack — replace with real programme photography. */}
          <motion.div {...step(2)} className="relative hidden lg:block">
            <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] border border-line bg-canvas-sunk">
              <Image
                src="https://static.wixstatic.com/media/4d40e5_70ceffdd6b544e22918ff8278784bf54~mv2.jpg"
                alt="Founders from the inaugural AgriTech ClimAccelerator Singapore cohort"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/55 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-10 w-56 rounded-2xl border border-line bg-canvas-raised p-5 shadow-[0_24px_60px_-30px_rgba(14,31,25,0.45)]">
              <p className="font-display text-4xl font-semibold text-forest">9</p>
              <p className="mt-1 text-sm text-ink-muted">
                companies in the inaugural APAC agritech cohort
              </p>
            </div>
          </motion.div>
        </div>

        <motion.dl
          {...step(4)}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:mt-20 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-canvas-raised px-5 py-6 md:px-6 md:py-7">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="font-display text-[clamp(1.375rem,4.5vw,2.5rem)] leading-none font-semibold tracking-tight text-forest">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm font-medium text-ink">{stat.label}</p>
                {stat.detail ? (
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-faint">{stat.detail}</p>
                ) : null}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
