import type { Metadata } from "next";
import Image from "next/image";

import { AudienceGrid } from "@/components/site/audience-grid";
import { ExpeditionCarousel } from "@/components/site/expedition-carousel";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { expeditions } from "@/lib/seed-content";

export const metadata: Metadata = {
  title: "Climate Expeditions",
  description: expeditions.lede,
};

const placeAccent = {
  orange: "bg-orange text-white",
  yellow: "bg-yellow text-ink",
  sky: "bg-sky text-white",
} as const;

export default function ClimateExpeditionsPage() {
  return (
    <>
      {/* Split hero — type on the left, full-bleed landscape on the right. */}
      <header className="grid items-stretch lg:grid-cols-2">
        <div className="order-2 flex items-center py-16 lg:order-1 lg:py-24">
          <div className="shell lg:mx-0 lg:max-w-xl lg:pr-12">
            {/*
              The old site filled this headline with forest imagery. Same effect via
              background-clip, with a purple fallback for browsers that don't support it
              and for the text-only rendering assistive tech sees.
            */}
            <h1
              className="display bg-clip-text text-[clamp(2.5rem,7vw,4.5rem)] tracking-[-0.03em] text-purple uppercase supports-[background-clip:text]:text-transparent"
              style={{
                // Solid purple sits *under* the photo, so a failed image still paints
                // the letterforms instead of leaving an invisible heading.
                backgroundImage: `url(${expeditions.heroImage}), linear-gradient(var(--color-purple), var(--color-purple))`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              Climate
              <br />
              Expeditions
            </h1>
            <p className="mt-6 text-lg leading-snug font-bold text-ink md:text-xl">
              {expeditions.lede}
            </p>
            <p className="mt-5 leading-relaxed text-ink-muted">{expeditions.intro}</p>
            <ButtonLink href={expeditions.cta.href} variant="teal" size="lg" className="mt-8">
              {expeditions.cta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative order-1 min-h-[18rem] lg:order-2 lg:min-h-[38rem]">
          <Image
            src={expeditions.heroImage}
            alt="Aerial view of dense forest canopy"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </header>

      <section className="bg-purple py-20 text-white md:py-24">
        <div className="shell max-w-4xl">
          <h2 className="display text-[clamp(1.6rem,3.4vw,2.25rem)]">{expeditions.why.title}</h2>
          <div className="mt-8 space-y-5 leading-relaxed text-white/85">
            {expeditions.why.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="display text-[clamp(1.75rem,3.6vw,2.5rem)] text-ink">
              {expeditions.whereWeveBeen.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              {expeditions.whereWeveBeen.lede}
            </p>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {expeditions.whereWeveBeen.places.map((place, i) => (
              <Reveal as="li" key={place.name} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-lg">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={place.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className={`flex flex-1 flex-col p-6 ${placeAccent[place.accent]}`}>
                    <p className="text-sm opacity-90">{place.location}</p>
                    <h3 className="mt-1 text-xl font-bold">{place.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed opacity-95">{place.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-teal py-20 text-white md:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="display text-[clamp(1.75rem,3.6vw,2.5rem)]">
              {expeditions.whoFor.title}
            </h2>
            <p className="mt-6 leading-relaxed text-white/90">{expeditions.whoFor.lede}</p>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <AudienceGrid audiences={expeditions.whoFor.audiences} />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="shell">
          <h2 className="display text-center text-[clamp(1.75rem,3.6vw,2.5rem)] text-ink">
            {expeditions.experience.title}
          </h2>
          <div className="mx-auto mt-16 max-w-5xl">
            <ExpeditionCarousel slides={expeditions.experience.slides} />
          </div>
        </div>
      </section>

      <section className="bg-teal py-20 text-white md:py-24">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="display text-[clamp(1.75rem,3.8vw,2.75rem)]">
              {expeditions.next.title}
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-white/90">
              {expeditions.next.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={expeditions.next.primary.href} variant="white" size="lg">
                {expeditions.next.primary.label}
              </ButtonLink>
              <ButtonLink
                href={expeditions.next.secondary.href}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                {expeditions.next.secondary.label}
              </ButtonLink>
            </div>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-lg">
            <Image
              src={expeditions.next.image}
              alt="Expedition participants travelling by boat"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
