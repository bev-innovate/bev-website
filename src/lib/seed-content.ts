/**
 * Seed content — transcribed from the previous Wix site.
 *
 * Copy is carried over as-is so this rebuild is a design change, not a content change.
 * Blog metadata came from the Wix Blog API; page copy was transcribed from full-page
 * screenshots of the four live pages (home, programmes, climate expeditions, news).
 *
 * Once Sanity is wired up this file becomes the migration payload (`npm run seed`) and
 * the site reads from the CMS instead.
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

/** Optimised WebP in public/images, produced by `npm run images`. */
const IMG = "/images";

export const siteSettings: SiteSettings = {
  title: "Better Earth Ventures",
  tagline: "Closing the gap between climate innovation and cross-border impact",
  description:
    "We help international climate and innovation companies scale in Singapore and Southeast Asia by creating tangible commercial outcomes through trusted local market access, strategic partnerships, and growth-focused ecosystem support.",
  stats: [
    { value: "70", label: "Startups accelerated" },
    { value: "100+", label: "Further start-ups mentored" },
    { value: "48%", label: "Women-led startups" },
    { value: "$120m", label: "USD in funding" },
    { value: "2200+", label: "Event attendees, ~82% decision makers" },
    { value: "98%", label: "Programme satisfaction score" },
    { value: "700+", label: "Jobs created" },
    { value: "15", label: "Markets for cross-border collaborations" },
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
    { label: "Summit", href: "/summit" },
    { label: "Programmes", href: "/programmes" },
    { label: "Climate Expeditions", href: "/climate-expeditions" },
    { label: "News", href: "/news" },
    { label: "About", href: "/about" },
  ],
};

/** Home — "Who we are" intro block. */
export const whoWeAre = {
  eyebrow: "Who we are",
  heading: "Better Earth Ventures is where ClimateTech founders come to scale.",
  paragraphs: [
    "At Better Earth Ventures, we are dedicated to accelerating the development and deployment of transformative technologies and initiatives that mitigate climate change and promote sustainable living.",
  ],
  highlight:
    "Through collaboration, mentorship, and strategic partnerships, we empower visionary entrepreneurs to scale their solutions, driving tangible impact and paving the way for a resilient and thriving planet.",
  paragraphsAfter: [
    "Our work brings together founders, investors, corporates, governments and research institutions to accelerate deployment in real markets, particularly across Asia-Pacific.",
  ],
  closing: "Join us in building a Better Earth, one solution at a time.",
};

/** Home — how the engagements are delivered. Four pillars, each with formats. */
export const delivery = {
  eyebrow: "How we work",
  heading: "How we deliver climate innovation engagements",
  intro:
    "Through extensive research, we have mapped out the four critical failure points for scaling climatetech ventures.",
  pillars: [
    {
      title: "Curated Innovation Programmes",
      points: [
        "Define challenge areas aligned with sector priorities",
        "Engage relevant industry and institutional stakeholders",
        "Recruit high-quality local and international ventures",
        "Provide tailored mentoring and deployment-focused support",
      ],
      formats:
        "Accelerators, innovation challenges, competitions, hackathons, youth initiatives, market immersions",
    },
    {
      title: "Strategic Showcases & Convenings",
      points: [
        "Curate investor- and industry-facing demo platforms",
        "Elevate ecosystem visibility within priority sectors",
        "Facilitate targeted networking and partnership development",
      ],
      formats: "Demo Days, investor showcases, thematic summits",
    },
    {
      title: "Applied Thought Leadership & Sector Dialogues",
      points: [
        "Surface structural challenges in climate sectors",
        "Facilitate informed cross-sector conversations",
        "Strengthen ecosystem literacy around capital and deployment realities",
      ],
      formats: "Expert roundtables, financing dialogues, sector briefings",
    },
    {
      title: "Immersive & Experiential Learning",
      points: [
        "Expose stakeholders to real operating environments",
        "Enable meaningful interaction across the value chain",
        "Strengthen understanding of deployment constraints",
      ],
      formats: "Climate expeditions, field immersions, value-chain visits",
    },
  ],
};

