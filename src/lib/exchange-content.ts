/**
 * Better Earth Exchange: page content.
 *
 * Follows the finalised structure: a three-part scroll (what it is, why we are doing it,
 * who it is for) that reads as a personal invitation, not a sales pitch. The official
 * description's points are woven into the team's own, warmer wording.
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
    paragraphs: [
      "Building a business can be exciting, difficult and, at times, lonely. Never more so than on the [[steepest part of the journey]]: [[securing major customers]], [[entering new markets]], [[fundraising internationally]], and turning real deployments into [[lasting climate impact]].",
      "Better Earth Exchange brings [[small groups of founders]] together to talk candidly about those challenges. It is a [[trusted space]] to share what is working, what is not, and the [[hard-won experience]] others have gathered along the way.",
      "Nobody is pitching and nobody is keeping score. You say what is really going on in your business, the others around the table share what has worked for them, and most people leave with [[an idea or two they can use on Monday]].",
      "Most of the time, it is a handful of founders around one table, somewhere between three and seven of you, with one of our team hosting and a guest who has been through it. We call these [[roundtables]], but they feel more like a long lunch with people who get it. There are [[scaling sprints]] for when you want to dig into one problem with the same few faces, and a couple of [[networking evenings]] a year that we keep small on purpose. When an introduction would help, into a market, a customer or an investor, [[we make it ourselves]].",
    ],
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
      text: "Being a founder can [[feel lonely]], even when you’re surrounded by people who want you to succeed. There’s a real relief in telling another founder what’s been keeping you up at night and hearing them say, [[‘I’ve been there too.’]] We created the Better Earth Exchange to [[bring founders together]] for those conversations, so they can [[learn from what others have tried]] and leave with [[a clearer sense of what to do next]].",
      name: "Rebecca Sharpe",
      title: "Founder and Director, Better Earth Ventures",
    },
    intro:
      "Better Earth Ventures works with founders through programmes, summits, mentoring and visits. The Exchange is a way of giving back to the people we have met along the way, by creating room for the conversations that do not always happen at a conference or in a boardroom.",
    photo: {
      src: `${IMG}/rebecca-sharpe.webp`,
      alt: "Rebecca Sharpe, Founder and Director of Better Earth Ventures",
      placeholder: "",
    } satisfies ExchangeMedia,
  },

  who: {
    number: "03",
    label: "Who is it for?",
    paragraphs: [
      "You might be a good fit if you run or help lead a [[climate, environmental or agrifoodtech business]] and you are [[past the early-stage scramble]]. Perhaps you have a product in pilot or in market, and now you are in the thick of growing it: landing bigger customers, opening a new market, raising your next round.",
      "We will probably have met before, at a summit, on a project or delegation visit, in a mentoring session, at a meetup, or through one of our accelerators, incubators or programmes.",
      "There is no revenue, investment or headcount bar to clear.",
      "Membership is by invitation. If you have worked with us before and would like to join, let us know and we will be in touch.",
    ],
    cta: {
      label: "I want to join the Exchange",
      href: "/contact?interest=exchange#enquiry",
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
