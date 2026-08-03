import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { StatusBadge } from "@/components/ui/badge";
import { cardVariants } from "@/components/ui/card";
import type { Programme } from "@/lib/types";
import { cn } from "@/lib/utils";

const stageLabel: Record<NonNullable<Programme["stage"]>, string> = {
  early: "Early stage",
  growth: "Growth stage",
};

/**
 * Programme card.
 *
 * Built on the vendored Tailark `Card` (MIT, github.com/tailark/blocks), so the surface,
 * radius and ring come from the same primitive as every other card on the site. `featured`
 * gives the image and detail equal width side by side; the default is a stacked card.
 */
export function ProgrammeCard({
  programme,
  featured = false,
  compact = false,
}: {
  programme: Programme;
  featured?: boolean;
  /** Tighter padding and type for three-up previews. */
  compact?: boolean;
}) {
  return (
    <Link
      href={`/programmes/${programme.slug}`}
      // `cardVariants` rather than `<Card>`: the whole card is the link, so the primitive's
      // classes go straight onto the anchor instead of nesting an interactive element.
      className={cn(
        cardVariants({ variant: "default" }),
        "group relative flex h-full flex-col overflow-hidden transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
        featured && "md:col-span-2 md:flex-row",
      )}
    >
      <div
          className={cn(
            "relative shrink-0 overflow-hidden bg-muted",
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

        <div className={cn("flex flex-1 flex-col", compact ? "p-6" : "p-7 md:p-8")}>
          {/* Stage and themes: the scannable taxonomy. */}
          <div className="flex flex-wrap items-center gap-2">
            {programme.stage ? (
              <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                {stageLabel[programme.stage]}
              </span>
            ) : null}
            {programme.themes?.map((theme) => (
              <span
                key={theme}
                className="rounded-full border border-foreground/10 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {theme}
              </span>
            ))}
          </div>

          {programme.kicker ? (
            <p className="mt-5 text-sm text-primary">{programme.kicker}</p>
          ) : null}

          <h3
            className={cn(
              "mt-2 font-display font-semibold text-foreground",
              featured ? "text-3xl md:text-4xl" : compact ? "text-xl" : "text-2xl",
            )}
          >
            {programme.title}
          </h3>

          <p
            className={cn(
              "mt-3 leading-relaxed text-muted-foreground",
              compact ? "line-clamp-2 text-sm" : "line-clamp-3 text-[0.9375rem]",
            )}
          >
            {programme.summary}
          </p>

          {!compact && programme.keyFacts?.length ? (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {programme.keyFacts.slice(0, featured ? 4 : 2).map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-0.5 font-medium text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <span
            className={cn(
              "mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary",
              compact ? "pt-5" : "pt-7",
            )}
          >
            Programme details
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
    </Link>
  );
}
