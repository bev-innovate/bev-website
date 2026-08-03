import { groq } from "next-sanity";

const imageUrl = `"url": asset->url`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title, tagline, description, stats, contact, social, navigation
  }
`;

const programmeFields = `
  title,
  "slug": slug.current,
  kicker,
  summary,
  status,
  applyUrl,
  applicationDeadline,
  order,
  keyFacts,
  verticals,
  eligibility,
  benefits,
  timeline,
  faq,
  "heroImage": coalesce(heroImage.asset->url, heroImageUrl),
  "partners": partners[]->{ name, url, tier, ${imageUrl} },
  "cohort": cohort[]->{ name, "slug": slug.current, country, vertical, blurb, url, womenCofounded, cohortYear, ${imageUrl} }
`;

export const programmesQuery = groq`
  *[_type == "programme"] | order(order asc, title asc){ ${programmeFields} }
`;

export const programmeBySlugQuery = groq`
  *[_type == "programme" && slug.current == $slug][0]{ ${programmeFields}, body }
`;

const postFields = `
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingTime,
  category,
  tags,
  featured,
  "coverImage": coalesce(coverImage.asset->url, coverImageUrl),
  "author": author->{ name, role, "photo": photo.asset->url, linkedin }
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc){ ${postFields} }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{ ${postFields}, body }
`;

export const peopleQuery = groq`
  *[_type == "person"] | order(order asc, name asc){
    name, role, group, bio, linkedin, order, "photo": photo.asset->url
  }
`;

export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc, name asc){ name, url, tier, ${imageUrl} }
`;

export const eventsQuery = groq`
  *[_type == "event"] | order(startDate asc){
    title, "slug": slug.current, startDate, endDate, location, summary, registerUrl,
    "image": image.asset->url
  }
`;
