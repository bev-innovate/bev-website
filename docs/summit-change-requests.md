# Summit page: change requests

Derived from the event briefing of 1 September 2026. The summit is **13–15 October 2026**
(Tuesday to Thursday, which the briefing's day names confirm), so this is six weeks out.

Items are grouped by what is stopping them, not by where they sit on the page. Each has an
ID so we can refer to it later.

**Legend**
- **READY** — unambiguous, I can do it now
- **DECIDE** — needs a call from you first
- **BLOCKED** — waiting on content, assets or approvals
- **BUILD** — structural work, larger than a copy edit

---

## Progress · 1 September

**Done:** R-01 to R-05, R-07, R-08, R-09. B-01 (agenda) and B-02 (three zones).

**C-01 resolved in favour of the briefing.** The Global Grand Final is now Day 2 at
4:00pm, in the Discover Zone. The briefing is newer than the page and states it directly;
the old Day 3 placement was invented placeholder. Say if that is wrong.

**Assumptions taken, easily reversed:**
- C-06 — venue reads "Shared upon confirmation"
- C-07 — removed the About stats block, kept the hero facts row
- R-02 — label is "Guests from" without the colon, since it sits in a row of other
  labels that have none. Value is "50 countries"
- C-04 — used the full approved name, "PepsiCo Greenhouse Program APAC Showcase —
  Impact Edition", everywhere, em dash included

**Still open:** C-02 and R-06 (registration URL), C-03 (how to present a three-day event
where one day is open), C-05 (partner name), B-03, and everything in section 4.

---

## Progress · second pass

**B-04 done.** The hero is now the standard banner every other page uses: the key visual
sits behind a mangrove-to-teal wash rather than full bleed, with the four facts moved into
their own section beneath it. Primary CTA "Register your interest", secondary "Browse
agenda", which jumps to the agenda.

**Also done:**
- Icons added to "Who the summit is for", one per group, none of them financial. These are
  lucide, not Flaticon: Flaticon is unreachable from the build environment, and its free
  licence requires a visible attribution wherever an icon appears. lucide is already a
  dependency, ISC licensed, and matches the icons used elsewhere on the site.
- Zone cards lost the colour rule and the room name. Each zone name now carries its own
  colour instead, which is what the day-two agenda columns then reuse.
- Agenda days lead with a solid colour band: date on top, day name beneath in bold white,
  access level to the right. Day two's three zones are colour-headed panels in the same
  language.
- The two mid-page CTA bands are gone; the signup at the foot of the page carries it.
- Speakers ("Who you will hear from") and Companies on the Floor are hidden until A-05,
  A-06 and A-07 land. Both components and their content are still in the repo, so putting
  them back is a two-line change to `src/app/summit/page.tsx`.
- The signup footnote ("Registration opens 2026…") is removed.
- Summit signups now write `source: summit_page` rather than being pooled with footer
  signups. See `docs/form-submissions.md`.

---

## Progress · 7 September, from the run sheets

The Day 1 and Day 2 run sheets are now on the page, with real times.

**Day names.** Day 1 stays **Builders' Day**, Day 3 becomes **Impact Day**. Day 2 needed a
name and I have used **Global Day**: it is the day that carries the Global Grand Final and
the founder stories from across the globe, and it sits alongside the other two without
borrowing a zone name, which "Discover Day" would have. **Summit Day** and **Open Day** are
the alternatives if you would rather. One word in `summit-content.ts` either way.

Day 3's full approved name, "PepsiCo Greenhouse Program APAC Showcase — Impact Edition",
now sits on the session inside the day rather than as the day's title, so it is still there
in full and the three days read as a set.

**Kept off the page.** Everything about running the event rather than attending it: crew
call times, venue readiness, the GGF dress rehearsal, who is flying in, the note about a
slower morning for jet lag, and the banquet-with-table-activities idea while it still has a
question mark against it.

**Roundtable topics are now published**, which closes most of A-09: working with a
corporate, raising and using investment, and building a team and a culture. The host
organisations are **not** named. PepsiCo is a public partner and could be, but the investor
is still "TPC maybe, back up Mana Impact" and Google is not confirmed publicly, so naming
one and not the others would read oddly. Say the word once they are settled.

**The VIP reception guest list is published** as "ClimateLaunchpad finalists, PepsiCo
executives, BEV alumni and invited guests". That came from an internal run sheet rather
than anything approved for the site, so check you are happy for it to be public.

### Worth a decision: Day 2 is now a single track

The run sheet lays Day 2 out as one main-stage programme from 11:00am to the Grand Final,
with lunch and the startup exhibition in the middle. It says nothing about the Solve-It
Zone hours the September briefing gave (11:30am to 2:30 or 3:30pm), and nothing about
Connect.

I have kept the three zones and worded Day 2 as "Solve and Connect run alongside the main
programme", which is true under both documents. But if the zones have quietly become one
room and a programme, the zones section is now overselling and should be cut back. Tell me
which it is.

### Photography

Ten photographs came with the run sheets. Four are in use: the mangrove aerial behind the
hero, a networking shot beside "Three days built around tangible outcomes", and one per
zone — the auditorium for Discover, a table mid-conversation for Solve, a full networking
room for Connect. The other six are converted and sitting in `public/images` as
`climate-summit-1`, `-2`, `-3`, `-5`, `-6` and `-10`, so swapping any of them in is a
one-line change.

The 41 MB of source JPEGs in `climate-summit/` are now redundant: the WebP versions are
1.7 MB for the whole set. Worth deleting from the repository once you have them backed up
somewhere else, since git keeps every version of a binary forever.

### Progress · 7 September, second pass

- **The standing facts moved into the banner**, under the buttons. Dates, place and scale
  are what someone looks for the moment they land, and below the fold they were arriving
  after the decision had been made. They are glass tiles rather than the page's cards: an
  opaque panel punches a hole through the photograph behind it.
- **"Three days, three different rooms to be in" is now "The agenda"**, with a subheader
  that says what makes the three days unalike.
- **Zone bullets generalised.** They now describe the kind of thing that happens in each
  zone rather than naming sessions, so nobody arrives holding us to a specific title.
- **"Who the summit is for" rebuilt** as a photograph beside four cards that open as you
  reach them, in the manner of Aceternity UI's Sticky Scroll Reveal. On a phone the
  photograph sits inside the open card instead: a sticky panel in a single-column grid
  rides down over the cards, and a still photograph would be captioned by whichever card
  happened to be open. Four more of the summit photographs are now in use.
- **"Open day" is gone from the site.** The only remaining mention is in this document,
  where it is one of the alternative names for Day 2.
- **Subheaders audited.** The ones that restated their heading are rewritten to add
  something: who else is in the room and why that matters, and the fact that you can move
  between zones freely. The unused `intro` on the home Delivery block is deleted rather
  than left to look meaningful.
- **Typography set heavier.** Section headings go from semibold to bold across the site,
  headings pick up negative tracking from one base rule so a new heading cannot miss it,
  and the display register goes to 800 and tighter again, which keeps clear air between
  the one line that carries a page and the bold headings under it.

### Also done

- **A-04 closed by removal.** Sustainability Women is off the partner list, as asked. That
  also empties part of B-03, which was going to move it to a Community Partners group.
- **Irish Aid logo replaced** with the transparent version. The old file had the logo
  baked onto an off-white rectangle, which showed as a pale box against the page.
- **The warm palette is gone.** Every off-white on the Summit is now a tint of brand
  purple, including the inks the soft surfaces are mixed from.

---

## 1. Conflicts and problems found

These are not in the briefing. They came out of reading it against what the page currently
says, and each needs resolving before the surrounding work is safe.

### C-01 · The Global Grand Final is on two different days — DECIDE

The briefing puts the **Global Grand Final at ~4:00pm on Day 2**, in the Discover Zone. The
page currently has it opening **Day 3 at 09:30**, and Day 3 is now the PepsiCo Greenhouse
showcase, invite only. One of these is wrong. Everything in the timeline rebuild (B-01)
depends on the answer.

### C-02 · "Register to Attend Now" points at an email capture form — DECIDE

The CTA change is easy; the destination is the problem. `#signup` is a *notify me* form,
and the section it lands on reads:

> **Be first to know when registration opens** … We release delegate places and speaker
> announcements to this list before anywhere else. Registration opens 2026.

If registration is genuinely open, that whole block is now false, not just the button. I
need either **the real registration URL** (Brevo? Eventbrite? Luma?) or a decision to keep
capturing interest under honest wording. Changing the button alone would be worse than
leaving it.

### C-03 · Only Day 2 is open to the public — DECIDE

Day 1 is startups and mentors only; Day 3 is invite only. So a general registrant is
buying into one day of three. The page currently sells "three days" throughout. We should
either label access per day on the agenda, or reword the top-line pitch. Otherwise the
registration promise does not match what most people can attend.

### C-04 · The approved PepsiCo name contains an em dash — DECIDE

Standing house rule is no em dashes anywhere on the site. The approved wording is
"PepsiCo Greenhouse Program APAC Showcase — Impact Edition". I will treat the partner's
approved name as an exception and leave the dash in, unless you say otherwise.

The briefing also uses two forms: **"PepsiCo Greenhouse Program APAC Showcase — Impact
Edition"** for the approved wording, and **"PepsiCo Greenhouse APAC Showcase"** (no
"Program") for the Day 3 label. Tell me which to use where, or I will use the full
approved form everywhere.

