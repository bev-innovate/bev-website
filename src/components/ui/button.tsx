import Link from "next/link";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Brand buttons. The old site used a solid orange pill as its primary action on both
 * light and dark backgrounds — that carries over as `primary`.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-orange text-white hover:bg-orange-deep shadow-[0_1px_2px_rgba(51,51,51,0.15)] hover:shadow-[0_8px_22px_-8px_rgba(238,121,47,0.75)]",
        purple: "bg-purple text-white hover:bg-purple-soft",
        teal: "bg-teal text-white hover:bg-teal-deep",
        white: "bg-white text-purple hover:bg-canvas-sunk",
        outline:
          "border-2 border-current text-ink hover:bg-ink/5 [&.on-dark]:text-white",
        ghost: "text-ink hover:bg-canvas-sunk",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.9375rem]",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
