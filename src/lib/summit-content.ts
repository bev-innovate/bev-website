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
    /** Matches the line set into the key visual, so the page and the artwork agree. */
    headline: "Where climate founders come to scale",
    standfirst:
      "Three days bringing together climate entrepreneurs, investors, corporates and policymakers from around the world: anchored by the ClimateLaunchpad Global Grand Final and the PepsiCo Greenhouse Program APAC Showcase — Impact Edition.",
    /** Rendered as a monospace data row under the headline. */
    facts: [
      { label: "Dates", value: "13 – 15 October 2026", tbc: false },
      { label: "Location", value: "Singapore", tbc: false },
      { label: "Venue", value: "Shared upon confirmation", tbc: false },
      { label: "Guests from", value: "50 countries", tbc: false },
    ],
    primary: { label: "Register your interest", href: "#signup" },
    secondary: { label: "Partner with us", href: "/contact" },
    /**
     * The official key visual, cropped above its partner strip. It carries the summit
     * name and line already, so nothing is overlaid on it.
     */
    image: `${IMG}/summit-key-visual.webp`,
  },

  partners: {
    organisedBy: [
      { name: "Better Earth Ventures", logo: `${IMG}/logos-bev-lockup.webp` },
      { name: "ClimateLaunchpad", logo: `${IMG}/summit-climatelaunchpad.webp`, note: "Powered by Climate-KIC" },
    ],
    supportedBy: [
      {
        name: "Government of Ireland: International Development Programme",
        logo: `${IMG}/summit-irish-aid.webp`,
      },
      { name: "Bank of America", logo: `${IMG}/summit-bofa.webp` },
      { name: "Greenhouse", logo: `${IMG}/summit-greenhouse.webp` },
      // Still awaiting a logo file; renders as a typographic lockup until one lands.
      { name: "Sustainability Women", logo: null },
    ],
  },

  about: {
    heading: "Three days built around tangible outcomes",
    paragraphs: [
      "The Climate Innovation Summit Singapore moves climate solutions from proof of concept to proof of value. Founders arrive with something built. They leave with the customers, capital and partnerships that take it further. That is how it scales and creates impact.",
      "The programme is anchored by two events: the ClimateLaunchpad Global Grand Final, the largest green business ideas competition, and the PepsiCo Greenhouse Program APAC Showcase — Impact Edition.",
    ],
    texture: `${IMG}/climate-expedition-a-little-wild.webp`,
  },

  audience: {
    heading: "Who the summit is for",
    intro: "Three days designed for the people who carry climate solutions into the world.",
    items: [
      {
        title: "Founders",
        body: "You have built something that works, and you are ready for the customers, capital and partners who can take it further.",
      },
      {
        title: "Investors",
        body: "You are looking for climate ventures with real traction, in the region where deployment is moving fastest.",
      },
      {
        title: "Corporates",
        body: "You want a clear view of technology ready to deploy, and time with the founders you could pilot it with.",
      },
      {
        title: "Policymakers and ecosystem partners",
        body: "You are shaping the conditions that help climate innovation take root across Asia-Pacific.",
      },
    ],
  },

  /**
   * The three zones.
   *
   * `accent` is the zone's identity colour, and it is deliberately reused as the column
   * heading in the day-two agenda: once a reader has learned that Solve is orange here,
   * the agenda does not have to explain itself again.
   */
  zones: {
    heading: "Three zones, running side by side",
    intro:
      "On the open day all three run at once, so you can move between them as the day suits you.",
    items: [
      {
        key: "discover",
        name: "Discover",
        accent: "purple" as const,
        where: "Auditorium",
        purpose: "The main stage, for the sessions worth stopping everything to hear.",
        activities: [
          "Synthesis session on the futures we can see coming",
          "PepsiCo climate impact case study: scaling climate tech inside a global business",
          "Global Insights: founders on what building looks like in their country",
          "ClimateLaunchpad Global Grand Final, followed by networking",
        ],
      },
      {
        key: "solve",
        name: "Solve",
        accent: "orange" as const,
        where: "Solve-It Zone",
        purpose: "Bring a live problem and leave with a way through it.",
        activities: [
          "Hour-long takeovers hosted by partners and mentors",
          "Expertise on hand across legal, investment and team building",
          "Open drop-in for founders with a specific challenge",
        ],
      },
      {
        key: "connect",
        name: "Connect",
        accent: "teal" as const,
        where: "Coworking space",
        purpose: "Where the introductions happen, all day, without a schedule.",
        activities: [
          "Matchmaking Corner",
          "Collaboration Matrix: pledge what you will follow up on",
          "Open space for the conversations a session starts",
        ],
      },
    ],
  },

  /**
   * The three days.
   *
   * Each day carries an `access` label because only the middle day is open to everyone:
   * day one is for startups and mentors, day three is invite only. Someone deciding
   * whether to register needs that before they read a single session title.
   *
   * Day two is the only one with `zones` rather than `blocks`, because its three tracks
   * run at the same time. A single ordered list would imply a sequence that does not
   * exist.
   */
  agenda: {
    heading: "Three days, three different rooms to be in",
    days: [
      {
        ref: "D-01",
        date: "Tuesday 13 October",
        title: "Builders' Day",
        access: "Startups and mentors only",
        accent: "purple" as const,
        note: "Registration from 1:00pm, programme starts 1:30pm.",
        blocks: [
          {
            time: "13:30",
            title: "Founder talks",
            body: "Founders who have done it, on their background, their biggest mistake, their biggest win, and the one tip they would pass on.",
          },
          {
            time: "14:30",
            title: "Founder Circle",
            body: "Mini roundtables where each founder puts a live challenge to the group, facilitated by the founders who just spoke.",
          },
          {
            time: "15:30",
            title: "Expert roundtables",
            body: "Choose your own adventure: three topics drawn from what founders told us they are wrestling with.",
            tbc: true,
          },
          {
            time: "16:30",
            title: "One-to-one mentoring",
            body: "Matched in advance on the question you submit, so the conversation starts already useful.",
          },
          { time: "Evening", title: "VIP reception" },
        ],
      },
      {
        ref: "D-02",
        date: "Wednesday 14 October",
        title: "The open day",
        access: "Open to all registered attendees",
        accent: "teal" as const,
        note: "All three zones run at once. Move between them as the day suits you.",
        zones: ["discover", "solve", "connect"],
        blocks: [
          { time: "11:30", title: "Solve-It Zone opens", body: "Partner and mentor takeovers, an hour at a time." },
          { time: "16:00", title: "ClimateLaunchpad Global Grand Final", body: "In the Discover Zone, followed by networking." },
        ],
      },
      {
        ref: "D-03",
        date: "Thursday 15 October",
        title: "PepsiCo Greenhouse Program APAC Showcase — Impact Edition",
        access: "Invite only",
        accent: "orange" as const,
        note: "From around 10:30am.",
        blocks: [
          {
            time: "10:30",
            title: "Impact Edition showcase",
            body: "An impact framework applied to five returning startups from the four-year APAC accelerator.",
          },
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
