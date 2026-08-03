import Link from "next/link";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-canvas hover:bg-moss shadow-[0_1px_2px_rgba(14,31,25,0.18)] hover:shadow-[0_6px_20px_-6px_rgba(20,53,42,0.5)]",
        signal:
          "bg-signal text-forest hover:brightness-105 shadow-[0_1px_2px_rgba(14,31,25,0.12)] hover:shadow-[0_6px_20px_-6px_rgba(200,241,105,0.7)]",
        outline:
          "border border-line-strong text-ink hover:border-forest hover:bg-canvas-sunk",
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
