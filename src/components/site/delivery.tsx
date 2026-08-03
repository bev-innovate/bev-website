"use client";

import { ArrowRight, Compass, Handshake, Rocket, Users } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * "How we deliver climate innovation engagements".
 *
 * A single bold statement over four tabs, one per pillar. Each panel pairs the detail with
 * a photograph of that kind of work actually happening, so the claim is evidenced rather
 * than asserted.
 *
 * The tab chrome is a pill rail rather than shadcn's default boxed `TabsList`: it sits on
 * a saturated band, where a filled grey track would read as a form control.
 */

/** Fixed order, so a pillar keeps its icon regardless of what the CMS returns. */
const icons = [Compass, Users, Rocket, Handshake];

export function Delivery({
  eyebrow,
  heading,
  statement,
  pillars,
}: {
  eyebrow: string;
  heading: string;
  statement: string;
  pillars: readonly {
    title: string;
    tab: string;
    image: string;
    points: readonly string[];
    formats: string;
  }[];
}) {
  if (!pillars.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-purple py-20 text-white md:py-28">
      {/* A single wash, so the photography inside the panels stays the brightest thing here. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-purple-deep via-purple to-purple-soft"
      />

      <div className="shell">
        <div className="max-w-4xl">
          <span className="text-white/60">{eyebrow}</span>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.05] font-semibold text-balance">
            {statement}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{heading}</p>
        </div>

        <Tabs defaultValue={pillars[0].tab} className="mt-12 md:mt-16">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-none bg-transparent p-0">
            {pillars.map((pillar, i) => {
              const Icon = icons[i % icons.length];
              return (
                <TabsTrigger
                  key={pillar.tab}
                  value={pillar.tab}
                  className="gap-2 rounded-full border border-white/20 px-4 py-2.5 text-white/70 shadow-none transition-colors hover:border-white/40 hover:text-white data-[state=active]:border-white data-[state=active]:bg-white data-[state=active]:text-purple data-[state=active]:shadow-none md:px-5"
                >
                  <Icon className="size-4" aria-hidden />
                  {pillar.tab}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {pillars.map((pillar) => (
            <TabsContent
              key={pillar.tab}
              value={pillar.tab}
              // Radix unmounts inactive panels, so the animation runs on every switch.
              className="mt-10 animate-panel-in"
            >
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h3 className="font-display text-2xl leading-snug font-semibold md:text-3xl">
                    {pillar.title}
                  </h3>

                  <ul className="mt-7 space-y-4">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-relaxed text-white/80">
                        <ArrowRight className="mt-1 size-4 shrink-0 text-yellow" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 border-t border-white/15 pt-5 text-white/60">
                    {pillar.formats}
                  </p>
                </div>

                <figure className="relative aspect-4/3 overflow-hidden rounded-(--radius) ring-1 ring-white/20 lg:aspect-16/11">
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </figure>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/15 pt-10">
          <p className="max-w-xl text-lg text-white/70">
            Every engagement is built from these four, in the proportion the brief needs.
          </p>
          <ButtonLink href="/contact" variant="white" size="lg" className="ml-auto shrink-0">
            Design an engagement with us
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
