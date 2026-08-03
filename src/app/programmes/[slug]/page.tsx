import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CohortGrid } from "@/components/site/cohort-grid";
import { CtaBand } from "@/components/site/cta-band";
import { Section, SectionHeading } from "@/components/site/section";
import { Accordion } from "@/components/ui/accordion";
import { StatusBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Timeline } from "@/components/ui/timeline";
import { getProgramme, getProgrammes } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const programmes = await getProgrammes();
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const programme = await getProgramme(slug);
  if (!programme) return {};

  return {
    title: programme.title,
    description: programme.summary,
    openGraph: {
      title: programme.title,
      description: programme.summary,
      images: programme.heroImage ? [programme.heroImage] : undefined,
    },
  };
}

export default async function ProgrammePage({ params }: Params) {
  const { slug } = await params;
  const programme = await getProgramme(slug);
  if (!programme) notFound();

  const ctaLabel = programme.status === "open" ? "Apply now" : "Register interest";
  const ctaHref = programme.applyUrl ?? "/contact";

  return (
    <>
      <header className="grain relative overflow-hidden bg-forest pt-14 pb-16 text-canvas md:pt-20 md:pb-20">
        {programme.heroImage ? (
          <>
            <Image
              src={programme.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/85 to-forest/60" />
          </>
        ) : null}

        <div className="shell relative">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={programme.status} />
            {programme.kicker ? (
              <span className="text-sm text-canvas/70">{programme.kicker}</span>
            ) : null}
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-balance">
            {programme.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-canvas/80">
            {programme.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={ctaHref} variant="signal" size="lg">
              {ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden />
            </ButtonLink>
            {programme.applicationDeadline ? (
              <p className="text-sm text-canvas/60">
                Applications closed {formatDate(programme.applicationDeadline)}
              </p>
            ) : null}
          </div>

          {programme.keyFacts?.length ? (
            <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-canvas/15 md:grid-cols-4">
              {programme.keyFacts.map((fact) => (
                <div key={fact.label} className="bg-forest px-6 py-5">
                  <dt className="text-[0.6875rem] tracking-[0.14em] text-signal uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-xl font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </header>

      {programme.verticals?.length ? (
        <Section>
          <div className="shell">
            <SectionHeading
              eyebrow="Focus areas"
              title="Where agritech innovation drives real climate impact"
            />
            <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {programme.verticals.map((vertical, i) => (
                <Reveal as="li" key={vertical.title} delay={Math.min(i, 5) * 0.05}>
                  <div className="h-full bg-canvas-raised p-8">
                    <p className="font-display text-xl font-semibold text-ink">
                      {vertical.title}
                    </p>
                    {vertical.description ? (
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                        {vertical.description}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {programme.benefits?.length || programme.eligibility?.length ? (
        <Section tone="sunk">
          <div className="shell grid gap-14 lg:grid-cols-2">
            {programme.benefits?.length ? (
              <div>
                <h2 className="font-display text-3xl font-semibold text-ink">
                  What you get
                </h2>
                <ul className="mt-8 space-y-4">
                  {programme.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-moss text-canvas">
                        <Check className="size-3" aria-hidden />
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-ink">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {programme.eligibility?.length ? (
              <div className="rounded-[1.75rem] border border-line bg-canvas-raised p-8 md:p-10">
                <h2 className="font-display text-3xl font-semibold text-ink">Who it&rsquo;s for</h2>
                <ul className="mt-8 space-y-4">
                  {programme.eligibility.map((item) => (
                    <li
                      key={item}
                      className="border-b border-line pb-4 text-[0.9375rem] leading-relaxed text-ink-muted last:border-0 last:pb-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {programme.timeline?.length ? (
        <Section>
          <div className="shell">
            <SectionHeading eyebrow="Timeline" title="How the programme runs" />
          </div>
          <div className="shell mt-6">
            <Timeline
              data={programme.timeline.map((phase) => ({
                title: phase.title,
                subtitle: phase.phase,
                content: phase.description ? (
                  <div className="rounded-2xl border border-line bg-canvas-raised p-6 md:p-8">
                    <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
                      {phase.description}
                    </p>
                  </div>
                ) : null,
              }))}
            />
          </div>
        </Section>
      ) : null}

      {programme.cohort?.length ? (
        <Section tone="sunk">
          <div className="shell">
            <SectionHeading
              eyebrow="Cohort"
              title="The companies in the programme"
              intro="Selected against technology readiness, team commitment and climate impact potential."
            />
            <div className="mt-14">
              <CohortGrid companies={programme.cohort} />
            </div>
          </div>
        </Section>
      ) : null}

      {programme.faq?.length ? (
        <Section>
          <div className="shell max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Questions founders ask us first" />
            <Accordion items={programme.faq} className="mt-12" />
          </div>
        </Section>
      ) : null}

      {programme.partners?.length ? (
        <section className="shell pb-20">
          <p className="text-xs font-semibold tracking-[0.16em] text-ink-faint uppercase">
            Delivered with
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {programme.partners.map((partner) => (
              <li key={partner.name} className="font-display text-xl text-ink-muted">
                {partner.name}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <CtaBand
        eyebrow={programme.status === "open" ? "Applications open" : "Stay in the loop"}
        title={
          programme.status === "open"
            ? "Ready to apply?"
            : "Want to hear when the next cohort opens?"
        }
        intro="We announce open calls to our list first, usually several weeks ahead of the public launch."
        primary={{ href: ctaHref, label: ctaLabel }}
        secondary={{ href: "/programmes", label: "See all programmes" }}
      />
    </>
  );
}
