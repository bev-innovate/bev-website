import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/** "Our Verticals: Driving Innovation in Vital Industries" — purple band, circular imagery. */
export function Verticals({
  items,
}: {
  items: { title: string; image: string; items: string[] }[];
}) {
  return (
    <section className="bg-purple py-20 text-white md:py-24">
      <div className="shell">
        <h2 className="display mx-auto max-w-3xl text-center text-[clamp(1.6rem,3.4vw,2.25rem)]">
          Our Verticals: Driving Innovation in Vital Industries
        </h2>

        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((vertical, i) => (
            <Reveal as="li" key={vertical.title} delay={i * 0.07}>
              <div className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[13rem] overflow-hidden rounded-full ring-4 ring-white/15">
                  <Image
                    src={vertical.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 13rem, 45vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <h3 className="mt-6 text-lg font-bold">{vertical.title}</h3>
                <ul className="mt-4 space-y-1.5 text-sm leading-snug text-white/80">
                  {vertical.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16 flex justify-center">
          <ButtonLink href="/contact" size="lg">
            Join Our Ecosystem
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
