/**
 * Climate Innovation Summit Singapore — page content.
 *
 * Partners are real. Everything else is deliberate placeholder: the shape is correct so
 * the templates can be reviewed, but the words, dates, speakers and startups all need
 * replacing. Anything still to be confirmed is marked `tbc: true`, which renders a visible
 * "TBC" chip rather than quietly passing off filler as fact.
 *
 * Moves into Sanity once the section structure is signed off.
 */

const IMG = "/images";

export interface SummitSpeaker {
  name: string;
  role: string;
  org: string;
  /** Specimen index shown in the annotation, e.g. "SPK-04". */
  ref: string;
  image?: string;
  tbc?: boolean;
}

export interface SummitStartup {
  name: string;
  sector: string;
  country: string;
  ref: string;
  blurb: string;
  tbc?: boolean;
}

export const summit = {
  slug: "summit",
  name: "Climate Innovation Summit Singapore",

  hero: {
    headline: "Where climate solutions meet proof of value",
    standfirst:
      "Three days bringing together climate entrepreneurs, investors, corporates and policymakers from around the world: anchored by the ClimateLaunchpad Global Grand Final and the PepsiCo Greenhouse Program APAC Showcase.",
    /** Rendered as a monospace data row under the headline. */
    facts: [
      { label: "Dates", value: "13 – 15 October 2026", tbc: false },
      { label: "Location", value: "Singapore", tbc: false },
      { label: "Venue", value: "To be announced", tbc: true },
      { label: "Countries", value: "50", tbc: false },
    ],
    primary: { label: "Register your interest", href: "#signup" },
    secondary: { label: "Partner with us", href: "/contact" },
    image: `${IMG}/hero-miscellaneous-singapore-gardens.webp`,
  },

  partners: {
    organisedBy: [
      { name: "Better Earth Ventures", logo: `${IMG}/logos-better-earth-ventures-logo.webp` },
      { name: "ClimateLaunchpad", logo: `${IMG}/logos-climatekic-logo.webp`, note: "Powered by Climate-KIC" },
    ],
    supportedBy: [
      { name: "Government of Ireland: International Development Programme", logo: null },
      { name: "Bank of America", logo: null },
      { name: "Greenhouse", logo: null },
      { name: "Sustainability Women", logo: null },
    ],
  },

  about: {
    heading: "Three days built around commercial outcomes",
    paragraphs: [
      "The Climate Innovation Summit Singapore moves climate solutions from proof of concept to proof of value. Founders arrive with something built. They leave with the customers, capital and partnerships that decide whether it scales.",
      "The programme is anchored by two events that already draw the world to Singapore: the ClimateLaunchpad Global Grand Final, the largest green business ideas competition, and the PepsiCo Greenhouse Program APAC Showcase.",
    ],
    /** Specimen grid — the measurable claims. */
    specimens: [
      { ref: "S-01", value: "50", label: "Countries represented" },
      { ref: "S-02", value: "3", label: "Days" },
      { ref: "S-03", value: "TBC", label: "Founders on stage", tbc: true },
      { ref: "S-04", value: "TBC", label: "Investors attending", tbc: true },
    ],
    texture: `${IMG}/climate-expedition-a-little-wild.webp`,
  },

  strands: {
    heading: "Four strands running across three days",
    intro:
      "Every strand is designed to produce something concrete: a pilot conversation, a term sheet, a policy commitment.",
    items: [
      {
        ref: "ST-01",
        title: "Founder roundtables",
        body: "Closed-door sessions where early-stage founders put live commercialisation problems to operators who have solved them.",
      },
      {
        ref: "ST-02",
        title: "Proof of value showcase",
        body: "Companies present deployed technology and the evidence behind it: pilots run, yields moved, emissions avoided.",
      },
      {
        ref: "ST-03",
        title: "Capital and corporate matching",
        body: "Structured one-to-one meetings between founders, investors and corporate buyers, matched on sector and stage.",
      },
      {
        ref: "ST-04",
        title: "ClimateLaunchpad Global Grand Final",
        body: "The world's largest green business ideas competition crowns its winner, in its thirteenth year.",
      },
    ],
  },

  timeline: {
    heading: "Three days, one arc",
    days: [
      {
        ref: "D-01",
        date: "13 October",
        title: "Proof of concept",
        blocks: [
          { time: "09:00", title: "Opening and framing", tbc: true },
          { time: "10:30", title: "Founder roundtables: round one", tbc: true },
          { time: "14:00", title: "Deep-dive clinics by sector", tbc: true },
          { time: "18:00", title: "Welcome reception", tbc: true },
        ],
      },
      {
        ref: "D-02",
        date: "14 October",
        title: "Proof of value",
        blocks: [
          { time: "09:00", title: "Keynote", tbc: true },
          { time: "10:30", title: "Proof of value showcase", tbc: true },
          { time: "13:30", title: "Capital and corporate matching", tbc: true },
          { time: "19:00", title: "Summit dinner", tbc: true },
        ],
      },
      {
        ref: "D-03",
        date: "15 October",
        title: "Global Grand Final",
        blocks: [
          { time: "09:30", title: "ClimateLaunchpad Global Grand Final", tbc: true },
          { time: "14:00", title: "PepsiCo Greenhouse APAC Showcase", tbc: true },
          { time: "16:30", title: "Awards and close", tbc: true },
        ],
      },
    ],
  },

  speakers: {
    heading: "Who you will hear from",
    items: Array.from({ length: 8 }, (_, i) => ({
      name: "To be announced",
      role: "Role to be confirmed",
      org: "Organisation",
      ref: `SPK-${String(i + 1).padStart(2, "0")}`,
      tbc: true,
    })) as SummitSpeaker[],
  },

  startups: {
    heading: "Companies on the floor",
    items: [
      {
        name: "Algenie",
        sector: "Biotech & biomaterials",
        country: "Singapore",
        ref: "V-01",
        blurb: "Scaling algae cultivation for low-carbon protein and materials.",
      },
      {
        name: "DayaTani",
        sector: "Agricultural value chain",
        country: "Indonesia",
        ref: "V-02",
        blurb: "Digitising smallholder supply chains for income and traceability.",
      },
      {
        name: "Living Roots",
        sector: "Novel farming practices",
        country: "Thailand",
        ref: "V-03",
        blurb: "Regenerative and syntropic agroforestry that rebuilds soil carbon.",
      },
      {
        name: "Polar Cold",
        sector: "Water & energy management",
        country: "Philippines",
        ref: "V-04",
        blurb: "Low-energy modular cold chain for perishables in tropical markets.",
      },
      {
        name: "Rainstick",
        sector: "Novel farming practices",
        country: "Australia",
        ref: "V-05",
        blurb: "Electric-field technology raising yield and cutting input intensity.",
      },
      {
        name: "N&E Innovations",
        sector: "Supply chain",
        country: "Singapore",
        ref: "V-06",
        blurb: "Upcycling food waste into antimicrobial shelf-life materials.",
      },
    ] as SummitStartup[],
  },

  signup: {
    heading: "Be first to know when registration opens",
    body: "We release delegate places and speaker announcements to this list before anywhere else. No other mail.",
    footnote: "Registration opens 2026. Partner and sponsor enquiries welcome any time.",
  },
} as const;
