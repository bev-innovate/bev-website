/**
 * Better Earth Exchange: page content.
 *
 * Follows the finalised structure of 17 November: a three-part scroll (what it is, why we
 * are doing it, who it is for) that reads as a personal invitation, not a sales pitch.
 * Plenty of white space, the Exchange's teal and gold, real photographs from Better Earth
 * Ventures gatherings and no stock imagery.
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
      "Small groups of climate founders and business leaders, talking candidly about the challenges of growing a company. By invitation, from Better Earth Ventures.",
  },

  /** Preview stand-in, cropped from the LinkedIn page. Replace with the original file. */
  mark: { src: `${IMG}/exchange-mark-preview.webp`, alt: "Better Earth Exchange" },

  hero: {
    name: "Better Earth Exchange",
    headline: "A place for founders to talk openly.",
    /** The LinkedIn line, kept short: who it is for, in one breath. */
    lede: "A curated, founder-only community for climate and agrifoodtech entrepreneurs scaling their solutions across Asia-Pacific and beyond.",
    /**
     * A 20 to 30 second loop cut from the first London Exchange pilot: a soundbite from
     * each founder, real voices, no text on screen.
     */
    video: {
      src: "",
      captions: "",
      poster: "",
      label: "Video: voices from the first London Exchange",
      placeholder: "A 20 to 30 second loop with a soundbite from each founder. Real voices, no text.",
    },
  },

  what: {
    number: "01",
    label: "What is it?",
    body: "Building a business can be exciting, difficult and, at times, lonely. Better Earth Exchange brings small groups of founders and business leaders together to talk candidly about the challenges of growing a company. It is a trusted space to share what is working, what is not, and what others have learned along the way. No pitches, no presentations and no pressure to impress anyone. Just useful conversations with people who understand.",
    /** Real gatherings. Swap for photos from the London pilot when they are ready. */
    photos: [
      {
        src: `${IMG}/climate-summit-4.webp`,
        alt: "Founders deep in conversation around a table",
        placeholder: "",
      },
      {
        src: `${IMG}/climate-summit-6.webp`,
        alt: "Two founders smiling together",
        placeholder: "",
      },
      {
        src: `${IMG}/climate-summit-2.webp`,
        alt: "A founder listening closely during a session",
        placeholder: "",
      },
    ] satisfies ExchangeMedia[],
  },

  why: {
    number: "02",
    label: "Why are we doing it?",
    quote: {
      text: "Being a founder can feel lonely, even when you’re surrounded by people who want you to succeed. There’s a real relief in telling another founder what’s been keeping you up at night and hearing them say, ‘I’ve been there too.’ We created the Better Earth Exchange to bring founders together for those conversations, so they can learn from what others have tried and leave with a clearer sense of what to do next.",
      name: "Rebecca Sharpe",
      title: "Founder and Director, Better Earth Ventures",
    },
    intro:
      "Better Earth Ventures works with founders through programmes, summits, mentoring and visits. The Exchange is a way of giving back to the people we have met along the way, by creating room for the conversations that do not always happen at a conference or in a boardroom.",
    photo: {
      src: `${IMG}/hero-miscellaneous-climaccelerator-2025-cohort-photo.webp`,
      alt: "Founders from a Better Earth Ventures cohort celebrating together on stage",
      placeholder: "",
    } satisfies ExchangeMedia,
  },

  who: {
    number: "03",
    label: "Who is it for?",
    heading: "Founders we have met along the way",
    paragraphs: [
      "We bring together founders and senior leaders of growing climate and environmental businesses who have taken part in one of our initiatives. That might be a summit, a project or delegation visit, a mentoring session, a meetup, an accelerator, an incubator or another programme.",
      "Typically, they have a product in pilot or in market and are dealing with the realities of growth. There is no fixed revenue, investment or headcount threshold.",
      "Membership is by invitation only. If you have worked with us before and would like to be considered, we would be pleased to hear from you.",
    ],
    cta: {
      label: "I’ve worked with Better Earth Ventures: express interest",
      href: "/contact?interest=exchange#enquiry",
    },
    photos: [
      {
        src: `${IMG}/climate-summit-10.webp`,
        alt: "Founders and partners smiling together at the Climate Innovation Summit",
        placeholder: "",
      },
      {
        src: `${IMG}/hero-miscellaneous-iuk-enterprise-singapore-group.webp`,
        alt: "A visiting founder delegation in Singapore",
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
