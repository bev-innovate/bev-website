# Where form submissions go

Two forms feed this: the contact form (`/contact`) and the newsletter signup in the footer
and on the Summit page. Both run through server actions in `src/app/actions.ts`.

## The shape

Whichever of the two stores is configured holds the submission. **Either one on its own is
enough to go live.**

```
visitor submits
      │
      ├─ Supabase configured?
      │     yes ─► Supabase   ← system of record. Blocking. Failure = visible error.
      │            Airtable   ← mirror alongside it, never fatal.
      │
      │     no ──► Airtable   ← promoted to system of record. Blocking.
      │
      └─ neither ─► logged as a warning, and in production the visitor is told to email us.

  and either way: Resend ← notifies the team, never fatal.
```

Supabase is preferred when both are set, because Airtable's API is rate-limited to 5
requests per second per base and shares an availability budget with everything else in the
workspace: a submission failing because someone else's automation is mid-run is a bad
trade. With Supabase holding the record, an Airtable outage costs a backfill rather than a
lost lead.

The point of the promotion is that **a submission is never accepted into nothing.** Before
this, an unconfigured site thanked the visitor for a signup that went no further than a log
line. Now: if a store is configured and the write fails, the visitor is told so and can try
again. If nothing is configured, that is fine on a preview or a local run and the form
still demos, but on the live site it returns the email address instead of a false thank you.

Resend runs alongside and logs its own failures. It can never fail a submission.

## Turning email on

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys). The free tier
   is 3,000 emails a month, which is far more than this needs.
