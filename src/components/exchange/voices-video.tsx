"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/**
 * The "voices of the exchange" film, in place.
 *
 * Nothing loads or plays until it is pressed: the poster stands in, so the page is light
 * and nobody is surprised by sound. Once pressed it becomes an ordinary player with
 * controls and captions on.
 *
 * With no `src` yet, the poster photograph shows on its own, with no button to press.
 */
export function VoicesVideo({
  src,
  captions,
  poster,
  posterAlt,
  playLabel,
}: {
  src: string;
  captions: string;
  poster: string;
  posterAlt: string;
  playLabel: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing && src) {
    return (
      <video
        className="aspect-video w-full rounded-2xl bg-black object-cover"
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
      >
        {captions ? <track kind="captions" src={captions} srcLang="en" label="English" default /> : null}
      </video>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_-28px_rgba(43,29,18,0.55)]">
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />
      {src ? (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 grid place-items-center bg-black/15 transition-colors hover:bg-black/25"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white/95 px-5 py-3 text-sm font-semibold text-sunrise-ink shadow-lg">
            <Play className="size-4 fill-current" aria-hidden />
            {playLabel}
          </span>
        </button>
      ) : null}
    </div>
  );
}
