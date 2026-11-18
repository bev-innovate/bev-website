"use client";

import { useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Founder quotes in two rows drifting in opposite directions.
 *
 * Each row is an ordinary horizontal scroller, so it can be swiped, scrolled with a
 * trackpad or dragged with a mouse; the drift pauses while someone is hovering, touching
 * or dragging, then carries on from wherever they left it. The cards are repeated so the
 * loop never shows a seam. Under reduced motion the rows stay still and simply scroll.
 */

export interface MarqueeQuote {
  text: string;
  placeholder: string;
}

/** Pixels per frame at 60fps. */
const SPEED = 0.45;

function Card({ quote }: { quote: MarqueeQuote }) {
  return quote.text ? (
    <blockquote className="flex h-full flex-col rounded-3xl bg-exchange-mist p-7 text-lg leading-relaxed text-exchange-ink">
      <Quote className="mb-3 size-6 shrink-0 text-exchange-sun" aria-hidden />
      {quote.text}
    </blockquote>
  ) : (
    <div className="grid h-full min-h-40 place-items-center rounded-3xl border-2 border-dashed border-exchange/45 bg-exchange-mist p-7 text-center text-exchange-ink">
      <span>
        <Quote className="mx-auto mb-3 size-6 text-exchange-sun" aria-hidden />
        {quote.placeholder}
      </span>
    </div>
  );
}

function Row({ quotes, reverse }: { quotes: MarqueeQuote[]; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Two identical halves: crossing the halfway mark jumps back by one half, unseen.
    const half = () => el.scrollWidth / 2;
    const wrap = () => {
      if (el.scrollLeft >= half()) el.scrollLeft -= half();
      else if (el.scrollLeft <= 0) el.scrollLeft += half();
    };

    let pos = reverse ? half() : 0;
    el.scrollLeft = pos;

    let paused = false;
    let dragging = false;
    let dragX = 0;
    let dragStart = 0;
    const pause = () => (paused = true);
    const resume = () => {
      if (!dragging) paused = false;
    };

    const onScroll = () => {
      wrap();
      // Somebody scrolled by hand: carry on from where they left it.
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
    };

    // Mouse drag; touch and trackpads already scroll natively.
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dragging = paused = true;
      dragX = e.clientX;
      dragStart = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = dragStart - (e.clientX - dragX);
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "";
      pos = el.scrollLeft;
    };

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const step = ((now - last) / (1000 / 60)) * SPEED;
      last = now;
      if (!paused && !reduce) {
        pos += reverse ? -step : step;
        el.scrollLeft = pos;
        if (pos >= half()) pos -= half();
        else if (pos <= 0) pos += half();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [reverse, reduce]);

  // Enough cards that one half is always wider than the screen, then doubled for the loop.
  const set = Array.from({ length: Math.max(2, Math.ceil(6 / Math.max(quotes.length, 1))) }, () => quotes).flat();
  const cards = [...set, ...set];

  return (
    <div
      ref={ref}
      className="cursor-grab overflow-x-auto overscroll-x-contain py-1 select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max gap-4">
        {cards.map((quote, i) => (
          <li
            key={i}
            aria-hidden={i >= set.length || undefined}
            className="w-[min(80vw,22rem)] shrink-0"
          >
            <Card quote={quote} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function QuoteMarquee({ quotes, className }: { quotes: readonly MarqueeQuote[]; className?: string }) {
  const list = [...quotes];
  return (
    <div
      className={cn(
        "space-y-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <Row quotes={list} />
      <Row quotes={[...list].reverse()} reverse />
    </div>
  );
}