2. Verify `betterearthventures.com` at [resend.com/domains](https://resend.com/domains).
   This is a DNS step: Resend gives you the records to add.
3. In Vercel, set:
   - `RESEND_API_KEY`
   - `ENQUIRY_NOTIFY_FROM`: an address on the verified domain
   - `ENQUIRY_NOTIFY_TO`: comma-separated if more than one person should get it

Until the domain is verified, the default `onboarding@resend.dev` sender only delivers to
the Resend account owner's own address. Useful for testing, not for production.

Newsletter signups are **not** emailed by default: they would be noise. Set
`NOTIFY_ON_SUBSCRIBE=true` if that changes.

Replies go to the enquirer, not to the robot: `reply_to` is set to the sender's address.

## Turning the Airtable write on

Submissions go into **BEV CRM**, base **`appYLZb0d4rzdPBbN`**, which is the default
`AIRTABLE_BASE_ID` in `.env.example`. The only thing missing is a token, which has to be
created by someone signed in to the workspace.

**Create the token**, at [airtable.com/create/tokens](https://airtable.com/create/tokens).
Scope it to **`data.records:read`** and **`data.records:write`** on that one base and
nothing wider. Read as well as write, because a signup is deduplicated by looking the
person up on email before deciding whether to add them or update what is already there. Add
**`schema.bases:read`** too if you want the column check.

**Then run one command:**

```bash
npm run airtable:setup
```

It asks for the token at a hidden prompt (nothing is echoed, so it does not end up in your
scrollback), checks it against the base, and then offers each remaining step in turn:

- save it to `.env.local`, which is gitignored
- write one clearly-labelled test row into each table so you can watch the path work
- set `AIRTABLE_TOKEN` and `AIRTABLE_BASE_ID` on Vercel, across all three environments

Say no to any of them and nothing is written. Never pass the token as a command line
argument, and do not paste it into chat, a commit, or a shared document: a hidden prompt is
there so it stays out of your shell history.

Afterwards, `npm run airtable:check` re-runs the verification on its own, and
`npm run airtable:check -- --send` writes another test row.

### The last step is the one that matters

Setting the variables **on Vercel** is what makes the mirror live. Until then it is inert on
the deployed site whatever `.env.local` says, because `.env.local` never leaves your machine.
Environment variables are picked up by the next deployment, so **redeploy afterwards**.

If the Vercel CLI is not installed the setup script says so and stops there. The dashboard
does the same job: Project → Settings → Environment Variables, add both keys to Production,
Preview and Development, then redeploy. `AIRTABLE_CONTACTS_TABLE` and
`AIRTABLE_ENQUIRIES_TABLE` default to the right table ids and only need setting if the
tables are replaced outright.

### Where a submission lands

Writes are addressed by **field id**, not by column name, so renaming a column in the
Airtable UI does not break the forms. Renaming or deleting a *select option* still does,
deliberately: `typecast` is off, so a missing option fails loudly rather than quietly
creating a near duplicate in a field that already has 28 of them.

**Newsletter signup** upserts one row in **Contacts**, matched on email:

| Column | Written |
| --- | --- |
| `Email` | The address, lowercased |
| `Newsletter Subscription` | `Yes` |
| `Source` | `Newsletter Form`, merged into whatever is already there |

**Enquiry** does two things. The person is upserted into **Contacts** exactly as above but
with Source `Contacted Us`, and the message itself is filed as one row in **Enquiries**
(`Name`, `First Name`, `Last Name`, `Email`, `Interest`, `Goals`, `Subscribe`), opened at
status `New` and linked back to the contact.

The message lives in its own table rather than in the contact's notes because a person can
write in more than once, and squashing several enquiries together would lose all but the
last. Ticking "Sign up for news and updates" additionally sets `Newsletter Subscription`
on the contact.

### What it will not overwrite

The CRM is a table the team edits by hand, so the update path is deliberately narrow:

- **Source is merged, never replaced.** An existing `Zapier` or `Event registration` tag
  survives a later web signup.
- **A name is only filled in when the CRM has none.** A form can never overwrite a name
  someone corrected by hand.
- **"Do Not Engage" wins.** If any `Do Not Engage` engagement type is set, the signup is
  still recorded against Source but the subscription flag is left alone. That decision was
  the team's and is not the visitor's to reverse.
- **A previous `Unsubscribe` is reversed by an explicit new signup**, because the person
  has just asked again in their own words. This is the one case where the form overrides
  what the CRM already said, so it is worth knowing about.

Which page a signup came from (`website_footer`, `summit_page`, `enquiry_form`) is kept in
Supabase, where it is a plain column. The CRM gets the single Source option the team
already filters on.

## Airtable alone

Perfectly workable, and the code now supports it with no change: set `AIRTABLE_TOKEN` and
`AIRTABLE_BASE_ID`, leave the Supabase variables empty, and Airtable becomes the system of
record. One service, one token, and leads land where the team already works.

What you give up by skipping Supabase:

- **Airtable sits in the request path.** Its API allows 5 requests per second per base and
  shares an availability budget with everything else in the workspace. If it is busy or
  down, the visitor sees an error and has to try again.
- **There is no replay.** With Supabase behind it, an Airtable outage costs a backfill.
  Without it, a submission that fails is simply not captured.

For the volumes this site will see, neither is likely to bite. Adding Supabase later is
just setting two more variables: the code picks it up and demotes Airtable to a mirror on
the next deploy, with no code change and no migration of what Airtable already holds.

## Checking it works

Submit the contact form on the deployed site, then:

- **Supabase**: the row appears in the `enquiries` table.
- **Resend**: the send shows in [resend.com/emails](https://resend.com/emails), with the
  delivery result. This is where to look first if the mail never arrives.
- **Airtable**: the record appears in the table.
- **Vercel**: any channel that failed logged `[notify] …` in the function logs.

The line to search the function logs for is `[forms] nothing configured`. If that appears
on the live site, submissions are reaching nowhere and the environment variables are
missing.

## Database migration

The enquiry form was realigned with the one from the Wix site: first and last name
separately, an ecosystem-interest list in place of the old fixed topic, goals rather than
message, and a newsletter opt-in.

`supabase/migrations/0002_enquiry_fields.sql` adds `first_name`, `last_name`, `interest`
and `subscribe`, drops the CHECK constraint that limited `topic` to four values, and makes
`topic` nullable. It is additive: existing rows keep everything they had, and `name` is
still written with the two parts joined.

**Run it before the next deploy.** Until it does, inserts will fail on the unknown columns
and the form will report an error, even though the email and Airtable mirror still go out.
Paste it into the Supabase SQL editor, or `supabase db push` if the CLI is linked.
