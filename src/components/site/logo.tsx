import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The official horizontal lockup.
 *
 * Rendered at intrinsic size rather than `fill`, so it never needs a sized wrapper and
 * cannot be stretched. The asset is the supplied lockup with its transparent margin
 * trimmed off, so the optical height matches what the height class asks for; at 447x88 it
 * still clears 2x at the sizes used here.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="Better Earth Ventures: home"
    >
      <Image
        src="/images/logos-bev-lockup.webp"
        alt="Better Earth Ventures"
        width={447}
        height={88}
        priority
        className="h-8 w-auto md:h-9"
      />
    </Link>
  );
}

/**
 * The mark on its own, for surfaces where the lockup is too wide or where the wordmark
 * would collide with adjacent type.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logos-logo-mark.webp"
      alt=""
      width={480}
      height={480}
      className={cn("size-8", className)}
    />
  );
}
