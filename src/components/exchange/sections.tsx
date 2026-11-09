import Image from "next/image";

import { VoicesVideo } from "@/components/exchange/voices-video";
import { SectionHead } from "@/components/summit/primitives";
import { Reveal } from "@/components/ui/reveal";
import type { exchange } from "@/lib/exchange-content";

type Exchange = typeof exchange;

/**
 * The sunrise, as a background. Weighted so the pale yellow-green sits behind the words
 * on the left and the orange gathers towards the far corner, like light coming up.
 */
const sunrise =
  "bg-[radial-gradient(120%_120%_at_100%_100%,var(--color-sunrise-sun)_0%,var(--color-sunrise-gold)_38%,var(--color-sunrise-dawn)_78%)]";

/* ── Opening band ───────────────────────────────────────────────────────────── */

export function ExchangeHero({ hero }: { hero: Exchange["hero"] }) {
  const { video } = hero;
  return (
    <header className={`${sunrise} text-sunrise-ink`}>
      <div className="shell grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <h1 className="display animate-rise text-[clamp(2.5rem,6vw,4.25rem)]">{hero.name}</h1>
          <p
            className="mt-2 animate-rise text-sm font-semibold tracking-[0.08em] uppercase opacity-75"
            style={{ animationDelay: "0.08s" }}
          >
            {hero.lockup}
          </p>
          <p
            className="mt-8 animate-rise font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-tight font-bold"
            style={{ animationDelay: "0.16s" }}
          >
            {hero.strapline}
          </p>
          <p
            className="mt-4 max-w-xl animate-rise text-lg leading-relaxed opacity-90"
            style={{ animationDelay: "0.24s" }}
          >
            {hero.intro}
          </p>
        </div>

        <figure className="animate-rise" style={{ animationDelay: "0.32s" }}>
          <VoicesVideo
            src={video.src}
            captions={video.captions}
            poster={video.poster}
            posterAlt={video.posterAlt}
            playLabel={video.playLabel}
          />
          {/* The caption describes the film, so it waits for the film. */}
          {video.src ? (
            <figcaption className="mt-3 text-sm opacity-80">{video.caption}</figcaption>
          ) : null}
        </figure>
      </div>
    </header>
  );
}

/* ── What it is ─────────────────────────────────────────────────────────────── */

export function ExchangeWhat({ what }: { what: Exchange["what"] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={what.heading} />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{what.body}</p>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {what.facts.map((fact, i) => (
            <Reveal as="li" key={fact.title} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-background p-6">
                <span
                  aria-hidden
                  className={`block h-1.5 w-12 rounded-full ${sunrise}`}
                />
                <p className="mt-5 font-display text-xl font-bold text-foreground">{fact.title}</p>
                <p className="mt-2 leading-relaxed text-muted-foreground">{fact.line}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl leading-relaxed text-muted-foreground">{what.closing}</p>
      </div>
    </section>
  );
}

/* ── Who it is for ──────────────────────────────────────────────────────────── */

export function ExchangeWho({
  who,
  groundRules,
}: {
  who: Exchange["who"];
  groundRules: Exchange["groundRules"];
}) {
  return (
    <section className="bg-muted py-16 md:py-20">
      <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHead heading={who.heading} />
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            {who.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {/* Shown only once it is agreed the room's rules belong in public. */}
        {groundRules.show ? (
          <Reveal className="self-center">
            <div className="rounded-2xl border border-border bg-background p-7">
              <p className="font-display text-lg font-bold text-foreground">{groundRules.heading}</p>
              <ul className="mt-4 space-y-3">
                {groundRules.rules.map((rule) => (
                  <li key={rule} className="flex gap-3 leading-relaxed text-muted-foreground">
                    <span aria-hidden className={`mt-2.5 size-2 shrink-0 rounded-full ${sunrise}`} />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ── Why we are doing it ────────────────────────────────────────────────────── */

export function ExchangeWhy({ why }: { why: Exchange["why"] }) {
  const { quote } = why;
  return (
    <section className="py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={why.heading} />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{why.lead}</p>

        {/*
          Rebecca's words, once she has written and approved them. Until then the section
          stands on the lead-in alone, so a draft never reads as her voice.
        */}
        {quote.approved ? (
          <Reveal>
            <figure className="mt-12 grid gap-8 rounded-3xl border border-border bg-background p-8 md:grid-cols-[auto_1fr] md:items-center md:p-12">
              {quote.photo ? (
                <div className="relative size-28 overflow-hidden rounded-2xl md:size-36">
                  <Image src={quote.photo} alt="" fill sizes="144px" className="object-cover" />
                </div>
              ) : null}
              <div>
                <blockquote className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug font-semibold text-foreground">
                  {quote.text}
                </blockquote>
                <figcaption className="mt-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">{quote.name}</span>
                  {quote.title ? `, ${quote.title}` : null}
                </figcaption>
              </div>
            </figure>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ── Closing ────────────────────────────────────────────────────────────────── */

/**
 * The page ends without a button: invitations come from people, and the next step is
 * replying to them.
 */
export function ExchangeClosing({ closing }: { closing: Exchange["closing"] }) {
  const [first, ...rest] = closing.lines;
  return (
    <section className={`${sunrise} text-sunrise-ink`}>
      <div className="shell py-16 text-center md:py-20">
        <p className="mx-auto max-w-2xl font-display text-[clamp(1.25rem,2.6vw,1.75rem)] leading-snug font-bold">
          {first}
        </p>
        {rest.map((line) => (
          <p key={line} className="mx-auto mt-4 max-w-2xl leading-relaxed opacity-85">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
