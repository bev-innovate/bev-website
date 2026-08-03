# Better Earth Ventures — website

A coded rebuild of [betterearthventures.com](https://www.betterearthventures.com/), replacing the
Wix site with Next.js + Sanity.

**The copy is the existing Wix copy, unchanged.** This rebuild is a design and engineering
change, not a content change. Alternative copy and structural suggestions are parked in
[`docs/content-suggestions.md`](docs/content-suggestions.md) for a separate pass.

## Stack

| Layer      | Choice                              | Why |
| ---------- | ----------------------------------- | --- |
| Framework  | Next.js 16 (App Router), React 19   | Static-first rendering, image optimisation, server actions for forms |
| Styling    | Tailwind CSS v4                     | Design tokens live in `src/app/globals.css`; components never reference raw colours |
| Content    | Sanity — **standalone** Studio in `studio-bev-site/` | Project `utlh4le8`, dataset `production`. Deployed to Sanity hosting, not mounted in the app |
| Submissions| Supabase (Postgres)                 | See [Why Supabase and not Railway](#why-supabase-and-not-railway) |
| Hosting    | Vercel                              | Zero-config for Next.js; preview deploy per branch |
| Components | [21st.dev](https://21st.dev) + hand-built | See [Components](#components) |

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

**The site runs with no environment variables at all.** Until Sanity is configured, every
page renders from `src/lib/seed-content.ts` — real content pulled out of the existing Wix
site — and `/studio` shows setup instructions instead of an editor. That is deliberate: the
draft is reviewable and deployable before anyone creates an account anywhere.

```bash
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run seed         # push seed content into Sanity (needs a write token)
```

## The CMS

The Studio is a **separate package** at `studio-bev-site/` — its own `package.json`, its own
dependencies, its own deploy. It is deliberately not mounted inside the Next app.

```bash
cd studio-bev-site
npm run dev        # Studio at localhost:3333
npx sanity deploy  # publish to Sanity hosting
```

Project `utlh4le8`, dataset `production`. Schema is already deployed
(`npx sanity schemas deploy`) and the dataset is seeded with 53 documents: 4 programmes,
11 posts, 11 partners, 9 companies, 4 people and site settings.

### ⚠️ Images are missing from the dataset

`npm run seed` ran from an environment that cannot reach `static.wixstatic.com`, so every
image upload returned 403. The documents are all there; the pictures are not.

**Re-run the seed from your machine** to fix it — Wix is reachable from there:

```bash
cp .env.example .env.local     # then paste in your editor token
npm run seed
```

The scripts load `.env.local` themselves via dotenv — `tsx` does not do it for you, so
without that file you get `Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN`
even when the project is configured.

It is idempotent, so re-running only fills in what's missing.

### Environment

`.env.local` (gitignored) needs:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=utlh4le8
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=...   # editor token, local only — do NOT add to Vercel
```

Vercel needs only the two `NEXT_PUBLIC_` values.

### Content model

`src/sanity/schemaTypes/` defines: `siteSettings` (singleton), `programme`, `post`, `event`,
`person`, `partner`, `company`, `blockContent`. `programme` carries the whole structure of a
programme page — key facts, focus areas, eligibility, benefits, timeline, FAQ, partner and
cohort references — so a new programme is a CMS entry, not a code change.

Every read goes through `src/lib/content.ts`, which tries Sanity and falls back to seed
content. Pages never branch on whether the CMS is up.

## Getting the assets off Wix

Two scripts, run in order. Nothing here touches the live Wix site — both are read-only
against it.

```bash
# 1. Export the whole Media Manager to disk (needs a Wix API key)
WIX_API_KEY=xxx npm run export:wix

# 2. Upload it into Sanity and get a Wix-URL → Sanity-URL mapping
npm run import:media
```

**The API key.** Create one at <https://manage.wix.com/account/api-keys> with the
**Media Manager** permission. The site id is already defaulted in the script
(`437436eb-9514-4d79-bc04-ee8817d41591`); override with `WIX_SITE_ID` if it changes.

**What you get.**

```
wix-export/manifest.json        every file descriptor from the Media Manager
wix-export/files/<folder>/…     the original bytes, in the Media Manager folder structure
wix-export/sanity-assets.json   { "https://static.wixstatic.com/…": { assetId, url } }
```

`wix-export/` is gitignored — it's a working directory, not source.

Both scripts are **resumable and idempotent**: the exporter skips files already on disk
with a matching byte size, and Sanity deduplicates uploads by content hash, so re-running
returns existing asset ids rather than creating copies. An interrupted run just needs
re-running.

**How it works, in case it needs debugging.** Listing the library requires an API key and
is cursor-paginated (`GET /site-media/v1/files`). Downloading does not — every file
descriptor carries a public `static.wixstatic.com` URL, the same one the live site serves,
and the bare `…~mv2.jpg` form returns the full-resolution original rather than a resized
derivative.

**Before you cancel the Wix subscription**, use `sanity-assets.json` to rewrite any
remaining `static.wixstatic.com` references — the image URLs in `src/lib/seed-content.ts`
and any article bodies pasted into Sanity. `npm run seed` already migrates the images the
site currently references; these two scripts exist to catch everything else in the
library, which is considerably more.

Worth a look first: the Wix Media Manager UI may offer a bulk select-and-download, which
would save you creating an API key for a one-off. The scripts are the better option if you
want the folder structure preserved, a manifest, or a repeatable migration.

## Wiring up form submissions

1. Create a Supabase project.
2. Run `supabase/migrations/0001_init.sql` in the SQL editor. It creates
   `newsletter_subscribers` and `enquiries`, and enables RLS with **no policies** — a
   deny-by-default posture. Only the server-side service-role key can write.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel.

Until those are set, submissions are validated and logged but not persisted, so the forms
still demo correctly. Both forms carry a honeypot field.

### Why Supabase and not Railway

Both were on the table. Supabase wins here on all three of your criteria:

- **Cheaper at this size.** Supabase's free tier includes a managed Postgres, auth and
  file storage indefinitely; the paid tier starts around US$25/month. Railway has no
  perpetual free database — it bills per-usage from the first hour, so an always-on
  Postgres costs money from day one for a table that will take a few hundred rows a year.
- **Easier.** Supabase gives you a REST/JS client, a table editor and row-level security
  out of the box. Railway gives you a Postgres container and leaves the API layer, auth
  and admin UI to you.
- **Integrates the same way.** Neither talks to Sanity directly, and they shouldn't:
  Sanity is the editorial store, Supabase is the write-path store for what the public
  submits. The two meet in the Next.js server layer, not in a sync job.

Honestly, at current volumes you could also skip the database entirely and post form
submissions to email or a form service. Supabase is the right call if you want application
data you can query later — which you will, once programme applications run through the site.

## Components

One component is lifted from 21st.dev and adapted to the brand (attribution is in its
file header):

- `src/components/ui/timeline.tsx` — Aceternity UI "Timeline" via
  [@manuarora700](https://21st.dev/@manuarora700/components/timeline). Sticky heading with
  a scroll-following beam. Drives the "How we work" section and every programme timeline.
  Adapted: brand tokens, `ResizeObserver` instead of a one-shot measure, reduced-motion
  handling, heading lifted into props.

The bento layout adapted from [@uilayout.contact "Feature Bento"](https://21st.dev/@uilayout.contact/components/feature-bento)
was dropped once the real site structure came to light — the old site uses an accordion
there, not a bento grid, so `pillars-accordion.tsx` replaced it.

The rest — hero, marquee, cards, accordion, forms — is hand-built in the same idiom. Two
notes on why more wasn't pulled in: the 21st.dev free tier allows two component retrievals
per day, and `npx shadcn add` can't reach the registry from this build environment, so
components are vendored into the repo rather than installed. Both are worth revisiting with
a paid 21st.dev key — the marquee, logo cloud and hero especially have stronger versions in
the catalogue.

## Pages

| Route | Source |
| --- | --- |
| `/` | Home — hero, who we are, three-pillar accordion, track record, trusted by, verticals |
| `/programmes` | Our Programmes — early stage (purple band) and growth stage (orange band) |
| `/climate-expeditions` | Climate Expeditions — why, where we've been, who it's for, what you'll experience, next expedition |
| `/news` | News — all 11 posts |
| `/news/[slug]` | Article |
| `/programmes/[slug]` | Programme detail (new — the old site had none) |
| `/about`, `/contact`, `/privacy` | Placeholders; the old site's "More" menu wasn't captured |

**URL compatibility.** `next.config.ts` permanently redirects `/post/:slug` → `/news/:slug`,
plus `/climaccelerator` and `/womenfoufun` to their programme pages, so inbound links from
press coverage keep working.

## Design

The palette is sampled pixel-for-pixel from the old site — purple `#540178`, orange
`#ee792f`, teal `#12a19d`, yellow `#ffbf00`, sky `#3e9be9`, ink `#333`. Type is Poppins,
the geometric sans the Wix site used. Everything is tokenised in `src/app/globals.css`.

What changed, and why:

- **Motion.** Staggered hero entrance, scroll reveals, count-up on the track-record
  figures, direction-aware carousel. All gated behind `prefers-reduced-motion`.
- **Real disclosure semantics.** The pillar accordion and the "who it's for" list are
  proper `button`/`region` pairs (or native `details`/`summary`), so they work with a
  keyboard and a screen reader. The Wix originals did not.
- **Duotone hero imagery** instead of flat colour blocks, so photography carries the
  brand rather than fighting it.
- **Alternating programme blocks** with status pills, and a single-column layout when a
  programme has no graphic — the old layout left half the row empty.
- **Image-filled "Climate Expeditions" headline** preserved via `background-clip: text`,
  with a solid-purple layer underneath so a failed image never blanks the heading.

### One deliberate colour change

The Growth Stage band uses `orange-deep` (`#d4651e`) rather than the brand orange.
White body copy on `#ee792f` measures ~2.9:1, well below the 4.5:1 AA threshold; the
deeper shade gets to ~3.7:1. Full AA needs either a darker orange still or dark text on
orange — **your call**, and it's a one-token change in `globals.css`. Say the word and
I'll revert it to the exact brand orange.

## What still needs your input

1. **Team bios.** `src/lib/seed-content.ts` lists four names from public LinkedIn
   profiles with placeholder titles. The old site had no team page — confirm before
   `/about` goes live.
2. **Partner logos.** No logo files were available, so "Trusted by" renders a
   typographic lockup. Upload real SVGs to the `partner` documents in Sanity.
3. **Article bodies.** Post metadata migrated cleanly; full bodies did not. Article pages
   show the excerpt and link out to the Wix original. Migrate these before cancelling Wix.
4. **The "More" menu.** Not captured in the screenshots — tell me what was in it.
5. **Programme graphics.** The Global Incubator Programme block has no image because its
   graphic wasn't in the screenshot set.
6. **Privacy policy** is a structural placeholder — needs a PDPA review.
7. **Font.** Poppins is my read of the Wix typeface. If the brand guide says otherwise,
   it's one line in `layout.tsx`.

## Deploying

Vercel builds from GitHub. Import `bev-innovate/bev-website` once at
<https://vercel.com/new>, set the production branch, and every push deploys — branches get
preview URLs automatically. Nothing else is needed: no `vercel.json`, no build overrides,
and the root `package.json` is the Next app.

`.vercelignore` keeps `studio-bev-site/` out of the build context — the Studio deploys to
Sanity hosting, not Vercel.

### Environment variables

The build **succeeds with none of these set** — the site falls back to the seed content in
`src/lib/seed-content.ts`, so a first deploy works before anything is configured.

| Variable | Needed for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Reading from the CMS | `utlh4le8` |
| `NEXT_PUBLIC_SANITY_DATASET` | Reading from the CMS | `production` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG tags | e.g. `https://www.betterearthventures.com` — no trailing slash |
| `NEXT_PUBLIC_SUPABASE_URL` | Form submissions | Optional until the forms need to persist |
| `SUPABASE_SERVICE_ROLE_KEY` | Form submissions | Secret — server-side only |

**Do not add `SANITY_API_WRITE_TOKEN` to Vercel.** It is only needed locally, for
`npm run seed`.
