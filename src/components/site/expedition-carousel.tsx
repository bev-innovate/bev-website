"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

type Slide = {
  accent: "yellow" | "orange" | "teal";
  image: string;
  paragraphs: string[];
};

const panel = {
  yellow: "bg-yellow text-ink",
  orange: "bg-orange-deep text-white",
  teal: "bg-teal text-white",
} as const;

/** The offset frame sitting behind the photograph. */
const frame = {
  yellow: "bg-yellow/35",
  orange: "bg-orange/30",
  teal: "bg-teal/30",
} as const;

const bar = {
  yellow: "bg-yellow",
  orange: "bg-orange-deep",
  teal: "bg-teal",
} as const;

/**
 * "What You'll Experience".
 *
 * Rebuilt from the Wix slider. Changes: the photograph is larger and sits in an offset
 * colour frame, the copy panel overlaps it with real elevation, dots become a segmented
 * progress bar that shows how much is left, and the arrows are grouped next to the
 * counter instead of floating at the screen edges where they read as page navigation.
 *
 * Keyboard: left/right arrows. Screen readers get a live region announcing each change.
 */
export function ExpeditionCarousel({ slides }: { slides: Slide[] }) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();

  const go = useCallback(
    (next: number) => {
      const wrapped = (next + slides.length) % slides.length;
      setState(([current]) => [wrapped, wrapped > current ? 1 : -1]);
    },
    [slides.length],
  );

  const slide = slides[index];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="What you'll experience on a Climate Expedition"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-purple"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={reduce ? false : { opacity: 0, x: direction * 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: direction * -32 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-center gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-0"
        >
          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0">
            {/* Offset frame, echoing the panel colour. */}
            <div
              aria-hidden
              className={cn(
                "absolute -top-4 -left-4 hidden rounded-t-full rounded-b-2xl lg:block",
                "h-full w-full",
                frame[slide.accent],
              )}
            />
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-t-full rounded-b-2xl bg-canvas-sunk">
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 34vw, 80vw"
                className="object-cover"
              />
            </div>
          </div>

          <div
            className={cn(
              "relative z-10 flex min-h-64 flex-col justify-center rounded-2xl p-8 shadow-[0_24px_60px_-32px_rgba(51,51,51,0.55)] md:p-10 lg:-ml-20",
              panel[slide.accent],
            )}
          >
            <div className="space-y-4 text-[0.9375rem] leading-relaxed md:text-base">
              {slide.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls: counter, progress, arrows — grouped so they read as one object. */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <p className="text-sm font-semibold text-ink tabular-nums">
          <span className="text-purple">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-ink-faint"> / {String(slides.length).padStart(2, "0")}</span>
        </p>

        <div className="flex flex-1 gap-1.5 sm:max-w-56">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="group h-2 flex-1 rounded-full bg-line-strong"
            >
              <span
                className={cn(
                  "block h-full rounded-full transition-all duration-500",
                  i === index ? `w-full ${bar[s.accent]}` : "w-0 group-hover:w-1/3 bg-ink-faint",
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-purple hover:bg-purple hover:text-white"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-purple hover:bg-purple hover:text-white"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        Slide {index + 1} of {slides.length}
      </p>
    </div>
  );
}
