import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { SectionHead, Tbc } from "@/components/summit/primitives";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import type { summit } from "@/lib/summit-content";
import { cn } from "@/lib/utils";

type Summit = typeof summit;

/* ── Hero ───────────────────────────────────────────────────────────────────── */

export function SummitHero({ hero, name }: { hero: Summit["hero"]; name: string }) {
  return (
    <header className="relative isolate overflow-hidden bg-sand text-ink">
      {/*
        The official key visual, full bleed. It already carries the summit name and line,
        so nothing is set over it: the type below restates them for search and screen
        readers, which a raster lockup cannot do on its own.

        The asset is 2.24:1. Narrow viewports use a taller frame anchored left, where the
        title sits, rather than letterboxing the whole thing down to a strip.
      */}
      <div className="relative aspect-4/3 w-full sm:aspect-2/1 lg:aspect-[1600/715]">
        <Image
          src={hero.image}
          alt={`${name}: ${hero.headline}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-left lg:object-center"
        />
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/3">
        {/* Systems and Signals: isolines as structure under the copy block. */}
        <div className="contours absolute inset-0 text-mangrove opacity-30" />
      </div>

      <div className="shell relative py-14 md:py-20">
        {/*
          The artwork above already sets the name and the line at full scale, so the
          heading here is sized as a summary rather than a second hero. It stays an h1
          because the artwork's title is a raster.
        */}
        <h1 className="display max-w-3xl text-[clamp(1.6rem,3vw,2.25rem)] text-ink">{name}</h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{hero.standfirst}</p>

        {/* The standing facts, on the same card primitive as the rest of the page. */}
        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {hero.facts.map((fact) => (
            <Card key={fact.label} variant="mixed" className="px-4 py-4">
              <dt className="text-sm text-muted-foreground">{fact.label}</dt>
              <dd className="mt-1.5 flex items-center gap-2 font-medium text-foreground">
                {fact.value}
                {fact.tbc ? <Tbc /> : null}
              </dd>
            </Card>
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
    // Layout from Tailark's `logo-cloud/one` (MIT, github.com/tailark/blocks): a plain
    // muted lead-in with the marks set in a single flex row underneath.
    <div>
      <p className="font-medium text-muted-foreground">{title}</p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-8">
        {items.map((partner) => (
          <li key={partner.name} className="flex h-12 items-center">
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={240}
                height={80}
                className="max-h-10 w-auto max-w-40 object-contain"
              />
            ) : (
              // No logo file yet — a typographic lockup reads as intentional, not broken.
              <span className="max-w-56 leading-tight font-medium text-foreground">
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
    <section className="border-y border-border bg-background py-14 md:py-16">
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

          {/*
            Stats grid from Tailark's `stats/four` (MIT, github.com/tailark/blocks):
            unboxed figures in `text-primary`, labels in `text-muted-foreground`.
          */}
          <dl className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {about.specimens.map((item) => (
              <div key={item.ref}>
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="flex items-center gap-2 font-display text-4xl font-bold text-primary">
                    {item.value}
                    {"tbc" in item && item.tbc ? <Tbc /> : null}
                  </span>
                  <span className="mt-1 block leading-snug text-muted-foreground">
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

/**
 * Strands.
 *
 * Card grid from Tailark's `features/eight` block (MIT, github.com/tailark/blocks), with
 * the numbered lead-in kept so the four strands read as a set rather than four tiles.
 */
export function SummitStrands({ strands }: { strands: Summit["strands"] }) {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="shell">
        <SectionHead heading={strands.heading} intro={strands.intro} />

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {strands.items.map((item, i) => (
            <Reveal as="li" key={item.ref} delay={Math.min(i, 3) * 0.06} className="h-full">
              <Card variant="default" className="h-full p-8 md:p-10">
                <span className="font-display text-4xl font-bold text-primary tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.body}</p>
              </Card>
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

        {/*
          Divided rows from Tailark's `content/two` block (MIT, github.com/tailark/blocks):
          each day is a `sm:grid-cols-5` split with the schedule set off by a left rule,
          and the days separated by `sm:divide-y` rather than boxed into three columns.
        */}
        <div className="mt-12 space-y-10 sm:space-y-0 sm:divide-y sm:divide-border">
          {timeline.days.map((day, i) => (
            <Reveal key={day.ref} delay={Math.min(i, 2) * 0.08}>
              <article className="grid sm:grid-cols-5 sm:py-10 sm:first:pt-0">
                <div className="sm:col-span-2">
                  <p className="font-medium text-primary">{day.date}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
                    {day.title}
                  </h3>
                </div>

                <ol className="mt-6 sm:col-span-3 sm:mt-0 sm:border-l sm:border-border sm:pl-12">
                  {day.blocks.map((block) => (
                    <li
                      key={block.time + block.title}
                      className="flex gap-5 border-b border-border py-3 first:pt-0 last:border-0 last:pb-0"
                    >
                      <span className="w-14 shrink-0 pt-0.5 text-sm text-muted-foreground tabular-nums">
                        {block.time}
                      </span>
                      <span className="flex flex-1 flex-wrap items-center gap-2 text-foreground">
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
    <section className="relative overflow-hidden bg-muted/50 py-20 md:py-28">
      <div className="shell relative">
        <SectionHead heading={speakers.heading} />

        <ul className="mt-12 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.items.map((speaker, i) => (
            <Reveal as="li" key={speaker.ref} delay={Math.min(i, 7) * 0.03}>
              <article className="grid grid-cols-[auto_1fr] items-center gap-3 border-b border-border pb-5">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-transparent bg-background shadow ring-1 ring-foreground/10">
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center text-xs text-muted-foreground">
                      {speaker.ref.replace("SPK-", "")}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 font-medium text-foreground">
                    {speaker.name}
                    {speaker.tbc ? <Tbc /> : null}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
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

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {startups.items.map((company, i) => (
            <Reveal as="li" key={company.ref} delay={Math.min(i, 5) * 0.05} className="h-full">
              <Card variant="soft" className="flex h-full flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {company.name}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                  {company.blurb}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2 border-t border-foreground/10 pt-4">
                  <li className="rounded-full border border-foreground/10 px-3 py-1 text-sm text-muted-foreground">
                    {company.sector}
                  </li>
                  <li className="rounded-full border border-foreground/10 px-3 py-1 text-sm text-muted-foreground">
                    {company.country}
                  </li>
                </ul>
              </Card>
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
    <section className={cn("py-10", tone === "terracotta" ? "bg-terracotta" : "bg-mangrove")}>
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
