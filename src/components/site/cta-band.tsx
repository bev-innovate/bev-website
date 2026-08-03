import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";

/**
 * Closing call to action.
 *
 * Structure from Tailark's `call-to-action/two` block (MIT, github.com/tailark/blocks): a
 * flex-wrap row of heading and buttons under a hairline rule. The blurred colour blobs on
 * a rounded purple slab are gone; the rule and the type carry it.
 */
export function CtaBand({
  eyebrow,
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
    <section className="py-16 md:py-20">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-border pt-12">
          <div className="max-w-2xl">
            {eyebrow ? <span className="text-primary">{eyebrow}</span> : null}
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance text-ink lg:text-4xl">
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primary.href} variant="purple" size="lg">
              {primary.label}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} size="lg" variant="outline">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