### C-05 · Partner name mismatch — DECIDE

The page says **Sustainability Women**. The briefing says **Sustainability for Women**.
Which is right?

### C-06 · "Share upon confirmation" reads oddly — DECIDE

Requested venue wording is "Share upon confirmation". As a value in a Venue field it
scans as an instruction to the reader. **"Shared upon confirmation"** or **"Shared once
confirmed"** reads better. Say which you want; I will use your exact words if you prefer.

Note the field currently reads "Confirmed upon registration", from your last round of
edits, not "To be announced" as the briefing assumes.

### C-07 · Which stats row is being removed? — DECIDE

The briefing says remove "the second row of stats (countries represented, number of days,
investors, etc.)". There are two stat rows on the page, and neither is literally a second
row:

1. **Hero facts** — Dates, Location, Venue, Countries
2. **About specimens** — Countries represented, Days, Founders on stage, Investors attending

The named fields match **the About specimens**, so that is what I will remove. But the
briefing separately asks to keep and relabel a Countries field (R-02), which lives in the
hero. Confirming: remove the About block entirely, keep the hero row.

---

## 2. Copy changes — READY

Straight swaps. I can do all of these today.

| ID | Where | Now | Change to |
| --- | --- | --- | --- |
| R-01 | Hero fact | Venue: "Confirmed upon registration" | "Shared upon confirmation" (pending C-06) |
| R-02 | Hero fact | Label "Countries", value "50" | Label "Guests from:", value "50 countries" |
| R-03 | About heading | "Three days built around commercial outcomes" | "Three days built around tangible outcomes" |
| R-04 | About para 1 | "…the customers, capital and partnerships that decide whether it scales." | "…the customers, capital and partnerships. That's how it scales and creates impact." |
| R-05 | About para 2 | "…two events that already draw the world to Singapore:" | Remove the clause; keep the two events named |
| R-06 | Hero CTA | "Register your interest" | "Register to Attend Now" (blocked by C-02) |
| R-07 | Strands heading | "Four strands running across three days" | Rewrite for three zones (see B-02) |
| R-08 | Everywhere | "PepsiCo Greenhouse Program APAC Showcase" | Approved wording with "— Impact Edition" (pending C-04) |
| R-09 | About specimens | Four-stat grid | Remove entirely (pending C-07) |

