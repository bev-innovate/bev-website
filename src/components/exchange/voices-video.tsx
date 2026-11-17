"use client";

import { useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

import { MediaPlaceholder } from "@/components/exchange/media-placeholder";

/**
 * The voices loop: 20 to 30 seconds of founders from the London pilot, one soundbite each.
 *
 * Plays muted on a loop with captions, the way a browser allows a video to start on its
 * own; one button turns the sound on. With reduced motion it waits to be played, with
 * normal controls. Until the film exists, a labelled placeholder holds its place.
 */
export function VoicesVideo({
  src,
  captions,
  poster,
  label,
  placeholder,
}: {
  src: string;
  captions: string;
  poster: string;
  label: string;
  placeholder: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const reduce = useReducedMotion();

  if (!src) {
    return <MediaPlaceholder kind="video" label={label} note={placeholder} className="aspect-video" />;
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-exchange-ink">
      <video
        ref={ref}
        className="aspect-video w-full object-cover"
        src={src}
        poster={poster || undefined}
        muted={muted}
        loop
        playsInline
        autoPlay={!reduce}
        controls={Boolean(reduce)}
      >
        {captions ? (
          <track kind="captions" src={captions} srcLang="en" label="English" default />
        ) : null}
      </video>
      {reduce ? null : (
        <button
          type="button"
          onClick={() => {
            const next = !muted;
            setMuted(next);
            if (ref.current) ref.current.muted = next;
          }}
          className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-semibold text-exchange-ink shadow-lg"
        >
          {muted ? <Volume2 className="size-4" aria-hidden /> : <VolumeX className="size-4" aria-hidden />}
          {muted ? "Hear their voices" : "Mute"}
        </button>
      )}
    </div>
  );
}
