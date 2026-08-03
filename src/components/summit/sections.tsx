import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Label, SectionHead, Tbc } from "@/components/summit/primitives";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { summit } from "@/lib/summit-content";
import { cn } from "@/lib/utils";

type Summit = typeof summit;

/* ── Hero ───────────────────────────────────────────────────────────────────── */

export function SummitHero({ hero, name }: { hero: Summit["hero"]; name: string }) {
  return (
    <header className="relative isolate overflow-hidden bg-sand text-ink">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={hero.image} alt="" fill priority sizes="100vw" className="object-cover" />
        {/* Material Evidence: the photograph carries the surface, type sits cleanly over it. */}
        <div className="absolute inset-0 bg-sand/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-sand via-sand/80 to-sand/55" />
        {/* Systems and Signals: isolines as structure. */}
        <div className="contours absolute inset-0 text-mangrove opacity-30" />
      </div>

      <div className="shell relative py-20 md:py-28 lg:py-36">
        <h1 className="display max-w-4xl text-[clamp(2.25rem,5.6vw,4.25rem)] text-ink">{name}</h1>
        <p className="display mt-3 max-w-3xl text-[clamp(1.25rem,2.4vw,1.75rem)] text-terracotta">
          {hero.headline}
        </p>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted">{hero.standfirst}</p>

        {/* Monospace data row: the field-notes specimen header. */}
        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {hero.facts.map((fact) => (
            <div key={fact.label} className="rounded-lg border border-line bg-canvas-raised px-4 py-4">
              <dt className="label-mono text-ink-faint">{fact.label}</dt>
              <dd className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-ink">
                {fact.value}
                {fact.tbc ? <Tbc /> : null}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={hero.primary.href} size="lg">
            {hero.primary.label}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
          <ButtonLink
            href={hero.secondary.href}
            size="lg"
            variant="outline"
            className="border-ink/25 text-ink hover:bg-ink/5"
          >
            {hero.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

/* ── Partners ───────────────────────────────────────────────────────────────── */

function PartnerRow({
  title,
  items,
}: {
  title: string;
  items: readonly { name: string; logo?: string | null; note?: string }[];
}) {
  return (
    <div>
      <Label>{title}</Label>
      <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-8">
        {items.map((partner) => (
          <li key={partner.name} className="flex h-14 items-center">
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={240}
                height={80}
                className="max-h-12 w-auto max-w-44 object-contain"
              />
            ) : (
              // No logo file yet — a typographic lockup reads as intentional, not broken.
              <span className="max-w-56 text-sm leading-tight font-semibold text-ink">
                {partner.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SummitPartners({ partners }: { partners: Summit["partners"] }) {
  return (
    <section className="border-b border-line py-16 md:py-20">
      <div className="shell grid gap-12 md:grid-cols-[auto_1fr] md:gap-20">
        <PartnerRow title="Organised by" items={partners.organisedBy} />
        <PartnerRow title="Supported by" items={partners.supportedBy} />
      </div>
    </section>
  );
}

/* ── What is the summit ─────────────────────────────────────────────────────── */

export function SummitAbout({ about }: { about: Summit["about"] }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="shell grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHead heading={about.heading} />
          <div className="mt-8 max-w-2xl space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Specimen grid: the measurable claims, numbered like plates. */}
          <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {about.specimens.map((item) => (
              <div key={item.ref} className="rounded-lg border border-line bg-canvas-raised px-5 py-5">
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="display flex items-center gap-2 text-2xl text-terracotta">
                    {item.value}
                    {"tbc" in item && item.tbc ? <Tbc /> : null}
                  </span>
                  <span className="mt-1.5 block text-xs leading-snug text-ink-muted">
                    {item.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Reveal delay={0.08}>
          <figure className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-canvas-sunk">
              <Image
                src={about.texture}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Strands ────────────────────────────────────────────────────────────────── */

export function SummitStrands({ strands }: { strands: Summit["strands"] }) {
  return (
    <section className="bg-canvas-sunk py-20 md:py-28">
      <div className="shell">
        <SectionHead heading={strands.heading} intro={strands.intro} />

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {strands.items.map((item, i) => (
            <Reveal as="li" key={item.ref} delay={Math.min(i, 3) * 0.06}>
              <article className="h-full rounded-xl border border-line bg-canvas-raised p-8 md:p-10">
                <h3 className="display text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Timeline ───────────────────────────────────────────────────────────────── */

export function SummitTimeline({ timeline }: { timeline: Summit["timeline"] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <SectionHead heading={timeline.heading} />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {timeline.days.map((day, i) => (
            <Reveal key={day.ref} delay={i * 0.08}>
              <article className="h-full">
                <div className="flex items-baseline justify-between border-b-2 border-terracotta pb-3">
                  <Label>{day.date}</Label>
                </div>
                <h3 className="display mt-4 text-2xl text-ink">{day.title}</h3>

                <ol className="mt-6 space-y-0">
                  {day.blocks.map((block) => (
                    <li
                      key={block.time + block.title}
                      className="flex gap-5 border-b border-line py-4 last:border-0"
                    >
                      <span className="label-mono w-12 shrink-0 pt-0.5 text-terracotta">
                        {block.time}
                      </span>
                      <span className="flex flex-1 flex-wrap items-center gap-2 text-sm text-ink">
                        {block.title}
                        {block.tbc ? <Tbc /> : null}
                      </span>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Speakers ───────────────────────────────────────────────────────────────── */

/**
 * Speakers.
 *
 * Structure adapted from Tailark's `team/two` block (MIT, github.com/tailark/blocks):
 * a dense grid of compact avatar-and-name rows rather than large portrait cards. That
 * reads as a roster being filled in, which is what it is, instead of eight empty frames.
 */
export function SummitSpeakers({ speakers }: { speakers: Summit["speakers"] }) {
  return (
    <section
      data-theme="fieldnotes"
      className="relative overflow-hidden bg-sand py-20 md:py-28"
    >
      <div aria-hidden className="contours absolute inset-0 text-mangrove opacity-20" />
      <div className="shell relative">
        <SectionHead heading={speakers.heading} />

        <ul className="mt-14 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.items.map((speaker, i) => (
            <Reveal as="li" key={speaker.ref} delay={Math.min(i, 7) * 0.03}>
              <article className="group grid grid-cols-[auto_1fr] items-center gap-3.5 border-b border-canvas/12 pb-5">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-full border border-canvas/20 bg-canvas/8">
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="label-mono absolute inset-0 grid place-items-center text-[0.5625rem] text-ink-faint">
                      {speaker.ref.replace("SPK-", "")}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
                    {speaker.name}
                    {speaker.tbc ? <Tbc /> : null}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-ink-muted">
                    {speaker.role} · {speaker.org}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Startups ───────────────────────────────────────────────────────────────── */

export function SummitStartups({ startups }: { startups: Summit["startups"] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <SectionHead heading={startups.heading} />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {startups.items.map((company, i) => (
            <Reveal as="li" key={company.ref} delay={Math.min(i, 5) * 0.05}>
              <article className="flex h-full flex-col rounded-xl border border-line bg-canvas-raised p-7">
                <h3 className="display text-xl text-ink">{company.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {company.blurb}
                </p>
                <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4">
                  <div>
                    <dt className="label-mono text-ink-faint">Sector</dt>
                    <dd className="mt-0.5 text-xs text-ink">{company.sector}</dd>
                  </div>
                  <div>
                    <dt className="label-mono text-ink-faint">Country</dt>
                    <dd className="mt-0.5 text-xs text-ink">{company.country}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Inline CTA ─────────────────────────────────────────────────────────────── */

/** Dropped between sections so the signup is never more than a screen away. */
export function SummitCtaStrip({
  text,
  cta = { label: "Register your interest", href: "#signup" },
  tone = "terracotta",
}: {
  text: string;
  cta?: { label: string; href: string };
  tone?: "terracotta" | "mangrove";
}) {
  return (
    <section className={cn("py-10", tone === "terracotta" ? "bg-terracotta" : "bg-moss")}>
      <div className="shell flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="display max-w-2xl text-xl text-canvas md:text-2xl">{text}</p>
        <ButtonLink href={cta.href} variant="white" className="shrink-0">
          {cta.label}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
    </section>
  );
}
