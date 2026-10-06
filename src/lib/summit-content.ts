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

/**
 * Registration runs on an Airtable form. Every "Register" button on the page points here,
 * so when the form moves this is the only line to change.
 */
export const REGISTRATION_URL = "https://airtable.com/appVwyAexJiS2hcEv/pagKMLUZed9WoSwXQ/form";

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

type Accent = "purple" | "orange" | "teal";

/**
 * A named speaker in the agenda, shown as a small card with their headshot.
 *
 * Headshots are picked up by name: drop `public/images/speakers/<slug>.webp` (or .jpg or
 * .png), where the slug is the name in lower case with hyphens, e.g. `kia-hallaji.webp`.
 * Until a file exists the card shows the speaker's initials in the same square.
 */
export interface AgendaSpeaker {
  name: string;
  /** Designation. Left out where we have not confirmed it, rather than guessed. */
  role?: string;
  org?: string;
  /** A small label above the name, e.g. "Guest of Honour" or "Moderator". */
  label?: string;
  /** Their LinkedIn profile. The name links to it when present. */
  linkedin?: string;
}

/** One line in the agenda. */
export interface AgendaSession {
  time: string;
  title: string;
  /** Who is leading it, connecting word included ("by", "with"). Set lighter than the title. */
  by?: string;
  /** One or two sentences under the title, for sessions that need explaining. */
  blurb?: string;
  speakers?: AgendaSpeaker[];
  /** A graphic shown whole under the session, for artwork with its own text in it. */
  image?: { src: string; alt: string; width: number; height: number };
  /**
   * A short list under the blurb, e.g. the companies in a programme's cohort. Each body
   * carries on from the name in bold, so it starts mid-sentence ("are using…").
   */
  list?: { heading: string; items: { name: string; body: string }[] };
  /** A line of small print after the list, e.g. who can attend. */
  note?: string;
  /** A button for sessions with their own registration. Opens in a new tab. */
  cta?: { label: string; href: string };
  /** Arrivals and breaks: a single quiet line. */
  quiet?: boolean;
  tbc?: boolean;
}

/** A stretch of the day where two things run at once, shown as side-by-side columns. */
export interface AgendaWindow {
  time: string;
  heading: string;
  aside: string;
  lanes: { name: string; accent: Accent; hint?: string; sessions: AgendaSession[] }[];
}

/** A Grand Final team: where they are from, and who is pitching. */
export interface Finalist {
  venture: string;
  country: string;
  /** Flag file in public/images/flags, by ISO country code. */
  flag: string;
  region: string;
  people: AgendaSpeaker[];
}

export interface AgendaDay {
  ref: string;
  date: string;
  title: string;
  access: string;
  accent: Accent;
  note?: string;
  sessions: AgendaSession[];
  window?: AgendaWindow;
  /** Sessions after the window closes. */
  after?: AgendaSession[];
  /** The day's headline moment, set as its own card with the people in it. */
  feature?: {
    time: string;
    title: string;
    sub: string;
    logo: string;
    moderators: AgendaSpeaker[];
    finalists: Finalist[];
  };
}

