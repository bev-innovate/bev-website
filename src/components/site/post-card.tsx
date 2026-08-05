import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cardVariants } from "@/components/ui/card";
import type { Post } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

/**
 * Post card.
 *
 * Built on the same Tailark `Card` surface as the programme and sector cards (MIT,
 * github.com/tailark/blocks), so the news grid reads as part of the same system. Like the
 * programme card it applies `cardVariants` to the anchor rather than nesting a link inside
 * a Card: the whole card is the link.
 */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className={cn(
        cardVariants({ variant: "default" }),
        "group relative flex h-full flex-col overflow-hidden transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
      )}
    >
      <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-muted">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-orange/20 to-yellow/20" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {post.category ? <span className="text-primary">{post.category}</span> : null}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.readingTime ? <span>{post.readingTime} min read</span> : null}
        </div>

        <h3 className="mt-3 font-display text-xl leading-snug font-semibold text-balance text-foreground">
          {post.title}
        </h3>

        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary">
          Read more
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