---

## 3. Structural rebuilds — BUILD

### B-01 · Rebuild the three-day agenda

The current timeline is invented placeholder and bears no relation to the real programme.
Every block is wrong. Replacing it with:

- **Day 1 · Tuesday, afternoon only.** Registration 1:00pm, programme 1:30pm. Startups and
  mentors only. Founder TED Talks (background, biggest mistake, biggest win, top tip),
  Founder Circle / Exchange roundtables, Expert Roundtables (choose your own adventure),
  1-to-1 mentoring from 4:30pm, VIP reception in the evening.
- **Day 2 · Wednesday, full day.** All three zones running at once. Discover Zone:
  possible Minister welcome, synthesis session, lunchtime Collaboration Matrix, PepsiCo
  Climate Impact case study panel, Global Insights, Global Grand Final ~4:00pm then
  networking. Solve-It Zone 11:30am–2:30/3:30pm. Connect Zone all day.
- **Day 3 · Thursday, from ~10:30am.** PepsiCo Greenhouse APAC Showcase, invite only.

Needs an **access label per day** (open / startups and mentors only / invite only), which
the current timeline component has no slot for.

Do **not** publish: the Minister welcome (unconfirmed), the Solve-It Zone hosts
(Corley, Epic Angels, Foundational are all "potential"), or the exact Solve-It end time
(2:30 or 3:30 undecided).

