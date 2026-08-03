/**
 * Single data-access layer for the site.
 *
 * Every helper tries Sanity first and falls back to seed content. Pages therefore never
 * branch on "is the CMS up yet?" — they just await a function and render.
 */

import { sanityFetch } from "@/sanity/client";
import {
  eventsQuery,
  partnersQuery,
  peopleQuery,
  postBySlugQuery,
  postsQuery,
  programmeBySlugQuery,
  programmesQuery,
  siteSettingsQuery,
} from "@/sanity/queries";

import * as seed from "./seed-content";
import type {
  Partner,
  Person,
  Post,
  Programme,
  SiteEvent,
  SiteSettings,
} from "./types";

function firstNonEmpty<T>(fromCms: T[] | null, fallback: T[]): T[] {
  return fromCms && fromCms.length > 0 ? fromCms : fallback;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SiteSettings>(siteSettingsQuery, {}, ["siteSettings"]);
  return data ? { ...seed.siteSettings, ...data } : seed.siteSettings;
}

export async function getProgrammes(): Promise<Programme[]> {
  const data = await sanityFetch<Programme[]>(programmesQuery, {}, ["programme"]);
  return firstNonEmpty(data, seed.programmes);
}

export async function getProgramme(slug: string): Promise<Programme | null> {
  const data = await sanityFetch<Programme>(programmeBySlugQuery, { slug }, ["programme"]);
  return data ?? seed.programmes.find((p) => p.slug === slug) ?? null;
}

export async function getPosts(): Promise<Post[]> {
  const data = await sanityFetch<Post[]>(postsQuery, {}, ["post"]);
  return firstNonEmpty(data, seed.posts);
}

export async function getPost(slug: string): Promise<Post | null> {
  const data = await sanityFetch<Post>(postBySlugQuery, { slug }, ["post"]);
  return data ?? seed.posts.find((p) => p.slug === slug) ?? null;
}

export async function getPeople(): Promise<Person[]> {
  const data = await sanityFetch<Person[]>(peopleQuery, {}, ["person"]);
  return firstNonEmpty(data, seed.people);
}

export async function getPartners(): Promise<Partner[]> {
  const data = await sanityFetch<Partner[]>(partnersQuery, {}, ["partner"]);
  return firstNonEmpty(data, seed.partners);
}

export async function getEvents(): Promise<SiteEvent[]> {
  const data = await sanityFetch<SiteEvent[]>(eventsQuery, {}, ["event"]);
  return firstNonEmpty(data, seed.events);
}

/** Upcoming events only, soonest first. */
export async function getUpcomingEvents(now = new Date()): Promise<SiteEvent[]> {
  const all = await getEvents();
  return all
    .filter((e) => new Date(e.endDate ?? e.startDate) >= now)
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
}

export const pillars = seed.pillars;
