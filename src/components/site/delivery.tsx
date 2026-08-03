import { Reveal } from "@/components/ui/reveal";

/**
 * "How we deliver climate innovation engagements".
 *
 * Four separate cards rather than a joined grid, each with a filled header, a bullet
 * list, and a formats footer pinned to the bottom so the footers line up across columns
 * even when the lists differ in length.
 */
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
          <p className="eyebrow text-teal-deep">{eyebrow}</p>
          <h2 className="display mt-3 text-[clamp(1.75rem,3.8vw,2.75rem)] text-purple">
            {heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal as="li" key={pillar.title} delay={Math.min(i, 3) * 0.07}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-canvas-raised">
                <h3 className="bg-purple px-6 py-5 text-base leading-snug font-semibold text-white">
                  {pillar.title}
                </h3>

                <ul className="flex-1 space-y-3.5 px-6 py-6">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                      <span
                        aria-hidden
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line px-6 py-5">
                  <p className="eyebrow text-teal-deep">Formats</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted italic">
                    {pillar.formats}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
