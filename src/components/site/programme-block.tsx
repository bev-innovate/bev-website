import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { Programme } from "@/lib/types";

const statusLabel: Record<NonNullable<Programme["status"]>, string | null> = {
  open: "Applications open",
  closed: "Applications closed",
  upcoming: "Coming soon",
  completed: null,
};

/**
 * One programme, as a two-column block on the programmes page.
 *
 * The old site stacked a text column beside a promo graphic. Same structure, but the
 * blocks now alternate side, carry a status pill, and the graphic gets a subtle lift on
 * hover so the "Learn more" affordance is obvious.
 */
export function ProgrammeBlock({
  programme,
  index,
  tone,
}: {
  programme: Programme;
  index: number;
  /** Background the block sits on — decides heading and body contrast. */
  tone: "purple" | "orange";
}) {
  const flipped = index % 2 === 1;
  const label = programme.status ? statusLabel[programme.status] : null;
  // On purple the old site used orange headings; on the orange band they were white.
  const headingClass = tone === "purple" ? "text-orange" : "text-white";
  // Without a graphic, a two-column grid would leave half the row empty.
  const hasImage = Boolean(programme.heroImage);

  return (
    <Reveal>
      <article
        className={
          hasImage
            ? "grid items-start gap-10 lg:grid-cols-2 lg:gap-16"
            : "max-w-3xl"
        }
      >
        <div className={hasImage && flipped ? "lg:order-2" : undefined}>
          <h3 className={`display text-[clamp(1.5rem,3vw,2.125rem)] ${headingClass}`}>
            {programme.title}
          </h3>

          {label ? (
            <p
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white"
            >
              {programme.status === "open" ? (
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-current" />
                </span>
              ) : null}
              {label}
            </p>
          ) : null}

          <div
            className="mt-5 space-y-4 leading-relaxed text-white/85"
          >
            <p>{programme.summary}</p>
            {programme.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          {programme.keyFacts?.length ? (
            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
              {programme.keyFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[0.6875rem] tracking-[0.12em] text-white/60 uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-0.5 text-xl font-bold text-white">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <ButtonLink
            href={`/programmes/${programme.slug}`}
            variant={tone === "orange" ? "white" : "primary"}
            className="mt-8"
          >
            Learn More
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>

        {programme.heroImage ? (
          <div className={flipped ? "lg:order-1" : undefined}>
            <div className="group relative aspect-16/9 overflow-hidden rounded-xl bg-black/10 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src={programme.heroImage}
                alt={`${programme.title} programme graphic`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </div>
        ) : null}
      </article>
    </Reveal>
  );
}
