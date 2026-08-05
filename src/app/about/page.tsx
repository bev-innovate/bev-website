import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/site/cta-band";
import { PageHeader } from "@/components/site/page-header";
import { PartnerMarquee } from "@/components/site/partner-marquee";
import { PersonCard } from "@/components/site/person-card";
import { PillarsAccordion } from "@/components/site/pillars-accordion";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/ui/reveal";
import { getPartners, getPeople, getSiteSettings } from "@/lib/content";
import { pillars } from "@/lib/seed-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Better Earth Ventures is a Singapore-based climate and agrifood innovation platform. Our team has supported 370+ startups that have gone on to raise more than US$500m.",
};

export default async function AboutPage() {
  const [settings, people, partners] = await Promise.all([
    getSiteSettings(),
    getPeople(),
    getPartners(),
  ]);

  const team = people.filter((p) => (p.group ?? "team") === "team");
  const experts = people.filter((p) => p.group === "expert");
  const advisors = people.filter((p) => p.group === "advisor");

  // Preserve the order the locations first appear in, rather than sorting alphabetically:
  // Singapore is the head office and should lead.
  const locations = [...new Set(team.map((p) => p.location ?? "Team"))];

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A Singapore-based platform for climate and agrifood innovation"
        intro="We connect founders to the capital, networks and strategic partners they need to scale solutions for people, place and planet: across the Asia-Pacific region where the stakes for food and climate are highest."
        image="/images/hero-miscellaneous-iuk-enterprise-singapore-group.webp"
      />

      <Section>
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] bg-canvas-sunk">
              <Image
                src="/images/climate-expedition-1.webp"
                alt="Better Earth Ventures climate expedition in northern Thailand"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-xl">
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight font-semibold text-balance text-ink">
                Founded in 2024, built on a much longer track record
              </h2>
              <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
                <p>
                  Better Earth Ventures accelerates the development and deployment of
                  technologies that mitigate climate change and make food systems more
                  resilient. We are a small team in Singapore working across the region.
                </p>
                <p>
                  Between us, our team has supported more than 370 startups, which have gone
                  on to raise over US$500m. We bring that operating experience to programmes
                  delivered with EIT Climate-KIC, Innovate UK, ClimateLaunchpad and partners
                  across Asia-Pacific.
                </p>
                <p>
                  We spend as much time on farms and factory floors as we do in boardrooms.
                  Real climate progress is relational, systemic and slower than slides
                  suggest: designing for that is the whole job.
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-8">
                {settings.stats.slice(0, 2).map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <p className="font-display text-4xl font-semibold text-purple">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm text-ink-muted">{stat.label}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        The three business lines. They used to sit on the home page under "What we run",
        which the delivery section now occupies; they belong here, next to the history.
      */}
      <section className="bg-purple py-16 text-white md:py-20">
        <div className="shell">
          <h2 className="font-display text-3xl font-semibold lg:text-4xl">What we run</h2>
          <div className="mt-10">
            <PillarsAccordion items={pillars} />
          </div>
        </div>
      </section>

      {team.length ? (
        <Section tone="sunk">
          <div className="shell">
            {/*
              Headings match the company deck: "Our team", "Our experts", "Our advisory
              board". No eyebrow, since it would only repeat the heading, and no standfirst
              under any of the three: the faces are the content.
            */}
            <SectionHeading title="Our team" />

            {/* Grouped by base, so it is obvious which market a name sits in. */}
            <div className="mt-12 space-y-12">
              {locations.map((location) => (
                <div key={location}>
                  <h3 className="border-b border-line pb-3 font-display text-xl font-semibold text-ink">
                    {location}
                  </h3>
                  {/* Three up, so Singapore fills a row exactly and the smaller
                      offices do not trail a mostly empty one. */}
                  <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {team
                      .filter((person) => person.location === location)
                      .map((person, i) => (
                        <Reveal as="li" key={person.name} delay={Math.min(i, 5) * 0.11} className="h-full">
                          <PersonCard person={person} />
                        </Reveal>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {experts.length ? (
        <Section>
          <div className="shell">
            <SectionHeading title="Our experts" />
            <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {experts.map((person, i) => (
                <Reveal as="li" key={person.name} delay={Math.min(i, 5) * 0.11} className="h-full">
                  <PersonCard person={person} variant="row" />
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {advisors.length ? (
        <Section tone="sunk">
          <div className="shell">
            <SectionHeading title="Our advisory board" />
            <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {advisors.map((person, i) => (
                <Reveal as="li" key={person.name} delay={Math.min(i, 5) * 0.11} className="h-full">
                  <PersonCard person={person} variant="row" />
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* Logo cloud lead-in from Tailark's `logo-cloud/two` (MIT, github.com/tailark/blocks). */}
      <section className="border-t border-border bg-background py-10">
        <p className="shell mb-6 text-muted-foreground">Partners and collaborators</p>
        <PartnerMarquee partners={partners} />
      </section>

      <CtaBand
        eyebrow="Work with us"
        title="Come and build the region’s climate infrastructure with us."
        intro="Founders, mentors, corporates and funders: there is a way in for each of you."
        primary={{ href: "/contact", label: "Get in touch" }}
        secondary={{ href: "/programmes", label: "See programmes" }}
      />
    </>
  );
}