/** Home — the three pillars, shown as an accordion on the old site. */
export const pillars = [
  {
    title: "Better Earth Ventures",
    slug: "ventures",
    description:
      "We design bespoke acceleration pathways to strengthen the success of startup and scaleup portfolios, leveraging our global network of mentors, collaborators, and strategic partners.",
    outcomesLabel: "Outcomes include:",
    outcomes: [
      {
        title: "Expand Overseas",
        body: "Support startups and scaleups in growing their international presence and impact.",
      },
      {
        title: "Boost Portfolio Attractiveness",
        body: "Prepare startups to impress at Demo Day and raise investment with confidence.",
      },
      {
        title: "Facilitate Successful Pilots",
        body: "Enable productive startup–corporate collaborations that deliver real results.",
      },
      {
        title: "Embed Innovation",
        body: "Help organisations integrate cutting-edge solutions to stay ahead of the curve.",
      },
    ],
    idealForLabel: "Ideal for:",
    idealFor:
      "Venture capital firms, corporate innovation teams, and government agencies seeking to drive impact through high-potential ventures.",
  },
  {
    title: "Better Earth Exchange",
    slug: "exchange",
    description: "Where the sustainability community comes to connect, collaborate, and grow.",
    body: [
      "Through founder roundtables, curated events, and ecosystem gatherings, Better Earth Exchange fosters the trusted relationships that fuel innovation. We bring together entrepreneurs, investors, researchers, corporates, and change-makers to exchange insights, spark partnerships, and accelerate collective action.",
      "Whether you're looking for inspiration, collaboration, or a community that understands your mission, this is your home base.",
    ],
  },
  {
    title: "Better Earth Institute",
    slug: "institute",
    description:
      "The Better Earth Institute exists to illuminate the evolving sustainability and climate innovation landscape.",
    body: [
      "We collect, analyse, and share insights to help funders, founders, corporates, and governments navigate complexity, spot emerging trends, and make smarter decisions.",
      "By mapping out who's doing what, and what's working, we accelerate collective action, reduce duplication, and surface new opportunities for collaboration and investment. Our research helps ensure that resources flow to the innovations that matter most.",
    ],
  },
];

/** Home: the full logo wall. Every logo file in public/images is represented. */
export const trustedBy: Partner[] = [
  { name: "Innovate UK", logo: `${IMG}/logos-innovate-uk-logo.webp`, tier: "programme" },
  { name: "EIT Climate-KIC", logo: `${IMG}/logos-climatekic-logo.webp`, tier: "programme" },
  { name: "AgFunder", logo: `${IMG}/logos-agfunder-logo.webp`, tier: "ecosystem" },
  { name: "Singapore Deep-Tech Alliance", logo: `${IMG}/logos-sdta-logo.webp`, tier: "ecosystem" },
  { name: "Sustainable Living Lab", logo: `${IMG}/logos-sl2-logo.webp`, tier: "ecosystem" },
  { name: "Start2 Group", logo: `${IMG}/logos-start2group-logo.webp`, tier: "ecosystem" },
  { name: "AgriFutures Australia", logo: `${IMG}/logos-agrifutures-logo.webp`, tier: "ecosystem" },
  { name: "MarTech Collective", logo: `${IMG}/logos-martech-collective-logo.webp`, tier: "ecosystem" },
  { name: "Tomorrow Studio Ventures", logo: `${IMG}/logos-tomorrow-studio-ventures-logo.webp`, tier: "ecosystem" },
  { name: "Tenity", logo: `${IMG}/logos-tenity-logo.webp`, tier: "ecosystem" },
  { name: "JETRO", logo: `${IMG}/logos-jetro-logo.webp`, tier: "ecosystem" },
  { name: "Deep Tech Canada", logo: `${IMG}/logos-deep-tech-canada-logo.webp`, tier: "ecosystem" },
  { name: "Rebbeck Consulting", logo: `${IMG}/logos-rebbeck-consulting-logo.webp`, tier: "ecosystem" },
  { name: "HEX", logo: `${IMG}/logos-hex-logo.webp`, tier: "ecosystem" },
];

