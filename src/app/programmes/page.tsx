import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";
import { ProgrammeCard } from "@/components/site/programme-card";
import { Reveal } from "@/components/ui/reveal";
import { getProgrammes } from "@/lib/content";
import { programmesIntro } from "@/lib/seed-content";

export const metadata: Metadata = {
  title: "Programmes",
  description: programmesIntro.lede,
};

export default async function ProgrammesPage() {
  const programmes = await getProgrammes();

  return (
    <>
      <PageHeader
        eyebrow={programmesIntro.eyebrow}
        title={programmesIntro.title}
        intro={programmesIntro.lede}
        image={programmesIntro.heroImage}
      />

      <section className="py-16 md:py-20">
        <div className="shell max-w-4xl space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
          {programmesIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="pt-2 font-semibold text-orange-deep">{programmesIntro.highlight}</p>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        {/* Four equal cards. No programme is promoted above the others. */}
        <div className="shell grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map((programme, i) => (
            <Reveal key={programme.slug} delay={Math.min(i, 3) * 0.13} className="h-full">
              <ProgrammeCard programme={programme} compact />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
