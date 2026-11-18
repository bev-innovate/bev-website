import { Hero } from "@/components/site/hero";
import { ProgrammeCard } from "@/components/site/programme-card";
import { Delivery } from "@/components/site/delivery";
import { PartnerMarquee } from "@/components/site/partner-marquee";
import { TrackRecord } from "@/components/site/track-record";
import { Verticals } from "@/components/site/verticals";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Text } from "@/components/ui/typography";
import { getPartners, getProgrammes, getSiteSettings } from "@/lib/content";
import { delivery, verticals, whoWeAre } from "@/lib/seed-content";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  const [settings, programmes, partners] = await Promise.all([
    getSiteSettings(),
    getProgrammes(),
    getPartners(),
  ]);

  // Lead with whatever is open, falling back to the first programme.
  const preview = programmes.slice(0, 3);

  return (
    <>
      <Hero
        headline={["Empowering innovators.", "For people, place, and planet."]}
        intro={settings.description}
        primary={{ label: "Join Our Upcoming Summit", href: "/summit" }}
        secondary={{ label: "Connect With Us", href: "/contact" }}
        image="/images/hero-miscellaneous-climaccelerator-2025-cohort-photo.webp"
      />

      {/*
        Logo cloud from Tailark's `logo-cloud/two` block (MIT, github.com/tailark/blocks):
        the lead-in sits inline with the marks rather than above them as a section heading.
        Directly under the fold, so the proof arrives before the pitch does.
      */}
      <section className="border-b border-border bg-background py-10">
        <div className="shell">
          <Text variant="eyebrow" className="text-muted-foreground">
            Trusted by teams at
          </Text>
        </div>
        <div className="mt-6">
          <PartnerMarquee partners={partners} />
        </div>
      </section>

      {/*
        Who we are. The statement runs across the top on the shared title step; the prose
        sits beneath it, set in from the left behind a rule on wide screens.
      */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <Text variant="eyebrow" className="text-primary">
              {whoWeAre.eyebrow}
            </Text>
            <Text variant="title" className="mt-3 max-w-5xl">
              {whoWeAre.heading}
            </Text>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 lg:ml-[40%] lg:border-l lg:border-border lg:pl-12">
            <div className="max-w-2xl space-y-5">
              {whoWeAre.paragraphs.map((paragraph) => (
                <Text key={paragraph}>{paragraph}</Text>
              ))}

              <Text variant="lead" className="font-medium">
                {whoWeAre.highlight}
              </Text>

              {whoWeAre.paragraphsAfter.map((paragraph) => (
                <Text key={paragraph}>{paragraph}</Text>
              ))}

              <Text variant="lead" className="font-medium text-primary">
                {whoWeAre.closing}
              </Text>
            </div>
          </Reveal>
        </div>
      </section>

      <Delivery
        eyebrow={delivery.eyebrow}
        heading={delivery.heading}
        statement={delivery.statement}
        pillars={delivery.pillars}
      />

      <TrackRecord
        stats={settings.stats}
        intro="Behind each of these numbers is a founder who trusted us with a stretch of their journey."
      />

      {preview.length ? (
        <section className="py-16 md:py-20">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-3xl">
                <Text variant="eyebrow" className="text-primary">
                  Programmes
                </Text>
                <Text variant="title" className="mt-3">
                  Meeting founders where they are
                </Text>
                <Text variant="lead" className="mt-5 text-muted-foreground">
                  Some begin at the first version of an idea. Others pick up a company that
                  already has customers and needs a new market.
                </Text>
              </div>
              <ButtonLink href="/programmes" variant="outline" className="shrink-0">
                All programmes
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {preview.map((programme, i) => (
                <Reveal key={programme.slug} delay={i * 0.13} className="h-full">
                  <ProgrammeCard programme={programme} compact />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Verticals items={verticals} />
    </>
  );
}