/**
 * Home — "Our sectors of focus".
 *
 * TODO: images are placeholders drawn from the existing library. Clean Cities,
 * Circularity and Industrial Decarbonisation have no matching photography yet.
 */
export const verticals = [
  {
    title: "Agriculture and Food",
    image: `${IMG}/climate-expedition-a-little-wild.webp`,
    items: [
      "Precision ag",
      "Biological inputs",
      "Climate-resilient crops",
      "Alternative proteins",
      "Ag supply chain tech",
    ],
  },
  {
    title: "Clean Cities",
    image: `${IMG}/hero-miscellaneous-singapore-gardens.webp`,
    items: [
      "Energy efficiency",
      "Urban mobility",
      "District systems",
      "Waste-to-value",
      "Resilient infrastructure",
    ],
  },
  {
    title: "Circularity and Advanced Materials",
    image: `${IMG}/climate-expedition-seadling.webp`,
    items: [
      "Waste valorisation",
      "Bio-based materials",
      "Sustainable packaging",
      "Recycling tech",
      "Carbon-derived materials",
    ],
  },
  {
    title: "Industrial Decarbonisation",
    image: `${IMG}/climate-expedition-polar-cold.webp`,
    items: [
      "Electrification",
      "Hydrogen",
      "CCUS",
      "Process optimisation",
      "Low-carbon materials",
    ],
  },
];

/** Programmes page — intro above the programme list. */
export const programmesIntro = {
  title: "Our Programmes",
  lede: "We are dedicated to accelerating the development and deployment of transformative technologies and initiatives that mitigate climate change and promote sustainable living.",
  heroImage: `${IMG}/programmes-climaccelearator-cohort-announcement-1-1920-x-1080.webp`,
  paragraphs: [
    "At Better Earth Ventures, we are committed to creating meaningful climate impact at every stage of the innovation journey.",
    "From sparking early-stage inspiration in future changemakers to supporting the growth and global scale-up of climate-positive technologies, our programmes are designed to meet founders where they are, and take them where they need to go.",
    "With deep sector expertise, a global network, and a track record of delivering high-impact support, we help turn bold ideas into real-world solutions that move the needle on climate action.",
  ],
  highlight:
    "Below are our current programmes, each designed to address a specific stage of the journey and drive tangible outcomes for founders, partners, and the planet.",
};

export const partners: Partner[] = [
  { name: "EIT Climate-KIC", logo: `${IMG}/logos-climatekic-logo.webp`, tier: "programme", url: "https://www.climate-kic.org" },
  { name: "ClimAccelerator", tier: "programme", url: "https://climaccelerator.climate-kic.org" },
  { name: "ClimateLaunchpad", tier: "programme", url: "https://climatelaunchpad.org" },
  { name: "Innovate UK", logo: `${IMG}/logos-innovate-uk-logo.webp`, tier: "programme", url: "https://www.ukri.org/councils/innovate-uk/" },
  { name: "AgFunder", logo: `${IMG}/logos-agfunder-logo.webp`, tier: "ecosystem", url: "https://agfunder.com" },
  { name: "Singapore Deep-Tech Alliance", logo: `${IMG}/logos-sdta-logo.webp`, tier: "ecosystem" },
  { name: "MarTech Collective", logo: `${IMG}/logos-martech-collective-logo.webp`, tier: "ecosystem" },
  { name: "Tomorrow Studio Ventures", logo: `${IMG}/logos-tomorrow-studio-ventures-logo.webp`, tier: "ecosystem" },
  { name: "Sustainable Living Lab", logo: `${IMG}/logos-sl2-logo.webp`, tier: "ecosystem" },
  { name: "AgriFutures Australia", logo: `${IMG}/logos-agrifutures-logo.webp`, tier: "ecosystem" },
  { name: "Start2 Group", logo: `${IMG}/logos-start2group-logo.webp`, tier: "ecosystem" },
];

