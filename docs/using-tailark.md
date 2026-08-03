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

- `src/components/summit/sections.tsx` — `SummitSpeakers` follows Tailark's `team/two`
  structure: compact avatar-and-name rows in a dense grid rather than large portrait
  frames. Attribution is in the component's doc comment.

## Conventions when adapting a block

1. Keep the shadcn token classes (`text-muted-foreground`, not `text-ink-muted`) — that is
   what makes the next block drop in cleanly too.
2. Replace hardcoded demo content with props.
3. Credit the source in the file header, as the existing vendored components do.
