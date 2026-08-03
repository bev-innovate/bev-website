# Using Tailark (and other shadcn registries)

[Tailark](https://tailark.com) is a registry of MIT-licensed shadcn marketing blocks
([github.com/tailark/blocks](https://github.com/tailark/blocks)). Blocks are written
against shadcn's semantic tokens, so they need a token layer to land on.

**That layer now exists.** `src/app/globals.css` maps shadcn's names onto the brand:

| shadcn token | resolves to |
| --- | --- |
| `background` / `foreground` | canvas / ink |
| `muted` / `muted-foreground` | canvas-sunk / ink-muted |
| `primary` | purple `#540178` |
| `accent` | terracotta `#b4552f` |
| `border`, `input`, `ring` | line, line-strong, terracotta |
| `--radius` | `0.75rem` |

The brand still lives in one place; the shadcn names are aliases onto it. A block using
`bg-muted/50 text-foreground rounded-(--radius)` is on-brand with no edits.

There is also a `[data-theme="fieldnotes"]` scope that repoints those same tokens at the
earth palette, so blocks dropped into the Summit page inherit bark/terracotta instead.

## Installing a block

```bash
npx shadcn@latest add @tailark/hero-section-one
```

First add the namespace to `components.json`:

```json
{ "registries": { "@tailark": "https://tailark.com/r/radix/{name}.json" } }
```

**This will not work from the agent build environment** — `tailark.com` is 403 at the
egress proxy, as is `ui.shadcn.com`. Run it locally, or clone the repo and copy the block
source:

```bash
git clone --depth 1 https://github.com/tailark/blocks
# blocks live in registry/bases/{base,radix}/{dusk,mist,veil}/blocks/<category>/
```

`radix` variants use `@radix-ui/*` primitives; `base` variants use Base UI. This project
uses Radix (`@radix-ui/react-hover-card`, `@radix-ui/react-slot` are installed), so prefer
the `radix` tree.

## What is already adapted

The clone lives at `registry/bases/base/mist/` in the Tailark repo. Every component below
credits its source block in its own file header.

| Ours | Tailark block | What was taken |
| --- | --- | --- |
| `src/components/ui/card.tsx` | `ui/card` | Vendored whole. `default` / `soft` / `mixed` / `outlined` variants; the surface primitive everything else is built on. |
| `src/components/site/track-record.tsx` | `stats/two`, `stats/four` | Heading + intro over an unboxed `grid-cols-2 md:grid-cols-4` of `text-primary` figures. Our `CountUp` is kept. |
| `src/components/site/delivery.tsx` | `features/eight` | `Card variant="soft"` grid, icon-led, aligned footers. |
| `src/components/site/verticals.tsx` | `features/eight` | `col-span-full` lead card carrying the photography, smaller cards under it. |
| `src/components/site/cta-band.tsx` | `call-to-action/two` | Flex-wrap heading-and-buttons row under a hairline rule. |
| `src/components/site/programme-card.tsx` | `ui/card` | Uses `cardVariants()` on the anchor, since the whole card is a link. |
| `src/components/site/section.tsx`, `page-header.tsx` | `content/two` | Section lead-in is a plain `text-primary` span, not a letterspaced small-caps eyebrow. |
| `src/app/page.tsx` (who we are) | `content/two` | `lg:grid-cols-5` split with the prose behind a left rule. |
| `src/app/page.tsx` (logo strip), `about` | `logo-cloud/two` | Muted lead-in inline above the marks. |
| `summit/sections.tsx` — `SummitStrands`, `SummitStartups` | `features/eight` | Card grids. |
| `summit/sections.tsx` — `SummitTimeline` | `content/two` | `sm:grid-cols-5` rows separated by `sm:divide-y`. |
| `summit/sections.tsx` — `SummitAbout` | `stats/four` | Unboxed figures. |
| `summit/sections.tsx` — `SummitSpeakers` | `team/two` | Compact avatar-and-name rows in a dense grid. |

The Summit page carries `data-theme="fieldnotes"` on its root element, so every block
inside it resolves `primary`, `muted` and `border` to the warm palette instead.

## Conventions when adapting a block

1. Keep the shadcn token classes (`text-muted-foreground`, not `text-ink-muted`) — that is
   what makes the next block drop in cleanly too.
2. Replace hardcoded demo content with props.
3. Credit the source in the file header, as the existing vendored components do.
