import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { PageHeader } from "@/components/site/page-header";
import { PillarsBento } from "@/components/site/pillars-bento";
import { Section, SectionHeading } from "@/components/site/section";
import { Reveal } from "@/components/ui/reveal";
import { getSiteSettings, pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Better Earth Ventures works: equity-free acceleration, market immersion and ecosystem access designed for the realities of Asia-Pacific food and climate systems.",
};

const principles = [
  {
    title: "Deployment beats demo",
    body: "A pitch deck is not traction. We measure progress by pilots signed, customers won and technology actually in the ground — which is why market immersion sits at the centre of every programme.",
  },
  {
    title: "Equity-free, on purpose",
    body: "We do not take equity and we do not charge a participation fee. Alignment comes from doing the work well, not from a position on the cap table.",
  },
  {
    title: "Regional, not imported",
    body: "Playbooks written for California do not survive contact with a Johor smallholding. Our mentors, partners and buyers are the ones operating in this region.",
  },
  {
    title: "Systems, not silver bullets",
    body: "Soil, water, energy, logistics and finance move together. We build cohorts that can see the whole system and partnerships that can act across it.",
  },
  {
    title: "Impact you can evidence",
    body: "Every cohort works through climate impact measurement using EIT Climate-KIC methodology, so claims made to investors and customers hold up.",
  },
  {
    title: "Relationships compound",
    body: "The Better Earth Exchange exists because the introductions that matter most rarely happen on a stage. Trust built over years is the real asset.",
  },
];

export default async function ApproachPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="Approach"
        title="We work at the point where ambition meets execution"
        intro="Better Earth Ventures supports climate founders to turn validated solutions into scalable businesses — through carefully designed programmes, market immersion and deep ecosystem access."
      />

      <Section className="pt-0">
        <div className="shell">
          <PillarsBento pillars={pillars} stats={settings.stats} />
        </div>
      </Section>

      <Section tone="sunk">
        <div className="shell">
          <SectionHeading
            eyebrow="Principles"
            title="Six commitments that shape every programme we run"
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, i) => (
              <Reveal as="li" key={principle.title} delay={Math.min(i, 5) * 0.05}>
                <div className="h-full bg-canvas-raised p-8">
                  <p className="font-display text-xl leading-snug font-semibold text-ink">
                    {principle.title}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        eyebrow="Bespoke programmes"
        title="Bring us a portfolio, a mandate or a market you need to crack."
        intro="We design acceleration pathways for corporates, funds and public agencies — end to end, or dropped into a programme you already run."
        primary={{ href: "/contact", label: "Start a conversation" }}
        secondary={{ href: "/programmes", label: "See our programmes" }}
      />
    </>
  );
}