export const summit = {
  slug: "summit",
  name: "Climate Innovation Summit Singapore",

  hero: {
    /** Matches the line set into the key visual, so the page and the artwork agree. */
    headline: "Where climate founders come to scale",
    standfirst:
      "Three days bringing together climate entrepreneurs, investors, corporates and policymakers from around the world: anchored by the ClimateLaunchpad Global Grand Final and the PepsiCo Greenhouse Program APAC 2026: The IMPACT Edition.",
    /** Rendered as a monospace data row under the headline. */
    facts: [
      { label: "Dates", value: "13 – 15 October 2026", tbc: false },
      { label: "Location", value: "Singapore", tbc: false },
      { label: "Venue", value: "Shared upon confirmation", tbc: false },
      { label: "Guests from", value: "50 countries", tbc: false },
    ],
    primary: { label: "Register now", href: REGISTRATION_URL },
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
      { name: "PepsiCo", logo: `${IMG}/summit-pepsico.webp` },
      { name: "Greenhouse", logo: `${IMG}/summit-greenhouse.webp` },
      { name: "Singapore Global Network", logo: `${IMG}/summit-singapore-global-network.webp` },
    ],
    community: [
      { name: "Sustainability Women", logo: `${IMG}/summit-sustainability-women.webp` },
      { name: "Epic Angels", logo: `${IMG}/summit-epic-angels.webp` },
    ],
  },

  about: {
    heading: "Three days built around tangible outcomes",
    paragraphs: [
      "The Climate Innovation Summit Singapore moves climate solutions from proof of concept to proof of value. Founders arrive with something built. They leave with the customers, capital and partnerships that take it further. That is how it scales and creates impact.",
      "The programme is anchored by two events: the ClimateLaunchpad Global Grand Final, the largest green business ideas competition, and the PepsiCo Greenhouse Program APAC 2026: The IMPACT Edition.",
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
   * heading in the day-two agenda: once a reader has learned that Solve-It Zone is orange here,
   * the agenda does not have to explain itself again.
   *
   * `where` is held here but not currently rendered: the rooms are not confirmed publicly
   * yet, and the zone names carry the page on their own. It is one line to put back.
   */
  zones: {
    heading: "Three zones, running side by side",
    intro:
      "Each zone has a different purpose, so there is something useful for you whether you have come to learn, to work through a problem or to meet the right people.",
    items: [
      {
        key: "discover",
        name: "Discover",
        accent: "purple" as const,
        where: "Auditorium",
        image: `${IMG}/climate-summit-7.webp`,
        purpose:
          "The main stage, where we bring together different perspectives on climate innovation and practical ideas you can take away and build on.",
        activities: [
          "Talks and panels from founders, corporates, investors and policymakers",
          "Real case studies of climate solutions moving from pilot to scale",
          "Interactive sessions that leave you with something to act on",
          "The ClimateLaunchpad Global Grand Final, with some of the world’s best early-stage green ventures",
        ],
      },
      {
        key: "solve",
        name: "Solve-It Zone",
        accent: "orange" as const,
        where: "Solve-It Zone",
        image: `${IMG}/climate-summit-4.webp`,
        purpose: "Bring a live problem and leave with a way through it.",
        activities: [
          "Working sessions hosted by partners and mentors, an hour at a time",
          "Specialists on hand for the questions founders get stuck on",
          "Drop in without booking, the moment a question comes up",
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
   * The three days, from the agenda of 29 September.
   *
   * Sessions are one line each: a title, and who is leading it where the agenda names
   * them. Descriptions are left to the day, so the page reads as a timetable and does not
   * promise a detail that might change.
   *
   * Left off deliberately: the finalists' pitch rehearsal (closed), seating calls, the
   * official photograph, and the closing film and break before the Grand Final.
   *
   * Each day carries an `access` label because only the middle day is open to everyone.
   * Someone deciding whether to register needs that before they read a session title.
   *
   * Day two has a `window`: three hours where the main stage and the Solve-It Zone clinics run
   * at the same time. It renders as two side-by-side columns, then the list closes back up.
   */
  agenda: {
    heading: "The agenda",
    intro:
      "Each day has its own theme, so people from across the climate ecosystem meet in different settings, with more chances to learn from one another, collaborate and act together.",
    days: [
      {
        ref: "D-01",
        date: "Tuesday 13 October",
        title: "Builders’ Day",
        access: "Founders and mentors only",
        accent: "purple",
        note: "A closed-door afternoon for founders. Mentors join from 4:15pm.",
        sessions: [
          { time: "1:00–1:15pm", title: "Arrival and founder welcome", quiet: true },
          { time: "1:15–1:30pm", title: "Opening", by: "by Better Earth Ventures and Climate KIC" },
          {
            time: "1:30–2:05pm",
            title: "Founder stories: the things we learn by building",
            by: "with more founders to be announced",
            speakers: [
              {
                name: "Richard Savoie",
                role: "Founder & CEO",
                org: "Adiona",
                linkedin: "https://www.linkedin.com/in/richsavoie/",
              },
              {
                name: "Bolong Chew",
                role: "Co-founder & CEO",
                org: "GetSolar",
                linkedin: "https://www.linkedin.com/in/bolong/",
              },
              {
                name: "Aggie Blanco",
                role: "Founder",
                org: "WeBeings",
                linkedin: "https://www.linkedin.com/in/aggie-blanco-ugalde-093526276/",
              },
            ],
          },
          { time: "2:05–3:00pm", title: "Founder exchange roundtables" },
          { time: "3:00–3:15pm", title: "Founder reflections" },
          { time: "3:15–3:30pm", title: "Break", quiet: true },
          {
            time: "3:30–4:15pm",
            title: "Expert roundtables",
            by: "on corporate pilots, investment and capital, and team and culture",
            speakers: [
              {
                name: "Milly Pearson",
                linkedin: "https://www.linkedin.com/in/milly-pearson-bb904211a/",
                role: "APAC & India Sustainability, Strategy & Partnerships Manager",
                org: "PepsiCo",
              },
              {
                name: "Michael Hammer",
                role: "Program Management",
                org: "Atomic Brand Lab USA",
                linkedin: "https://www.linkedin.com/in/michaelhammer1/",
              },
              {
                name: "Axel Tan",
                role: "Director",
                org: "Octave Capital",
                linkedin: "https://www.linkedin.com/in/tanaxel/",
              },
              {
                name: "Ana Torralba Barallat",
                linkedin: "https://www.linkedin.com/in/ana-torralba-barallat/",
                role: "Trainer and Leadership Expert",
                org: "ClimateLaunchpad",
              },
            ],
          },
          { time: "4:15–4:30pm", title: "Break and mentor welcome", quiet: true },
          {
            time: "4:30–6:00pm",
            title: "1:1 founder mentoring",
            blurb:
              "Startups meet the Better Earth expert community for a series of one-to-one conversations, designed to unlock the advice that moves their businesses forward.",
          },
          { time: "6:00–8:00pm", title: "Founder and mentor reception" },
        ],
      },
      {
        ref: "D-02",
        date: "Wednesday 14 October",
        title: "Ecosystem Day",
        access: "Open to all registered attendees",
        accent: "teal",
        sessions: [
          { time: "10:30–11:00am", title: "Registration and arrival", quiet: true },
          {
            time: "11:00–11:20am",
            title: "Official welcome",
            by: "by Better Earth Ventures and Climate KIC, with an address by our Guest of Honour",
            speakers: [
              {
                name: "Ms Goh Hanyan",
                linkedin: "https://www.linkedin.com/in/hanyan-goh-bb22635b/",
                label: "Guest of Honour",
                role: "Senior Parliamentary Secretary",
                org: "Ministry of Sustainability and the Environment, and Ministry of Culture, Community and Youth",
              },
            ],
          },
        ],
        window: {
          time: "11:30am–2:30pm",
          heading: "Running side by side",
          aside: "Move between them as you like",
          lanes: [
            {
              name: "Main stage",
              accent: "purple",
              sessions: [
                {
                  time: "11:30am–12:30pm",
                  title: "100,000 futures: building for a world we can’t predict",
                  speakers: [
                    {
                      name: "Kia Hallaji",
                      role: "Head of Futures",
                      org: "Synthesis",
                      linkedin: "https://www.linkedin.com/in/kia-hallaji/",
                    },
                  ],
                },
                {
                  time: "12:30–12:50pm",
                  title: "Don’t lose yourself while saving the world",
                  speakers: [
                    {
                      name: "Mónica Avila Forero",
                      role: "Founder",
                      org: "A.L.M.A.R.A.",
                      linkedin: "https://www.linkedin.com/in/monica-avila-forero/",
                    },
                  ],
                },
                {
                  time: "12:50–1:10pm",
                  title: "Purpose and profit: building a climate company for impact and scale",
                  speakers: [
                    {
                      name: "Quentin Vaquette",
                      role: "Founding Partner",
                      org: "100x100",
                      linkedin: "https://www.linkedin.com/in/quentin-vaquette-1870ba12/",
                    },
                  ],
                },
                { time: "1:10–2:30pm", title: "Lunch, exhibition and networking" },
              ],
            },
            {
              name: "Solve-It Zone",
              accent: "orange",
              hint: "Drop-in clinics. No booking.",
              sessions: [
                { time: "11:30am–12:30pm", title: "Investment and finance" },
                { time: "12:30–1:30pm", title: "Impact and business models" },
                { time: "1:30–2:30pm", title: "Sustainability Women takeover" },
              ],
            },
          ],
        },
        after: [
          {
            time: "2:30–3:25pm",
            title: "Innovation to impact: scaling sustainable solutions through partnership",
            by: "a PepsiCo panel",
            blurb:
              "Four perspectives on what it takes for an innovation to move beyond a successful pilot: what earns investment and leadership support inside a global business, what makes farmers adopt new practices, what a startup learns working with a corporate and its growers, and what investors look for in a venture ready to scale.",
            speakers: [
              {
                name: "Briana van Strijp",
                label: "Moderator",
                role: "COO",
                org: "Climate KIC",
                linkedin: "https://www.linkedin.com/in/brianavanstrijp/",
              },
              {
                name: "Lisa Deng",
                role: "Chief Financial Officer, APAC Foods",
                org: "PepsiCo",
                linkedin: "https://www.linkedin.com/in/lisa-deng-b325a933/",
              },
              {
                name: "Colin Matthews",
                role: "APAC Agronomy Lead",
                org: "PepsiCo",
                linkedin: "https://www.linkedin.com/in/colin-matthews-34146114/",
              },
              {
                name: "Roozbeh Ravansari",
                role: "Founder and CEO",
                org: "X-Centric Sciences",
                linkedin: "https://www.linkedin.com/in/roozbeh-ravansari/",
              },
              {
                name: "Tim Heasley",
                role: "Partner, VCaaS Asia and MENA",
                org: "Artesian",
                linkedin: "https://www.linkedin.com/in/timheasley/",
              },
            ],
          },
          { time: "3:25–3:40pm", title: "Climate ecosystem spotlight" },
        ],
        feature: {
          time: "4:00–6:40pm",
          title: "ClimateLaunchpad 2026 Global Grand Final",
          sub: "Eight finalists from four continents pitch live, and the winners are announced on the night.",
          logo: `${IMG}/Climate_Launchpad_Logo_Ink_RGB.webp`,
          moderators: [
            {
              name: "Briana van Strijp",
              role: "COO",
              org: "Climate KIC",
              linkedin: "https://www.linkedin.com/in/brianavanstrijp/",
            },
            {
              name: "Alexandros Nikopoulos",
              role: "Entrepreneurship Programmes Orchestrator",
              org: "Climate KIC",
              linkedin: "https://www.linkedin.com/in/a-nikopoulos/",
            },
            {
              name: "Sofia Abid",
              linkedin: "https://www.linkedin.com/in/sofia-abid-255571143/",
            },
          ],
          finalists: [
            {
              venture: "Biospark Energy Solutions",
              country: "Nigeria",
              flag: "ng",
              region: "Africa",
              people: [
                {
                  name: "Afiniki Myha Bitrus",
                  linkedin: "https://www.linkedin.com/in/afiniki-bitrus-895380159/",
                },
              ],
            },
            {
              venture: "ReSursify",
              country: "South Africa",
              flag: "za",
              region: "Africa",
              people: [
                {
                  name: "Jody Reid Harvey",
                  linkedin: "https://www.linkedin.com/in/jody-reid-harvey-761bb931a/",
                },
              ],
            },
            {
              venture: "REQUECHO",
              country: "Argentina",
              flag: "ar",
              region: "Americas",
              people: [
                {
                  name: "Luciana Sabsay",
                  linkedin: "https://www.linkedin.com/in/luciana-sabsay-738aa013/",
                },
                {
                  name: "Veronica Litvinoff",
                  linkedin: "https://www.linkedin.com/in/veronica-litvinoff-87007512a/",
                },
              ],
            },
            {
              venture: "Yakusmart",
              country: "Peru",
              flag: "pe",
              region: "Americas",
              people: [
                { name: "Omar Gonzales", linkedin: "https://www.linkedin.com/in/gonzalesomar/" },
              ],
            },
            {
              venture: "Neusla",
              country: "Singapore",
              flag: "sg",
              region: "Asia-Pacific",
              people: [
                {
                  name: "Dilsha Kawindi",
                  linkedin: "https://www.linkedin.com/in/dilsha-kawindi-978235200/",
                },
              ],
            },
            {
              venture: "Saty",
              country: "Vietnam",
              flag: "vn",
              region: "Asia-Pacific",
              people: [{ name: "Huy Nguyen" }],
            },
            {
              venture: "Polium Scientific",
              country: "Turkey",
              flag: "tr",
              region: "Europe",
              people: [{ name: "Mehmet Coşan", linkedin: "https://www.linkedin.com/in/mcosan/" }],
            },
            {
              venture: "Carboslag",
              country: "Germany",
              flag: "de",
              region: "Europe",
              people: [
                {
                  name: "Tunca Beril Basaran",
                  linkedin: "https://www.linkedin.com/in/tunca-beril-basaran-a3580a147/",
                },
              ],
            },
          ],
        },
      },
      {
        ref: "D-03",
        date: "Thursday 15 October",
        title: "Impact Day",
        access: "Invite only",
        accent: "orange",
        sessions: [
          {
            time: "From 10:30am",
            title: "PepsiCo Greenhouse Program APAC 2026: The IMPACT Edition",
            blurb:
              "Join the agrifoodtech and climate ecosystem for the PepsiCo Greenhouse APAC 2026: IMPACT Edition Showcase with insights, connections, and discussions around the innovations driving the next generation of impact.",
            list: {
              heading: "2026 cohort",
              items: [
                {
                  name: "Adiona",
                  body: "are using AI-optimised logistics with the aim of improving route planning and fleet efficiency. They are studying how these tools could reduce fleet distances travelled across bottler networks, and build supply chain resilience.",
                },
                {
                  name: "Bali Waste Cycle",
                  body: "is employing a decentralised model to recover low-value plastics. They are assessing how their tech can support Extended Producer Responsibility readiness, and fit into PepsiCo’s broader packaging and waste management approaches.",
                },
                {
                  name: "Beijing AIForce Tech",
                  body: "are developing electric agricultural machinery designed to automate key farming processes and reduce emissions and labour dependency, while improving grower productivity. They are examining the operational feasibility and consequent impacts of utilising this tech.",
                },
                {
                  name: "Takachar",
                  body: "are creating mobile technology that converts crop residue into biochar-based soil amendments, reducing open burning, improving soil health and potentially supporting carbon-storage benefits. They are exploring how this tech could help reduce agricultural dependence on imported soil inputs, and improve soil health, within specific regional contexts.",
                },
                {
                  name: "X-Centric",
                  body: "are leveraging advanced digital soil health measurements to optimise farming inputs. They are evaluating how this soil data can be utilised to drive smarter, lower-impact agricultural decisions.",
                },
              ],
            },
            note: "Attendance is subject to approval.",
            cta: { label: "Register for the showcase", href: "https://luma.com/vclk4zy4" },
            image: {
              src: `${IMG}/summit-greenhouse-impact-edition.webp`,
              alt: "The five startups in the PepsiCo Greenhouse Program APAC 2026: Adiona (Richard Savoie, Australia), Bali Waste Cycle (Olivia Padang, Indonesia), Beijing AI ForceTech (Weihua Li, China), Takachar (Vidyut Mohan and Kevin Kung, Thailand) and X-Centric (Roozbeh Ravansari, Australia).",
              width: 1600,
              height: 900,
            },
          },
        ],
      },
    ] satisfies AgendaDay[] as AgendaDay[],
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

  /** The closing call to action, at the foot of the page. */
  register: {
    heading: "Registration is open",
    body: "Save your place for three days in Singapore, 13–15 October.",
    cta: { label: "Register now", href: REGISTRATION_URL },
  },
} as const;
