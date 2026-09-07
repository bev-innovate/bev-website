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
    <>
      {/*
        The same banner every other page uses: the key visual sits behind a wash rather
        than full bleed above the copy. The mangrove-to-teal gradient marks the summit as
        its own thing without leaving the palette.

        The standing facts sit inside the banner, under the buttons. Dates, place and scale
        are what someone is looking for the moment they land, and below the fold they were
        arriving after the decision had already been made.
      */}
      <header id="summit-hero" className="relative isolate overflow-hidden bg-mangrove text-white">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={hero.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-left lg:object-center"
          />
          {/*
            Weighted to the left, where the copy sits, and thinning out to nothing on the
            right so the mangroves are actually visible. An even wash at the old strength
            covered the photograph completely, which made it decoration nobody could see.
          */}
          <div className="absolute inset-0 bg-mangrove/60 md:bg-mangrove/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-mangrove-deep/95 via-mangrove/70 to-mangrove/45 md:to-transparent" />
        </div>

        <div className="shell relative py-16 md:py-20">
          <h1 className="display max-w-4xl animate-rise text-[clamp(2.25rem,5.5vw,3.75rem)]">
            {name}
          </h1>
          <p
            className="mt-4 max-w-3xl animate-rise font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold text-white/90"
            style={{ animationDelay: "0.1s" }}
          >
            {hero.headline}
          </p>
          <p
            className="mt-6 max-w-3xl animate-rise text-lg leading-relaxed text-pretty text-white/85"
            style={{ animationDelay: "0.22s" }}
          >
            {hero.standfirst}
          </p>

          <div
            className="mt-9 flex animate-rise flex-wrap gap-4"
            style={{ animationDelay: "0.34s" }}
          >
            <ButtonLink href={hero.primary.href} size="lg">
              {hero.primary.label}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} size="lg" variant="white">
              {hero.secondary.label}
            </ButtonLink>
          </div>

          {/*
            Glass tiles rather than the page's cards: on a photograph an opaque panel
            punches a hole through the image, where a translucent one lets the mangroves
            carry on behind it. The border does the separating.
          */}
          <dl
            className="mt-12 grid animate-rise grid-cols-2 gap-3 sm:grid-cols-4"
            style={{ animationDelay: "0.46s" }}
          >
            {hero.facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-(--radius) border border-white/25 bg-white/10 px-5 py-4 backdrop-blur-sm"
              >
                <dt className="text-sm text-white/70">{fact.label}</dt>
                <dd className="mt-1.5 flex items-center gap-2 font-semibold text-white">
                  {fact.value}
                  {fact.tbc ? <Tbc className="border-white/40 text-white" /> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>
    </>
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

        {/*
          The photograph fills the height of the prose beside it rather than holding a
          fixed ratio: at this column width a 16:9 crop leaves a band of empty page under
          it, and the two columns stop reading as one row. 16:9 on narrow screens, where
          it sits above the text and has nothing to line up with.
        */}
        <Reveal delay={0.08} className="lg:h-full">
          <figure className="relative lg:h-full">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-canvas-sunk lg:aspect-auto lg:h-full lg:min-h-80">
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

/* ── Zones ──────────────────────────────────────────────────────────────────── */

/**
 * Each zone's identity colour. Established here and reused as the column headings in
 * the day-two agenda, so the agenda does not have to re-explain what Solve is.
 */
const zoneAccent = {
  purple: { text: "text-purple", dot: "bg-purple", band: "bg-purple" },
  orange: { text: "text-orange-deep", dot: "bg-orange", band: "bg-orange" },
  teal: { text: "text-teal-deep", dot: "bg-teal", band: "bg-teal" },
} as const;

/**
 * The three zones.
 *
 * Equal columns rather than a numbered sequence: the zones run at the same time, and
 * numbering them would imply an order to work through. The zone name carries its own
 * colour, which is the only label the day-two agenda columns then need.
 */
export function SummitZones({ zones }: { zones: Summit["zones"] }) {
  return (
    // Full-strength `muted` rather than a half wash: at 50% the purple reads as a
    // printing error rather than a colour, and the band stops separating the sections.
    <section className="bg-muted py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={zones.heading} intro={zones.intro} />

        <ul className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {zones.items.map((zone, i) => {
            const accent = zoneAccent[zone.accent];
            return (
              <Reveal as="li" key={zone.key} delay={Math.min(i, 2) * 0.13} className="h-full">
                <Card variant="default" className="flex h-full flex-col overflow-hidden">
                  {/*
                    A photograph of that zone at the last summit, so "Solve" is a room
                    someone has been in rather than a word. Purely decorative: the name
                    and purpose underneath carry the meaning.
                  */}
                  <div className="relative aspect-video w-full shrink-0">
                    <Image
                      src={zone.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <h3 className={cn("font-display text-2xl font-bold", accent.text)}>
                      {zone.name}
                    </h3>

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
                  </div>
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
    // The hero's secondary CTA lands here, so the anchor has to live on the section.
    <section id="agenda" className="scroll-mt-24 py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={agenda.heading} intro={agenda.intro} />

        <div className="mt-12 space-y-4">
          {agenda.days.map((day, i) => {
            const accent = zoneAccent[day.accent];
            return (
              <Reveal key={day.ref} delay={Math.min(i, 2) * 0.13}>
                <Card variant="default" className="overflow-hidden">
                  {/*
                    Day header as a solid colour band: the date sits on top, the day's
                    name beneath it, and the access level to the right, so who can be in
                    the room is read at the same moment as the day itself.
                  */}
                  <div
                    className={cn(
                      "flex flex-wrap items-end justify-between gap-x-6 gap-y-3 p-6 text-white md:p-8",
                      accent.band,
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium text-white/80">{day.date}</p>
                      <h3 className="mt-1 font-display text-2xl font-bold">{day.title}</h3>
                    </div>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
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
                            <li
                              key={key}
                              className="overflow-hidden rounded-(--radius) border border-border"
                            >
                              <p
                                className={cn(
                                  "px-5 py-3 font-display font-bold text-white",
                                  zoneStyle.band,
                                )}
                              >
                                {zone.name}
                              </p>
                              <p className="px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                                {zone.purpose}
                              </p>
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
                <h3 className="font-display text-xl font-bold text-foreground">
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
