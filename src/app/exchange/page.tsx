import type { Metadata } from "next";

import {
  ExchangeHero,
  ExchangeWhat,
  ExchangeWho,
  ExchangeWhy,
} from "@/components/exchange/sections";
import { EXCHANGE_LIVE, exchange } from "@/lib/exchange-content";

export const metadata: Metadata = {
  title: exchange.meta.title,
  description: exchange.meta.description,
  openGraph: {
    title: exchange.meta.title,
    description: exchange.meta.description,
    images: [exchange.what.photos[0].src],
  },
  // Kept out of search results until launch; reachable by its address for review.
  robots: EXCHANGE_LIVE ? undefined : { index: false, follow: false },
};

/**
 * Better Earth Exchange: a three-part scroll (what it is, why we are doing it, who it is
 * for) beneath an opening with the voices film. Modelled on the Climate Expeditions page,
 * bolder and more image-led. Content lives in src/lib/exchange-content.ts.
 */
export default function ExchangePage() {
  return (
    <>
      <ExchangeHero hero={exchange.hero} mark={exchange.mark} />
      <ExchangeWhat what={exchange.what} />
      <ExchangeWhy why={exchange.why} />
      <ExchangeWho who={exchange.who} founderQuotes={exchange.founderQuotes} />
    </>
  );
}
