import { Compass, MessagesSquare, Quote, Users } from "lucide-react";
import Image from "next/image";

import { MediaPlaceholder } from "@/components/exchange/media-placeholder";
import { VoicesVideo } from "@/components/exchange/voices-video";
import { SectionHead } from "@/components/summit/primitives";
import { Reveal } from "@/components/ui/reveal";
import type { ExchangeMedia, exchange } from "@/lib/exchange-content";

type Exchange = typeof exchange;

const factIcons = { users: Users, conversation: MessagesSquare, compass: Compass } as const;

/** A photo if it has arrived, otherwise a labelled placeholder in the same frame. */
function Photo({ media, sizes, className }: { media: ExchangeMedia; sizes: string; className: string }) {
  if (!media.src) {
    return <MediaPlaceholder kind="photo" label={media.placeholder} className={className} />;
  }
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/* ── Opening band ───────────────────────────────────────────────────────────── */

/** Solid Exchange teal, deep ink text. */
export function ExchangeHero({ hero }: { hero: Exchange["hero"] }) {
  const { video } = hero;
  return (
    <header className="bg-exchange text-exchange-ink">
      <div className="shell grid items-center gap-12 py-16 md:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="display animate-rise text-[clamp(2.5rem,6vw,4.25rem)]">{hero.name}</h1>
          <p
            className="mt-2 animate-rise text-sm font-semibold tracking-[0.08em] uppercase opacity-80"
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
            className="mt-4 max-w-xl animate-rise text-lg leading-relaxed"
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
            label={video.label}
            placeholder={video.placeholder}
            playLabel={video.playLabel}
          />
          {video.src ? (
            <figcaption className="mt-3 text-sm opacity-85">{video.caption}</figcaption>
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
          {what.facts.map((fact, i) => {
            const Icon = factIcons[fact.icon];
            return (
              <Reveal as="li" key={fact.title} delay={i * 0.1} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-background p-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-exchange-mist text-exchange">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <p className="mt-5 font-display text-xl font-bold text-foreground">{fact.title}</p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{fact.line}</p>
                </div>
              </Reveal>
            );
          })}
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
    <section className="border-t border-border py-16 md:py-20">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead heading={who.heading} />
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            {who.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Shown only once it is agreed the room's rules belong in public. */}
          {groundRules.show ? (
            <div className="mt-8 rounded-2xl border border-border p-6">
              <p className="font-display text-lg font-bold text-foreground">{groundRules.heading}</p>
              <ul className="mt-4 space-y-3">
                {groundRules.rules.map((rule) => (
                  <li key={rule} className="flex gap-3 leading-relaxed text-muted-foreground">
                    <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-exchange" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <Reveal>
          <Photo media={who.photo} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] w-full" />
        </Reveal>
      </div>
    </section>
  );
}

/* ── Why we are doing it ────────────────────────────────────────────────────── */

export function ExchangeWhy({ why }: { why: Exchange["why"] }) {
  const { quote } = why;
  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={why.heading} />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{why.lead}</p>

        {/*
          Rebecca's words and photo. Until she has written them, each half of the card says
          what belongs there, so a draft never reads as her voice.
        */}
        <Reveal>
          <figure className="mt-12 grid gap-8 rounded-3xl border border-border p-8 md:grid-cols-[auto_1fr] md:items-center md:p-12">
            <Photo media={quote.photo} sizes="176px" className="size-36 md:size-44" />
            <div>
              <Quote className="size-8 text-exchange-sun" aria-hidden />
              {quote.text ? (
                <blockquote className="mt-3 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug font-semibold text-foreground">
                  {quote.text}
                </blockquote>
              ) : (
                <p className="mt-3 rounded-xl border-2 border-dashed border-exchange/45 bg-exchange-mist px-5 py-4 text-exchange-ink">
                  {quote.placeholder}
                </p>
              )}
              <figcaption className="mt-6 text-muted-foreground">
                <span className="font-semibold text-foreground">{quote.name}</span>
                {quote.title ? `, ${quote.title}` : null}
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Closing ────────────────────────────────────────────────────────────────── */

/** A warm sign-off on the teal, with no button. */
export function ExchangeClosing({ closing }: { closing: Exchange["closing"] }) {
  const [first, ...rest] = closing.lines;
  return (
    <section className="bg-exchange text-exchange-ink">
      <div className="shell py-16 text-center md:py-20">
        <p className="mx-auto max-w-2xl font-display text-[clamp(1.25rem,2.6vw,1.75rem)] leading-snug font-bold">
          {first}
        </p>
        {rest.map((line) => (
          <p key={line} className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
