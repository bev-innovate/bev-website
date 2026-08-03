"use client";

/**
 * Timeline — sticky heading with a scroll-following beam.
 *
 * Source: 21st.dev @manuarora700 / Aceternity UI ("Timeline", component id 857).
 * Adapted: brand tokens instead of neutral/purple, heading and copy lifted out into
 * props so the section can be reused, and the beam respects reduced-motion.
 */

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export function Timeline({
  data,
  className,
}: {
  data: TimelineEntry[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => setHeight(node.getBoundingClientRect().height);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      <div ref={ref} className="relative mx-auto max-w-5xl">
        {data.map((item, index) => (
          <div key={`${item.title}-${index}`} className="flex justify-start pt-10 md:gap-10 md:pt-24">
            <div className="sticky top-28 z-30 flex max-w-xs flex-col items-start self-start md:w-full md:max-w-sm md:flex-row md:items-center">
              <div className="absolute left-2 flex size-9 items-center justify-center rounded-full bg-canvas ring-1 ring-line">
                <div className="size-3 rounded-full bg-moss" />
              </div>
              <div className="hidden md:block md:pl-20">
                <h3 className="font-display text-3xl font-semibold text-ink lg:text-4xl">
                  {item.title}
                </h3>
                {item.subtitle ? (
                  <p className="mt-1 text-sm text-ink-faint">{item.subtitle}</p>
                ) : null}
              </div>
            </div>

            <div className="relative w-full pr-2 pl-16 md:pl-4">
              <div className="md:hidden">
                <h3 className="font-display text-2xl font-semibold text-ink">{item.title}</h3>
                {item.subtitle ? (
                  <p className="mt-1 mb-3 text-sm text-ink-faint">{item.subtitle}</p>
                ) : null}
              </div>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute top-0 left-6 w-px overflow-hidden bg-line [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
        >
          <motion.div
            style={
              reduceMotion
                ? { height: "100%", opacity: 1 }
                : { height: heightTransform, opacity: opacityTransform }
            }
            className="absolute inset-x-0 top-0 w-px rounded-full bg-gradient-to-b from-moss via-leaf to-signal"
          />
        </div>
      </div>
    </div>
  );
}