export const companies: Company[] = [
  { name: "Algenie", vertical: "Biotech & biomaterials", cohortYear: 2025 },
  { name: "DayaTani", country: "Indonesia", vertical: "Agricultural value chain", cohortYear: 2025 },
  {
    name: "KiwiLeather Innovations",
    country: "New Zealand",
    vertical: "Biotech & biomaterials",
    cohortYear: 2025,
    womenCofounded: true,
  },
  { name: "LambdAI Space", vertical: "Digital agriculture", cohortYear: 2025 },
  {
    name: "Living Roots",
    country: "Thailand",
    vertical: "Novel farming practices",
    cohortYear: 2025,
    womenCofounded: true,
  },
  {
    name: "N&E Innovations",
    country: "Singapore",
    vertical: "Supply chain",
    cohortYear: 2025,
    womenCofounded: true,
  },
  { name: "Polar Cold", vertical: "Water & energy management", cohortYear: 2025 },
  { name: "Rainstick", country: "Australia", vertical: "Novel farming practices", cohortYear: 2025 },
  { name: "Stealth (enhanced rock weathering)", vertical: "Carbon management", cohortYear: 2025 },
];

/**
 * Team names are from public LinkedIn profiles; titles and bios are placeholders.
 * The old site had no team page — confirm before publishing /about.
 */
export const people: Person[] = [
  { name: "Jamie Heng", role: "Better Earth Ventures", group: "team", order: 1 },
  { name: "Linhan Wu", role: "Better Earth Ventures", group: "team", order: 2 },
  { name: "Gerald Foo", role: "Better Earth Ventures", group: "team", order: 3 },
  { name: "Arunav Pal", role: "Better Earth Ventures", group: "team", order: 4 },
];

