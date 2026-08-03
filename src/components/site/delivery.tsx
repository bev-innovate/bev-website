import { Compass, Handshake, Rocket, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

/**
 * "How we deliver climate innovation engagements".
 *
 * Structure from Tailark's `features/eight` block (MIT, github.com/tailark/blocks): a grid
 * of soft-filled cards, each led by an icon, with the copy set in the shadcn token
 * classes so the block inherits the brand from globals.css.
 */

/** Fixed order, so a pillar keeps its icon regardless of what the CMS returns. */
const icons = [Compass, Users, Rocket, Handshake];

export function Delivery({
  eyebrow,
  heading,
  intro,
  pillars,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  pillars: readonly {
    title: string;
    points: readonly string[];
    formats: string;
  }[];
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <div className="max-w-3xl">
          <span className="text-primary">{eyebrow}</span>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-semibold text-ink">
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
            {intro}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={pillar.title} delay={Math.min(i, 3) * 0.07} className="h-full">
                <Card variant="soft" className="flex h-full flex-col p-6">
                  <Icon className="size-5 text-primary" aria-hidden />
                  <h3 className="mt-5 text-lg leading-snug font-semibold text-foreground">
                    {pillar.title}
                  </h3>

                  <ul className="mt-4 flex-1 space-y-3">
                    {pillar.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden
                          className="mt-2 size-1 shrink-0 rounded-full bg-foreground/30"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 border-t border-foreground/10 pt-4 text-sm leading-relaxed text-muted-foreground">
                    {pillar.formats}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
