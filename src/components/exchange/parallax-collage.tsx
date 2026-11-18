"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { MediaPlaceholder } from "@/components/exchange/media-placeholder";
import type { ExchangeMedia } from "@/lib/exchange-content";
import { cn } from "@/lib/utils";

/**
 * Overlapping photographs that drift at different speeds as the page scrolls.
 *
 * The first photo is the anchor and barely moves; each one laid over it travels a little
 * further, so the stack separates gently in depth. Positions come from `layout`, so the
 * same piece makes the two-photo stack in "Who is it for?" and the three-photo one in
 * "What is it?". Still under reduced motion.
 */

type Slot = { className: string; aspect: string; sizes: string; drift: number };

const layouts: Record<2 | 3, Slot[]> = {
  2: [
    { className: "w-[85%]", aspect: "aspect-[4/3]", sizes: "(min-width: 1024px) 40vw, 85vw", drift: 24 },
    {
      className: "relative -mt-16 ml-auto w-[62%]",
      aspect: "aspect-[4/3]",
      sizes: "(min-width: 1024px) 28vw, 62vw",
      drift: 70,
    },
  ],
  3: [
    { className: "w-[78%]", aspect: "aspect-[4/3]", sizes: "(min-width: 1024px) 38vw, 78vw", drift: 20 },
    {
      className: "relative -mt-24 ml-auto w-[58%]",
      aspect: "aspect-[3/2]",
      sizes: "(min-width: 1024px) 28vw, 58vw",
      drift: 60,
    },
    {
      className: "relative -mt-20 ml-[6%] w-[44%]",
      aspect: "aspect-[4/5]",
      sizes: "(min-width: 1024px) 20vw, 44vw",
      drift: 100,
    },
  ],
};

function Layer({
  media,
  slot,
  progress,
  index,
  reduce,
}: {
  media: ExchangeMedia;
  slot: Slot;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  reduce: boolean;
}) {
  const y = useTransform(progress, [0, 1], [slot.drift, -slot.drift]);
  return (
    <motion.div
      style={reduce ? undefined : { y }}
      className={cn(slot.className, index > 0 && "z-10")}
    >
      {media.src ? (
        <div
          className={cn(
            "group relative overflow-hidden rounded-3xl bg-exchange-mist",
            slot.aspect,
            index > 0 && "ring-8 ring-background",
          )}
        >
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={slot.sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <MediaPlaceholder kind="photo" label={media.placeholder} className={slot.aspect} />
      )}
    </motion.div>
  );
}

export function ParallaxCollage({ photos }: { photos: readonly ExchangeMedia[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const slots = layouts[photos.length >= 3 ? 3 : 2];

  return (
    // Bottom padding as deep as the furthest drift, so a photo travelling down never runs
    // into whatever follows the collage.
    <div ref={ref} className="relative pb-24">
      {photos.slice(0, slots.length).map((media, i) => (
        <Layer
          key={media.src || media.placeholder}
          media={media}
          slot={slots[i]}
          progress={scrollYProgress}
          index={i}
          reduce={reduce}
        />
      ))}
    </div>
  );
}
