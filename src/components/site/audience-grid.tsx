import {
  Building2,
  Compass,
  Landmark,
  Lightbulb,
  Network,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/ui/reveal";

/**
 * "Who Climate Expeditions Are For".
 *
 * The old site hid six audiences behind accordion rows, so a visitor had to click six
 * times to find out whether the trip was for them — the one question that section exists
 * to answer. These are cards with the answer already visible: numbered, iconed and
 * scannable in a single pass.
 */

const icons: LucideIcon[] = [TrendingUp, Building2, Landmark, Lightbulb, Network, Compass];

export function AudienceGrid({
  audiences,
}: {
  audiences: { question: string; answer: string }[];
}) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {audiences.map((audience, i) => {
        const Icon = icons[i % icons.length];
        return (
          <Reveal as="li" key={audience.question} delay={Math.min(i, 5) * 0.13}>
            <article className="group relative h-full overflow-hidden rounded-xl border border-white/30 bg-white/8 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-white/60 hover:bg-white/14">
              {/* Oversized index, ghosted into the corner. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-3 right-3 text-7xl font-extrabold text-white/10 tabular-nums transition-colors duration-300 group-hover:text-white/20"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <span className="grid size-11 place-items-center rounded-lg bg-white/20 text-white">
                  <Icon className="size-5" aria-hidden />
                </span>

                <h3 className="mt-5 pr-12 text-lg leading-snug font-bold text-white">
                  {audience.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/85">{audience.answer}</p>
              </div>
            </article>
          </Reveal>
        );
      })}
    </ul>
  );
}
