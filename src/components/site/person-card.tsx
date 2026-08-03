import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import type { Person } from "@/lib/types";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/**
 * Person card.
 *
 * `full` gives a square portrait above the name, for the staff list. `row` is the compact
 * portrait-beside-name layout used for the longer expert and advisor lists, which would
 * otherwise fill a screen each with faces.
 *
 * No headshots are in the repo yet, so the portrait falls back to an initials tile rather
 * than an empty frame.
 */
export function PersonCard({
  person,
  variant = "full",
}: {
  person: Person;
  variant?: "full" | "row";
}) {
  const portrait = (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-(--radius) bg-muted",
        variant === "full" ? "mb-5 aspect-square w-full" : "size-14",
      )}
    >
      {person.photo ? (
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes={variant === "full" ? "(min-width: 1024px) 22vw, 45vw" : "56px"}
          className="object-cover"
        />
      ) : (
        <div className="grid size-full place-items-center bg-gradient-to-br from-orange/15 to-yellow/20">
          <span
            className={cn(
              "font-display font-semibold text-orange",
              variant === "full" ? "text-3xl" : "text-sm",
            )}
          >
            {initials(person.name)}
          </span>
        </div>
      )}
    </div>
  );

  const detail = (
    <div className="min-w-0">
      <p className="font-display text-lg font-semibold text-foreground">{person.name}</p>
      {person.role ? <p className="mt-1 text-muted-foreground">{person.role}</p> : null}
      {person.organisation ? (
        <p className="text-muted-foreground italic">{person.organisation}</p>
      ) : null}
      {person.linkedin ? (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          LinkedIn
          <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      ) : null}
    </div>
  );

  if (variant === "row") {
    return (
      <Card variant="soft" className="flex h-full items-start gap-4 p-5">
        {portrait}
        {detail}
      </Card>
    );
  }

  return (
    <Card variant="default" className="h-full p-6">
      {portrait}
      {detail}
    </Card>
  );
}
