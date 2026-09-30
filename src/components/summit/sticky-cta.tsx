"use client";

import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A bar that follows the reader down the Summit page with the registration CTA on it.
 *
 * Three rules keep it from becoming the thing everyone hates about sticky bars:
 *
 * 1. It stays out of the way until the hero has gone. While the hero is on screen its own
 *    buttons are right there, and a second copy of them is just clutter.
 * 2. It gets out of the way again at the registration band at the foot of the page, where
 *    the same button is already in front of them.
 * 3. It can be dismissed, and stays dismissed for the rest of the visit.
 *
 * Both triggers are elements the page already has, watched with one IntersectionObserver
 * rather than a scroll handler, so nothing runs on the main thread between them.
 */
export function SummitStickyCta({
  text,
  cta,
  /** While this is on screen the bar stays hidden. The hero. */
  hideWhileSelector,
  /** And while this is on screen it hides again. The closing registration band. */
  hideNearSelector,
}: {
  text: string;
  cta: { label: string; href: string };
  hideWhileSelector: string;
  hideNearSelector: string;
}) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [endVisible, setEndVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(hideWhileSelector);
    const end = document.querySelector(hideNearSelector);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) setHeroVisible(entry.isIntersecting);
          if (entry.target === end) setEndVisible(entry.isIntersecting);
        }
      },
      // A sliver of either element counts as on screen, so the bar never overlaps them.
      { threshold: 0 },
    );

    if (hero) observer.observe(hero);
    if (end) observer.observe(end);
    return () => observer.disconnect();
  }, [hideWhileSelector, hideNearSelector]);

  const external = /^https?:\/\//.test(cta.href);
  const shown = !dismissed && !heroVisible && !endVisible;

  return (
    <div
      // `aria-hidden` while off screen: it is a duplicate of links already in the page, so
      // there is nothing lost by keeping it out of the tab order until it is really there.
      aria-hidden={!shown}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="border-t border-white/15 bg-mangrove-deep/95 backdrop-blur-md">
        <div className="shell flex items-center gap-4 py-3.5 md:py-4">
          <p className="hidden flex-1 text-white/85 sm:block">{text}</p>

          <ButtonLink
            href={cta.href}
            tabIndex={shown ? undefined : -1}
            className="max-sm:flex-1 max-sm:justify-center"
            // Registration is an external form: open it alongside the page.
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {cta.label}
            {external ? (
              <ArrowUpRight className="size-4" aria-hidden />
            ) : (
              <ArrowRight className="size-4" aria-hidden />
            )}
          </ButtonLink>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            tabIndex={shown ? undefined : -1}
            aria-label="Hide this bar"
            className="grid size-9 shrink-0 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
