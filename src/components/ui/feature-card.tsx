import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * A rounded card with an icon, a short heading and one line under it.
 *
 * For breaking a section into a few scannable points instead of a long paragraph: the
 * heading carries the idea, the line adds one detail. Keep the line to a sentence.
 *
 * `tone` sets the icon tile's colour so the same card works in each brand context.
 */
const tones = {
  teal: "bg-exchange-mist text-exchange",
  purple: "bg-purple/10 text-purple",
  orange: "bg-orange/12 text-orange-deep",
} as const;

export function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "teal",
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-4 rounded-3xl border border-border bg-background p-6",
        "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(6,45,43,0.35)]",
        className,
      )}
    >
      <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl", tones[tone])}>
        <Icon className="size-6" aria-hidden />
      </span>
      <div>
        <h3 className="font-display text-lg leading-snug font-bold text-foreground">{title}</h3>
        {description ? (
          <p className="mt-1.5 leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
