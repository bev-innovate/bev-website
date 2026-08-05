import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Input.
 *
 * From 21st.dev's "Contact 2" block by @shadcnblockscom, which is the shadcn/ui input.
 * Radii and focus ring come from the token bridge in globals.css, so it inherits the
 * brand: `--radius` and the terracotta `--ring`.
 */
export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-(--radius) border border-input bg-background px-4 py-2 text-foreground",
        "placeholder:text-muted-foreground",
        "transition-[color,box-shadow,border-color] duration-200",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:outline-none",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
