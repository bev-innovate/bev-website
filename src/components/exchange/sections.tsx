import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";

import { MediaPlaceholder } from "@/components/exchange/media-placeholder";
import { ParallaxCollage } from "@/components/exchange/parallax-collage";
import { ScrollHighlight } from "@/components/exchange/scroll-highlight";
import { VoicesVideo } from "@/components/exchange/voices-video";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { ExchangeMedia, exchange } from "@/lib/exchange-content";
import { cn } from "@/lib/utils";

type Exchange = typeof exchange;

/** A photograph in a rounded frame, or a labelled placeholder in the same frame. */
function Photo({ media, sizes, className }: { media: ExchangeMedia; sizes: string; className: string }) {
  if (!media.src) {
    return <MediaPlaceholder kind="photo" label={media.placeholder} className={className} />;
  }
  return (
    <div className={cn("group relative overflow-hidden rounded-3xl bg-exchange-mist", className)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}

/**
 * The section title: the numeral sits tight above the question, set large. The same three
 * questions run down the page, so a reader always knows which one they are in.
 */
function SectionTitle({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl leading-none font-extrabold text-exchange">{number}</p>
      <h2 className="display mt-1 text-[clamp(2.75rem,6.5vw,5.25rem)] text-foreground">{label}</h2>
    </div>
  );
}

/* ── Opening ────────────────────────────────────────────────────────────────── */

/**
 * Two thirds words, one third the vertical voices film on desktop; the film drops below
 * the words on a phone. No rule underneath: the page runs straight into "What is it?".
 */
export function ExchangeHero({ hero, mark }: { hero: Exchange["hero"]; mark: Exchange["mark"] }) {
  const { video } = hero;
  return (
    <header className="pt-14 pb-12 md:pt-20 md:pb-16">
      <div className="shell grid items-center gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div>
          <div className="flex animate-rise items-center gap-3">
            <Image src={mark.src} alt="" width={56} height={56} priority className="size-12 md:size-14" />
            <span className="text-sm font-bold tracking-[0.14em] text-exchange uppercase">
              {hero.name}
            </span>
          </div>

          <h1
            className="display mt-8 animate-rise text-[clamp(2.75rem,7vw,5.75rem)] text-foreground"
            style={{ animationDelay: "0.08s" }}
          >
            {hero.headline}
          </h1>
          <div className="animate-rise" style={{ animationDelay: "0.16s" }}>
            <ScrollHighlight
              text={hero.lede}
              className="mt-6 max-w-2xl text-xl leading-relaxed text-foreground"
            />
          </div>
        </div>

        <div
          className="mx-auto w-full max-w-xs animate-rise lg:max-w-none"
          style={{ animationDelay: "0.24s" }}
        >
          <VoicesVideo
            src={video.src}
            captions={video.captions}
            poster={video.poster}
            label={video.label}
            placeholder={video.placeholder}
            aspect="aspect-[9/16]"
          />
        </div>
      </div>
    </header>
  );
}

/* ── 01 What is it? ─────────────────────────────────────────────────────────── */

/** Words on the right, the overlapping photographs on the left drifting at their own pace. */
export function ExchangeWhat({ what }: { what: Exchange["what"] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-2">
          <SectionTitle number={what.number} label={what.label} />
          <div className="mt-8 space-y-5">
            {what.paragraphs.map((p, i) => (
              <ScrollHighlight
                key={p}
                text={p}
                className={cn(
                  "leading-relaxed text-foreground",
                  i === 0 ? "text-[clamp(1.2rem,2vw,1.45rem)]" : "text-lg",
                )}
              />
            ))}
          </div>
        </div>

        <div className="lg:order-1">
          <ParallaxCollage photos={what.photos} />
        </div>
      </div>
    </section>
  );
}

/* ── 02 Why are we doing it? ────────────────────────────────────────────────── */

/**
 * Solid Exchange teal around a white card, so the words sit on white and stay easy to
 * read. Rebecca's words lead; the short note from us follows; her photo sits beside.
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
            <ScrollHighlight
              as="blockquote"
              text={quote.text}
              className="mt-4 font-display text-[clamp(1.3rem,2.3vw,1.8rem)] leading-snug font-bold text-pretty"
            />
            <figcaption className="mt-6 text-muted-foreground">
              <span className="font-bold text-foreground">{quote.name}</span>, {quote.title}
            </figcaption>
            <p className="mt-10 border-t border-border pt-8 text-lg leading-relaxed text-muted-foreground">
              {why.intro}
            </p>
          </figure>
        </Reveal>

        <Reveal delay={0.12}>
          <Photo media={why.photo} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/5] w-full" />
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
  return (
    <section className="py-16 md:py-24">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle number={who.number} label={who.label} />
            <div className="mt-8 space-y-4">
              {who.paragraphs.map((p) => (
                <ScrollHighlight key={p} text={p} className="text-lg leading-relaxed text-foreground" />
              ))}
            </div>
            {/*
              The Exchange teal with white words, set large and bold so they hold their
              contrast. The arrow nudges forward on hover.
            */}
            <ButtonLink
              href={who.cta.href}
              size="lg"
              className="group mt-9 h-auto bg-exchange px-8 py-4 text-[1.1875rem] font-bold text-white shadow-none transition-all hover:-translate-y-0.5 hover:bg-exchange hover:shadow-[0_14px_30px_-14px_rgba(12,161,157,0.8)]"
            >
              {who.cta.label}
              <ArrowRight
                className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </ButtonLink>
          </div>

          <ParallaxCollage photos={who.photos} />
        </div>

        {founderQuotes.show ? (
          <div className="mt-24">
            <p className="text-sm font-bold tracking-[0.14em] text-exchange uppercase">
              {founderQuotes.label}
            </p>
            <ul className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
              {founderQuotes.quotes.map((q, i) => (
                <Reveal
                  as="li"
                  key={i}
                  delay={i * 0.1}
                  className="w-[80%] shrink-0 snap-start transition-transform duration-300 hover:-translate-y-1 md:w-auto"
                >
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
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
