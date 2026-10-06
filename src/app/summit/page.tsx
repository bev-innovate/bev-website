import type { Metadata } from "next";

import { SummitAudience } from "@/components/summit/audience";
import {
  SummitAbout,
  SummitAgenda,
  SummitHero,
  SummitPartners,
  SummitRegister,
  SummitSpeakers,
  SummitZones,
} from "@/components/summit/sections";
import { SummitStickyCta } from "@/components/summit/sticky-cta";
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
      <SummitAudience audience={summit.audience} />
      <SummitZones zones={summit.zones} />

      {/* Companies on the Floor is held back until the names are confirmed. */}
      <SummitAgenda agenda={summit.agenda} />
      <SummitRegister register={summit.register} />
      {/* After the closing CTA: for people who have decided and want to see who else is coming. */}
      <SummitSpeakers speakers={summit.speakers} days={summit.agenda.days} />

      {/* Follows the reader between the hero and the closing registration band, and nowhere else. */}
      <SummitStickyCta
        text="Join us in Singapore, 13–15 October."
        cta={summit.hero.primary}
        hideWhileSelector="#summit-hero"
        hideNearSelector="#register"
      />
    </div>
  );
}
