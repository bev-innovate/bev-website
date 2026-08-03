/**
 * Seed content for the first draft.
 *
 * Everything here mirrors real content pulled from the live Wix site (via the Wix Blog
 * API) and public announcements, so the rebuild is reviewable before Sanity is wired up.
 * Once the Sanity project exists, this file becomes the migration payload —
 * `npm run seed:sanity` pushes it into the dataset — and the site reads from the CMS.
 *
 * Image URLs still point at Wix media. They render fine, but they should be migrated
 * into Sanity’s asset pipeline before the Wix subscription is cancelled.
 */

import type {
  Company,
  Partner,
  Person,
  Post,
  Programme,
  SiteEvent,
  SiteSettings,
} from "./types";

const WIX_MEDIA = "https://static.wixstatic.com/media";

export const siteSettings: SiteSettings = {
  title: "Better Earth Ventures",
  tagline: "Climate and agrifood innovation, built for Asia-Pacific",
  description:
    "Better Earth Ventures accelerates climate and agrifood tech startups across Asia-Pacific. We connect founders to capital, networks and strategic partners to scale solutions for people, place and planet.",
  stats: [
    {
      value: "370+",
      label: "Startups supported",
      detail: "Across accelerators, incubators and market-immersion programmes",
    },
    {
      value: "US$500m+",
      label: "Raised by alumni",
      detail: "Follow-on capital secured by companies our team has backed",
    },
    {
      value: "50",
      label: "Countries convening",
      detail: "Climate Innovation Summit Singapore, October 2026",
    },
    {
      value: "0%",
      label: "Equity taken",
      detail: "Our accelerator programmes are equity-free and fee-free",
    },
  ],
  contact: {
    email: "hello@betterearthventures.com",
    location: "Singapore",
  },
  social: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/company/better-earth-ventures" },
    { platform: "YouTube", url: "https://www.youtube.com/@betterearthventures" },
  ],
  navigation: [
    { label: "Programmes", href: "/programmes" },
    { label: "Approach", href: "/approach" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
  ],
};

export const partners: Partner[] = [
  { name: "EIT Climate-KIC", tier: "programme", url: "https://www.climate-kic.org" },
  { name: "ClimAccelerator", tier: "programme", url: "https://climaccelerator.climate-kic.org" },
  { name: "ClimateLaunchpad", tier: "programme", url: "https://climatelaunchpad.org" },
  { name: "Innovate UK", tier: "programme", url: "https://www.ukri.org/councils/innovate-uk/" },
  { name: "PepsiCo Greenhouse", tier: "programme" },
  { name: "FTW Ventures", tier: "ecosystem", url: "https://www.ftw.vc" },
  { name: "MarTech Collective", tier: "ecosystem" },
  { name: "Tomorrow Studio Ventures", tier: "ecosystem" },
  { name: "SGInnovate", tier: "ecosystem", url: "https://www.sginnovate.com" },
  { name: "Singapore International Agri-Food Week", tier: "ecosystem" },
  { name: "Wright Partners", tier: "ecosystem", url: "https://www.wright.partners" },
];

export const companies: Company[] = [
  {
    name: "Algenie",
    vertical: "Biotech & biomaterials",
    blurb: "Scaling algae cultivation for low-carbon protein and materials.",
    cohortYear: 2025,
  },
  {
    name: "DayaTani",
    country: "Indonesia",
    vertical: "Agricultural value chain",
    blurb: "Digitising smallholder supply chains to lift farmer incomes and traceability.",
    cohortYear: 2025,
  },
  {
    name: "KiwiLeather Innovations",
    country: "New Zealand",
    vertical: "Biotech & biomaterials",
    blurb: "Turning fruit-industry side streams into next-generation leather alternatives.",
    cohortYear: 2025,
    womenCofounded: true,
  },
  {
    name: "LambdAI Space",
    vertical: "Digital agriculture & smart farming",
    blurb: "Earth-observation and AI for crop and climate-risk intelligence.",
    cohortYear: 2025,
  },
  {
    name: "Living Roots",
    country: "Thailand",
    vertical: "Novel farming practices",
    blurb: "Regenerative and syntropic agroforestry systems that rebuild soil carbon.",
    cohortYear: 2025,
    womenCofounded: true,
  },
  {
    name: "N&E Innovations",
    country: "Singapore",
    vertical: "Agricultural value chain",
    blurb: "Upcycling food waste into antimicrobial materials that extend shelf life.",
    cohortYear: 2025,
    womenCofounded: true,
  },
  {
    name: "Polar Cold",
    vertical: "Water & energy management",
    blurb: "Low-energy cold chain for perishables in tropical markets.",
    cohortYear: 2025,
  },
  {
    name: "Rainstick",
    country: "Australia",
    vertical: "Novel farming practices",
    blurb: "Electric-field technology that raises crop yield and reduces input intensity.",
    cohortYear: 2025,
  },
  {
    name: "Stealth — enhanced rock weathering",
    vertical: "Carbon management",
    blurb: "Carbon removal through enhanced rock weathering on working farmland.",
    cohortYear: 2025,
  },
];

