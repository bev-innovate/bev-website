import { Hero } from "@/components/site/hero";
import { PartnerMarquee } from "@/components/site/partner-marquee";
import { PillarsAccordion } from "@/components/site/pillars-accordion";
import { TrackRecord } from "@/components/site/track-record";
import { Verticals } from "@/components/site/verticals";
import { Reveal } from "@/components/ui/reveal";
import { getSiteSettings } from "@/lib/content";
import { pillars, trustedBy, verticals, whoWeAre } from "@/lib/seed-content";

export default async function HomePage() {
  const settings = await getSiteSettings();

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
