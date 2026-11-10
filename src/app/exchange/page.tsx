import type { Metadata } from "next";

import {
  ExchangeClosing,
  ExchangeHero,
  ExchangeHow,
  ExchangeJourney,
  ExchangeWhy,
} from "@/components/exchange/sections";
import { EXCHANGE_LIVE, exchange } from "@/lib/exchange-content";

export const metadata: Metadata = {
  title: exchange.meta.title,
  description: exchange.meta.description,
  openGraph: {
    title: exchange.meta.title,
    description: exchange.meta.description,
    // The film's poster, once there is one; the site's default sharing image until then.
    ...(exchange.hero.video.poster ? { images: [exchange.hero.video.poster] } : {}),
  },
  // Kept out of search results until launch; reachable by its address for review.
  robots: EXCHANGE_LIVE ? undefined : { index: false, follow: false },
};

/**
 * Better Earth Exchange: one scrolling page. What it is (the opening band), who it is for
 * (the stage of the journey), how it works (the space and its formats), why we are doing
 * it, then a closing line. Content lives in
 * src/lib/exchange-content.ts.
 */
export default function ExchangePage() {
  return (
    <>
      <ExchangeHero hero={exchange.hero} />
      <ExchangeJourney journey={exchange.journey} />
      <ExchangeHow how={exchange.how} groundRules={exchange.groundRules} />
      <ExchangeWhy why={exchange.why} />
      <ExchangeClosing closing={exchange.closing} />
    </>
  );
}