/**
 * Team names are sourced from public LinkedIn profiles. Titles and bios are placeholders —
 * confirm and replace before this goes live.
 */
export const people: Person[] = [
  { name: "Jamie Heng", role: "Better Earth Ventures", group: "team", order: 1 },
  { name: "Linhan Wu", role: "Better Earth Ventures", group: "team", order: 2 },
  { name: "Gerald Foo", role: "Better Earth Ventures", group: "team", order: 3 },
  { name: "Arunav Pal", role: "Better Earth Ventures", group: "team", order: 4 },
];

export const programmes: Programme[] = [
  {
    title: "AgriTech ClimAccelerator Singapore",
    slug: "climaccelerator",
    kicker: "6-month accelerator · with EIT Climate-KIC",
    summary:
      "A six-month, equity-free accelerator for agritech founders building climate solutions for Asia-Pacific’s most critical food systems — delivered with EIT Climate-KIC’s ClimAccelerator, the world’s largest climate accelerator network.",
    status: "closed",
    heroImage: `${WIX_MEDIA}/4d40e5_70ceffdd6b544e22918ff8278784bf54~mv2.jpg`,
    applicationDeadline: "2025-05-30",
    order: 1,
    keyFacts: [
      { label: "Duration", value: "6 months" },
      { label: "Equity taken", value: "None" },
      { label: "Participation fee", value: "None" },
      { label: "Demo Day", value: "Singapore" },
    ],
    verticals: [
      {
        title: "Novel farming practices",
        description: "Controlled-environment, regenerative and agroforestry systems.",
      },
      {
        title: "Agricultural value chain",
        description: "Traceability, post-harvest loss and market access for smallholders.",
      },
      {
        title: "Water & energy management",
        description: "Irrigation, cold chain and on-farm energy efficiency.",
      },
      {
        title: "Biotech & biomaterials",
        description: "Inputs, alternative proteins and side-stream valorisation.",
      },
      {
        title: "Carbon management",
        description: "Measurement, removal and credible on-farm carbon pathways.",
      },
      {
        title: "Digital agriculture & smart farming",
        description: "Sensing, remote sensing and decision intelligence.",
      },
    ],
    eligibility: [
      "Incorporated in Singapore, Australia, Thailand, Vietnam, Indonesia or New Zealand",
      "Technology Readiness Level 4 or higher — a validated prototype tested in a controlled environment",
      "A minimum of two core team members committed to the programme",
      "A climate-focused solution for food and agriculture",
    ],
    benefits: [
      "Expert mentorship from operators and investors across Asia-Pacific",
      "Business model and go-to-market refinement for regional scale",
      "Climate impact measurement using EIT Climate-KIC methodology",
      "Warm introductions to investors, grants and funding opportunities",
      "Corporate pilot and partnership matching",
      "Demo Day in Singapore in front of the region’s climate capital base",
    ],
    timeline: [
      {
        phase: "April 2025",
        title: "Applications open",
        description:
          "The call goes out across Asia-Pacific for agritech founders working on climate and food security.",
      },
      {
        phase: "30 May 2025",
        title: "Applications close",
        description: "Screening and selection against TRL, team and climate-impact criteria.",
      },
      {
        phase: "July 2025",
        title: "Cohort announced",
        description:
          "Nine standout companies join the inaugural cohort — nearly half co-founded by women.",
      },
      {
        phase: "Jul – Nov 2025",
        title: "Acceleration",
        description:
          "Mentorship, market immersion, impact measurement and investor readiness across six months.",
      },
      {
        phase: "6 November 2025",
        title: "Demo Day, Singapore",
        description:
          "The cohort presents to investors, corporates and ecosystem partners during Singapore International Agri-Food Week.",
      },
    ],
    faq: [
      {
        question: "Do you take equity?",
        answer:
          "No. The programme is equity-free and there is no participation fee. Startups fund their own travel and accommodation for Demo Day in Singapore.",
      },
      {
        question: "Is there direct funding?",
        answer:
          "The programme does not provide direct funding. Startups gain access to investors, grants and funding opportunities through our ecosystem.",
      },
      {
        question: "Which countries are eligible?",
        answer:
          "Startups incorporated in Singapore, Australia, Thailand, Vietnam, Indonesia and New Zealand.",
      },
      {
        question: "What stage should we be at?",
        answer:
          "Early- and growth-stage, at TRL 4 or above — you should have a validated prototype that has been tested in a controlled environment.",
      },
    ],
    partners: [
      { name: "EIT Climate-KIC", tier: "programme" },
      { name: "ClimAccelerator", tier: "programme" },
    ],
    cohort: companies,
  },
  {
    title: "Women Founders & Funders Singapore",
    slug: "women-founders-and-funders",
    kicker: "Annual pitch event · Singapore International Agri-Food Week",
    summary:
      "A pitch showcase and gathering that champions the ingenuity, resilience and impact of women shaping the future of food — and puts them in front of the investors and corporates who can back them.",
    status: "closed",
    heroImage: `${WIX_MEDIA}/4d40e5_261dfed6d6c843418eca61bb147d4cff~mv2.jpg`,
    order: 2,
    keyFacts: [
      { label: "Format", value: "Pitch event + networking" },
      { label: "Held during", value: "Singapore Intl. Agri-Food Week" },
      { label: "2024 attendance", value: "180+ leaders, 35% investors" },
      { label: "2025 applicant countries", value: "15" },
    ],
    benefits: [
      "Pitch to an audience of agrifoodtech investors and corporate partners",
      "Selection into a cohort of ten founders profiled across the ecosystem",
      "Introductions through FTW Ventures, Better Earth Ventures and co-host networks",
      "Visibility during the region’s largest agrifood week",
    ],
    eligibility: [
      "Agrifoodtech companies raising a Seed or Series A round",
      "Women founders and co-founders driving measurable impact",
      "Businesses advancing diversity, inclusion or other social equity goals",
      "Available to pitch in person in Singapore on the event date",
    ],
    timeline: [
      {
        phase: "2024",
        title: "First edition",
        description:
          "Over 180 leaders joined, 35% of them investors, with ten founders pitching in Singapore.",
      },
      {
        phase: "2025",
        title: "Geographic expansion",
        description:
          "Applications doubled to 15 countries — Singapore (31%), New Zealand (14%) and Thailand (11%) led submissions, marking a shift toward Southeast Asian innovation hubs.",
      },
      {
        phase: "5 November 2025",
        title: "Pitch event",
        description:
          "Ten agrifoodtech trailblazers pitch during Singapore International Agri-Food Week.",
      },
    ],
    partners: [
      { name: "FTW Ventures", tier: "programme" },
      { name: "MarTech Collective", tier: "programme" },
      { name: "Tomorrow Studio Ventures", tier: "programme" },
    ],
  },
  {
    title: "Climate Innovation Summit Singapore",
    slug: "climate-innovation-summit",
    kicker: "13 – 15 October 2026 · Singapore",
    summary:
      "Three days bringing together climate entrepreneurs, investors, corporates and policymakers from around the world — anchored by the ClimateLaunchpad Global Grand Final and the PepsiCo Greenhouse Program APAC 2026 Showcase.",
    status: "upcoming",
    heroImage: `${WIX_MEDIA}/4d40e5_651b4396073a4a50bc3d12232183b33f~mv2.jpg`,
    order: 0,
    keyFacts: [
      { label: "Dates", value: "13 – 15 October 2026" },
      { label: "Location", value: "Singapore" },
      { label: "Countries represented", value: "50" },
      { label: "Anchored by", value: "ClimateLaunchpad Global Grand Final" },
    ],
    benefits: [
      "Founder roundtables on what it actually takes to commercialise climate innovation",
      "One-to-one mentor matching across the three days",
      "Strategic introductions to corporates, investors and policymakers",
      "The ClimateLaunchpad Global Grand Final, in its 13th year",
      "PepsiCo Greenhouse Program APAC 2026 Showcase: IMPACT edition",
    ],
    timeline: [
      {
        phase: "Day one",
        title: "Proof of concept",
        description:
          "Early-stage founders testing new ideas meet the mentors and operators who have done it before.",
      },
      {
        phase: "Day two",
        title: "Proof of value",
        description:
          "Honest conversations between entrepreneurs and customers about commercialising climate solutions.",
      },
      {
        phase: "Day three",
        title: "Global Grand Final",
        description:
          "ClimateLaunchpad crowns the world’s best green business ideas, alongside the PepsiCo Greenhouse APAC showcase.",
      },
    ],
    partners: [
      { name: "ClimateLaunchpad", tier: "programme" },
      { name: "EIT Climate-KIC", tier: "programme" },
      { name: "PepsiCo Greenhouse", tier: "programme" },
    ],
  },
  {
    title: "Global Incubator Programme — Cleantech",
    slug: "global-incubator-programme",
    kicker: "Market immersion · with Innovate UK",
    summary:
      "A market-immersion programme that lands international cleantech founders in Singapore and Southeast Asia — moving them beyond pitch decks into real conversations, pilots and partnerships.",
    status: "completed",
    order: 3,
    keyFacts: [
      { label: "2025 cohort", value: "8 UK startups" },
      { label: "Delivered with", value: "Innovate UK" },
      { label: "Focus", value: "Cross-border scaling" },
    ],
    benefits: [
      "Structured market immersion in Singapore and the wider region",
      "Customer and partner discovery with real buyers, not panels",
      "Regulatory and go-to-market orientation for Southeast Asia",
      "Pilot and partnership matchmaking",
    ],
    timeline: [
      {
        phase: "2025",
        title: "Eight UK cleantech startups",
        description:
          "Over months of market immersion, founders moved beyond pitch decks into real conversations, pilots and partnerships — from product to strategy, from potential to deployment.",
      },
    ],
    partners: [{ name: "Innovate UK", tier: "programme" }],
  },
  {
    title: "ClimateLaunchpad",
    slug: "climatelaunchpad",
    kicker: "The world’s largest green business ideas competition",
    summary:
      "The global competition for green business ideas, now in its 13th year. We run the Singapore national final and host the Global Grand Final in October 2026.",
    status: "open",
    order: 4,
    applyUrl: "https://climatelaunchpad.org",
    keyFacts: [
      { label: "Edition", value: "13th year" },
      { label: "Stage", value: "Idea to early prototype" },
      { label: "Cost", value: "Free to enter" },
      { label: "Global Grand Final", value: "Singapore, October 2026" },
    ],
    benefits: [
      "Coaching and boot camp for early-stage green business ideas",
      "A route into the EIT Climate-KIC acceleration pathway",
      "National final, regional final and Global Grand Final stages",
      "Global visibility across the ClimateLaunchpad alumni network",
    ],
    partners: [
      { name: "ClimateLaunchpad", tier: "programme" },
      { name: "EIT Climate-KIC", tier: "programme" },
    ],
  },
];

