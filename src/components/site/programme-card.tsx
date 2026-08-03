import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { StatusBadge } from "@/components/ui/badge";
import type { Programme } from "@/lib/types";
import { cn } from "@/lib/utils";

const stageLabel: Record<NonNullable<Programme["stage"]>, string> = {
  early: "Early stage",
  growth: "Growth stage",
};

/**
 * Programme card.
 *
 * `featured` gives the image and detail equal width side by side; the default is a
 * stacked card for the grid. Both carry the stage and theme labels so a programme can be
 * placed at a glance without reading the summary.
 */
export function ProgrammeCard({
  programme,
  featured = false,
}: {
  programme: Programme;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-canvas-raised transition-all duration-300",
        "shadow-[0_1px_2px_rgba(47,43,51,0.06)] hover:-translate-y-1 hover:shadow-[0_28px_60px_-40px_rgba(47,43,51,0.5)]",
        featured && "md:col-span-2 md:flex-row",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-purple",
          featured ? "aspect-16/10 md:aspect-auto md:w-1/2" : "aspect-16/10",
        )}
      >
        {programme.heroImage ? (
          <Image
            src={programme.heroImage}
            alt=""
            fill
            sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple via-purple-soft to-teal" />
        )}
        <div className="absolute top-4 left-4">
          <StatusBadge status={programme.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        {/* Stage and themes — the scannable taxonomy. */}
        <div className="flex flex-wrap items-center gap-2">
          {programme.stage ? (
            <span className="rounded-full bg-purple px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-white uppercase">
              {stageLabel[programme.stage]}
            </span>
          ) : null}
          {programme.themes?.map((theme) => (
            <span
              key={theme}
              className="rounded-full border border-line-strong px-2.5 py-1 text-[0.6875rem] font-medium text-ink-muted"
            >
              {theme}
            </span>
          ))}
        </div>

        {programme.kicker ? (
          <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-teal-deep uppercase">
            {programme.kicker}
          </p>
        ) : null}

        <h3
          className={cn(
            "display mt-2 text-ink",
            featured ? "text-3xl md:text-4xl" : "text-2xl",
          )}
        >
          {programme.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-ink-muted">
          {programme.summary}
        </p>

        {programme.keyFacts?.length ? (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {programme.keyFacts.slice(0, featured ? 4 : 2).map((fact) => (
              <div key={fact.label}>
                <dt className="text-[0.6875rem] tracking-[0.12em] text-ink-faint uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-sm font-semibold text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-purple">
          Programme details
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
