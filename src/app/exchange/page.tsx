import type { Metadata } from "next";

import {
  ExchangeClosing,
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
    // The film's poster, once there is one; the site's default sharing image until then.
    ...(exchange.hero.video.poster ? { images: [exchange.hero.video.poster] } : {}),
  },
  // Kept out of search results until launch; reachable by its address for review.
  robots: EXCHANGE_LIVE ? undefined : { index: false, follow: false },
};

/**
 * The Exchange: one scrolling page in three zones (what it is, who it is for, why we are
 * doing it), between an opening band and a closing line. Content lives in
 * src/lib/exchange-content.ts.
 */
export default function ExchangePage() {
  return (
    <>
      <ExchangeHero hero={exchange.hero} />
      <ExchangeWhat what={exchange.what} />
      <ExchangeWho who={exchange.who} groundRules={exchange.groundRules} />
      <ExchangeWhy why={exchange.why} />
      <ExchangeClosing closing={exchange.closing} />
    </>
  );
}
