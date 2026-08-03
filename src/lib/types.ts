import type { PortableTextBlock } from "@portabletext/types";

export type ProgrammeStatus = "open" | "closed" | "upcoming" | "completed";

export interface Stat {
  value: string;
  label: string;
  detail?: string;
}

export interface KeyFact {
  label: string;
  value: string;
}

export interface Vertical {
  title: string;
  description?: string;
}

export interface TimelinePhase {
  phase: string;
  title: string;
  description?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Partner {
  name: string;
  url?: string;
  logo?: string | null;
  tier?: "programme" | "ecosystem" | "supporter";
  /** Marquee sequence. Lower first. */
  order?: number;
}

export interface Company {
  name: string;
  slug?: string;
  country?: string;
  vertical?: string;
  blurb?: string;
  url?: string;
  logo?: string | null;
  womenCofounded?: boolean;
  cohortYear?: number;
}

/** Colour a programme or card is themed with — mirrors the old site's block colours. */
export type Accent = "purple" | "orange" | "teal" | "yellow" | "sky";

export interface Programme {
  title: string;
  slug: string;
  kicker?: string;
  /** Which part of the founder journey the programme serves. */
  stage?: "early" | "growth";
  accent?: Accent;
  /** Subject-matter labels shown on the programme card. */
  themes?: string[];
  summary: string;
  /** Long-form paragraphs shown on the programmes listing. */
  body?: string[];
  heroImage?: string | null;
  status: ProgrammeStatus;
  applyUrl?: string;
  applicationDeadline?: string;
  keyFacts?: KeyFact[];
  verticals?: Vertical[];
  eligibility?: string[];
  benefits?: string[];
  timeline?: TimelinePhase[];
  faq?: FaqItem[];
  partners?: Partner[];
  cohort?: Company[];
  /** Rich text, used only when the programme is authored in Sanity. */
  richBody?: PortableTextBlock[];
  order?: number;
}

export interface Post {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string | null;
  publishedAt: string;
  readingTime?: number;
  category?: string;
  tags?: string[];
  featured?: boolean;
  author?: Person | null;
  body?: PortableTextBlock[];
  /** Set for content still living on the Wix site, so links stay unbroken during migration. */
  externalUrl?: string;
}

export interface Person {
  name: string;
  role?: string;
  /** Where the person is based. Groups the staff list on /about. */
  location?: string;
  /** The advisor's own employer, shown under their role. */
  organisation?: string;
  group?: "team" | "expert" | "mentor" | "advisor";
  photo?: string | null;
  bio?: string;
  linkedin?: string;
  order?: number;
}

export interface SiteEvent {
  title: string;
  slug: string;
  startDate: string;
  endDate?: string;
  location?: string;
  summary?: string;
  image?: string | null;
  registerUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteSettings {
  title: string;
  tagline: string;
  description: string;
  stats: Stat[];
  contact: { email: string; location: string };
  social: SocialLink[];
  navigation: NavItem[];
}
