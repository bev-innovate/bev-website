# Where form submissions go

Two forms feed this: the contact form (`/contact`) and the newsletter signup in the footer
and on the Summit page. Both run through server actions in `src/app/actions.ts`.

## The shape

```
visitor submits
      │
      ├─► Supabase          ← system of record. Blocking. Failure = visible error.
      │
      └─► after the write, in parallel, never fatal:
            ├─► Resend      ← emails the team
            └─► Airtable    ← mirrors the row
```

Supabase is the only thing in the critical path. Resend and Airtable run afterwards under
`Promise.allSettled`, each with a 6-second timeout, and each logs its own failure. If
Airtable is rate-limited (5 requests/second per base) or the Resend key has expired, the
submission is still captured and the visitor still gets a confirmation. Nothing is lost;
worst case a row needs replaying out of Supabase.

Every channel is inert until its env vars are set, so the site deploys with none of them.

## Turning email on

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys). The free tier
   is 3,000 emails a month, which is far more than this needs.
2. Verify `betterearthventures.com` at [resend.com/domains](https://resend.com/domains).
   This is a DNS step: Resend gives you the records to add.
3. In Vercel, set:
   - `RESEND_API_KEY`
   - `ENQUIRY_NOTIFY_FROM` — an address on the verified domain
   - `ENQUIRY_NOTIFY_TO` — comma-separated if more than one person should get it

Until the domain is verified, the default `onboarding@resend.dev` sender only delivers to
the Resend account owner's own address. Useful for testing, not for production.

Newsletter signups are **not** emailed by default: they would be noise. Set
`NOTIFY_ON_SUBSCRIBE=true` if that changes.

Replies go to the enquirer, not to the robot: `reply_to` is set to the sender's address.

## Turning the Airtable mirror on

1. Create a token at [airtable.com/create/tokens](https://airtable.com/create/tokens).
   Scope it to **`data.records:write`** on the one base, nothing wider. This token can
   create records; it should not be able to read the rest of the workspace.
2. Find the base ID: it is the `app…` segment of the base's URL.
3. Set `AIRTABLE_TOKEN` and `AIRTABLE_BASE_ID` in Vercel. Set
   `AIRTABLE_ENQUIRIES_TABLE` / `AIRTABLE_SUBSCRIBERS_TABLE` if the tables are not named
   `Enquiries` and `Subscribers`.

### The fields it writes

The mirror sends these column names. They have to match the Airtable columns exactly, and
Airtable is case-sensitive here.

| Table | Columns | Type |
| --- | --- | --- |
| Enquiries | `Name`, `First name`, `Last name` | Single line text |
| Enquiries | `Email` | Email |
| Enquiries | `Goals` | Long text |
| Enquiries | `Interest` | Single select, or single line text |
| Enquiries | `Subscribe` | Checkbox |
| Subscribers | `Email` | Email |
| Subscribers | `Source` | Single line text |

`Interest` arrives as the full option label, e.g. "Scale my startup with expert guidance".
The request sets `typecast: true`, so Airtable will create a missing single-select option
rather than rejecting the write.

Ticking "Sign up for news and updates" writes the enquiry *and* adds the address to
Subscribers with source `enquiry_form`.

If your existing base uses different column names, tell me what they are and I will map
them — do not rename the Airtable columns to match this, since that would break whatever
views and automations already point at them.

## Why not Airtable alone

It is a fair question, and if the team lives in Airtable it is tempting to drop Supabase.
Two reasons not to:

- **Airtable would be in the request path.** Its API is rate-limited to 5 requests/second
  per base and shares an availability budget with everything else in the workspace. A
  submission failing because someone else's automation is mid-run is a bad trade.
- **There is no replay.** With Supabase holding the record, an Airtable outage costs a
  backfill. Without it, the submission is simply gone.

The current shape costs one extra service and buys durability. If you would rather cut
Supabase, say so and I will make Airtable the blocking write instead — it is a small
change, and the tradeoff is yours to make, not mine.

## Checking it works

Submit the contact form on the deployed site, then:

- **Supabase** — the row appears in the `enquiries` table.
- **Resend** — the send shows in [resend.com/emails](https://resend.com/emails), with the
  delivery result. This is where to look first if the mail never arrives.
- **Airtable** — the record appears in the table.
- **Vercel** — any channel that failed logged `[notify] …` in the function logs.

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
