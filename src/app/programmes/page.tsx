import type { Metadata } from "next";
import Image from "next/image";

import { ProgrammeBlock } from "@/components/site/programme-block";
import { Reveal } from "@/components/ui/reveal";
import { getProgrammes } from "@/lib/content";
import { programmesIntro } from "@/lib/seed-content";

export const metadata: Metadata = {
  title: "Programmes",
  description: programmesIntro.lede,
};

const stages = [
  { key: "early" as const, label: "Early stage", tone: "purple" as const },
  { key: "growth" as const, label: "Growth stage", tone: "orange" as const },
];

export default async function ProgrammesPage() {
  const programmes = await getProgrammes();

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

        <div className="shell relative py-20 md:py-28">
          <h1 className="display text-[clamp(2.25rem,5.5vw,3.75rem)]">
            {programmesIntro.title}
          </h1>
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
          <p className="pt-2 font-semibold text-orange">{programmesIntro.highlight}</p>
        </div>
      </section>

      {stages.map((stage) => {
        const items = programmes.filter((p) => p.stage === stage.key);
        if (!items.length) return null;

        return (
          <section
            key={stage.key}
            className={
              // orange-deep rather than the brand orange: white body copy on #ee792f
              // sits at ~2.9:1, which is below AA. See README.
              stage.tone === "purple"
                ? "bg-purple py-20 md:py-24"
                : "bg-orange-deep py-20 md:py-24"
            }
          >
            <div className="shell">
              <Reveal>
                <h2 className="eyebrow text-white/90">{stage.label}</h2>
              </Reveal>

              <div className="mt-14 space-y-20 md:space-y-28">
                {items.map((programme, i) => (
                  <ProgrammeBlock
                    key={programme.slug}
                    programme={programme}
                    index={i}
                    tone={stage.tone}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
