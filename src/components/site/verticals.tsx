import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Text } from "@/components/ui/typography";

/**
 * "Our sectors of focus".
 *
 * Four equal vertical cards on the Tailark `features/eight` card primitive (MIT,
 * github.com/tailark/blocks). Each carries a photograph, the sector name, and one line on
 * why the sector matters, in place of the old keyword pills: a list of sub-themes told
 * visitors what we watch, the line tells them why we care.
 */
/** One brand colour per sector, in fixed order, so the four read as a set rather than a block. */
const sectorAccents = [
  { rule: "bg-purple", title: "text-purple" },
  { rule: "bg-teal", title: "text-teal-deep" },
  { rule: "bg-orange", title: "text-orange-deep" },
  { rule: "bg-sky", title: "text-sky" },
] as const;

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
          <Text variant="title">{heading}</Text>
          <Text variant="lead" className="mt-5 text-muted-foreground">
            {intro}
          </Text>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((vertical, i) => {
            const accent = sectorAccents[i % sectorAccents.length];
            return (
              <Reveal key={vertical.title} delay={Math.min(i, 3) * 0.14} className="h-full">
                <Card variant="default" className="flex h-full flex-col overflow-hidden">
                  {/* A colour spine along the top edge, carried through to the title. */}
                  <span className={`block h-1.5 w-full ${accent.rule}`} aria-hidden />
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
                    <Text variant="heading" className={accent.title}>
                      {vertical.title}
                    </Text>
                    <Text className="mt-2.5 text-base">{vertical.tagline}</Text>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
          <Text className="max-w-xl">
            Building in one of these? We would love to put you in front of the customers and
            capital who can take it further.
          </Text>
          <ButtonLink href="/contact" size="lg" variant="purple" className="shrink-0">
            Join our ecosystem
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
