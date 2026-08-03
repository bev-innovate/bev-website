import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";
import type { Partner } from "@/lib/types";

/**
 * Partner strip.
 *
 * Logo boxes are a fixed size: wordmarks and roundels differ hugely in aspect ratio, so
 * equal *area* rather than equal height keeps the row visually even.
 *
 * Partners with no logo file fall back to a typographic lockup, which sizes to its own
 * text instead. Forcing a long name like "Singapore Deep-Tech Alliance" into the logo box
 * overflowed it and made neighbouring items collide.
 */
export function PartnerMarquee({ partners }: { partners: Partner[] }) {
  return (
    <Marquee duration={55} className="bg-white">
      {partners.map((partner) =>
        partner.logo ? (
          <div
            key={partner.name}
            className="flex h-14 w-36 shrink-0 items-center justify-center opacity-75 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-16 md:w-44"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={240}
              height={96}
              // Fill the box and let object-contain letterbox it.
              className="size-full object-contain p-1"
            />
          </div>
        ) : (
          <div
            key={partner.name}
            className="flex h-14 shrink-0 items-center justify-center px-3 md:h-16"
          >
            <span className="font-display text-xl font-semibold whitespace-nowrap text-ink-muted">
              {partner.name}
            </span>
          </div>
        ),
      )}
    </Marquee>
  );
}
