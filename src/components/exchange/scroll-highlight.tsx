"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

/**
 * Text whose key phrases warm to the Exchange teal as the reader scrolls through it.
 *
 * Mark a phrase with double square brackets: "the [[steepest part of the journey]]".
 * Phrases change one after another across the paragraph's passage up the screen, so the
 * colour follows the reader's eye rather than arriving all at once. With reduced motion
 * the phrases simply show in their final colour.
 */

const FROM = "#2e2833";
const TO = "#0d827f";

function Phrase({
  children,
  progress,
  start,
  end,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const color = useTransform(progress, [start, end], [FROM, TO]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

export function ScrollHighlight({
  text,
  as = "p",
  className,
}: {
  text: string;
  as?: "p" | "blockquote";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // From the paragraph entering the lower part of the screen to it reaching the middle.
    offset: ["start 0.85", "end 0.5"],
  });

  const parts = text.split(/(\[\[[^\]]+\]\])/g).filter(Boolean);
  const isPhrase = parts.map((p) => p.startsWith("[["));
  const total = isPhrase.filter(Boolean).length;
  // Each phrase's position among the phrases, worked out up front.
  const order = isPhrase.map((flag, i) => (flag ? isPhrase.slice(0, i).filter(Boolean).length : -1));

  const children = parts.map((part, i) => {
    if (!isPhrase[i]) return part;
    const words = part.slice(2, -2);
    const index = order[i];
    if (reduce) {
      return (
        <span key={i} style={{ color: TO }}>
          {words}
        </span>
      );
    }
    // Each phrase gets its own slice of the scroll, overlapping its neighbours slightly.
    const start = (index / total) * 0.85;
    const end = Math.min(1, start + 0.85 / total + 0.1);
    return (
      <Phrase key={i} progress={scrollYProgress} start={start} end={end}>
        {words}
      </Phrase>
    );
  });

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<HTMLParagraphElement & HTMLQuoteElement>} className={className}>
      {children}
    </Tag>
  );
}
