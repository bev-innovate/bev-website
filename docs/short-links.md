# Short links

Vanity paths on `betterearthventures.com` that forward somewhere else. They exist to be
printed on slides, turned into QR codes and pasted into messages, so they have to be short,
stable, and forgiving about how someone types them.

| Link | Goes to |
| --- | --- |
| `betterearthventures.com/SEL` | The Airtable form at `airtable.com/appxKGcCrGkqLk1vM/pagfnfnmQ2qgkaAVC/form` |

Casing does not matter: `/SEL`, `/sel` and `/Sel` all land in the same place, so it is safe
to print in caps and safe for someone to type in lower case. A trailing slash is fine too.

## Adding one

They live in `next.config.ts`, in the `shortLinks` array near the top:

```ts
const shortLinks = [
  { slug: "SEL", destination: "https://…", note: "Airtable enquiry form" },
];
```

Add a row and redeploy. The slug is matched as a whole path segment, so it cannot collide
with a real page unless you name it after one.

## Why they are temporary redirects

Each one is served as a **307**, not a 308. A 308 tells the browser to cache the redirect
forever, and browsers take that seriously: there is no way to clear it remotely. A short
link is exactly the kind of thing that gets repointed at a new form next year, and anyone
who had already clicked a permanent version would keep landing on the dead one.

The Wix-era redirects in the same file *are* permanent, deliberately. Those are old URLs
with inbound links from press coverage that will never move again, and there the caching
is the point.

## What this is not

It does not count clicks. If you need to know how many people followed `/SEL`, that has to
come from the destination: Airtable records a submission time on every response, and Vercel
Web Analytics counts the redirect as a page view on the path. Neither is a proper campaign
tracker. If that matters, say so and we can add per-source query parameters to the
destinations instead.
