import { existsSync } from "node:fs";
import path from "node:path";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { SummitCountdown } from "@/components/summit/countdown";
import { AgendaDayNav } from "@/components/summit/day-nav";
import { SectionHead, Tbc } from "@/components/summit/primitives";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import type {
  AgendaDay,
  AgendaSession,
  AgendaSpeaker,
  AgendaWindow,
  summit,
} from "@/lib/summit-content";
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
          <SummitCountdown
            startsAt={hero.startsAt}
            days={hero.days}
            className="mb-6 animate-rise"
          />
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
      {/*
        One line from 1280px up: the logos are allowed to scale down a little to fit, rather
        than one dropping onto a row of its own. Below that they wrap, since a single line
        would shrink them past legibility.
      */}
      <ul className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-8 xl:flex-nowrap xl:gap-x-7">
        {items.map((partner) => (
          <li key={partner.name} className="flex h-14 max-w-44 min-w-0 items-center">
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={240}
                height={80}
                // Squarer lockups (the Irish Aid crest-and-text block) need the extra
                // height to stay legible; wide wordmarks are capped by max-w instead.
                className="max-h-12 w-auto max-w-full object-contain"
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
      <div className="shell grid gap-12 md:grid-cols-[auto_1fr] md:gap-20 xl:gap-12">
        <PartnerRow title="Organised by" items={partners.organisedBy} />
        <PartnerRow title="Supported by" items={partners.supportedBy} />
      </div>
      {/*
        Community partners on a line of their own, under a rule: a thank-you for the
        networks that bring people into the room, set apart from the funding partners.
      */}
      <div className="shell mt-10">
        <div className="border-t border-border pt-8">
          <PartnerRow title="With thanks to our community partners" items={partners.community} />
        </div>
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
/** "Ms Goh Hanyan" -> "goh-hanyan". Honorifics are dropped so the file name is just the name. */
function speakerSlug(name: string) {
  return name
    .replace(/^(Ms|Mr|Mrs|Dr|Prof)\.?\s+/i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * A speaker's headshot, if one has been added.
 *
 * Looked up on disk at build time, so adding a photo is a matter of dropping the file into
 * public/images/speakers/ under the speaker's name and redeploying. No content change.
 */
function speakerPhoto(name: string) {
  const slug = speakerSlug(name);
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    const rel = `/images/speakers/${slug}.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

function initials(name: string) {
  return name
    .replace(/^(Ms|Mr|Mrs|Dr|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Headshot in a rounded square, then name, designation and organisation. */
function SpeakerCard({ speaker }: { speaker: AgendaSpeaker }) {
  const photo = speakerPhoto(speaker.name);
  return (
    <li className="flex items-start gap-3 rounded-lg border border-border bg-background p-2.5 pr-4">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
        {photo ? (
          <Image src={photo} alt="" fill sizes="56px" className="object-cover" />
        ) : (
          // No headshot yet: initials in the same square, so the row holds its shape.
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center font-display text-base font-bold text-purple"
          >
            {initials(speaker.name)}
          </span>
        )}
      </div>
      <div className="min-w-0 text-sm leading-snug">
        {speaker.label ? (
          <p className="text-xs font-semibold tracking-[0.06em] text-primary uppercase">
            {speaker.label}
          </p>
        ) : null}
        <p className="font-semibold text-foreground">
          {speaker.linkedin ? (
            // Opens alongside the page, like every other outbound link on it. The small
            // arrow is the cue that the name is a link, without dressing the card in blue.
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${speaker.name} on LinkedIn`}
              className="inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-purple hover:underline"
            >
              {speaker.name}
              <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
            </a>
          ) : (
            speaker.name
          )}
        </p>
        {speaker.role ? <p className="text-muted-foreground">{speaker.role}</p> : null}
        {speaker.org ? <p className="text-muted-foreground">{speaker.org}</p> : null}
      </div>
    </li>
  );
}

/**
 * Title, then who is leading it in a lighter weight on the same line, then an optional
 * short description and the speakers as cards.
 *
 * `narrow` is for the side-by-side columns, where the cards stack one per line.
 */
function SessionLine({
  session,
  className,
  narrow = false,
}: {
  session: AgendaSession;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div className={className}>
      <p className={session.quiet ? "text-muted-foreground italic" : "font-semibold text-foreground"}>
        {session.title}
        {session.by ? (
          <span className="font-normal text-muted-foreground not-italic"> {session.by}</span>
        ) : null}
        {session.tbc ? <Tbc className="ml-2 align-middle" /> : null}
      </p>
      {session.blurb ? (
        <p className="mt-1.5 max-w-3xl leading-relaxed text-muted-foreground">{session.blurb}</p>
      ) : null}
      {session.speakers?.length ? (
        <ul
          className={cn(
            "mt-3 grid gap-2.5",
            // A lone speaker gets one wide card, so a long designation is not squeezed
            // into a third of the row.
            !narrow && session.speakers.length > 1 && "sm:grid-cols-2 xl:grid-cols-3",
            !narrow && session.speakers.length === 1 && "max-w-xl",
          )}
        >
          {session.speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </ul>
      ) : null}
      {session.list ? (
        <div className="mt-4 max-w-3xl">
          <p className="text-sm font-bold tracking-[0.08em] text-primary uppercase">
            {session.list.heading}
          </p>
          <ul className="mt-2 space-y-2.5">
            {session.list.items.map((item) => (
              <li key={item.name} className="flex gap-3 leading-relaxed text-muted-foreground">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-orange" />
                <span>
                  <strong className="font-semibold text-foreground">{item.name}</strong> {item.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {session.note || session.cta ? (
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          {session.cta ? (
            <ButtonLink href={session.cta.href} {...linkProps(session.cta.href).props}>
              {session.cta.label}
              <ArrowUpRight className="size-4" aria-hidden />
            </ButtonLink>
          ) : null}
          {session.note ? <p className="text-sm text-muted-foreground">{session.note}</p> : null}
        </div>
      ) : null}
      {/*
        Shown whole at its own proportions, never cropped: these graphics carry names and
        logos in the artwork itself, and a crop would cut them off.
      */}
      {session.image ? (
        <Image
          src={session.image.src}
          alt={session.image.alt}
          width={session.image.width}
          height={session.image.height}
          sizes="(min-width: 1024px) 48rem, 100vw"
          className="mt-4 h-auto w-full max-w-3xl rounded-lg border border-border"
        />
      ) : null}
    </div>
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
                    <SessionLine session={session} className="mt-0.5" narrow />
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
 * A person on the Grand Final card: headshot, name linked to LinkedIn, designation.
 * Lighter than SpeakerCard, since it sits on ClimateLaunchpad's lime rather than the page.
 */
function LaunchpadPerson({ person, size = "md" }: { person: AgendaSpeaker; size?: "sm" | "md" }) {
  const photo = speakerPhoto(person.name);
  return (
    <li className="flex items-center gap-3">
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-md bg-white/60",
          size === "md" ? "size-12" : "size-10",
        )}
      >
        {photo ? (
          <Image src={photo} alt="" fill sizes="48px" className="object-cover" />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center font-display text-sm font-bold"
          >
            {initials(person.name)}
          </span>
        )}
      </div>
      <div className="min-w-0 text-sm leading-snug">
        <p className="font-semibold">
          {person.linkedin ? (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on LinkedIn`}
              className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
            >
              {person.name}
              <ArrowUpRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
            </a>
          ) : (
            person.name
          )}
        </p>
        {person.role || person.org ? (
          <p className="opacity-75">{[person.role, person.org].filter(Boolean).join(", ")}</p>
        ) : null}
      </div>
    </li>
  );
}

/**
 * The Grand Final, as a shout-out in ClimateLaunchpad's own colours.
 *
 * It is the one session on the page that belongs to a partner's brand, so it wears theirs:
 * lime with forest-green text and their logo. The finalists get the most room, each with
 * their flag, team and LinkedIn, in the order of the regions they represent.
 */
function GrandFinal({ feature }: { feature: NonNullable<AgendaDay["feature"]> }) {
  return (
    <div className="mt-4 rounded-(--radius) bg-launchpad p-5 text-launchpad-ink md:p-8">
      <div className="flex flex-col-reverse gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
        <div>
          <p className="text-sm font-semibold tabular-nums">{feature.time}</p>
          <p className="mt-1 font-display text-2xl font-bold md:text-3xl">{feature.title}</p>
          <p className="mt-2 max-w-2xl leading-relaxed opacity-85">{feature.sub}</p>
        </div>
        <Image
          src={feature.logo}
          alt="ClimateLaunchpad"
          width={450}
          height={200}
          className="h-14 w-auto shrink-0 self-start md:h-20"
        />
      </div>

      <p className="mt-8 text-sm font-bold tracking-[0.08em] uppercase">Moderated by</p>
      <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {feature.moderators.map((person) => (
          <LaunchpadPerson key={person.name} person={person} />
        ))}
      </ul>

      {feature.team?.length ? (
        <>
          <p className="mt-8 text-sm font-bold tracking-[0.08em] uppercase">
            With the ClimateLaunchpad team
          </p>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {feature.team.map((person) => (
              <LaunchpadPerson key={person.name} person={person} />
            ))}
          </ul>
        </>
      ) : null}

      <p className="mt-8 text-sm font-bold tracking-[0.08em] uppercase">The finalists</p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {feature.finalists.map((team) => (
          <li key={team.venture} className="rounded-lg bg-white/55 p-4">
            <div className="flex items-center gap-2 text-sm">
              <Image
                src={`/images/flags/${team.flag}.svg`}
                alt=""
                width={24}
                height={16}
                className="h-4 w-6 shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgb(29_73_56/0.15)]"
              />
              <span className="font-semibold">{team.country}</span>
              <span className="opacity-60">· {team.region}</span>
            </div>
            <p className="mt-2.5 font-display text-lg font-bold">{team.venture}</p>
            <ul className="mt-3 space-y-2.5">
              {team.people.map((person) => (
                <LaunchpadPerson key={person.name} person={person} size="sm" />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Anchor for a day card, shared by the day bar and the speaker wall. */
function dayId(i: number) {
  return `day-${i + 1}`;
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

        {/*
          A direct child of the shell, so it stays stuck for the whole height of the agenda
          rather than only the height of a wrapper.
        */}
        <AgendaDayNav
          className="mt-10"
          days={agenda.days.map((day, i) => ({
            id: dayId(i),
            title: day.title,
            date: day.date.replace(/^\w+\s/, ""),
            accent: day.accent,
          }))}
        />

        <div className="mt-6 space-y-4">
          {agenda.days.map((day, i) => {
            const accent = zoneAccent[day.accent];
            return (
              // Lands below the site header and the day bar when jumped to.
              <div key={day.ref} id={dayId(i)} className="scroll-mt-40">
                <Reveal delay={Math.min(i, 2) * 0.13}>
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

                      {day.feature ? <GrandFinal feature={day.feature} /> : null}
                    </div>
                  </Card>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Speakers ───────────────────────────────────────────────────────────────── */

type WallSpeaker = AgendaSpeaker & { day: string; dayIndex: number; accent: AgendaDay["accent"] };

/**
 * Everyone named in the agenda, once each, in the order they appear across the three days.
 * The Guest of Honour leads. The Grand Final's moderators and ClimateLaunchpad team are
 * included; the finalists are not, since they have the Grand Final card to themselves.
 *
 * Built from the agenda rather than kept as a second list, so a speaker added to a session
 * shows up here too and the two can never disagree.
 */
function collectSpeakers(days: readonly AgendaDay[]) {
  const seen = new Map<string, WallSpeaker>();
  days.forEach((day, dayIndex) => {
    const sessions = [
      ...day.sessions,
      ...(day.window?.lanes.flatMap((lane) => lane.sessions) ?? []),
      ...(day.after ?? []),
    ];
    const people = [
      ...sessions.flatMap((session) => session.speakers ?? []),
      ...(day.feature?.moderators ?? []),
      ...(day.feature?.team ?? []),
    ];
    for (const person of people) {
      // Labels like "Moderator" belong to a session, not the person.
      const { label, ...rest } = person;
      if (!seen.has(person.name)) {
        seen.set(person.name, {
          ...rest,
          ...(label === "Guest of Honour" ? { label } : {}),
          day: day.title,
          dayIndex,
          accent: day.accent,
        });
      }
    }
  });
  const all = [...seen.values()];
  return [...all.filter((p) => p.label), ...all.filter((p) => !p.label)];
}

const dayText = {
  purple: "text-purple",
  teal: "text-teal-deep",
  orange: "text-orange-deep",
} as const;

/**
 * Who you'll meet: every named speaker as a face, ahead of the agenda.
 *
 * In the agenda each person sits inside their session, which is right for planning a day
 * but hides how many people are coming. Here they are all in one place, each tagged with
 * the day they speak and linked to it.
 */
export function SummitSpeakers({
  speakers,
  days,
}: {
  speakers: Summit["speakers"];
  days: readonly AgendaDay[];
}) {
  const people = collectSpeakers(days);
  return (
    <section id="speakers" className="scroll-mt-24 py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={speakers.heading} intro={speakers.intro} />

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {people.map((person, i) => {
            const photo = speakerPhoto(person.name);
            return (
              <Reveal as="li" key={person.name} delay={Math.min(i % 6, 5) * 0.06} distance={16}>
                <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  {photo ? (
                    <Image
                      src={photo}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 12rem, (min-width: 640px) 30vw, 45vw"
                      className="object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute inset-0 grid place-items-center font-display text-3xl font-bold text-purple"
                    >
                      {initials(person.name)}
                    </span>
                  )}
                </div>
                <div className="mt-3 text-sm leading-snug">
                  {person.label ? (
                    <p className="text-xs font-semibold tracking-[0.06em] text-primary uppercase">
                      {person.label}
                    </p>
                  ) : null}
                  <p className="font-semibold text-foreground">
                    {person.linkedin ? (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${person.name} on LinkedIn`}
                        className="inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-purple hover:underline"
                      >
                        {person.name}
                        <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                      </a>
                    ) : (
                      person.name
                    )}
                  </p>
                  {person.role ? <p className="mt-0.5 text-muted-foreground">{person.role}</p> : null}
                  {person.org ? <p className="text-muted-foreground">{person.org}</p> : null}
                  <a
                    href={`#${dayId(person.dayIndex)}`}
                    className={cn(
                      "mt-1.5 inline-block text-xs font-semibold underline-offset-4 hover:underline",
                      dayText[person.accent],
                    )}
                  >
                    {person.day}
                  </a>
                </div>
              </Reveal>
            );
          })}
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
