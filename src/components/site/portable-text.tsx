import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";

import { resolveImage } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 text-[1.0625rem] leading-[1.75] text-ink-muted">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 font-display text-3xl leading-tight font-semibold text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-display text-2xl leading-tight font-semibold text-ink">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-10 border-l-2 border-yellow pl-6 font-display text-2xl leading-snug text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 space-y-2.5 pl-5 text-[1.0625rem] leading-[1.7] text-ink-muted [&>li]:list-disc [&>li]:marker:text-orange">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 space-y-2.5 pl-5 text-[1.0625rem] leading-[1.7] text-ink-muted [&>li]:list-decimal [&>li]:marker:text-orange">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    link: ({ children, value }) => {
      const href = String(value?.href ?? "#");
      const external = href.startsWith("http");
      return external ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-orange underline underline-offset-4 hover:text-purple"
        >
          {children}
        </a>
      ) : (
        <Link href={href} className="text-orange underline underline-offset-4 hover:text-purple">
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = resolveImage(value, 1400);
      if (!src) return null;
      return (
        <figure className="mt-12">
          <div className="relative aspect-16/9 overflow-hidden rounded-2xl bg-canvas-sunk">
            <Image src={src} alt={value?.alt ?? ""} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
          </div>
          {value?.caption ? (
            <figcaption className="mt-3 text-sm text-ink-faint">{value.caption}</figcaption>
          ) : null}
        </figure>
      );
    },
    callout: ({ value }) => (
      <aside
        className={
          value?.tone === "highlight"
            ? "mt-10 rounded-2xl bg-yellow/25 p-6 text-[1.0625rem] leading-relaxed text-purple"
            : "mt-10 rounded-2xl border border-line bg-canvas-sunk p-6 text-[1.0625rem] leading-relaxed text-ink-muted"
        }
      >
        {value?.text}
      </aside>
    ),
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
