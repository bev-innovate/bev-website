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
          <li key={partner.name} className="flex h-14 items-center">
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={240}
                height={80}
                // Squarer lockups (the Irish Aid crest-and-text block) need the extra
                // height to stay legible; wide wordmarks are capped by max-w instead.
                className="max-h-12 w-auto max-w-44 object-contain"
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
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="shell grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHead heading={about.heading} />
          <div className="mt-8 max-w-2xl space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
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

/* ── Who the summit is for ──────────────────────────────────────────────────── */

export function SummitAudience({ audience }: { audience: Summit["audience"] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={audience.heading} intro={audience.intro} />

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audience.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={Math.min(i, 3) * 0.13} className="h-full">
              <Card variant="soft" className="h-full p-6">
                <h3 className="font-display text-lg leading-snug font-semibold text-foreground">
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

/* ── Zones ──────────────────────────────────────────────────────────────────── */

/**
 * Each zone's identity colour. Established here and reused as the column headings in
 * the day-two agenda, so the agenda does not have to re-explain what Solve is.
 */
const zoneAccent = {
  purple: { rule: "bg-purple", text: "text-purple", dot: "bg-purple" },
  orange: { rule: "bg-orange", text: "text-orange-deep", dot: "bg-orange" },
  teal: { rule: "bg-teal", text: "text-teal-deep", dot: "bg-teal" },
} as const;

/**
 * The three zones.
 *
 * Equal columns rather than a numbered sequence: the zones run at the same time, and
 * numbering them would imply an order to work through. Each card leads with a colour
 * rule and the room, so the zone reads as a place you can stand in.
 */
export function SummitZones({ zones }: { zones: Summit["zones"] }) {
  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={zones.heading} intro={zones.intro} />

        <ul className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {zones.items.map((zone, i) => {
            const accent = zoneAccent[zone.accent];
            return (
              <Reveal as="li" key={zone.key} delay={Math.min(i, 2) * 0.13} className="h-full">
                <Card variant="default" className="flex h-full flex-col p-8">
                  <span className={cn("block h-1 w-12 rounded-full", accent.rule)} aria-hidden />

                  <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                    {zone.name}
                  </h3>
                  <p className={cn("mt-1 text-sm font-medium", accent.text)}>{zone.where}</p>

                  <p className="mt-4 leading-relaxed text-muted-foreground">{zone.purpose}</p>

                  <ul className="mt-6 space-y-3 border-t border-border pt-6">
                    {zone.activities.map((activity) => (
                      <li key={activity} className="flex gap-3 text-muted-foreground">
                        <span
                          aria-hidden
                          className={cn("mt-2 size-1.5 shrink-0 rounded-full", accent.dot)}
                        />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ── Agenda ─────────────────────────────────────────────────────────────────── */

/**
 * The three days.
 *
 * Days are stacked rather than tabbed. Tabs would shorten the page, but they hide two
 * days behind a click, and someone deciding whether to travel wants to see the whole
 * thing at once. It also prints, and event pages get printed.
 *
 * Each day leads with its access level, because only the middle day is open to everyone.
 */
export function SummitAgenda({
  agenda,
  zones,
}: {
  agenda: Summit["agenda"];
  zones: Summit["zones"];
}) {
  const zoneByKey = Object.fromEntries(zones.items.map((z) => [z.key, z]));

  return (
    <section className="py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={agenda.heading} />

        <div className="mt-12 space-y-4">
          {agenda.days.map((day, i) => {
            const accent = zoneAccent[day.accent];
            return (
              <Reveal key={day.ref} delay={Math.min(i, 2) * 0.13}>
                <Card variant="default" className="overflow-hidden">
                  {/* Day header: date, name, and who can be in the room. */}
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-border p-6 md:p-8">
                    <p className={cn("font-medium", accent.text)}>{day.date}</p>
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      {day.title}
                    </h3>
                    <span className="ml-auto rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                      {day.access}
                    </span>
                  </div>

                  <div className="p-6 md:p-8">
                    {day.note ? (
                      <p className="mb-6 text-muted-foreground">{day.note}</p>
                    ) : null}

                    {/*
                      Day two's three zones run concurrently, so they sit side by side.
                      An ordered list would imply a sequence that does not exist.
                    */}
                    {"zones" in day && day.zones ? (
                      <ul className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {day.zones.map((key) => {
                          const zone = zoneByKey[key];
                          if (!zone) return null;
                          const zoneStyle = zoneAccent[zone.accent];
                          return (
                            <li key={key} className="rounded-(--radius) bg-foreground/5 p-5">
                              <span
                                className={cn("block h-1 w-8 rounded-full", zoneStyle.rule)}
                                aria-hidden
                              />
                              <p className="mt-3 font-display font-semibold text-foreground">
                                {zone.name}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">{zone.where}</p>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}

                    <ol className="space-y-0">
                      {day.blocks.map((block) => (
                        <li
                          key={block.time + block.title}
                          className="grid gap-1 border-b border-border py-4 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[6rem_1fr] sm:gap-6"
                        >
                          <span className="text-sm text-muted-foreground tabular-nums">
                            {block.time}
                          </span>
                          <div>
                            <p className="flex flex-wrap items-center gap-2 font-medium text-foreground">
                              {block.title}
                              {"tbc" in block && block.tbc ? <Tbc /> : null}
                            </p>
                            {"body" in block && block.body ? (
                              <p className="mt-1 leading-relaxed text-muted-foreground">
                                {block.body}
                              </p>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Card>
              </Reveal>
            );
          })}
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
    <section className="relative overflow-hidden bg-muted/50 py-16 md:py-20">
      <div className="shell relative">
        <SectionHead heading={speakers.heading} />

        <ul className="mt-12 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.items.map((speaker, i) => (
            <Reveal as="li" key={speaker.ref} delay={Math.min(i, 7) * 0.07}>
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
    <section className="py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={startups.heading} />

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {startups.items.map((company, i) => (
            <Reveal as="li" key={company.ref} delay={Math.min(i, 5) * 0.11} className="h-full">
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
