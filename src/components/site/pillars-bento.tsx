import { ArrowUpRight, Compass, Landmark, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import type { Stat } from "@/lib/types";

/**
 * What we do — bento grid.
 *
 * Structure adapted from 21st.dev @uilayout.contact "Feature Bento" (component id 18898):
 * an image-led hero card paired with stat tiles and a CTA block. Re-skinned to the brand
 * tokens and populated with the three pillars the business actually organises around
 * (Acceleration Services, Better Earth Exchange, Better Earth Institute).
 */

export function PillarsBento({
  pillars,
  stats,
}: {
  pillars: { title: string; slug: string; description: string; points: string[] }[];
  stats: Stat[];
}) {
  const [acceleration, exchange, institute] = pillars;
  const alumniStat = stats.find((s) => s.label.toLowerCase().includes("raised")) ?? stats[1];
  const startupStat = stats.find((s) => s.label.toLowerCase().includes("startups")) ?? stats[0];

  return (
    <div className="grid auto-rows-[minmax(15rem,auto)] grid-cols-1 gap-4 md:grid-cols-3">
      {/* Hero card */}
      <Reveal className="group relative col-span-1 row-span-2 overflow-hidden rounded-[1.75rem] bg-forest text-canvas md:col-span-2">
        <Image
          src="https://static.wixstatic.com/media/4d40e5_39d7da7e3ac3477090381929a58616f1~mv2.jpg"
          alt=""
          fill
          sizes="(min-width: 768px) 66vw, 100vw"
          className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-forest/30" />
        <div className="relative flex h-full flex-col justify-end gap-4 p-8 md:p-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-canvas/15 px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm">
            <Compass className="size-3.5" aria-hidden />
            {acceleration.title}
          </span>
          <h3 className="max-w-lg font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] font-semibold tracking-tight text-balance">
            Bespoke acceleration for climate and agrifood portfolios
          </h3>
          <p className="max-w-lg text-canvas/75">{acceleration.description}</p>
          <ul className="flex flex-wrap gap-2 pt-1">
            {acceleration.points.map((point) => (
              <li
                key={point}
                className="rounded-full border border-canvas/20 px-3 py-1 text-xs text-canvas/80"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Alumni capital stat */}
      <Reveal
        delay={0.05}
        className="relative flex flex-col justify-center overflow-hidden rounded-[1.75rem] bg-signal p-8 text-forest"
      >
        <div
          aria-hidden
          className="absolute -top-12 -right-12 size-40 rounded-full bg-canvas/30 blur-2xl"
        />
        <p className="relative font-display text-5xl leading-none font-semibold tracking-tight">
          {alumniStat?.value}
        </p>
        <p className="relative mt-3 text-sm font-semibold tracking-[0.14em] uppercase">
          {alumniStat?.label}
        </p>
        <p className="relative mt-2 text-sm text-forest/70">{alumniStat?.detail}</p>
      </Reveal>

      {/* Exchange */}
      <Reveal
        delay={0.1}
        className="flex flex-col justify-between rounded-[1.75rem] border border-line bg-canvas-raised p-8"
      >
        <div className="grid size-11 place-items-center rounded-xl bg-moss/12 text-moss">
          <Users className="size-5" aria-hidden />
        </div>
        <div className="mt-6 space-y-2">
          <h3 className="font-display text-2xl font-semibold text-ink">{exchange.title}</h3>
          <p className="text-sm leading-relaxed text-ink-muted">{exchange.description}</p>
        </div>
      </Reveal>

      {/* Institute */}
      <Reveal
        delay={0.15}
        className="flex flex-col justify-between rounded-[1.75rem] border border-line bg-canvas-raised p-8"
      >
        <div className="grid size-11 place-items-center rounded-xl bg-clay/15 text-clay">
          <Landmark className="size-5" aria-hidden />
        </div>
        <div className="mt-6 space-y-2">
          <h3 className="font-display text-2xl font-semibold text-ink">{institute.title}</h3>
          <p className="text-sm leading-relaxed text-ink-muted">{institute.description}</p>
        </div>
      </Reveal>

      {/* Startups supported */}
      <Reveal
        delay={0.2}
        className="relative flex flex-col justify-center overflow-hidden rounded-[1.75rem] bg-canvas-sunk p-8"
      >
        <p className="font-display text-5xl leading-none font-semibold tracking-tight text-forest">
          {startupStat?.value}
        </p>
        <p className="mt-3 text-sm font-semibold tracking-[0.14em] text-ink uppercase">
          {startupStat?.label}
        </p>
        <p className="mt-2 text-sm text-ink-muted">{startupStat?.detail}</p>
      </Reveal>

      {/* CTA */}
      <Reveal delay={0.25} className="md:col-span-2">
        <Link
          href="/contact"
          className="group flex h-full flex-col justify-between rounded-[1.75rem] bg-ink p-8 text-canvas transition-colors hover:bg-forest"
        >
          <div className="flex items-start justify-between">
            <span className="rounded-full bg-canvas/15 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase backdrop-blur-sm">
              Partner with us
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-canvas/15 transition-all group-hover:bg-signal group-hover:text-forest">
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </span>
          </div>
          <p className="mt-10 max-w-md font-display text-2xl leading-snug font-semibold text-balance md:text-3xl">
            Building a climate programme for Asia-Pacific? Let&rsquo;s design it together.
          </p>
        </Link>
      </Reveal>
    </div>
  );
}
