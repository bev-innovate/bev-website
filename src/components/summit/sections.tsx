import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { SectionHead, Tbc } from "@/components/summit/primitives";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import type { AgendaSession, AgendaWindow, summit } from "@/lib/summit-content";
import { cn } from "@/lib/utils";

type Summit = typeof summit;

/**
 * Registration lives on an external form, so its buttons open in a new tab with the
 * outward arrow. Someone halfway down the agenda keeps their place on the page, and the
 * arrow tells them before they click that they are leaving it.
 */
function linkProps(href: string) {
  const external = /^https?:\/\//.test(href);
  return {
    external,
    props: external ? { target: "_blank", rel: "noopener noreferrer" } : {},
  };
}

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
            <ButtonLink href={hero.primary.href} size="lg" {...linkProps(hero.primary.href).props}>
              {hero.primary.label}
              {linkProps(hero.primary.href).external ? (
                <ArrowUpRight className="size-4" aria-hidden />
              ) : (
                <ArrowRight className="size-4" aria-hidden />
              )}
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
              // No logo file yet, so a typographic lockup reads as intentional, not broken.
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
 * the day-two agenda, so the agenda does not have to re-explain what Solve-It Zone is.
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
                    A photograph of that zone at the last summit, so the Solve-It Zone is a room
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

/** Title, then who is leading it in a lighter weight on the same line. */
function SessionLine({ session, className }: { session: AgendaSession; className?: string }) {
  return (
    <p
      className={cn(
        session.quiet ? "text-muted-foreground italic" : "font-semibold text-foreground",
        className,
      )}
    >
      {session.title}
      {session.by ? (
        <span className="font-normal text-muted-foreground not-italic"> {session.by}</span>
      ) : null}
      {session.tbc ? <Tbc className="ml-2 align-middle" /> : null}
    </p>
  );
}

/** One row of the day: time on the left, the session beside it. */
function SessionRow({ session }: { session: AgendaSession }) {
  return (
    <li className="grid gap-1 border-b border-border py-3.5 last:border-0 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
      <span className="text-sm text-muted-foreground tabular-nums sm:pt-0.5">{session.time}</span>
      <SessionLine session={session} />
    </li>
  );
}

/**
 * The stretch of a day where two things run at once.
 *
 * Only this window splits into columns; the rest of the day stays a single list. The overlap
 * is then visible exactly where it happens, and nowhere else. On a phone the columns stack
 * inside the same box, so the grouping still reads as concurrent.
 */
function AgendaSplit({ split }: { split: AgendaWindow }) {
  return (
    <div className="my-4 overflow-hidden rounded-(--radius) border border-border">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-muted px-5 py-3">
        <p className="font-semibold text-foreground">
          <span className="tabular-nums">{split.time}</span> · {split.heading}
        </p>
        <p className="text-sm text-muted-foreground">{split.aside}</p>
      </div>

      <div className="grid md:grid-cols-[1.35fr_1fr]">
        {split.lanes.map((lane, i) => {
          const accent = zoneAccent[lane.accent];
          return (
            <div
              key={lane.name}
              className={cn(
                "px-5 pt-4 pb-3",
                // The second lane is the one running alongside: a faint wash of its own
                // colour, and a rule where it meets the first.
                i > 0 && "border-t border-border bg-orange/[0.04] md:border-t-0 md:border-l",
              )}
            >
              <p className={cn("text-sm font-bold tracking-[0.08em] uppercase", accent.text)}>
                {lane.name}
              </p>
              {lane.hint ? (
                <p className="mt-0.5 text-sm text-muted-foreground">{lane.hint}</p>
              ) : null}
              <ol className="mt-2">
                {lane.sessions.map((session) => (
                  <li
                    key={session.time + session.title}
                    className="border-b border-border py-2.5 last:border-0"
                  >
                    <span className="block text-sm text-muted-foreground tabular-nums">
                      {session.time}
                    </span>
                    <SessionLine session={session} className="mt-0.5" />
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * The three days.
 *
 * Days are stacked rather than tabbed. Tabs would shorten the page, but they hide two
 * days behind a click, and someone deciding whether to travel wants to see the whole
 * thing at once. It also prints, and event pages get printed.
 *
 * Each day leads with its access level, because only the middle day is open to everyone.
 */
export function SummitAgenda({ agenda }: { agenda: Summit["agenda"] }) {
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

                  <div className="px-6 pt-4 pb-6 md:px-8 md:pb-8">
                    {day.note ? <p className="pt-2 pb-2 text-muted-foreground">{day.note}</p> : null}

                    <ol>
                      {day.sessions.map((session) => (
                        <SessionRow key={session.time + session.title} session={session} />
                      ))}
                    </ol>

                    {day.window ? <AgendaSplit split={day.window} /> : null}

                    {day.after ? (
                      <ol>
                        {day.after.map((session) => (
                          <SessionRow key={session.time + session.title} session={session} />
                        ))}
                      </ol>
                    ) : null}

                    {/*
                      The day's headline moment, set as a filled row so it cannot be missed.
                      The time column is narrower by the row's own padding, so the title
                      lines up with every other session title above it.
                    */}
                    {day.feature ? (
                      <div className="mt-4 grid gap-1 rounded-(--radius) bg-purple px-5 py-5 text-white sm:grid-cols-[calc(9.5rem-1.25rem)_1fr] sm:gap-6">
                        <span className="text-sm text-white/75 tabular-nums sm:pt-1">
                          {day.feature.time}
                        </span>
                        <div>
                          <p className="font-display text-xl font-bold md:text-2xl">
                            {day.feature.title}
                          </p>
                          <p className="mt-1 text-white/85">{day.feature.sub}</p>
                        </div>
                      </div>
                    ) : null}
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

/* ── Register ──────────────────────────────────────────────────────────────── */

/**
 * The closing call to action. Registration is on an external form, so this is a band
 * with one button rather than a form of its own.
 */
export function SummitRegister({ register }: { register: Summit["register"] }) {
  const link = linkProps(register.cta.href);
  return (
    <section
      id="register"
      className="relative scroll-mt-24 overflow-hidden bg-mangrove py-16 text-white md:py-20"
    >
      <div aria-hidden className="contours pointer-events-none absolute inset-0 text-white opacity-20" />
      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="display text-[clamp(1.75rem,3.6vw,2.6rem)]">{register.heading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">{register.body}</p>
          <ButtonLink href={register.cta.href} size="lg" className="mt-9" {...link.props}>
            {register.cta.label}
            {link.external ? (
              <ArrowUpRight className="size-4" aria-hidden />
            ) : (
              <ArrowRight className="size-4" aria-hidden />
            )}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
