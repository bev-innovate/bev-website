import type { Metadata } from "next";
import Image from "next/image";

import { AudienceGrid } from "@/components/site/audience-grid";
import { ExpeditionCarousel } from "@/components/site/expedition-carousel";
import { PageHeader } from "@/components/site/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Text } from "@/components/ui/typography";
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
      {/*
        The same banner every other page uses. The old split hero with its
        background-clipped headline was the last bespoke header on the site.
      */}
      <PageHeader
        eyebrow={expeditions.eyebrow}
        title={expeditions.title}
        intro={expeditions.lede}
        image={expeditions.heroImage}
      >
        <ButtonLink href={expeditions.cta.href} variant="white" size="lg">
          {expeditions.cta.label}
        </ButtonLink>
      </PageHeader>

      <section className="py-16 md:py-20">
        <Text variant="lead" className="shell max-w-4xl text-muted-foreground">
          {expeditions.intro}
        </Text>
      </section>

      <section className="bg-purple py-16 text-white md:py-20">
        <div className="shell max-w-4xl">
          <Text variant="title" className="text-white">
            {expeditions.why.title}
          </Text>
          <div className="mt-8 space-y-5">
            {expeditions.why.paragraphs.map((paragraph) => (
              <Text key={paragraph} className="text-white/85">
                {paragraph}
              </Text>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center">
            <Text variant="title">{expeditions.whereWeveBeen.title}</Text>
            <Text variant="lead" className="mt-5 text-muted-foreground">
              {expeditions.whereWeveBeen.lede}
            </Text>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {expeditions.whereWeveBeen.places.map((place, i) => (
              <Reveal as="li" key={place.name} delay={i * 0.16}>
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
                    <Text variant="eyebrow" className="text-xs text-current opacity-90">
                      {place.location}
                    </Text>
                    <Text variant="heading" className="mt-1.5 text-current">
                      {place.name}
                    </Text>
                    <Text className="mt-3 text-base text-current opacity-95">{place.body}</Text>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-teal py-16 text-white md:py-20">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <Text variant="title" className="text-white">
              {expeditions.whoFor.title}
            </Text>
            <Text variant="lead" className="mx-auto mt-6 max-w-3xl text-white/90">
              {expeditions.whoFor.lede}
            </Text>
          </div>

          <div className="mx-auto mt-14 max-w-5xl">
            <AudienceGrid audiences={expeditions.whoFor.audiences} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="shell">
          <Text variant="title" className="text-center">
            {expeditions.experience.title}
          </Text>
          <div className="mx-auto mt-16 max-w-5xl">
            <ExpeditionCarousel slides={expeditions.experience.slides} />
          </div>
        </div>
      </section>

      <section className="bg-teal py-16 text-white md:py-20">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Text variant="title" className="text-white">
              {expeditions.next.title}
            </Text>
            <div className="mt-6 space-y-4">
              {expeditions.next.paragraphs.map((paragraph) => (
                <Text key={paragraph} className="text-white/90">
                  {paragraph}
                </Text>
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
