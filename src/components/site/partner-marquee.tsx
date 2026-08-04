import Image from "next/image";
import * as React from "react";

import { Marquee } from "@/components/ui/marquee";
import type { Partner } from "@/lib/types";

/**
 * Wraps an item in a link to the partner's site when there is one.
 *
 * Not every partner has a `url`, so this cannot just always render an anchor: an `<a>`
 * with no href is not a link, and would take focus while doing nothing.
 */
function PartnerLink({
  partner,
  className,
  children,
}: {
  partner: Partner;
  className: string;
  children: React.ReactNode;
}) {
  if (!partner.url) {
    return <div className={className}>{children}</div>;
  }

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noreferrer noopener"
      // The marquee duplicates its children to loop seamlessly, so half of these links
      // are decorative copies. `title` gives the real ones a hover affordance.
      title={partner.name}
      className={`${className} rounded-lg focus-visible:outline-2`}
    >
      {children}
    </a>
  );
}

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
  // `hidden` keeps a partner out of the strip while its document survives for the
  // programme pages that reference it.
  const visible = partners.filter((partner) => !partner.hidden);

  return (
    <Marquee duration={55} className="bg-white">
      {visible.map((partner) =>
        partner.logo ? (
          <PartnerLink
            key={partner.name}
            partner={partner}
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
          </PartnerLink>
        ) : (
          <PartnerLink
            key={partner.name}
            partner={partner}
            className="flex h-14 shrink-0 items-center justify-center px-3 transition-colors md:h-16"
          >
            <span className="font-display text-xl font-semibold whitespace-nowrap text-ink-muted hover:text-ink">
              {partner.name}
            </span>
          </PartnerLink>
        ),
      )}
    </Marquee>
  );
}