### B-02 · Four strands become three zones

A replacement, not an edit. Discover / Solve / Connect, each with what actually happens in
it. The four current strands (Founder roundtables, Proof of value showcase, Capital and
corporate matching, Global Grand Final) all disappear as top-level items; most survive as
sessions inside a zone.

The numbered card grid already built for four items reflows to three cleanly.

### B-03 · Partners become three groups

Currently two: Organised by, Supported by. Adding **Community Partners**, and moving
Sustainability for Women there alongside Epic Angels.

### B-04 · Hero treatment: teal band with a constrained image

Requested: match the BEV page style, teal background with the image constrained rather
than full bleed. The summit key visual is currently edge-to-edge.

Worth noting the rest of the site standardised on a **purple** gradient banner last week.
A teal summit banner will read as deliberately different, which may be exactly right for a
sub-brand — I just want to flag it rather than assume. **Confirm: brand teal `#12a19d`?**

---

## 4. Waiting on you — BLOCKED

| ID | Item | Notes |
| --- | --- | --- |
| A-01 | The Brevo email with approved PepsiCo language | Referenced in the briefing; I have not seen it. Needed for R-08. |
| A-02 | Registration URL | Needed for C-02 / R-06. |
| A-03 | Epic Angels logo | For B-03. |
| A-04 | Sustainability for Women logo | Still a typographic lockup; outstanding since the first partner round. |
| A-05 | PepsiCo Greenhouse participant list | "Companies on the Floor" currently shows six placeholder startups. |
| A-06 | BEV portfolio companies for the floor | Same section. |
| A-07 | Speaker names, roles, orgs and photos | All eight are "To be announced". Two TED Talk speakers are confirmed per the briefing but not named here. |
| A-08 | Impact Edition framing | The five returning startups from the four-year APAC accelerator, and a line explaining the impact framework. |
| A-09 | Three Expert Roundtable topics | Being finalised from the founder survey. |
| A-10 | Confirmed Solve-It Zone takeover hosts | Currently all "potential". |

### Scheduled follow-up

**18 September** — national winners can be added to Companies on the Floor. That is 17
days away. Worth a calendar reminder; I can also set one.

### On speaker imagery

The briefing asks for good gender diversity in speaker photos. There are currently **no
speaker photos at all** — eight placeholders. This becomes a requirement on the list you
send me (A-07) rather than something I can fix in the code. Flagging it so it is checked
before the photos are chosen, not after.

---

## 5. Not a website change

**Zone signage (A1/A2 sheets on easels).** Discover gets title plus confirmed agenda;
Solve-It gets takeovers and expertise areas; Connect gets the Matchmaking Corner and
Collaboration Matrix prompts.

This is print, not web. It is out of scope for the site, but I can produce print-ready
artwork in the summit's visual language if you want — say the word and it becomes its own
piece of work.

---

## Suggested order

1. Answer the DECIDE items in section 1. Several of them gate everything else.
2. I do all of section 2 (copy), except R-06 which waits on the registration URL.
3. B-02 and B-03 (zones, partner groups) — self-contained and low risk.
4. B-01 (agenda) once C-01 settles the Global Grand Final day.
5. B-04 (hero treatment) once the teal is confirmed.
6. Content lands from section 4 as it becomes available.
