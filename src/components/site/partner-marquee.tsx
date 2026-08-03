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
          className="flex h-12 items-center justify-center opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        >
          {partner.logo ? (
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={48}
              className="h-8 w-auto object-contain"
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
