import * as React from "react";

import { cn } from "@/lib/utils";

const tones = {
  neutral: "border-line-strong text-ink-muted bg-canvas-raised",
  purple: "border-transparent bg-purple text-canvas",
  yellow: "border-transparent bg-yellow text-purple",
  orange: "border-transparent bg-orange/12 text-orange-deep",
  teal: "border-transparent bg-teal/12 text-teal-deep",
} as const;

export function Badge({
  tone = "neutral",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

const statusMap = {
  open: { tone: "yellow" as const, label: "Applications open", pulse: true },
  upcoming: { tone: "orange" as const, label: "Coming soon", pulse: false },
  closed: { tone: "neutral" as const, label: "Applications closed", pulse: false },
  completed: { tone: "neutral" as const, label: "Completed", pulse: false },
};

export function StatusBadge({ status }: { status: keyof typeof statusMap }) {
  const { tone, label, pulse } = statusMap[status] ?? statusMap.upcoming;
  return (
    <Badge tone={tone}>
      {pulse ? (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-purple opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-purple" />
        </span>
      ) : (
        <span className="size-1.5 rounded-full bg-current opacity-50" />
      )}
      {label}
    </Badge>
  );
}
