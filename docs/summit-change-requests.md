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
where one day is open), C-05 (partner name), B-03, B-04, and everything in section 4.

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
