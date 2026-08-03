# Stashed content suggestions

The live rebuild deliberately uses the **existing Wix copy, unchanged**. This file parks
the alternative copy and structure written during the first draft, so it isn't lost and
can be picked up as a separate content pass.

Nothing here is in the site. Treat it as a menu, not a plan.

---

## 1. Hero headline alternatives

Current: *"Empowering innovators. For people, place, and planet."*

It's warm, but it describes what you feel rather than what you do, and every accelerator
site in the region opens with something similar. Options that lead with the differentiator:

- **"Climate solutions don't scale on conviction alone."** — Sets up the problem you
  actually solve. The current sub-copy ("Climate solutions don't fail for lack of ideas.
  They fail because scaling is hard.") is already doing this work further down the page;
  it's arguably the strongest line on the site and it's buried.
- **"From validated prototype to deployed in Asia-Pacific."** — Concrete, filters the
  audience, and states the geography that is your actual moat.
- **"We take climate technology out of the pitch deck and into the field."** — Leans on
  Climate Expeditions, which is the most distinctive thing you run.

## 2. Lead with proof, not promise

The track record (370+ startups, $500M raised, 100+ investors, 60+ corporate and
government partners, 120+ mentors) currently sits three sections down, on a teal band.
Those numbers are the most persuasive content on the site. Consider surfacing two of them
in the hero.

## 3. "Who we are" appears twice

The home page uses the eyebrow **"Who we are"** for two different sections — the
positioning statement and the three-pillar accordion. Suggested relabelling:

| Section | Current | Suggested |
| --- | --- | --- |
| Positioning statement | Who we are | Who we are |
| Three pillars | Who we are | What we do |

## 4. Pillar naming collision

**Better Earth Ventures** is both the company name and the name of one of the three
pillars. In the accordion this reads as though the company is a subset of itself.
Consider **Acceleration Services**, **Venture Services** or **Programme Design** for the
pillar, leaving Better Earth Ventures as the parent brand.

## 5. A "How we work" section

The site says a lot about *what* the programmes are and little about *what happens* inside
one. A four-stage arc, drafted from the ClimAccelerator structure:

1. **Find** — open, equity-free calls across Singapore, Australia, Thailand, Vietnam,
   Indonesia and New Zealand. Screening on validated technology and committed teams.
2. **Sharpen** — mentorship from operators and investors who have built in this region;
   business model, unit economics, route to first paying customer.
3. **Immerse** — market immersion in front of the buyers, regulators and farm operators
   who decide whether a technology gets deployed.
4. **Scale** — investor and grant introductions, then Demo Day in Singapore.

A scroll-following timeline component for this already exists at
`src/components/ui/timeline.tsx` (currently used only on programme detail pages).

## 6. Principles / positioning statements

Six drafted commitments, useful for an About page or a "why us" block:

- **Deployment beats demo** — progress measured in pilots signed and technology in the
  ground, not decks polished.
- **Equity-free, on purpose** — no equity, no participation fee; alignment comes from
  doing the work well.
- **Regional, not imported** — playbooks written for California don't survive contact
  with a Johor smallholding.
- **Systems, not silver bullets** — soil, water, energy, logistics and finance move
  together.
- **Impact you can evidence** — climate impact measurement using EIT Climate-KIC
  methodology, so claims hold up with investors and customers.
- **Relationships compound** — the introductions that matter rarely happen on a stage.

## 7. Cohort companies are underused

The nine 2025 ClimAccelerator companies (Algenie, DayaTani, KiwiLeather Innovations,
LambdAI Space, Living Roots, N&E Innovations, Polar Cold, Rainstick, plus one in stealth
on enhanced rock weathering) appear nowhere on the old site outside a blog post. Nearly
half are women co-founded. A cohort grid exists at `src/components/site/cohort-grid.tsx`
and renders on the ClimAccelerator detail page — worth surfacing more prominently.

## 8. Programme pages need a next action

Every programme block ends at "Learn More". For open programmes the next action should be
"Apply" with a visible deadline; for closed ones, "Get notified when the next cohort
opens" — which also builds the mailing list. The `applyUrl` and `applicationDeadline`
fields are already in the Sanity schema and unused.

## 9. Small copy corrections spotted in the current text

These are typos in the existing site copy, carried over verbatim into the rebuild. Worth
fixing whether or not any of the above is adopted:

| Page | Current | Should be |
| --- | --- | --- |
| Climate Expeditions, hero | "solutions are being build, tested and scaled" | "being **built**, tested and scaled" |
| Climate Expeditions, Polar Cold card | "where they team is rethinking" | "where **the** team is rethinking" |
| Programmes, ClimAccelerator | "Climate KIC" | "Climate-KIC" (hyphenated elsewhere on the same page) |

## 10. Missing pages

The old site's "More" menu wasn't captured in the screenshots. The rebuild currently has
placeholder `/about`, `/contact` and `/privacy` pages. Confirm what "More" contained —
likely About, Contact, Terms of Use and Privacy Policy, based on the footer links.
