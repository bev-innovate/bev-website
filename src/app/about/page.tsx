import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { CtaBand } from "@/components/site/cta-band";
import { PageHeader } from "@/components/site/page-header";
import { PartnerMarquee } from "@/components/site/partner-marquee";
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

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A Singapore-based platform for climate and agrifood innovation"
        intro="We connect founders to the capital, networks and strategic partners they need to scale solutions for people, place and planet: across the Asia-Pacific region where the stakes for food and climate are highest."
      />

      <Section className="pt-0">
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
      <section className="bg-purple py-20 text-white md:py-24">
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
            <SectionHeading
              eyebrow="Team"
              title="The people you’ll actually work with"
              intro="Small team, deep network. You will not be handed off to a programme manager you have never met."
            />
            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((person, i) => (
                <Reveal as="li" key={person.name} delay={Math.min(i, 5) * 0.05}>
                  <div className="h-full rounded-2xl border border-line bg-canvas-raised p-6">
                    <div className="relative mb-5 aspect-square overflow-hidden rounded-xl bg-canvas-sunk">
                      {person.photo ? (
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          sizes="(min-width: 1024px) 22vw, 45vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="grid h-full place-items-center bg-gradient-to-br from-orange/15 to-yellow/20">
                          <span className="font-display text-3xl font-semibold text-orange">
                            {person.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="font-display text-lg font-semibold text-ink">{person.name}</p>
                    {person.role ? (
                      <p className="mt-1 text-sm text-ink-muted">{person.role}</p>
                    ) : null}
                    {person.linkedin ? (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm text-orange hover:text-purple"
                      >
                        LinkedIn
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* Logo cloud lead-in from Tailark's `logo-cloud/two` (MIT, github.com/tailark/blocks). */}
      <section className="border-y border-border bg-background py-10">
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