export const events: SiteEvent[] = [
  {
    title: "Climate Innovation Summit Singapore",
    slug: "climate-innovation-summit-2026",
    startDate: "2026-10-13T09:00:00+08:00",
    endDate: "2026-10-15T18:00:00+08:00",
    location: "Singapore",
    summary:
      "Entrepreneurs from 50 countries convene for three days of founder roundtables, mentor matching and the ClimateLaunchpad Global Grand Final.",
    image: `${WIX_MEDIA}/4d40e5_651b4396073a4a50bc3d12232183b33f~mv2.jpg`,
  },
];

/** All 11 posts published on the Wix site, newest first. */
export const posts: Post[] = [
  {
    title:
      "Singapore to Host Entrepreneurs from 50 Countries for New Global Climate Innovation Summit",
    slug: "announcing-climate-innovation-summit",
    publishedAt: "2026-07-15T08:23:47Z",
    readingTime: 6,
    category: "News",
    featured: true,
    coverImage: `${WIX_MEDIA}/4d40e5_651b4396073a4a50bc3d12232183b33f~mv2.jpg`,
    excerpt:
      "The inaugural Climate Innovation Summit Singapore will bring together the people, partnerships and practical pathways needed to move climate solutions from proof of concept to proof of value.",
  },
  {
    title:
      "Applications are open for ClimateLaunchpad, the world’s largest green business ideas competition",
    slug: "applications-are-open-for-climatelaunchpad-the-world-s-largest-green-business-ideas-competition",
    publishedAt: "2026-03-10T06:59:15Z",
    readingTime: 4,
    category: "Programme",
    featured: true,
    coverImage: `${WIX_MEDIA}/4d40e5_953e2f52c9014236a4b84dab52fc18d6~mv2.jpg`,
    excerpt:
      "Applications are open for ClimateLaunchpad, the world’s largest green business ideas competition.",
  },
  {
    title: "InnovateUK Global Incubator Programme Cleantech 2025",
    slug: "innovateuk-global-incubator-programme-cleantech-2025",
    publishedAt: "2026-02-07T02:30:44Z",
    readingTime: 2,
    category: "Programme",
    featured: true,
    coverImage: "https://i.ytimg.com/vi/zwz0ZGhXVkc/maxresdefault.jpg",
    excerpt:
      "We were grateful to have hosted 8 UK startups under the Innovate UK Global Incubator Programme Cleantech Singapore 2025. Over months of market immersion, founders moved beyond pitch decks into real conversations, pilots, and partnerships.",
  },
  {
    title: "Soil Systems Discovery: A Better Earth (Ad)Venture",
    slug: "soil-systems-discovery-a-better-earth-ad-venture",
    publishedAt: "2026-02-07T01:59:50Z",
    readingTime: 4,
    category: "Field notes",
    coverImage: `${WIX_MEDIA}/4d40e5_2ba3bf2f6d204d70be08a3687871425e~mv2.png`,
    excerpt:
      "On our Better Earth Ventures Climate Expedition in northern Thailand, I moved beyond pitch decks into the lived reality of regenerative agriculture. Real climate progress is relational, systemic, and slower than slides suggest.",
  },
  {
    title: "Women Founders & Funders Singapore 2025: Celebrating Agrifood Innovation",
    slug: "women-founders-and-funders-singapore-2025-unveils-10-agrifoodtech-trailblazers-driving-global-change",
    publishedAt: "2025-10-14T01:28:09Z",
    readingTime: 4,
    category: "News",
    tags: ["womenfoufun"],
    coverImage: `${WIX_MEDIA}/4d40e5_261dfed6d6c843418eca61bb147d4cff~mv2.jpg`,
    excerpt:
      "These founders were selected from a competitive pool spanning 15 countries — a 2x increase — with Singapore, New Zealand and Thailand leading submissions and signalling a shift toward Southeast Asian innovation hubs.",
  },
  {
    title: "Women Founders & Funders: A Movement for Change",
    slug: "women-founders-and-funders-returns-during-siaw-2025",
    publishedAt: "2025-07-31T08:10:15Z",
    readingTime: 2,
    category: "Ecosystem",
    coverImage: `${WIX_MEDIA}/4d40e5_105fe0aabe794ae7a563289b89677850~mv2.jpeg`,
    excerpt:
      "When women lead, systems change. That belief fuels our return to Women Founders & Funders Singapore during Singapore International Agrifood Week.",
  },
  {
    title: "Better Earth Ventures Goes A Little Wild in Johor",
    slug: "better-earth-ventures-goes-a-little-wild",
    publishedAt: "2025-07-16T02:31:52Z",
    readingTime: 3,
    category: "Field notes",
    tags: ["syntropicagroforestry", "syntropy"],
    coverImage: `${WIX_MEDIA}/4d40e5_39d7da7e3ac3477090381929a58616f1~mv2.jpg`,
    excerpt:
      "Did you know there’s a 138-acre farm in Johor that grows food by accelerating natural processes? It uses no fertilizers and no chemicals.",
  },
  {
    title: "Agritech ClimAccelerator Singapore: A New Era of Climate Innovation",
    slug: "agritech-climaccelerator-singapore-kicks-off-with-cohort-of-9-climate-tech-pioneers",
    publishedAt: "2025-07-16T02:16:13Z",
    readingTime: 3,
    category: "Programme",
    tags: ["climacceleratorsg"],
    coverImage: `${WIX_MEDIA}/4d40e5_70ceffdd6b544e22918ff8278784bf54~mv2.jpg`,
    excerpt:
      "Today we mark a milestone for the APAC climate innovation ecosystem — a new cohort of founders bringing bold ideas and deep conviction to the region’s urgent challenges.",
  },
  {
    title: "Agritech ClimAccelerator launches in Singapore with Better Earth Ventures",
    slug: "agritech-climaccelerator-launches-in-singapore-with-better-earth-ventures",
    publishedAt: "2025-04-06T08:09:03Z",
    readingTime: 3,
    category: "Programme",
    tags: ["climacceleratorsg"],
    coverImage: `${WIX_MEDIA}/4d40e5_8c846734ba0c49738905a8b5c7590944~mv2.jpg`,
    excerpt:
      "The Agritech ClimAccelerator Singapore, a leading global platform for climate-focused startups, is launching its first agritech programme in Asia-Pacific.",
  },
  {
    title:
      "Fueling innovation and change: Better Earth Ventures ignites agrifoodtech meetups in Singapore!",
    slug: "fueling-innovation-and-change-better-earth-ventures-ignites-agrifoodtech-meetups-in-singapore",
    publishedAt: "2025-03-27T08:06:26Z",
    readingTime: 2,
    category: "Ecosystem",
    tags: ["culcon"],
    coverImage: `${WIX_MEDIA}/4d40e5_3a23db5f0c994a59a0da891b7aa6a993~mv2.jpg`,
    excerpt:
      "Cultivating Connections, an agrifoodtech event uniting Singapore-based innovators accelerating the transition to better food systems.",
  },
  {
    title:
      "Unlocking Opportunities in the Asia-Pacific Agrifoodtech Ecosystem: Join us at Singapore International Agri-Food Week 2025",
    slug: "unlocking-opportunities-in-the-asia-pacific-agrifoodtech-ecosystem-join-us-at-singapore-internation",
    publishedAt: "2025-02-13T08:07:37Z",
    readingTime: 2,
    category: "Ecosystem",
    coverImage: `${WIX_MEDIA}/4d40e5_f2686ad2ce0a4d34b4026532e4c42690~mv2.png`,
    excerpt:
      "Are you an agrifoodtech entrepreneur, investor, corporate leader, student, or researcher looking to expand your presence in the region?",
  },
].map((post) => ({
  ...post,
  // Full article bodies still live on Wix. Until they are migrated into Sanity, the
  // article page renders the excerpt and links out to the original.
  externalUrl: `https://www.betterearthventures.com/post/${post.slug}`,
}));

/** The three pillars the Wix site organises its offer around. */
export const pillars = [
  {
    title: "Acceleration Services",
    slug: "acceleration",
    description:
      "Bespoke acceleration pathways that strengthen the success of startup and scaleup portfolios, drawing on a global network of mentors, collaborators and strategic partners.",
    points: [
      "Programme design and delivery",
      "Mentor and expert matching",
      "Investor readiness and impact measurement",
    ],
  },
  {
    title: "Better Earth Exchange",
    slug: "exchange",
    description:
      "Founder roundtables, curated events and ecosystem gatherings that build the trusted relationships innovation actually runs on — entrepreneurs, investors, researchers, corporates and change-makers in the same room.",
    points: [
      "Founder roundtables",
      "Curated ecosystem events",
      "Cross-border market immersion",
    ],
  },
  {
    title: "Better Earth Institute",
    slug: "institute",
    description:
      "Research and field notes that illuminate the evolving sustainability and climate innovation landscape, so founders and funders can act on what is actually happening on the ground.",
    points: ["Landscape research", "Field notes and expeditions", "Ecosystem intelligence"],
  },
];
