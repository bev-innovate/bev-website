"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { MediaPlaceholder } from "@/components/exchange/media-placeholder";

/**
 * The "voices of the exchange" film, in place.
 *
 * Nothing loads or plays until it is pressed: the poster stands in, so the page is light
 * and nobody is surprised by sound. Once pressed it becomes an ordinary player with
 * controls and captions on. Until the film exists, a labelled placeholder holds its spot.
 */
export function VoicesVideo({
  src,
  captions,
  poster,
  label,
  placeholder,
  playLabel,
}: {
  src: string;
  captions: string;
  poster: string;
  label: string;
  placeholder: string;
  playLabel: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (!src) {
    return (
      <MediaPlaceholder kind="video" label={label} note={placeholder} onColour className="aspect-video" />
    );
  }

  if (playing) {
    return (
      <video
        className="aspect-video w-full rounded-2xl bg-black object-cover"
        src={src}
        poster={poster || undefined}
        controls
        autoPlay
        playsInline
      >
        {captions ? (
          <track kind="captions" src={captions} srcLang="en" label="English" default />
        ) : null}
      </video>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-exchange-ink"
    >
      {poster ? (
        <Image src={poster} alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      ) : null}
      <span className="absolute inset-0 grid place-items-center bg-black/15 transition-colors group-hover:bg-black/25">
        <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-exchange-ink shadow-lg">
          <Play className="size-4 fill-current" aria-hidden />
          {playLabel}
        </span>
      </span>
    </button>
  );
}
