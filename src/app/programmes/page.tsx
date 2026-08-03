import type { Metadata } from "next";
import Image from "next/image";

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

  // Lead with something open where possible; the rest fall into the grid below.
  const featured = programmes.find((p) => p.status === "open") ?? programmes[0];
  const rest = programmes.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <header className="relative isolate overflow-hidden bg-purple text-white">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={programmesIntro.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-purple/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-deep via-purple/75 to-orange/30" />
        </div>

        <div className="shell relative py-16 md:py-20">
          <h1 className="display text-[clamp(2.25rem,5.5vw,3.75rem)]">{programmesIntro.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
            {programmesIntro.lede}
          </p>
        </div>
      </header>

      <section className="py-16 md:py-20">
        <div className="shell max-w-4xl space-y-5 text-[1.0625rem] leading-relaxed text-ink-muted">
          {programmesIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="pt-2 font-semibold text-orange-deep">{programmesIntro.highlight}</p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="shell grid gap-5 md:grid-cols-2">
          {featured ? (
            <Reveal className="md:col-span-2">
              <ProgrammeCard programme={featured} featured />
            </Reveal>
          ) : null}
          {rest.map((programme, i) => (
            <Reveal key={programme.slug} delay={(i + 1) * 0.06}>
              <ProgrammeCard programme={programme} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
