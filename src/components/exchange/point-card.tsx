"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * The Exchange's icon card: an icon, a short heading and one line under it.
 *
 * On phones the icon sits beside the heading to save height, and the line under it opens
 * while the card passes through the middle of the screen, then folds away again once
 * scrolled past. The line stays in the page throughout, so screen readers always reach it.
 * Under reduced motion, and from the `sm` breakpoint up, every line simply stays open and
 * the icon sits above the heading as before.
 */
export function PointCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // "Active" while the card overlaps the middle fifth of the screen.
    const io = new IntersectionObserver(([entry]) => setOpen(entry.isIntersecting), {
      rootMargin: "-40% 0px -40% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-open={open || undefined}
      className={cn(
        "h-full rounded-3xl border border-border bg-background p-5 sm:p-6",
        "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(6,45,43,0.35)]",
        "max-sm:data-open:border-exchange/40",
      )}
    >
      <div className="flex items-center gap-4 sm:flex-col sm:items-start">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-exchange-mist text-exchange">
          {icon}
        </span>
        <Text variant="heading" className="text-lg">
          {title}
        </Text>
      </div>
      <div
        className={cn(
          "grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out",
          "data-open:grid-rows-[1fr] sm:grid-rows-[1fr] motion-reduce:grid-rows-[1fr] motion-reduce:transition-none",
        )}
        data-open={open || undefined}
      >
        <div className="overflow-hidden">
          <Text className="pt-2 pl-16 text-base sm:pt-1.5 sm:pl-0">{description}</Text>
        </div>
      </div>
    </div>
  );
}
