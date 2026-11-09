import { ImageIcon, Video } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Stands where a photo or film will go, saying what belongs there.
 *
 * Deliberately obvious: a dashed frame and a plain label, so nobody reviewing the page
 * mistakes it for finished work, and whoever supplies the file knows what is wanted.
 */
export function MediaPlaceholder({
  kind,
  label,
  note,
  onColour = false,
  className,
}: {
  kind: "photo" | "video";
  label: string;
  note?: string;
  /** On the teal band: ink lines on a translucent white wash. */
  onColour?: boolean;
  className?: string;
}) {
  const Icon = kind === "video" ? Video : ImageIcon;
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "grid place-items-center rounded-2xl border-2 border-dashed p-6 text-center",
        onColour
          ? "border-exchange-ink/35 bg-white/25 text-exchange-ink"
          : "border-exchange/45 bg-exchange-mist text-exchange-ink",
        className,
      )}
    >
      <div className="max-w-xs">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-white/80">
          <Icon className="size-5" aria-hidden />
        </span>
        <p className="mt-3 font-semibold">{label}</p>
        {note ? <p className="mt-1 text-sm leading-relaxed opacity-80">{note}</p> : null}
      </div>
    </div>
  );
}
