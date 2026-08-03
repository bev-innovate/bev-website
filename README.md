# Better Earth Ventures — website

A coded rebuild of [betterearthventures.com](https://www.betterearthventures.com/), replacing the
Wix site with Next.js + Sanity. **This is a first draft** — see [What still needs
deciding](#what-still-needs-deciding) before treating anything here as final.

## Stack

| Layer      | Choice                              | Why |
| ---------- | ----------------------------------- | --- |
| Framework  | Next.js 16 (App Router), React 19   | Static-first rendering, image optimisation, server actions for forms |
| Styling    | Tailwind CSS v4                     | Design tokens live in `src/app/globals.css`; components never reference raw colours |
| Content    | Sanity (Studio embedded at `/studio`) | Editors get a live preview-capable CMS deployed with the site — no second hosting bill |
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

## Wiring up the CMS

1. `npx sanity@latest init` from the project root — creates the project and dataset.
2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`,
   `NEXT_PUBLIC_SANITY_DATASET` and a `SANITY_API_WRITE_TOKEN`.
3. `npm run seed` — imports programmes, posts, partners, companies, people and site
   settings, **and uploads the images from Wix into Sanity's asset pipeline**. It is
   idempotent (deterministic document ids), so it is safe to re-run.
4. Visit `/studio`, review the imported documents, and paste in the article bodies.

Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to the Vercel project.
**Do not add the write token** — it is only needed locally for the seed script.

### Content model

`src/sanity/schemaTypes/` defines: `siteSettings` (singleton), `programme`, `post`, `event`,
`person`, `partner`, `company`, `blockContent`. `programme` carries the whole structure of a
programme page — key facts, focus areas, eligibility, benefits, timeline, FAQ, partner and
cohort references — so a new programme is a CMS entry, not a code change.

Every read goes through `src/lib/content.ts`, which tries Sanity and falls back to seed
content. Pages never branch on whether the CMS is up.

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

Two components are lifted from 21st.dev and adapted to the brand (attribution is in the
file header of each):

- `src/components/ui/timeline.tsx` — Aceternity UI "Timeline" via
  [@manuarora700](https://21st.dev/@manuarora700/components/timeline). Sticky heading with
  a scroll-following beam. Drives the "How we work" section and every programme timeline.
  Adapted: brand tokens, `ResizeObserver` instead of a one-shot measure, reduced-motion
  handling, heading lifted into props.
- `src/components/site/pillars-bento.tsx` — structure from
  [@uilayout.contact "Feature Bento"](https://21st.dev/@uilayout.contact/components/feature-bento).
  Image-led hero card plus stat tiles and a CTA block. Re-skinned and populated with the
  three real pillars (Acceleration Services, Better Earth Exchange, Better Earth Institute).

The rest — hero, marquee, cards, accordion, forms — is hand-built in the same idiom. Two
notes on why more wasn't pulled in: the 21st.dev free tier allows two component retrievals
per day, and `npx shadcn add` can't reach the registry from this build environment, so
components are vendored into the repo rather than installed. Both are worth revisiting with
a paid 21st.dev key — the marquee, logo cloud and hero especially have stronger versions in
the catalogue.

## What was carried over from Wix

- **All 11 blog posts** — titles, slugs, dates, excerpts, reading time, tags and cover
  images, read out of the live site through the Wix Blog API.
- **Five programmes** — AgriTech ClimAccelerator Singapore, Women Founders & Funders,
  Climate Innovation Summit, the Innovate UK Global Incubator Programme and
  ClimateLaunchpad, with real eligibility, benefits, timelines and FAQ content.
- **The nine-company 2025 cohort**, partners and the three-pillar structure.
- **URL compatibility.** `next.config.ts` permanently redirects `/post/:slug` →
  `/insights/:slug`, `/climaccelerator` and `/womenfoufun` to their new homes, so inbound
  links from press coverage keep working.

## What still needs deciding

Flagging these rather than guessing further:

1. **Brand palette and typography are a proposal, not a match.** The live Wix site is not
   readable from this build environment (egress policy blocks it), so the forest/signal-lime
   palette and the Fraunces + Inter pairing are my choice. Everything is tokenised in
   `globals.css` — swapping in the real brand values is a one-file change.
2. **Team bios.** `src/lib/seed-content.ts` lists four names found on public LinkedIn
   profiles with placeholder titles. Confirm roles, bios and photos before launch.
3. **Partner logos.** No logo files were available, so the partner strip renders a
   typographic lockup. Upload real SVGs to the `partner` documents in Sanity.
4. **Article bodies.** Post metadata migrated cleanly; full bodies did not. Article pages
   currently show the excerpt and link out to the Wix original. Paste the bodies into
   Sanity (or extend the seed script to pull `contentText` from the Wix API) before
   cancelling the Wix subscription.
5. **Privacy policy** is a structural placeholder — needs a PDPA review.
6. **"Bracell"** — I read this as **Vercel** and configured accordingly. If you meant a
   different host, the only Vercel-specific pieces are `@vercel/analytics` in
   `src/app/layout.tsx` and the assumption that `next build` output is deployed directly.

## Deploying

Push the branch, import the repo in Vercel, set the environment variables above. Nothing
else is required — no `vercel.json`, no build overrides. Point `betterearthventures.com` at
Vercel only after the content migration in step 4 above is done.
