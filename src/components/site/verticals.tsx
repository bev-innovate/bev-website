import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

/**
 * "Our sectors of focus".
 *
 * Four equal vertical cards on the Tailark `features/eight` card primitive (MIT,
 * github.com/tailark/blocks). Each carries a photograph, the sector name, and one line on
 * why the sector matters, in place of the old keyword pills: a list of sub-themes told
 * visitors what we watch, the line tells them why we care.
 */
export function Verticals({
  items,
  heading = "Our sectors of focus",
  intro = "Four sectors where the region's needs run deepest, and where the right support goes furthest.",
}: {
  items: { title: string; tagline: string; image: string }[];
  heading?: string;
  intro?: string;
}) {
  if (!items.length) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-semibold text-ink">
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
            {intro}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((vertical, i) => (
            <Reveal key={vertical.title} delay={Math.min(i, 3) * 0.14} className="h-full">
              <Card variant="soft" className="flex h-full flex-col overflow-hidden">
                {/* Portrait crop: four uprights read as a set, and the photography gets
                    room to breathe inside a quarter-width column. */}
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={vertical.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl leading-snug font-semibold text-foreground">
                    {vertical.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-muted-foreground">
                    {vertical.tagline}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
          <p className="max-w-xl text-lg text-balance text-muted-foreground">
            Building in one of these? We would love to put you in front of the customers and
            capital who can take it further.
          </p>
          <ButtonLink href="/contact" size="lg" variant="purple" className="shrink-0">
            Join our ecosystem
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
