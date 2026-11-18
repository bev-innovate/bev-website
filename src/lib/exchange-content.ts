/**
 * Better Earth Exchange: page content.
 *
 * Follows the finalised structure: a three-part scroll (what it is, why we are doing it,
 * who it is for) that reads as a personal invitation, not a sales pitch.
 *
 * Written to the shared type scale: each section opens with a one-line `lead`, keeps its
 * `body` to a sentence or two, and puts its points on cards (an icon, a short heading and
 * one line) rather than in long paragraphs.
 *
 * Phrases in [[double brackets]] warm to the Exchange teal as the reader scrolls past
 * them (see ScrollHighlight). The brackets never show on the page.
 *
 * - `EXCHANGE_LIVE`: while false the page is left out of search engines and the sitemap,
 *   and nothing on the site links to it.
 * - Media with an empty `src` render as labelled placeholders until the file is added.
 * - The mark is cropped from a screenshot for preview only; swap in the original logo
 *   file before launch.
 */

const IMG = "/images";

export const EXCHANGE_LIVE = false;

/** A photo or film: a path once it exists, and a note on what belongs there until then. */
export interface ExchangeMedia {
  src: string;
  alt: string;
  placeholder: string;
}

/** Icon names the page maps to Lucide icons. */
export type ExchangeIcon =
  | "customers"
  | "markets"
  | "fundraising"
  | "impact"
  | "team"
  | "journey"
  | "roundtable"
  | "sprint"
  | "evening"
  | "introduction"
  | "growing"
  | "met"
  | "open";

export interface ExchangePoint {
  icon: ExchangeIcon;
  title: string;
  description: string;
}

