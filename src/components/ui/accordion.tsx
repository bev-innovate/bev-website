import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Accordion built on native <details>/<summary>: keyboard accessible, works without
 * JavaScript, and the answers stay in the DOM for search engines.
 */
export function Accordion({
  items,
  tone = "default",
  className,
}: {
  items: { question: string; answer: string }[];
  /** `onTeal` renders outlined cards for use on the teal band. */
  tone?: "default" | "onTeal";
  className?: string;
}) {
  const onTeal = tone === "onTeal";

  return (
    <div className={cn(onTeal ? "space-y-3" : "divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details
          key={item.question}
          className={cn(
            "group",
            onTeal ? "rounded-md border border-white/45 px-5 open:bg-white/8" : "py-1",
          )}
        >
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden",
              onTeal ? "font-semibold text-white" : "text-base font-medium text-ink md:text-lg",
            )}
          >
            <span>{item.question}</span>
            <ChevronDown
              className={cn(
                "size-5 shrink-0 transition-transform duration-300 group-open:rotate-180",
                onTeal ? "text-white/80" : "text-ink-faint",
              )}
              aria-hidden
            />
          </summary>
          <p
            className={cn(
              "max-w-3xl pb-6 leading-relaxed",
              onTeal ? "text-white/90" : "text-ink-muted",
            )}
          >
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