export const programmes: Programme[] = [
  {
    title: "Women Founders and Funders Singapore",
    slug: "women-founders-and-funders",
    themes: ["Agrifood", "Gender equity", "Convening"],
    stage: "early",
    kicker: "Pitch event · during Singapore Intl. Agrifood Week",
    summary:
      "We believe that when women lead, systems change. That's why Women Founders and Funders Singapore will return on Wednesday 5 November, during Singapore International Agrifood Week (SIAW) to champion the ingenuity, resilience, and impact of women shaping the future of food.",
    body: [
      "Applications are now open for agrifoodtech entrepreneurs raising Seed or Series A rounds who are driving meaningful impact – especially those advancing diversity, inclusion or other social equity goals. We are looking for visionary founders whose businesses combine innovation, commercial strength and a deep commitment to sustainability.",
    ],
    status: "open",
    accent: "teal",
    heroImage: `${IMG}/programmes-women-founders-and-funders-1.webp`,
    order: 1,
    partners: [
      { name: "MarTech Collective", logo: `${IMG}/logos-martech-collective-logo.webp`, tier: "programme" },
      { name: "Tomorrow Studio Ventures", logo: `${IMG}/logos-tomorrow-studio-ventures-logo.webp`, tier: "programme" },
    ],
  },
  {
    title: "ClimateLaunchpad Singapore",
    slug: "climatelaunchpad",
    themes: ["Climate innovation", "Competition"],
    stage: "early",
    kicker: "Global competition · powered by Climate-KIC",
    summary:
      "ClimateLaunchpad, powered by Climate-KIC, Europe's leading climate innovation agency, is the world's largest green business competition. It is designed to unlock the potential of early-stage climate entrepreneurs by offering world-class training, expert guidance, and international exposure.",
    body: [
      "The Singapore edition, led by Better Earth Ventures, is part of a global movement across nearly 100 countries. It empowers aspiring founders and young startups to transform their climate-positive ideas into scalable ventures through a proven program of coaching, validation, and competition.",
    ],
    status: "open",
    accent: "purple",
    applyUrl: "https://climatelaunchpad.org",
    heroImage: `${IMG}/programmes-climatelaunchpad-2026.webp`,
    order: 2,
    partners: [
      { name: "ClimateLaunchpad", tier: "programme" },
      { name: "EIT Climate-KIC", logo: `${IMG}/logos-climatekic-logo.webp`, tier: "programme" },
    ],
  },
  {
    title: "AgriTech ClimAccelerator Singapore",
    slug: "climaccelerator",
    themes: ["Agritech", "Climate innovation"],
    stage: "early",
    kicker: "6-month accelerator · powered by Climate KIC",
    summary:
      "ClimAccelerator, powered by Climate KIC, Europe's leading climate innovation agency and community, is a global programme for startups to innovate, catalyse and scale the potential of their climate solutions. It brings together the force of a diverse, global, connected community with a strong knowledge base and support system for sourcing, selecting and training entrepreneurs on their journey.",
    body: [
      "The AgriTech ClimAccelerator Singapore provides a leading global platform for climate-focused startups across Asia-Pacific. The programme is scouting for startups from Australia, Indonesia, New Zealand, Singapore, Thailand, and Vietnam. Anchored in Singapore, the programme offers resources, networks, capital access, climate impact measurement, and connections to top investors and industry experts.",
      "Startup applications are open for solutions in Novel Farming Practices, Biotech and Biomaterials, Supply chain, Water and Energy Management and Digital Agriculture at Technology Readiness Level (TRL) 4 or above, with validated prototypes ready for real-world testing.",
    ],
    status: "closed",
    accent: "sky",
    heroImage: `${IMG}/programmes-climaccelearator-cohort-announcement-1-1920-x-1080.webp`,
    applicationDeadline: "2025-05-30",
    order: 3,
    keyFacts: [
      { label: "Startups", value: "10" },
      { label: "Countries", value: "6" },
      { label: "Duration", value: "6 months" },
      { label: "Focus areas", value: "6" },
    ],
    partners: [
      { name: "EIT Climate-KIC", logo: `${IMG}/logos-climatekic-logo.webp`, tier: "programme" },
      { name: "AgFunder", logo: `${IMG}/logos-agfunder-logo.webp`, tier: "programme" },
    ],
    cohort: companies,
  },
  {
    title: "Innovate UK Global Incubator Programme: Cleantech Singapore",
    slug: "global-incubator-programme",
    themes: ["Cleantech", "Market expansion"],
    stage: "growth",
    kicker: "Market immersion · powered by Innovate UK",
    summary:
      "The Global Incubator Programme, delivered by Better Earth Ventures in partnership with the Singapore Deep-Tech Alliance (SDTA) and powered by Innovate UK, supports a curated cohort of pioneering UK startups working at the forefront of cleantech and environmental sustainability.",
    body: [
      "Designed to accelerate international growth, the programme combines immersive in-market exposure with strategic mentoring, ecosystem engagement, and access to regional capital networks. Anchored in Singapore, it includes 2 tailored market immersion weeks, six months of virtual programming, and a high-profile final showcase during Singapore's SWITCH conference.",
      "The Global Incubator Programme builds cross-border collaboration and equips climate innovators with the tools, knowledge, and connections to scale solutions that make a measurable impact.",
    ],
    status: "completed",
    accent: "orange",
    heroImage: `${IMG}/programmes-cleantech-connect.webp`,
    order: 4,
    partners: [
      { name: "Innovate UK", logo: `${IMG}/logos-innovate-uk-logo.webp`, tier: "programme" },
      { name: "Singapore Deep-Tech Alliance", logo: `${IMG}/logos-sdta-logo.webp`, tier: "programme" },
    ],
  },
];

