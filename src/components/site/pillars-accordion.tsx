"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

import { pillars } from "@/lib/seed-content";
import { cn } from "@/lib/utils";

type Pillar = (typeof pillars)[number];

/**
 * "Who we are" — the three pillars, as an accordion on a purple field.
 *
 * Same interaction as the old site, rebuilt with real disclosure semantics: one open at a
 * time, proper button/region wiring, height animation that reduced-motion users skip.
 */
export function PillarsAccordion({ items }: { items: Pillar[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <div>
        {items.map((pillar, i) => {
          const open = openIndex === i;
          const panelId = `${baseId}-panel-${i}`;
          const buttonId = `${baseId}-button-${i}`;

          return (
            <div key={pillar.slug} className="border-b border-white/25">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-semibold text-white transition-opacity hover:opacity-80 md:text-2xl"
                >
                  {pillar.title}
                  <span className="grid size-7 shrink-0 place-items-center text-white/80">
                    {open ? <Minus className="size-5" /> : <Plus className="size-5" />}
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 pb-8 text-[0.9375rem] leading-relaxed text-white/85">
                      <p>{pillar.description}</p>

                      {"body" in pillar && pillar.body
                        ? pillar.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                        : null}

                      {"outcomes" in pillar && pillar.outcomes ? (
                        <>
                          <p className="pt-1 font-semibold text-white">{pillar.outcomesLabel}</p>
                          <ul className="space-y-3">
                            {pillar.outcomes.map((outcome) => (
                              <li key={outcome.title} className="flex gap-3">
                                <span
                                  className="mt-2 size-1.5 shrink-0 rounded-full bg-orange"
                                  aria-hidden
                                />
                                <span>
                                  <strong className="font-semibold text-white">
                                    {outcome.title}
                                  </strong>
                                  <br />
                                  {outcome.body}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <p className="pt-1">
                            <strong className="font-semibold text-white">
                              {pillar.idealForLabel}
                            </strong>
                            <br />
                            {pillar.idealFor}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="relative hidden lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/hero-miscellaneous-a7400018-medium-edited.webp"
              alt="Better Earth Ventures cohort members celebrating together"
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
            {/* Duotone treatment, matching the orange/purple wash on the old site. */}
            <div
              className={cn(
                "absolute inset-0 mix-blend-color",
                "bg-gradient-to-br from-orange via-orange to-purple",
              )}
            />
            <div className="absolute inset-0 bg-purple/25" />
          </div>
        </div>
      </div>
    </div>
  );
}
