import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Type scale.
 *
 * One set of steps for every page, so hierarchy reads the same everywhere:
 *
 *   eyebrow   small caps label above a title          (who/what this is)
 *   display   the page's one big statement             (h1)
 *   title     a section's title                        (h2)
 *   subtitle  a group inside a section                 (h3)
 *   lead      one or two sentences that open a section (the point)
 *   body      supporting text, kept to short paragraphs
 *   caption   small print, attributions, notes
 *
 * Size and colour step down together: the further down the scale, the quieter the ink,
 * so the eye lands on the title, then the lead, and only then the body.
 */
const textVariants = cva("", {
  variants: {
    variant: {
      eyebrow: "text-sm font-bold tracking-[0.14em] uppercase",
      display: "display text-[clamp(2.75rem,7vw,5.75rem)] text-foreground",
      title: "display text-[clamp(2.5rem,5.5vw,4.5rem)] text-foreground",
      subtitle: "font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-bold text-foreground",
      lead: "text-[clamp(1.25rem,2vw,1.5rem)] leading-snug text-foreground",
      body: "max-w-prose text-lg leading-relaxed text-muted-foreground",
      caption: "text-sm leading-relaxed text-muted-foreground",
    },
  },
  defaultVariants: { variant: "body" },
});

const defaultTag = {
  eyebrow: "p",
  display: "h1",
  title: "h2",
  subtitle: "h3",
  lead: "p",
  body: "p",
  caption: "p",
} as const;

type Variant = NonNullable<VariantProps<typeof textVariants>["variant"]>;

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  /** Override the element, e.g. a `title` that should be an h3 in its context. */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div" | "blockquote";
}

export function Text({ variant = "body", as, className, ...props }: TextProps) {
  const Tag = as ?? defaultTag[variant];
  return <Tag className={cn(textVariants({ variant }), className)} {...props} />;
}

export { textVariants };
