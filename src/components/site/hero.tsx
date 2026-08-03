"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Home hero. Keeps the old site's purple field and orange CTAs, but replaces the flat
 * colour block with a layered treatment — photography under a duotone wash — and gives
 * the copy a staggered entrance.
 */
export function Hero({
  headline,
  intro,
  primary,
  secondary,
  image,
}: {
  headline: [string, string];
  intro: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  image: string;
}) {
  const reduce = useReducedMotion();
  const step = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.08 * i, ease },
        };

  return (
    <section className="relative isolate overflow-hidden bg-purple text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        {/* Duotone: the photograph reads as brand purple rather than as a stock image. */}
        <div className="absolute inset-0 bg-purple/85" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-deep via-purple/70 to-orange/25" />
        <div className="absolute -right-24 -bottom-32 size-[34rem] rounded-full bg-orange/25 blur-[120px]" />
      </div>

      <div className="shell relative py-16 md:py-20 lg:py-36">
        <div className="max-w-3xl">
          <motion.h1 {...step(0)} className="display text-[clamp(2.25rem,5.6vw,4rem)]">
            {headline[0]}
            <br />
            {headline[1]}
          </motion.h1>

          <motion.p
            {...step(1)}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl"
          >
            {intro}
          </motion.p>

          <motion.div {...step(2)} className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={secondary.href} size="lg" variant="white">
              {secondary.label}
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
