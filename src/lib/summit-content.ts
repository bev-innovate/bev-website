/**
 * Climate Innovation Summit Singapore: page content.
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
      "Three days bringing together climate entrepreneurs, investors, corporates and policymakers from around the world: anchored by the ClimateLaunchpad Global Grand Final and the PepsiCo Greenhouse Program APAC Showcase: Impact Edition.",
    /** Rendered as a monospace data row under the headline. */
    facts: [
      { label: "Dates", value: "13 – 15 October 2026", tbc: false },
      { label: "Location", value: "Singapore", tbc: false },
      { label: "Venue", value: "Shared upon confirmation", tbc: false },
      { label: "Guests from", value: "50 countries", tbc: false },
    ],
    primary: { label: "Register your interest", href: "#signup" },
    secondary: { label: "Browse agenda", href: "#agenda" },
    /** Mangroves from the air: the wash over it is drawn from the same greens and teals. */
    image: `${IMG}/climate-summit-background.webp`,
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
    ],
  },

  about: {
    heading: "Three days built around tangible outcomes",
    paragraphs: [
      "The Climate Innovation Summit Singapore moves climate solutions from proof of concept to proof of value. Founders arrive with something built. They leave with the customers, capital and partnerships that take it further. That is how it scales and creates impact.",
      "The programme is anchored by two events: the ClimateLaunchpad Global Grand Final, the largest green business ideas competition, and the PepsiCo Greenhouse Program APAC Showcase: Impact Edition.",
    ],
    texture: `${IMG}/climate-summit-8.webp`,
  },

  audience: {
    heading: "Who the summit is for",
    intro:
      "Everyone in the room needs something only one of the others can give. That is the whole design.",
    items: [
      {
        title: "Founders",
        body: "You have built something that works, and you are ready for the customers, capital and partners who can take it further.",
        image: `${IMG}/climate-summit-11.webp`,
      },
      {
        title: "Investors",
        body: "You are looking for climate ventures with real traction, in the region where deployment is moving fastest.",
        image: `${IMG}/climate-summit-2.webp`,
      },
      {
        title: "Corporates",
        body: "You want a clear view of technology ready to deploy, and time with the founders you could pilot it with.",
        image: `${IMG}/climate-summit-1.webp`,
      },
      {
        title: "Policymakers and ecosystem partners",
        body: "You are shaping the conditions that help climate innovation take root across Asia-Pacific.",
        image: `${IMG}/climate-summit-10.webp`,
      },
    ],
  },

  /**
   * The three zones.
   *
   * `accent` is the zone's identity colour, and it is deliberately reused as the column
   * heading in the day-two agenda: once a reader has learned that Solve is orange here,
   * the agenda does not have to explain itself again.
   *
   * `where` is held here but not currently rendered: the rooms are not confirmed publicly
   * yet, and the zone names carry the page on their own. It is one line to put back.
   */
  zones: {
    heading: "Three zones, running side by side",
    intro:
      "You are never stuck in one room. Follow whichever conversation is the useful one, and come back when the next thing starts.",
    items: [
      {
        key: "discover",
        name: "Discover",
        accent: "purple" as const,
        where: "Auditorium",
        image: `${IMG}/climate-summit-7.webp`,
        purpose: "The main stage, for the sessions worth stopping everything to hear.",
        activities: [
          "Where the climate economy is heading, from the people moving it",
          "Case studies from inside global businesses that have already deployed",
          "Founders from around the world on what building looks like where they are",
          "The ClimateLaunchpad Global Grand Final, and the celebration after it",
        ],
      },
      {
        key: "solve",
        name: "Solve",
        accent: "orange" as const,
        where: "Solve-It Zone",
        image: `${IMG}/climate-summit-4.webp`,
        purpose: "Bring a live problem and leave with a way through it.",
        activities: [
          "Working sessions hosted by partners and mentors, an hour at a time",
          "Specialists on hand for the questions founders get stuck on",
          "Open all day, so you can walk in the moment something comes up",
        ],
      },
      {
        key: "connect",
        name: "Connect",
        accent: "teal" as const,
        where: "Coworking space",
        image: `${IMG}/climate-summit-9.webp`,
        purpose: "Where the introductions happen, all day, without a schedule.",
        activities: [
          "A matchmaking corner for the introductions worth making",
          "Collaboration Matrix: discuss, brainstorm and pledge collaboration",
          "Room to carry on the conversation a session started",
        ],
      },
    ],
  },

  /**
   * The three days.
   *
   * Times and sessions come from the run sheets of 7 September. Everything internal to
   * running the event stays off the page: crew call times, venue readiness, the dress
   * rehearsal, who is flying in and when. So does anything still carrying a question mark
   * in the run sheet, and the names of roundtable hosts that are not yet confirmed.
   *
   * Each day carries an `access` label because only the middle day is open to everyone:
   * day one is for startups and mentors, day three is invite only. Someone deciding
   * whether to register needs that before they read a single session title.
   *
   * Day two also carries `zones`, because Solve and Connect run alongside its main-stage
   * programme rather than after it.
   */
  agenda: {
    heading: "The agenda",
    intro:
      "This is shaping up to be nothing like a regular summit. Each of the three days has its own focus, its own room and its own reason to be there.",
    days: [
      {
        ref: "D-01",
        date: "Tuesday 13 October",
        title: "Builders' Day",
        access: "Startups and mentors only",
        accent: "purple" as const,
        note: "Registration opens at 1:00pm. An afternoon and evening, not a full day.",
        blocks: [
          {
            time: "13:30",
            title: "Welcome address",
            body: "The conference opens.",
          },
          {
            time: "13:45",
            title: "Founder talks",
            body: "Founders who have done it, on their background, their biggest mistake, their biggest win, and the one tip they would pass on.",
          },
          {
            time: "14:45",
            title: "Founder Circle",
            body: "Mini roundtables where each founder puts a live challenge to the group, facilitated by the founders who just spoke.",
          },
          {
            time: "15:30",
            title: "Expert roundtables",
            body: "An hour across three tables: working with a corporate, raising and using investment, and building a team and a culture. Facilitated, so the conversation goes somewhere.",
          },
          { time: "16:30", title: "Tea" },
          {
            time: "16:45",
            title: "One-to-one mentoring",
            body: "An hour of it, matched in advance on the question you submit, so the conversation starts already useful.",
          },
          { time: "17:45", title: "Day one closes" },
          {
            time: "18:00",
            title: "VIP reception",
            body: "For ClimateLaunchpad finalists, PepsiCo executives, BEV alumni and invited guests. Until 8:30pm.",
          },
        ],
      },
      {
        ref: "D-02",
        date: "Wednesday 14 October",
        title: "Global Day",
        access: "Open to all registered attendees",
        accent: "teal" as const,
        note: "Solve and Connect run alongside the main programme, so you can step out and come back.",
        zones: ["discover", "solve", "connect"],
        blocks: [
          { time: "10:30", title: "Registration and arrival" },
          {
            time: "11:00",
            title: "Inspiration power hour",
            body: "An interactive data session on nutrition, run with the ClimateLaunchpad trainers.",
          },
          {
            time: "11:30",
            title: "Collaboration Matrix",
            body: "Discuss, brainstorm and pledge collaboration, with the people you would actually be doing it with.",
          },
          { time: "13:00", title: "Lunch and startup exhibition" },
          {
            time: "14:30",
            title: "PepsiCo panel",
            body: "One case study from four sides: PepsiCo's C-suite, the startup that ran the pilot, the team inside PepsiCo that ran it with them, and an investor.",
          },
          {
            time: "15:00",
            title: "Founder stories from across the globe",
            body: "Six founders, eight minutes each, interviewed on what building looks like where they are.",
          },
          {
            time: "16:00",
            title: "ClimateLaunchpad Global Grand Final",
            body: "In the Discover Zone until around 8:00pm, followed by networking.",
          },
        ],
      },
      {
        ref: "D-03",
        date: "Thursday 15 October",
        title: "Impact Day",
        access: "Invite only",
        accent: "orange" as const,
        note: "From around 10:30am.",
        blocks: [
          {
            time: "10:30",
            title: "PepsiCo Greenhouse Program APAC Showcase: Impact Edition",
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
  },
} as const;
