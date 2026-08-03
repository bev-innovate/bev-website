import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * FAQ accordion built on native <details>/<summary>: keyboard accessible, works without
 * JavaScript, and the content is in the DOM for search engines.
 */
export function Accordion({
  items,
  className,
}: {
  items: { question: string; answer: string }[];
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="text-base font-medium text-ink md:text-lg">{item.question}</span>
            <Plus
              className="size-5 shrink-0 text-ink-faint transition-transform duration-300 group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <p className="max-w-2xl pb-6 text-ink-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
