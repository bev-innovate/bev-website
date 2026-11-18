import {
  ArrowUpRight,
  CalendarHeart,
  DoorOpen,
  Globe2,
  Handshake,
  HeartHandshake,
  Landmark,
  Leaf,
  Quote,
  Sprout,
  Target,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";

import { MediaPlaceholder } from "@/components/exchange/media-placeholder";
import { ParallaxCollage } from "@/components/exchange/parallax-collage";
import { ScrollHighlight } from "@/components/exchange/scroll-highlight";
import { VoicesVideo } from "@/components/exchange/voices-video";
import { ButtonLink } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { Reveal } from "@/components/ui/reveal";
import { Text, textVariants } from "@/components/ui/typography";
import type { ExchangeIcon, ExchangeMedia, ExchangePoint, exchange } from "@/lib/exchange-content";
import { cn } from "@/lib/utils";

type Exchange = typeof exchange;

const icons = {
  customers: Handshake,
  markets: Globe2,
  fundraising: Landmark,
  impact: Sprout,
  roundtable: Users,
  sprint: Target,
  evening: CalendarHeart,
  introduction: UserPlus,
  growing: Leaf,
  met: HeartHandshake,
  open: DoorOpen,
} satisfies Record<ExchangeIcon, unknown>;

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

/** The numeral tight above the section's question, on the shared `title` step. */
function SectionTitle({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl leading-none font-extrabold text-exchange">{number}</p>
      <Text variant="title" className="mt-1">
        {label}
      </Text>
    </div>
  );
}

/** A small group of cards under its own subtitle, revealed one after another. */
function PointGrid({
  heading,
  points,
  columns,
}: {
  heading?: string;
  points: readonly ExchangePoint[];
  columns: 3 | 4;
}) {
  return (
    <div>
      {heading ? <Text variant="subtitle">{heading}</Text> : null}
      <ul
        className={cn(
          "grid gap-4 sm:grid-cols-2",
          heading && "mt-6",
          columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {points.map((point, i) => (
          <Reveal as="li" key={point.title} delay={i * 0.08} distance={16} className="h-full">
            <FeatureCard icon={icons[point.icon]} title={point.title} description={point.description} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/* ── Opening ────────────────────────────────────────────────────────────────── */

/** Two thirds words, one third the vertical voices film on desktop. */
export function ExchangeHero({ hero, mark }: { hero: Exchange["hero"]; mark: Exchange["mark"] }) {
  const { video } = hero;
  return (
    <header className="pt-14 pb-12 md:pt-20 md:pb-16">
      <div className="shell grid items-center gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
        <div>
          <div className="flex animate-rise items-center gap-3">
            <Image src={mark.src} alt="" width={56} height={56} priority className="size-12 md:size-14" />
            <Text variant="eyebrow" className="text-exchange">
              {hero.name}
            </Text>
          </div>

          <Text variant="display" className="mt-8 animate-rise" style={{ animationDelay: "0.08s" }}>
            {hero.headline}
          </Text>
          <div className="animate-rise" style={{ animationDelay: "0.16s" }}>
            <ScrollHighlight
              text={hero.lede}
              className={cn(textVariants({ variant: "lead" }), "mt-6 max-w-2xl")}
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

/**
 * Title, one-line lead and a couple of sentences of body beside the photographs;
 * then the topics and the formats as cards, so nothing runs to a long paragraph.
 */
export function ExchangeWhat({ what }: { what: Exchange["what"] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="shell space-y-10 md:space-y-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="lg:order-2">
            <SectionTitle number={what.number} label={what.label} />
            <ScrollHighlight text={what.lead} className={cn(textVariants({ variant: "lead" }), "mt-8")} />
            <ScrollHighlight
              text={what.body}
              ink="muted"
              className={cn(textVariants({ variant: "body" }), "mt-4")}
            />
          </div>

          <div className="lg:order-1">
            <ParallaxCollage photos={what.photos} />
          </div>
        </div>

        <PointGrid heading={what.challenges.heading} points={what.challenges.points} columns={4} />
        <PointGrid heading={what.formats.heading} points={what.formats.points} columns={4} />
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
              className="mt-4 font-display text-[clamp(1.25rem,2.1vw,1.65rem)] leading-snug font-bold text-pretty"
            />
            <figcaption className={cn(textVariants({ variant: "caption" }), "mt-6 text-base")}>
              <span className="font-bold text-foreground">{quote.name}</span>, {quote.title}
            </figcaption>
            <Text className="mt-10 border-t border-border pt-8">{why.intro}</Text>
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
      <div className="shell space-y-10 md:space-y-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle number={who.number} label={who.label} />
            <ScrollHighlight text={who.lead} className={cn(textVariants({ variant: "lead" }), "mt-8")} />
          </div>
          <ParallaxCollage photos={who.photos} />
        </div>

        <PointGrid points={who.points} columns={3} />

        {/* The invitation, then the one action on the page. */}
        <div className="flex flex-col items-start gap-6 rounded-[2rem] bg-exchange-mist p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <Text className="text-exchange-ink">{who.membership}</Text>
          <ButtonLink
            href={who.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="group h-auto w-full shrink-0 bg-exchange px-6 py-4 text-center text-[1.1875rem] whitespace-normal md:w-auto md:px-8 font-bold text-white shadow-none transition-all hover:-translate-y-0.5 hover:bg-exchange hover:shadow-[0_14px_30px_-14px_rgba(12,161,157,0.8)]"
          >
            {who.cta.label}
            <span className="sr-only"> (opens in a new tab)</span>
            <ArrowUpRight
              className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </ButtonLink>
        </div>

        {founderQuotes.show ? (
          <div>
            <Text variant="eyebrow" className="text-exchange">
              {founderQuotes.label}
            </Text>
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
