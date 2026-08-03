import { Hero } from "@/components/site/hero";
import { ProgrammeCard } from "@/components/site/programme-card";
import { PartnerMarquee } from "@/components/site/partner-marquee";
import { PillarsAccordion } from "@/components/site/pillars-accordion";
import { TrackRecord } from "@/components/site/track-record";
import { Verticals } from "@/components/site/verticals";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getProgrammes, getSiteSettings } from "@/lib/content";
import { pillars, trustedBy, verticals, whoWeAre } from "@/lib/seed-content";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  const [settings, programmes] = await Promise.all([getSiteSettings(), getProgrammes()]);

  // Lead with whatever is open, falling back to the first programme.
  const featured = programmes.find((p) => p.status === "open") ?? programmes[0];
  const rest = programmes.filter((p) => p.slug !== featured?.slug).slice(0, 2);

  return (
    <>
      <Hero
        headline={["Empowering innovators.", "For people, place, and planet."]}
        intro={settings.description}
        primary={{ label: "Join Our Upcoming Expedition", href: "/climate-expeditions" }}
        secondary={{ label: "Connect With Us", href: "/contact" }}
        image="https://static.wixstatic.com/media/4d40e5_2ba3bf2f6d204d70be08a3687871425e~mv2.png"
      />

      {/* Who we are — the positioning statement, set as a two-column editorial block. */}
      <section className="py-20 md:py-28">
        <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-orange">{whoWeAre.eyebrow}</p>
              <h2 className="display mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] text-purple">
                {whoWeAre.heading}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-2xl space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
              {whoWeAre.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <p className="border-l-3 border-orange pl-5 font-semibold text-orange">
                {whoWeAre.highlight}
              </p>

              {whoWeAre.paragraphsAfter.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <p className="pt-2 text-lg font-semibold text-orange">{whoWeAre.closing}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-purple py-20 text-white md:py-24">
        <div className="shell">
          <h2 className="eyebrow text-white/80">Who we are</h2>
          <div className="mt-10">
            <PillarsAccordion items={pillars} />
          </div>
        </div>
      </section>

      <TrackRecord stats={settings.stats} />

      {featured ? (
        <section className="bg-canvas-sunk py-20 md:py-24">
          <div className="shell">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow text-purple">Programmes</p>
                <h2 className="display mt-3 text-[clamp(1.9rem,4vw,3rem)] text-ink">
                  Meet founders where they are
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                  Each programme addresses a specific stage of the journey, from
                  early-stage inspiration to global scale-up.
                </p>
              </div>
              <ButtonLink href="/programmes" variant="outline" className="shrink-0">
                All programmes
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <Reveal className="md:col-span-2">
                <ProgrammeCard programme={featured} featured />
              </Reveal>
              {rest.map((programme, i) => (
                <Reveal key={programme.slug} delay={(i + 1) * 0.06}>
                  <ProgrammeCard programme={programme} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-20">
        <div className="shell">
          <h2 className="eyebrow text-purple">Trusted by</h2>
        </div>
        <div className="mt-10">
          <PartnerMarquee partners={trustedBy} />
        </div>
      </section>

      <Verticals items={verticals} />
    </>
  );
}
