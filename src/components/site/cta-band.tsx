import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

export function CtaBand({
  eyebrow = "Get involved",
  title,
  intro,
  primary = { href: "/programmes", label: "Explore programmes" },
  secondary = { href: "/contact", label: "Talk to the team" },
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="shell py-20 md:py-24">
      <div className="grain relative overflow-hidden rounded-[2rem] bg-forest px-8 py-16 text-canvas md:px-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 size-96 rounded-full bg-signal/20 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-leaf/15 blur-[110px]"
        />

        <div className="relative max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-signal uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.03] font-semibold tracking-tight text-balance">
            {title}
          </h2>
          {intro ? (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-canvas/75">{intro}</p>
          ) : null}
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={primary.href} variant="signal" size="lg">
              {primary.label}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            {secondary ? (
              <ButtonLink
                href={secondary.href}
                size="lg"
                variant="outline"
                className="border-canvas/25 text-canvas hover:border-canvas/50 hover:bg-canvas/10"
              >
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
