import { Hero } from "@/components/site/hero";
import { ProgrammeCard } from "@/components/site/programme-card";
import { Delivery } from "@/components/site/delivery";
import { PartnerMarquee } from "@/components/site/partner-marquee";
import { TrackRecord } from "@/components/site/track-record";
import { Verticals } from "@/components/site/verticals";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
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
          <p className="text-muted-foreground">Trusted by teams at</p>
        </div>
        <div className="mt-6">
          <PartnerMarquee partners={partners} />
        </div>
      </section>

      {/*
        Who we are. Two-column split from Tailark's `content/two` block (MIT,
        github.com/tailark/blocks): the heading sits in the narrow column, the prose in the
        wide one behind a left rule.
      */}
      <section className="py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-5 lg:gap-0">
          <Reveal className="lg:col-span-2">
            <div className="lg:sticky lg:top-28 lg:pr-12">
              <span className="text-primary">{whoWeAre.eyebrow}</span>
              <h2 className="mt-4 font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold text-ink">
                {whoWeAre.heading}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-3 lg:border-l lg:border-border lg:pl-12">
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground">
              {whoWeAre.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <p className="font-medium text-foreground">{whoWeAre.highlight}</p>

              {whoWeAre.paragraphsAfter.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <p className="font-medium text-primary">{whoWeAre.closing}</p>
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
                <span className="text-primary">Programmes</span>
                {/* `text-nowrap` from md up: the line is short enough to hold, and
                    breaking it after "where" reads as a mistake. */}
                <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold text-ink md:text-nowrap">
                  Meeting founders where they are
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  From the first spark of an idea to a company ready for the world, each
                  programme is built for a particular moment in the journey.
                </p>
              </div>
              <ButtonLink href="/programmes" variant="outline" className="shrink-0">
                All programmes
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {preview.map((programme, i) => (
                <Reveal key={programme.slug} delay={i * 0.06} className="h-full">
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