export const exchange = {
  slug: "exchange",

  meta: {
    title: "Better Earth Exchange: a place for founders to talk openly",
    description:
      "A curated, founder-only community for climate and agrifoodtech entrepreneurs scaling across Asia-Pacific and beyond. Practical insights and peer support, in small groups.",
  },

  /** Preview stand-in, cropped from the LinkedIn page. Replace with the original file. */
  mark: { src: `${IMG}/exchange-mark-preview.webp`, alt: "Better Earth Exchange" },

  hero: {
    name: "Better Earth Exchange",
    headline: "A place for founders to talk openly.",
    /** The LinkedIn line: who it is for, in one breath. */
    lede: "A [[curated, founder-only community]] for [[climate and agrifoodtech entrepreneurs]] who are actively scaling their solutions across [[Asia-Pacific and beyond]].",
    /**
     * A 20 to 30 second vertical loop cut from the first London Exchange pilot: a
     * soundbite from each founder, real voices, no text on screen.
     */
    video: {
      src: "",
      captions: "",
      poster: "",
      label: "Video: voices from the first London Exchange",
      placeholder: "A 20 to 30 second vertical loop with a soundbite from each founder. Real voices, no text.",
    },
  },

  what: {
    number: "01",
    label: "What is it?",
    lead: "Building a business can be exciting, difficult and, at times, [[lonely]].",
    body: "Better Earth Exchange brings [[small groups of founders]] together to talk candidly about the [[steepest part of the journey]]. There’s no pitching and nobody keeping score, just a trusted room where you can say how things really are.",
    challenges: {
      heading: "What we talk about",
      points: [
        {
          icon: "team",
          title: "Hiring and leading your team",
          description: "Bringing the right people in, keeping co-founders aligned and managing a growing team.",
        },
        {
          icon: "customers",
          title: "Securing major customers",
          description: "Landing the contracts that change your trajectory.",
        },
        {
          icon: "markets",
          title: "Entering new markets",
          description: "Finding your footing somewhere new.",
        },
        {
          icon: "fundraising",
          title: "Fundraising internationally",
          description: "Raising beyond your home market.",
        },
        {
          icon: "impact",
          title: "Lasting climate impact",
          description: "Turning real deployments into results that hold.",
        },
        {
          icon: "journey",
          title: "Your own founder journey",
          description: "Looking after yourself through the highs, the doubts and the long weeks.",
        },
      ] satisfies ExchangePoint[],
    },
    formats: {
      heading: "How we get together",
      points: [
        {
          icon: "roundtable",
          title: "Roundtables",
          description: "Three to seven founders around one table, with a host and a guest who has been through it.",
        },
        {
          icon: "sprint",
          title: "Scaling sprints",
          description: "Dig into one problem with the same few faces.",
        },
        {
          icon: "evening",
          title: "Networking evenings",
          description: "A couple a year, kept small on purpose.",
        },
        {
          icon: "introduction",
          title: "Introductions we make ourselves",
          description: "Into a market, a customer or an investor, when it would help.",
        },
      ] satisfies ExchangePoint[],
    },
    /** Phones only: one more photo between the words and "What we talk about". */
    mobilePhoto: {
      src: `${IMG}/exchange-circle-discussion.webp`,
      alt: "A founder talking through a challenge in a small circle of peers",
      placeholder: "",
    } satisfies ExchangeMedia,
    /** Small-group conversations, stacked and overlapping. */
    photos: [
      {
        src: `${IMG}/exchange-sofa-conversation.webp`,
        alt: "Three founders in conversation on sofas by a window",
        placeholder: "",
      },
      {
        src: `${IMG}/exchange-laughing-together.webp`,
        alt: "Four founders laughing together over coffee",
        placeholder: "",
      },
      {
        src: `${IMG}/exchange-listening.webp`,
        alt: "A founder smiling as she listens during a roundtable",
        placeholder: "",
      },
    ] satisfies ExchangeMedia[],
  },

  why: {
    number: "02",
    label: "Why are we doing it?",
    quote: {
      text: "Being a founder can [[feel lonely]], even when you’re surrounded by people who want you to succeed. There’s a real relief in telling another founder what’s been keeping you up at night and hearing them say, [[‘I’ve been there too.’]]\nWe created the Better Earth Exchange to [[bring founders together]] for those conversations, so they can [[learn from what others have tried]] and leave with [[a clearer sense of what to do next]].",
      name: "Rebecca Sharpe",
      title: "Founder and Director, Better Earth Ventures",
    },
    intro:
      "We work with founders through programmes, summits, mentoring and visits. The Exchange is our way of giving back, with room for the conversations that rarely happen at a conference or in a boardroom.",
    photo: {
      src: `${IMG}/rebecca-sharpe.webp`,
      alt: "Rebecca Sharpe, Founder and Director of Better Earth Ventures",
      placeholder: "",
    } satisfies ExchangeMedia,
  },

  who: {
    number: "03",
    label: "Who is it for?",
    lead: "You might be a good fit if you are [[past the early-stage scramble]] and in the thick of growing.",
    points: [
      {
        icon: "growing",
        title: "You are building a climate business",
        description: "Climate, environmental or agrifoodtech, with a product in pilot or in market.",
      },
      {
        icon: "met",
        title: "We have met before",
        description: "At a summit, a visit, a mentoring session, a meetup or one of our programmes.",
      },
      {
        icon: "open",
        title: "There is no bar to clear",
        description: "No revenue, investment or headcount threshold.",
      },
    ] satisfies ExchangePoint[],
    membership:
      "Membership is by invitation. If you have worked with us before and would like to join, let us know and we will be in touch.",
    cta: {
      label: "I want to join the Exchange",
      /** The expression-of-interest form, which opens in a new tab. */
      href: "https://airtable.com/app6n4lZRApZX9cfG/pagorb7YfLuddVvXS/form",
    },
    photos: [
      {
        src: `${IMG}/exchange-roundtable.webp`,
        alt: "A small group of founders working through ideas around a table",
        placeholder: "",
      },
      {
        src: `${IMG}/climate-summit-10.webp`,
        alt: "Founders and partners smiling together at the Climate Innovation Summit",
        placeholder: "",
      },
    ] satisfies ExchangeMedia[],
  },

  /**
   * Optional: 3 to 5 short, anonymous founder quotes, once consent is obtained. Placeholders
   * show until then; set `show` to false to leave the row out entirely.
   */
  founderQuotes: {
    show: true,
    label: "In founders’ words",
    quotes: [
      { text: "", placeholder: "Anonymous founder quote, added once consent is given." },
      { text: "", placeholder: "Anonymous founder quote, added once consent is given." },
      { text: "", placeholder: "Anonymous founder quote, added once consent is given." },
    ],
  },
} as const;
