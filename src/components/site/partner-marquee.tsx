import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";
import type { Partner } from "@/lib/types";

/**
 * Partner strip. Real logo files are not available yet, so partners without a logo fall
 * back to a typographic lockup — which still reads as a credible logo wall.
 */
export function PartnerMarquee({ partners }: { partners: Partner[] }) {
  return (
    <Marquee duration={55}>
      {partners.map((partner) => (
        <div
          key={partner.name}
          // Fixed box per logo: wordmarks and roundels differ hugely in aspect ratio,
          // so equal *area* rather than equal height keeps the row visually even.
          className="flex h-14 w-36 shrink-0 items-center justify-center opacity-75 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-16 md:w-44"
        >
          {partner.logo ? (
            <Image
              src={partner.logo}
              alt={partner.name}
              width={240}
              height={96}
              // Logos vary wildly in aspect ratio; cap height and let width follow.
              // Fill the box and let object-contain letterbox. Wide wordmarks and
              // square roundels then occupy the same optical area.
              className="size-full object-contain p-1"
            />
          ) : (
            <span className="font-display text-xl font-semibold whitespace-nowrap text-ink-muted">
              {partner.name}
            </span>
          )}
        </div>
      ))}
    </Marquee>
  );
}
