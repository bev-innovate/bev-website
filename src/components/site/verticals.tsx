import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

/**
 * "Our sectors of focus".
 *
 * Structure from Tailark's `features/eight` block (MIT, github.com/tailark/blocks): a soft
 * card grid where the first card spans the full width and carries the photography. The
 * circular portraits on a saturated purple band are gone; the sectors now sit on the same
 * white surface as the rest of the page, with the image doing the work.
 */
export function Verticals({
  items,
  heading = "Our sectors of focus",
  intro = "Four industries where climate technology has to reach commercial scale, and where Singapore and Southeast Asia give it somewhere to land.",
}: {
  items: { title: string; image: string; items: string[] }[];
  heading?: string;
  intro?: string;
}) {
  const [lead, ...rest] = items;
  if (!lead) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="shell">
        <div className="max-w-3xl">
          <h2 className="font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-semibold text-ink">
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
            {intro}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Reveal className="col-span-full">
            <Card variant="soft" className="col-span-full overflow-hidden p-6 md:p-8">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    {lead.title}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {lead.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-foreground/10 px-3 py-1 text-sm text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative aspect-16/10 overflow-hidden rounded-(--radius) border border-transparent bg-background shadow ring-1 ring-foreground/5">
                  <Image
                    src={lead.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Card>
          </Reveal>

          {rest.map((vertical, i) => (
            <Reveal key={vertical.title} delay={Math.min(i, 3) * 0.07} className="h-full">
              <Card variant="soft" className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-16/9 w-full">
                  <Image
                    src={vertical.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {vertical.title}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {vertical.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-foreground/10 px-3 py-1 text-sm text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
          <p className="max-w-xl text-lg text-balance text-muted-foreground">
            If you are building in one of these, we can put you in front of the customers and
            capital that decide whether it scales.
          </p>
          <ButtonLink href="/contact" size="lg" variant="purple" className="shrink-0">
            Join our ecosystem
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
