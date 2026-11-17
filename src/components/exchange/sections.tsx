import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";

import { MediaPlaceholder } from "@/components/exchange/media-placeholder";
import { VoicesVideo } from "@/components/exchange/voices-video";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { ExchangeMedia, exchange } from "@/lib/exchange-content";
import { cn } from "@/lib/utils";

type Exchange = typeof exchange;

/** A photograph in a rounded frame, or a labelled placeholder in the same frame. */
function Photo({
  media,
  sizes,
  className,
  priority = false,
}: {
  media: ExchangeMedia;
  sizes: string;
  className: string;
  priority?: boolean;
}) {
  if (!media.src) {
    return <MediaPlaceholder kind="photo" label={media.placeholder} className={className} />;
  }
  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-exchange-mist", className)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
      />
    </div>
  );
}

/**
 * The section title: a small numeral over the question, set large. The same three
 * questions run down the page, so a reader always knows which one they are in.
 */
function SectionTitle({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="flex items-center gap-3 font-display text-lg font-extrabold text-exchange">
        {number}
        <span aria-hidden className="h-0.5 w-12 rounded-full bg-exchange-sun" />
      </p>
      <h2 className="display mt-4 text-[clamp(2.75rem,6.5vw,5.25rem)] text-foreground">{label}</h2>
    </div>
  );
}

/* ── Opening ────────────────────────────────────────────────────────────────── */

/**
 * White, with the Exchange mark, a large statement and the voices film beneath it. The
 * film is contained in the page's column rather than full bleed.
 */
export function ExchangeHero({ hero, mark }: { hero: Exchange["hero"]; mark: Exchange["mark"] }) {
  const { video } = hero;
  return (
    <header className="pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="shell">
        <div className="flex animate-rise items-center gap-3">
          <Image src={mark.src} alt="" width={56} height={56} priority className="size-12 md:size-14" />
          <span className="text-sm font-bold tracking-[0.14em] text-exchange uppercase">
            {hero.name}
          </span>
        </div>

        <h1
          className="display mt-8 max-w-5xl animate-rise text-[clamp(2.75rem,7.5vw,6rem)] text-foreground"
          style={{ animationDelay: "0.08s" }}
        >
          {hero.headline}
        </h1>
        <p
          className="mt-6 max-w-2xl animate-rise text-xl leading-relaxed text-muted-foreground"
          style={{ animationDelay: "0.16s" }}
        >
          {hero.lede}
        </p>

        <div className="mt-12 animate-rise md:mt-16" style={{ animationDelay: "0.24s" }}>
          <VoicesVideo
            src={video.src}
            captions={video.captions}
            poster={video.poster}
            label={video.label}
            placeholder={video.placeholder}
          />
        </div>
      </div>
    </header>
  );
}

/* ── 01 What is it? ─────────────────────────────────────────────────────────── */

export function ExchangeWhat({ what }: { what: Exchange["what"] }) {
  const [lead, ...rest] = what.photos;
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionTitle number={what.number} label={what.label} />
          <p className="text-[clamp(1.15rem,1.9vw,1.45rem)] leading-relaxed text-foreground lg:pt-12">
            {what.body}
          </p>
        </div>

        {/* One wide photograph and two beside it: full of people, never full screen. */}
        <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="md:col-span-2 md:row-span-2">
            <Photo
              media={lead}
              sizes="(min-width: 768px) 66vw, 100vw"
              className="aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[28rem]"
            />
          </Reveal>
          {rest.map((photo, i) => (
            <Reveal key={photo.src || photo.placeholder} delay={(i + 1) * 0.1}>
              <Photo media={photo} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 02 Why are we doing it? ────────────────────────────────────────────────── */

/**
 * Solid Exchange teal around a white card, so the words sit on white and stay easy to
 * read. Rebecca's words lead; the short note from us follows.
 */
export function ExchangeWhy({ why }: { why: Exchange["why"] }) {
  const { quote } = why;
  return (
    <section className="bg-exchange py-16 md:py-24">
      <div className="shell grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
        <Reveal>
          <figure className="rounded-[2rem] bg-white p-8 text-foreground shadow-[0_30px_60px_-30px_rgba(6,45,43,0.45)] md:p-12 lg:p-14">
            <SectionTitle number={why.number} label={why.label} />
            <Quote className="mt-10 size-10 text-exchange-sun" aria-hidden />
            <blockquote className="mt-4 font-display text-[clamp(1.3rem,2.3vw,1.8rem)] leading-snug font-bold text-pretty">
              {quote.text}
            </blockquote>
            <figcaption className="mt-6 text-muted-foreground">
              <span className="font-bold text-foreground">{quote.name}</span>, {quote.title}
            </figcaption>
            <p className="mt-10 border-t border-border pt-8 text-lg leading-relaxed text-muted-foreground">
              {why.intro}
            </p>
          </figure>
        </Reveal>

        <Reveal delay={0.1}>
          <Photo
            media={why.photo}
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="aspect-[4/5] w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ── 03 Who is it for? ──────────────────────────────────────────────────────── */

export function ExchangeWho({
  who,
  founderQuotes,
}: {
  who: Exchange["who"];
  founderQuotes: Exchange["founderQuotes"];
}) {
  const [first, second] = who.photos;
  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle number={who.number} label={who.label} />
            <p className="mt-6 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug font-bold text-teal-deep">
              {who.heading}
            </p>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              {who.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ButtonLink
              href={who.cta.href}
              size="lg"
              className="mt-9 h-auto bg-exchange-ink py-4 text-left whitespace-normal text-white shadow-none hover:bg-exchange hover:text-exchange-ink hover:shadow-none"
            >
              {who.cta.label}
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </ButtonLink>
          </div>

          {/* Two photographs, overlapping slightly, so the column reads as a gathering. */}
          <div className="relative">
            <Reveal>
              <Photo media={first} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] w-full lg:w-[85%]" />
            </Reveal>
            <Reveal delay={0.12} className="relative -mt-16 ml-auto w-3/4 lg:w-[62%]">
              <Photo
                media={second}
                sizes="(min-width: 1024px) 28vw, 75vw"
                className="aspect-[4/3] w-full ring-8 ring-background"
              />
            </Reveal>
          </div>
        </div>

        {founderQuotes.show ? (
          <div className="mt-20">
            <p className="text-sm font-bold tracking-[0.14em] text-exchange uppercase">
              {founderQuotes.label}
            </p>
            <ul className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
              {founderQuotes.quotes.map((q, i) => (
                <li key={i} className="w-[80%] shrink-0 snap-start md:w-auto">
                  {q.text ? (
                    <blockquote className="h-full rounded-3xl bg-exchange-mist p-7 text-lg leading-relaxed text-exchange-ink">
                      <Quote className="mb-3 size-6 text-exchange-sun" aria-hidden />
                      {q.text}
                    </blockquote>
                  ) : (
                    <div className="grid h-full min-h-40 place-items-center rounded-3xl border-2 border-dashed border-exchange/45 bg-exchange-mist p-7 text-center text-exchange-ink">
                      <span>
                        <Quote className="mx-auto mb-3 size-6 text-exchange-sun" aria-hidden />
                        {q.placeholder}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
