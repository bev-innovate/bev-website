/**
 * The Exchange: page content.
 *
 * Warm, plain British English: the voice of someone who has sat in the founder's chair and
 * wants others to feel looked after. Alex's amended brief takes precedence wherever it
 * differs.
 *
 * - `EXCHANGE_LIVE`: while false the page is left out of search engines and the sitemap,
 *   and nothing on the site links to it. It can still be opened by its address for review.
 * - Media marked `placeholder` render as labelled boxes until the real file is added, so
 *   it is obvious at a glance what is still to come.
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
    title: "The Exchange: by founders, for founders",
    description:
      "A small, friendly circle where climate founders share honestly and look out for one another, powered by Better Earth Ventures.",
  },

  hero: {
    name: "The Exchange",
    lockup: "powered by Better Earth Ventures",
    strapline: "By founders, for founders.",
    intro:
      "Building a climate company can be lonely work. The Exchange is a small, friendly circle where climate founders pull up a chair, share what is really going on, and leave feeling a little less alone with it all.",
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

  what: {
    heading: "A few founders, one good conversation",
    body: "We keep things small and unhurried. A handful of climate founders gather around a table, usually with a cup of tea in hand, alongside one of our team and a guest who has built, backed or led climate ventures. Everyone has a chance to speak, and everyone leaves with something useful, whether that is a fresh idea, a kind word or a new friend.",
    facts: [
      {
        icon: "users",
        title: "3 to 7 founders",
        line: "Small enough that every voice is heard",
      },
      {
        icon: "conversation",
        title: "A host and a guest",
        line: "Someone to keep the conversation flowing, and someone who has walked the road before you",
      },
      {
        icon: "compass",
        title: "The things that matter",
        line: "Cash flow, teams, leadership and partnerships: the questions every climate founder wrestles with",
      },
    ],
    closing:
      "We keep the topics broad on purpose, so a founder working on ocean health and one working on food can learn just as much from each other.",
  },

  who: {
    heading: "A room where you can be honest",
    paragraphs: [
      "The best conversations happen when people feel safe to say how things really are. That is why we keep each gathering small, and why we invite founders we have come to know and trust through our summits, programmes, mentoring and visits.",
      "Most are a year or so into building a climate solution, perhaps with a product out in the world or a pilot under way. More than anything, we look for people who listen as kindly as they share.",
    ],
    photo: {
      src: "",
      alt: "",
      placeholder: "Photo: founders around the table at one of our meetups.",
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
