import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { PageHeader } from "@/components/site/page-header";
import { ProgrammeCard } from "@/components/site/programme-card";
import { Reveal } from "@/components/ui/reveal";
import { getProgrammes } from "@/lib/content";
import type { ProgrammeStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Accelerators, competitions and convenings for climate and agrifood founders across Asia-Pacific — equity-free and built with EIT Climate-KIC, Innovate UK and partners across the region.",
};

const groups: { status: ProgrammeStatus[]; title: string; note?: string }[] = [
  { status: ["open", "upcoming"], title: "Open and upcoming" },
  {
    status: ["closed", "completed"],
    title: "Previous editions",
    note: "Applications are closed, but the cohorts, partners and outcomes are all here.",
  },
];

export default async function ProgrammesPage() {
  const programmes = await getProgrammes();

  return (
    <>
      <PageHeader
        eyebrow="Programmes"
        title="Equity-free programmes for the people building climate solutions in Asia-Pacific"
        intro="We design and deliver acceleration pathways with global partners — then put founders in front of the investors, corporates and operators who decide whether a technology gets deployed."
      />

      {groups.map((group) => {
        const items = programmes.filter((p) => group.status.includes(p.status));
        if (!items.length) return null;

        return (
          <section key={group.title} className="shell pb-20 md:pb-24">
            <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-5">
              <h2 className="font-display text-2xl font-semibold text-ink">{group.title}</h2>
              {group.note ? <p className="text-sm text-ink-faint">{group.note}</p> : null}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {items.map((programme, i) => (
                <Reveal key={programme.slug} delay={i * 0.05}>
                  <ProgrammeCard programme={programme} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      <CtaBand
        eyebrow="Design a programme"
        title="Need an acceleration pathway your portfolio will actually use?"
        intro="We build bespoke programmes for corporates, funds and public agencies — from open call to Demo Day."
        primary={{ href: "/contact", label: "Start a conversation" }}
        secondary={{ href: "/approach", label: "See how we work" }}
      />
    </>
  );
}