/** Climate Expeditions page. */
export const expeditions = {
  title: "Climate Expeditions",
  lede: "Curated, small-group immersion journeys into real-world climate and agrifood innovation sites across Southeast Asia.",
  intro:
    "We take you out of conference rooms and into farms, facilities, labs, and communities where climate solutions are being built, tested and scaled. These expeditions are designed for people shaping climate decisions who want grounded insight, beyond reports, pitch decks and finance spreadsheets.",
  cta: { label: "Join the next expedition", href: "/contact" },
  heroImage: `${IMG}/climate-expedition-1.webp`,

  why: {
    title: "Why Better Earth's Climate Expeditions Exist",
    paragraphs: [
      "Working in climate or agrifood tech from an office only tells half the story. The real context - the forces that determine whether solutions succeed or fail live on the ground - in farms, processing facilities, coastal communities, labs, and remote regions where climate challenges are most visible.",
      "Climate Expeditions are immersive learning journeys designed to give founders, investors, policymakers, and ecosystem builders a sharper intuition for how climate technologies collide with real-world constraints, and what it actually takes to scale climate solutions responsibly.",
      "By experiencing the real-world interplay between technology, behaviour, economics, and environment first-hand, participants build the intuition and judgement needed to back, design, and support solutions that can truly work at scale.",
    ],
  },

  whereWeveBeen: {
    title: "Where We've Been",
    lede: "Our Climate Expeditions have already taken us across Southeast Asia, visiting climate solutions at different stages of maturity and scale.",
    places: [
      {
        location: "Malaysia",
        name: "A Little Wild",
        accent: "orange" as const,
        body: "At A Little Wild in Kota Tinggi, we saw how a degraded palm plantation can be brought back to life through syntropic agroforestry, and learnt how to work with the grain of nature.",
        image: `${IMG}/climate-expedition-a-little-wild.webp`,
      },
      {
        location: "Borneo",
        name: "SEADLING",
        accent: "yellow" as const,
        body: "In Kota Kinabalu and Semporna, we visited SEADLING, a seaweed biotech company developing functional ingredients that naturally enhance the well-being of animals, plants, and humans.",
        image: `${IMG}/climate-expedition-seadling.webp`,
      },
      {
        location: "The Philippines",
        name: "Polar Cold",
        accent: "sky" as const,
        body: "We visited Polar Cold in Manila, where they team is rethinking cold storage for food and pharma SMEs through modular, hyperlocal cold rooms that businesses can rent on demand.",
        image: `${IMG}/climate-expedition-polar-cold.webp`,
      },
    ],
  },

  whoFor: {
    title: "Who Climate Expeditions Are For",
    lede: "Climate decisions get clearer when you see the system up close. Whether you invest, build, regulate, or operate, these trips give you the context that slides, models, and boardrooms can't. Each group walks away with sharper judgement, fewer assumptions, and a more grounded sense of what scaling climate solutions in Asia actually demands.",
    audiences: [
      {
        question: "Investors Seeking Sharper Conviction",
        answer:
          "See how climate solutions behave beyond pitch decks. Understand operational risk, adoption friction, and scale potential by observing how founders, farmers, and operators make decisions under real constraints in context.",
      },
      {
        question: "Corporates Driving Sustainability and Supply Chain Transformation",
        answer:
          "Meet the suppliers, operators and innovators your sustainability commitments depend on, and see where technology genuinely changes the economics of a supply chain.",
      },
      {
        question: "Government and Public Sector Leaders",
        answer:
          "Understand how policy lands on the ground: what accelerates adoption, what stalls it, and where public support makes the decisive difference.",
      },
      {
        question: "Innovators and Builders in Adjacent Climate Fields",
        answer:
          "Pressure-test your assumptions against neighbouring parts of the system, and find the collaborations that only become obvious in person.",
      },
      {
        question: "Ecosystem Leaders Who Need Grounded Insight",
        answer:
          "Programme designers, accelerator teams and researchers who need first-hand context to build things that actually serve founders in this region.",
      },
      {
        question: "Anyone Who Wants to Understand Climate Systems at Their Roots",
        answer:
          "No prior sector experience required: only genuine curiosity about how climate solutions succeed or fail in the real world.",
      },
    ],
  },

  experience: {
    title: "What You'll Experience",
    slides: [
      {
        accent: "yellow" as const,
        image: `${IMG}/climate-expedition-10.webp`,
        paragraphs: [
          "You won't just tour farms or facilities.",
          "You'll sit down with the founders and the people running these systems day to day.",
          "You'll hear what actually keeps them up at night, what's working, and what still feels unsolved.",
          "You'll speak directly with farmers who experience climate decisions first-hand.",
        ],
      },
      {
        accent: "orange" as const,
        image: `${IMG}/climate-expedition-seadling.webp`,
        paragraphs: [
          "You'll speak with operators and stakeholders who give you an honest view of the challenges and the opportunities ahead.",
          "You'll see how decisions get made in the field, how technology fits into their workflows, and where the biggest gaps still are.",
          "You'll discover the geographical and regulatory contexts that these climate innovators find themselves in.",
        ],
      },
      {
        accent: "teal" as const,
        image: `${IMG}/climate-expedition-polar-cold.webp`,
        paragraphs: [
          "It's a rare chance to understand climate solutions the way practitioners see them.",
          "You'll leave with a sharper understanding of how climate solutions actually get adopted. A network of fellow builders.",
          "A stronger sense of scale and constraints. And most importantly, a new perspective on what it takes to shift entrenched systems in Asia.",
        ],
      },
    ],
  },

  next: {
    title: "The next Climate Expedition is coming",
    paragraphs: [
      "We're curating our April 2026 Climate Expedition and will be launching it soon.",
      "If you're interested about learning directly from the ground, communities, and operators shaping climate resilience, this one's for you.",
    ],
    primary: { label: "I'm Interested", href: "/contact" },
    secondary: { label: "Chat with the Team", href: "/contact" },
    image: `${IMG}/climate-expedition-12.webp`,
  },
};

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
      "Applications are open for ClimateLaunchpad, the world's largest green business ideas competition",
    slug: "applications-are-open-for-climatelaunchpad-the-world-s-largest-green-business-ideas-competition",
    publishedAt: "2026-03-10T06:59:15Z",
    readingTime: 4,
    category: "Programme",
    featured: true,
    coverImage: `${WIX_MEDIA}/4d40e5_953e2f52c9014236a4b84dab52fc18d6~mv2.jpg`,
    excerpt:
      "Applications are open for ClimateLaunchpad, the world's largest green business ideas competition.",
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
      "On our Better Earth Ventures Climate Expedition in northern Thailand, I moved beyond pitch decks into the lived reality of regenerative agriculture. At Living Roots and community farms, I saw soil as a living system.",
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
      "These founders were selected from a competitive pool spanning 15 countries: a 2x increase, with Singapore, New Zealand and Thailand leading submissions and signalling a shift toward Southeast Asian innovation hubs.",
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
      "Did you know there's a 138-acre farm in Johor that grows food by accelerating natural processes? It uses no fertilizers and no chemicals.",
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
      "Today we mark a milestone for the APAC climate innovation ecosystem: a new cohort of founders bringing bold ideas and deep conviction to the region's urgent challenges.",
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
  // Full article bodies still live on Wix until they are migrated into Sanity.
  externalUrl: `https://www.betterearthventures.com/post/${post.slug}`,
}));

/** No events page existed on the old site; kept empty so the helper has a shape. */
export const events: SiteEvent[] = [];
