"use client";

import { useReducedMotion } from "framer-motion";
import { Building2, Landmark, Rocket, Telescope } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { SectionHead } from "@/components/summit/primitives";
import type { summit } from "@/lib/summit-content";
import { cn } from "@/lib/utils";

type Audience = (typeof summit)["audience"];

/**
 * One icon per audience, in fixed order.
 *
 * lucide-react rather than Flaticon: Flaticon needs a visible attribution wherever an icon
 * appears, which is a standing obligation on a marketing page. Nothing financial, as asked:
 * investors get a telescope for looking ahead, not a coin.
 */
const icons = [Rocket, Telescope, Building2, Landmark];

/** Brand colour per card, so the four read as a set of four rather than one block. */
const accents = [
  { text: "text-purple", tile: "bg-purple/10", rule: "bg-purple" },
  { text: "text-teal-deep", tile: "bg-teal/10", rule: "bg-teal" },
  { text: "text-orange-deep", tile: "bg-orange/10", rule: "bg-orange" },
  { text: "text-sky", tile: "bg-sky/10", rule: "bg-sky" },
] as const;

/**
 * "Who the summit is for": a sticky photograph paired with cards that open as you reach
 * them, in the manner of Aceternity UI's Sticky Scroll Reveal.
 *
 * The active card is whichever one is crossing the middle of the viewport, found with a
 * single IntersectionObserver whose root is squeezed to a thin horizontal band. That is
 * cheaper and steadier than measuring scroll offsets on every frame, and it degrades to
 * "the first one" before any observation has happened rather than to nothing.
 *
 * Cards open by animating `grid-template-rows` from `0fr` to `1fr`, so the body can be any
 * length and there is no height to measure in JavaScript.
 */
export function SummitAudience({ audience }: { audience: Audience }) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Everything opens at once for a reader who has asked for less motion, and the observer
  // never runs, so nothing moves under them as they scroll.
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = cardRefs.current.indexOf(entry.target as HTMLLIElement);
          if (index >= 0) setActive(index);
        }
      },
      // A band across the middle of the viewport: only one card is ever inside it.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    const cards = cardRefs.current.filter(Boolean) as HTMLLIElement[];
    for (const card of cards) observer.observe(card);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const allOpen = Boolean(reduceMotion);
  const shown = allOpen ? 0 : active;

  return (
    <section className="py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={audience.heading} intro={audience.intro} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          {/*
            The photograph, held beside the cards on wide screens.

            Wide screens only. A sticky panel in a single-column grid travels the height of
            the whole grid, so on a phone it rides down over the cards; and a photograph
            that sat still above them would be captioned by whichever card happened to be
            open. Narrow screens get the photograph inside the card instead, below.
          */}
          <div className="sticky top-28 hidden self-start lg:block">
            <div className="relative aspect-3/4 overflow-hidden rounded-(--radius) bg-muted">
              {audience.items.map((item, i) => (
                <Image
                  key={item.title}
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  // Biased above centre: these are photographs of people, and a centred
                  // crop of a group shot takes the tops of their heads off.
                  className={cn(
                    "object-cover object-[50%_30%] transition-opacity duration-700 ease-out",
                    i === shown ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Spaced out on wide screens so each card gets its own moment on the way past. */}
          <ul className="space-y-4 lg:space-y-6 lg:py-6">
            {audience.items.map((item, i) => {
              const Icon = icons[i % icons.length];
              const accent = accents[i % accents.length];
              const open = allOpen || i === active;

              return (
                <li
                  key={item.title}
                  ref={(node) => {
                    cardRefs.current[i] = node;
                  }}
                  className={cn(
                    "rounded-(--radius) border p-6 transition-colors duration-500 md:p-8",
                    open ? "border-border bg-muted" : "border-transparent bg-transparent",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-500",
                        open ? accent.tile : "bg-foreground/5",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-5 transition-colors duration-500",
                          open ? accent.text : "text-muted-foreground",
                        )}
                        aria-hidden
                      />
                    </span>
                    <h3
                      className={cn(
                        "font-display text-xl leading-snug font-bold transition-colors duration-500 md:text-2xl",
                        open ? accent.text : "text-foreground",
                      )}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/*
                    `grid-template-rows` rather than `height`: it animates to the content's
                    natural height without anything having to measure it first.
                  */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-4 leading-relaxed text-muted-foreground">{item.body}</p>

                      {/* The narrow-screen home for the photograph. */}
                      <div className="relative mt-5 aspect-video overflow-hidden rounded-(--radius) bg-background lg:hidden">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="100vw"
                          className="object-cover object-[50%_30%]"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
