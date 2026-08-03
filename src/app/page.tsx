import { ArrowRight } from "lucide-react";

import { CohortGrid } from "@/components/site/cohort-grid";
import { CtaBand } from "@/components/site/cta-band";
import { Hero } from "@/components/site/hero";
import { PartnerMarquee } from "@/components/site/partner-marquee";
import { PillarsBento } from "@/components/site/pillars-bento";
import { PostCard } from "@/components/site/post-card";
import { ProgrammeCard } from "@/components/site/programme-card";
import { Section, SectionHeading } from "@/components/site/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Timeline } from "@/components/ui/timeline";
import {
  getPartners,
  getPosts,
  getProgrammes,
  getSiteSettings,
  pillars,
} from "@/lib/content";

/** How we work — the four stages every founder moves through with us. */
const journey = [
  {
    title: "Find",
    subtitle: "Open calls across Asia-Pacific",
    body: "We run open, equity-free calls across Singapore, Australia, Thailand, Vietnam, Indonesia and New Zealand — and we screen on validated technology and committed teams, not on polish.",
    points: [
      "Open regional calls",
      "TRL-based screening",
      "Nearly half of the 2025 cohort women co-founded",
    ],
  },
  {
    title: "Sharpen",
    subtitle: "Mentorship and business model work",
    body: "Founders work with operators and investors who have built in this region. We pressure-test the business model, the unit economics and the route to a first paying customer.",
    points: ["1:1 mentor matching", "Business model and pricing", "Climate impact measurement"],
  },
  {
    title: "Immerse",
    subtitle: "Real conversations, not panels",
    body: "Market immersion puts founders in front of the buyers, regulators and farm operators who decide whether a technology gets deployed. Pitch decks give way to pilots.",
    points: ["Corporate pilot matching", "On-the-ground field visits", "Regulatory orientation"],
  },
  {
    title: "Scale",
    subtitle: "Capital, partners and Demo Day",
    body: "We close the loop with warm introductions to investors and grant programmes, then put the cohort on stage in front of the region’s climate capital base.",
    points: ["Investor introductions", "Grant and funding access", "Demo Day in Singapore"],
  },
];

export default async function HomePage() {
  const [settings, programmes, posts, partners] = await Promise.all([
    getSiteSettings(),
    getProgrammes(),
    getPosts(),
    getPartners(),
  ]);

  const featured = programmes.find((p) => p.status === "open" || p.status === "upcoming");
  const [primary, ...rest] = programmes;
  const latestPosts = posts.slice(0, 3);
  const cohort = programmes.find((p) => p.slug === "climaccelerator")?.cohort ?? [];

  return (
    <>
      <Hero
        headline="Climate solutions don’t scale on conviction alone."
        intro={settings.description}
        stats={settings.stats}
        featured={featured}
      />

      <section className="border-y border-line bg-canvas-raised py-10">
        <p className="shell mb-7 text-center text-xs font-semibold tracking-[0.16em] text-ink-faint uppercase">
          Delivered with
        </p>
        <PartnerMarquee partners={partners} />
      </section>

      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="What we do"
            title="Three ways we move climate innovation from idea to deployment"
            intro="Programmes that build capability, gatherings that build trust, and research that keeps everyone honest about what is actually working."
          />
          <div className="mt-14">
            <PillarsBento pillars={pillars} stats={settings.stats} />
          </div>
        </div>
      </Section>

      <Section tone="sunk">
        <div className="shell">
          <SectionHeading
            eyebrow="Programmes"
            title="Where founders and funders meet"
            intro="Accelerators, competitions and convenings built for the realities of Asia-Pacific food and climate systems."
            action={
              <ButtonLink href="/programmes" variant="outline">
                All programmes
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            }
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {primary ? (
              <Reveal className="md:col-span-2">
                <ProgrammeCard programme={primary} featured />
              </Reveal>
            ) : null}
            {rest.slice(0, 4).map((programme, i) => (
              <Reveal key={programme.slug} delay={i * 0.06}>
                <ProgrammeCard programme={programme} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="How we work"
            title="Four stages, six months, no equity"
            intro="The same arc runs through every programme we deliver — adapted to the sector, never skipped."
          />
        </div>
        <div className="shell mt-6">
          <Timeline
            data={journey.map((stage) => ({
              title: stage.title,
              subtitle: stage.subtitle,
              content: (
                <div className="rounded-2xl border border-line bg-canvas-raised p-6 md:p-8">
                  <p className="text-[0.9375rem] leading-relaxed text-ink-muted">{stage.body}</p>
                  <ul className="mt-6 grid gap-2.5">
                    {stage.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-ink">
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal ring-2 ring-moss/30"
                          aria-hidden
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />
        </div>
      </Section>

      {cohort.length ? (
        <Section tone="sunk">
          <div className="shell">
            <SectionHeading
              eyebrow="The 2025 cohort"
              title="Nine companies building the region’s food and climate systems"
              intro="Selected from across Asia-Pacific for the inaugural AgriTech ClimAccelerator Singapore — nearly half of them co-founded by women."
              action={
                <ButtonLink href="/programmes/climaccelerator" variant="outline">
                  About the programme
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              }
            />
            <div className="mt-14">
              <CohortGrid companies={cohort} />
            </div>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="shell">
          <SectionHeading
            eyebrow="Insights"
            title="Field notes from the work"
            intro="Programme news, cohort announcements and what we learn on the ground."
            action={
              <ButtonLink href="/insights" variant="outline">
                All insights
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            }
          />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {latestPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Whether you’re building it, backing it or buying it — start here."
        intro="Founders, investors, corporates and public agencies all come through the same front door. Tell us what you’re working on."
        primary={{ href: "/programmes", label: "Find a programme" }}
        secondary={{ href: "/contact", label: "Talk to the team" }}
      />
    </>
  );
}
