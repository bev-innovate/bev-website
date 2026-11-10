/**
 * Better Earth Exchange: page content.
 *
 * The three paragraphs in `hero.intro`, `journey.body` and `how.body` are the company's own
 * wording and are kept exactly as given. Everything around them is written to match: warm,
 * plain British English.
 *
 * - `EXCHANGE_LIVE`: while false the page is left out of search engines and the sitemap,
 *   and nothing on the site links to it. It can still be opened by its address for review.
 * - Media with an empty `src` render as labelled placeholders until the real file is added.
 * - `groundRules.show`: whether the room's rules appear publicly is still an open question.
 */

export const EXCHANGE_LIVE = false;

/** A photo or film still to come: a path once it exists, and a note on what it should be. */
export interface ExchangeMedia {
  src: string;
  alt: string;
  /** Shown in the placeholder box until `src` is filled in. */
  placeholder: string;
}

export const exchange = {
  slug: "exchange",

  meta: {
    title: "Better Earth Exchange: by founders, for founders",
    description:
      "A curated, founder-only community for climate and agrifoodtech entrepreneurs scaling their solutions across Asia-Pacific and beyond.",
  },

  hero: {
    name: "Better Earth Exchange",
    lockup: "Climate and agrifoodtech founders · Asia-Pacific and beyond",
    strapline: "By founders, for founders.",
    intro:
      "Better Earth Exchange is a curated, founder-only community for climate and agrifoodtech entrepreneurs who are actively scaling their solutions across Asia-Pacific and beyond.",
    video: {
      src: "",
      captions: "",
      poster: "",
      label: "Video: voices of the Exchange",
      placeholder: "About 30 seconds of founders from our July meetups, in their own words.",
      caption: "Voices of the Exchange: founders at our July meetups.",
      playLabel: "Play · 30 seconds",
    },
  },

  journey: {
    heading: "For the steepest part of the journey",
    body: "We bring together founders who have moved past the early-stage scramble and are now navigating the steepest part of the journey: securing major customers, entering new markets, fundraising internationally, and turning real deployments into lasting climate impact.",
    challenges: [
      { icon: "customers", title: "Securing major customers" },
      { icon: "markets", title: "Entering new markets" },
      { icon: "fundraising", title: "Fundraising internationally" },
      { icon: "impact", title: "Turning deployments into lasting impact" },
    ],
  },

  how: {
    heading: "A trusted space to talk it through",
    body: "The Exchange provides a trusted space for candid conversations, practical insights, and peer support that you cannot find in open communities. Members share hard-won experience, access warm pathways into global ecosystems, and learn from one another through structured roundtables, scaling sprints, and VIP networking events.",
    formats: [
      {
        icon: "roundtables",
        title: "Structured roundtables",
        line: "Small, candid conversations with founders who know exactly what you are facing",
      },
      {
        icon: "sprints",
        title: "Scaling sprints",
        line: "Focused time with peers on the hurdle in front of you right now",
      },
      {
        icon: "networking",
        title: "VIP networking events",
        line: "Warm introductions into the ecosystems you are looking to grow into",
      },
    ],
    photo: {
      src: "",
      alt: "",
      placeholder: "Photo: founders around the table at one of our roundtables.",
    } satisfies ExchangeMedia,
  },

  groundRules: {
    show: false,
    heading: "What we ask of everyone at the table",
    rules: [
      "What is said in the room stays in the room.",
      "Bring your questions and leave the pitch at the door.",
      "Give as much as you take.",
    ],
  },

  why: {
    heading: "Why we started the Exchange",
    lead: "For years we have had the joy of bringing climate founders together through our programmes, from Singapore to London. The Exchange is our way of saying thank you, and of giving something back to the founders who have taught us so much.",
    /** Rebecca's own words. Until she has written them, the card shows what belongs there. */
    quote: {
      text: "",
      placeholder: "Quote: Rebecca, in her own words, on why the Exchange matters to her.",
      name: "Rebecca",
      title: "",
      photo: {
        src: "",
        alt: "Rebecca",
        placeholder: "Photo: Rebecca",
      } satisfies ExchangeMedia,
    },
  },

  closing: {
    lines: [
      "If you have met us along the way, at a summit, on a programme or over a coffee, we would love to see you at the table.",
      "Better Earth Ventures simply brings everyone together and puts the kettle on. The conversations belong to the founders.",
    ],
  },
} as const;
