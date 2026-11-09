/**
 * The Exchange: page content.
 *
 * Copy as drafted in "The Exchange page: PRD and UX flow" (November 2026), focused on
 * climate founders. Alex's amended brief takes precedence wherever it differs.
 *
 * Three switches hold back what is not ready:
 * - `EXCHANGE_LIVE`: while false the page is left out of search engines and the sitemap,
 *   and nothing on the site links to it. It can still be opened by its address, so it can
 *   be reviewed on the live site before launch.
 * - `quote.approved`: Rebecca's quote is a starting draft for her to rewrite. It stays off
 *   the page until she has approved her own words.
 * - `groundRules.show`: whether the room's rules appear publicly is still an open question.
 */

const IMG = "/images";

export const EXCHANGE_LIVE = false;

export const exchange = {
  slug: "exchange",

  meta: {
    title: "The Exchange: by founders, for founders",
    description:
      "An invitation-only circle where climate founders meet as peers, powered by Better Earth Ventures.",
  },

  hero: {
    name: "The Exchange",
    lockup: "powered by Better Earth Ventures",
    strapline: "By founders, for founders.",
    intro:
      "A small, invitation-only circle where climate founders meet as peers, talk honestly about what it takes to build a company for the planet, and leave a little steadier than they arrived.",
    /**
     * The "voices of the exchange" film. Until it is edited, `src` stays empty and the
     * poster photograph shows on its own, with no play button.
     */
    video: {
      src: "",
      captions: "",
      poster: `${IMG}/climate-summit-6.webp`,
      posterAlt: "Two founders smiling together at a Better Earth Ventures gathering",
      caption: "Voices of the Exchange: founders at our July meetups.",
      playLabel: "Play · 30 seconds",
    },
  },

  what: {
    heading: "What happens around the table",
    body: "Each Exchange brings a handful of climate founders together, hosted by Better Earth Ventures with a guest who has built, backed or led climate ventures. The conversation belongs to the founders: what is keeping you up at night, what has worked, what you would do differently.",
    facts: [
      { title: "3 to 7 founders", line: "Small enough that everyone speaks" },
      { title: "A host and a guest expert", line: "To guide the conversation and add perspective" },
      {
        title: "Founder-level topics",
        line: "The questions every climate founder meets: cash flow, team, leadership, partnerships",
      },
    ],
    closing:
      "We keep the topics broad on purpose, so a founder in ocean tech and a founder in agrifood can learn from each other's answers.",
  },

  who: {
    heading: "Invitation only, so people can speak openly",
    paragraphs: [
      "Founders share more when they trust the room. Every seat at the Exchange is by invitation, extended to climate founders we have come to know through our summits, programmes, mentoring and visits.",
      "Most are a year or more into building a climate solution, with a product in market or a pilot under way. What matters most is coming ready to listen as generously as you share.",
    ],
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
    lead: "We have spent years bringing climate founders together through our programmes, from Singapore to London. The Exchange is our way of giving something back.",
    quote: {
      approved: false,
      text: "Building a climate company takes years, and the founder's seat can be a lonely one. Some of the most useful conversations I had were with people a few steps ahead of me, or right beside me, with nothing to sell. The Exchange is our way of making room for more of them.",
      name: "Rebecca",
      title: "",
      photo: "",
    },
  },

  closing: {
    lines: [
      "Invitations come directly from Rebecca and Alex. If one has reached you, simply reply to them; we would love to have you at the table.",
      "Better Earth Ventures brings the Exchange together and looks after it. The conversations belong to the founders.",
    ],
  },
} as const;
