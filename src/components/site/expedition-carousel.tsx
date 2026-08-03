"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

type Slide = {
  accent: "yellow" | "orange" | "teal";
  image: string;
  paragraphs: string[];
};

const accentClass = {
  yellow: "bg-yellow text-ink",
  orange: "bg-orange text-white",
  teal: "bg-teal text-white",
} as const;

/**
 * "What You'll Experience" carousel.
 *
 * The old site used a Wix slider with arrows and dots. Rebuilt with keyboard support
 * (arrow keys), a live region so screen readers hear slide changes, and direction-aware
 * transitions. Alternating image/text sides come from the original design.
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
  const flipped = index % 2 === 1;

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
      className="relative"
    >
      <div className="flex items-center gap-2 md:gap-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="grid size-10 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-canvas-sunk hover:text-ink"
        >
          <ChevronLeft className="size-6" />
        </button>

        <div className="min-h-[26rem] flex-1 md:min-h-[30rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={reduce ? false : { opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid items-center gap-0 md:grid-cols-2"
            >
              <div className={cn("relative", flipped && "md:order-2")}>
                <div className="arch relative mx-auto aspect-3/4 w-full max-w-[22rem] overflow-hidden">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 22rem, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                className={cn(
                  "relative z-10 space-y-4 p-8 text-[0.9375rem] leading-relaxed md:p-10",
                  accentClass[slide.accent],
                  flipped ? "md:order-1 md:-mr-16" : "md:-ml-16",
                )}
              >
                {slide.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="grid size-10 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-canvas-sunk hover:text-ink"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              i === index ? "bg-purple" : "bg-line-strong hover:bg-ink-faint",
            )}
          />
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        Slide {index + 1} of {slides.length}
      </p>
    </div>
  );
}
