"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

/**
 * Fades and lifts children into view once, respecting reduced-motion.
 *
 * The timing is deliberately unhurried: 0.9s over 28px, on a long-tailed ease that
 * decelerates almost to a stop before it arrives. Faster than this and the movement
 * registers as a jolt rather than as something settling.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  /** Distance travelled, in px. Larger for full sections, smaller for items in a grid. */
  distance = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
  distance?: number;
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}

/**
 * Reveals children one after another.
 *
 * Wrap a list and every direct `RevealItem` inside it inherits the cascade, which saves
 * threading an index through to compute each delay by hand.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  delay = 0.05,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul";
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Component>
  );
}

/** A child of {@link RevealGroup}. Takes its timing from the parent. */
export function RevealItem({
  children,
  className,
  as = "div",
  distance = 28,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
  distance?: number;
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: distance },
        shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </Component>
  );
}
