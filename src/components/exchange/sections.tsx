import {
  Globe2,
  Handshake,
  Landmark,
  MessagesSquare,
  Quote,
  Rocket,
  Sparkles,
  Sprout,
} from "lucide-react";
import Image from "next/image";

import { MediaPlaceholder } from "@/components/exchange/media-placeholder";
import { VoicesVideo } from "@/components/exchange/voices-video";
import { SectionHead } from "@/components/summit/primitives";
import { Reveal } from "@/components/ui/reveal";
import type { ExchangeMedia, exchange } from "@/lib/exchange-content";

type Exchange = typeof exchange;

const icons = {
  customers: Handshake,
  markets: Globe2,
  fundraising: Landmark,
  impact: Sprout,
  roundtables: MessagesSquare,
  sprints: Rocket,
  networking: Sparkles,
} as const;

/** An icon in a soft teal tile, the same on every card. */
function IconTile({ name }: { name: keyof typeof icons }) {
  const Icon = icons[name];
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-exchange-mist text-exchange">
      <Icon className="size-6" aria-hidden />
    </span>
  );
}

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

/* ── Who it is for: the stage of the journey ─────────────────────────────── */

export function ExchangeJourney({ journey }: { journey: Exchange["journey"] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="shell">
        <SectionHead heading={journey.heading} />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {journey.body}
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {journey.challenges.map((challenge, i) => (
            <Reveal as="li" key={challenge.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-background p-6">
                <IconTile name={challenge.icon} />
                <p className="font-display text-lg leading-snug font-bold text-foreground">
                  {challenge.title}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── How it works: the space and its formats ────────────────────────────────── */

export function ExchangeHow({
  how,
  groundRules,
}: {
  how: Exchange["how"];
  groundRules: Exchange["groundRules"];
}) {
  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead heading={how.heading} />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{how.body}</p>

          <ul className="mt-8 space-y-4">
            {how.formats.map((format, i) => (
              <Reveal as="li" key={format.title} delay={i * 0.08}>
                <div className="flex gap-4 rounded-2xl border border-border bg-background p-5">
                  <IconTile name={format.icon} />
                  <div>
                    <p className="font-display text-lg font-bold text-foreground">{format.title}</p>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{format.line}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

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

        <Reveal className="lg:sticky lg:top-28">
          <Photo media={how.photo} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] w-full" />
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
          Rebecca's words, with her photo beside them once `showPhoto` is on. Without the
          photo the quote takes the card's full width.
        */}
        <Reveal>
          <figure
            className={`mt-12 grid gap-8 rounded-3xl border border-border p-8 md:p-12 ${
              quote.showPhoto ? "md:grid-cols-[auto_1fr] md:items-center" : ""
            }`}
          >
            {quote.showPhoto ? (
              <Photo media={quote.photo} sizes="176px" className="size-36 md:size-44" />
            ) : null}
            <div>
              <Quote className="size-8 text-exchange-sun" aria-hidden />
              {quote.text ? (
                <blockquote className="mt-3 max-w-4xl font-display text-[clamp(1.125rem,1.9vw,1.4rem)] leading-relaxed font-semibold text-pretty text-foreground">
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
