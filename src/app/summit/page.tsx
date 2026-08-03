import type { Metadata } from "next";

import {
  SummitAbout,
  SummitCtaStrip,
  SummitHero,
  SummitPartners,
  SummitSpeakers,
  SummitStartups,
  SummitStrands,
  SummitTimeline,
} from "@/components/summit/sections";
import { SummitSignup } from "@/components/summit/signup";
import { summit } from "@/lib/summit-content";

export const metadata: Metadata = {
  title: summit.name,
  description: summit.hero.standfirst,
  openGraph: {
    title: summit.name,
    description: summit.hero.standfirst,
    // The uncropped key visual, partner strip and all: it is the complete title card,
    // and its 16:9 is closer to what social previews expect than the page crop.
    images: ["/images/programmes-climate-innovation-summit-singapore.webp"],
  },
};

/**
 * Climate Innovation Summit Singapore.
 *
 * Section templates are final; the copy, dates, speakers and startups are placeholder
 * and marked TBC where unconfirmed. Content lives in src/lib/summit-content.ts and moves
 * to Sanity once the structure is signed off.
 */
export default function SummitPage() {
  return (
    // Scoping the field-notes palette to the whole page means every registry component
    // inside it resolves `primary`, `muted` and `border` to the warm tokens.
    <div data-theme="fieldnotes">
      <SummitHero hero={summit.hero} name={summit.name} />
      <SummitPartners partners={summit.partners} />
      <SummitAbout about={summit.about} />

      <SummitCtaStrip text="Places are limited and released to our list first." />

      <SummitStrands strands={summit.strands} />
      <SummitTimeline timeline={summit.timeline} />

      <SummitSpeakers speakers={summit.speakers} />

      <SummitCtaStrip
        text="Want to speak, sponsor or bring a delegation?"
        cta={{ label: "Talk to the team", href: "/contact" }}
        tone="mangrove"
      />

      <SummitStartups startups={summit.startups} />
      <SummitSignup {...summit.signup} />
    </div>
  );
}
