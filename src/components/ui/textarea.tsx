import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Textarea.
 *
 * From 21st.dev's "Contact 2" block by @shadcnblockscom, which is the shadcn/ui textarea.
 * Matches Input's focus and invalid treatment so the two read as one control set.
 */
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-32 w-full rounded-(--radius) border border-input bg-background px-4 py-3 text-foreground",
      "placeholder:text-muted-foreground",
      "transition-[color,box-shadow,border-color] duration-200",
      "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:outline-none",
      "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
