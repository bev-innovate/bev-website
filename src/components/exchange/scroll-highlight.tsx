"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Fragment, useRef } from "react";

/**
 * Text whose key phrases warm to golden yellow as the reader scrolls through it.
 *
 * Mark a phrase with double square brackets: "the [[steepest part of the journey]]".
 * Phrases change one after another across the paragraph's passage up the screen, so the
 * colour follows the reader's eye rather than arriving all at once. With reduced motion
 * the phrases simply show in their final colour.
 */

/** Where phrases start: the ink of the text they sit in. */
const INKS = { foreground: "#2e2833", muted: "#5b545f" } as const;
/** A warm golden yellow, deep enough to read on white at these large sizes. */
const TO = "#b8860b";

function Phrase({
  children,
  progress,
  start,
  end,
  from,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  from: string;
}) {
  const color = useTransform(progress, [start, end], [from, TO]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

/** A phrase that warms on its own shortly after the page opens, for text already on screen. */
function TimedPhrase({ children, index, from }: { children: string; index: number; from: string }) {
  return (
    <motion.span
      initial={{ color: from }}
      animate={{ color: TO }}
      transition={{ delay: 0.6 + index * 0.35, duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

export function ScrollHighlight({
  text,
  as = "p",
  ink = "foreground",
  onLoad = false,
  className,
}: {
  text: string;
  as?: "p" | "blockquote";
  /**
   * Warm the phrases one after another as the page opens instead of on scroll, for text
   * that is already on screen at the top of the page and could never be scrolled through.
   */
  onLoad?: boolean;
  /** The colour of the surrounding text, so phrases start out matching it. */
  ink?: keyof typeof INKS;
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
    // A line break in the text starts a new paragraph, with a little air above it.
    if (!isPhrase[i]) {
      if (!part.includes("\n")) return part;
      return part.split("\n").map((line, j) => (
        <Fragment key={`${i}-${j}`}>
          {j > 0 ? <span aria-hidden className="block h-[0.8em]" /> : null}
          {line}
        </Fragment>
      ));
    }
    const words = part.slice(2, -2);
    const index = order[i];
    if (reduce) {
      return (
        <span key={i} style={{ color: TO }}>
          {words}
        </span>
      );
    }
    if (onLoad) {
      return (
        <TimedPhrase key={i} index={index} from={INKS[ink]}>
          {words}
        </TimedPhrase>
      );
    }
    // Each phrase gets its own slice of the scroll, overlapping its neighbours slightly.
    const start = (index / total) * 0.85;
    const end = Math.min(1, start + 0.85 / total + 0.1);
    return (
      <Phrase key={i} progress={scrollYProgress} start={start} end={end} from={INKS[ink]}>
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
