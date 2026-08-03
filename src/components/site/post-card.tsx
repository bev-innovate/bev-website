import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function PostCard({ post, size = "md" }: { post: Post; size?: "md" | "lg" }) {
  return (
    <article className="group">
      <Link href={`/insights/${post.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-canvas-sunk",
            size === "lg" ? "aspect-16/9" : "aspect-4/3",
          )}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes={size === "lg" ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-signal/20" />
          )}
        </div>

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint">
            {post.category ? (
              <span className="font-semibold tracking-[0.12em] text-moss uppercase">
                {post.category}
              </span>
            ) : null}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.readingTime ? <span>{post.readingTime} min read</span> : null}
          </div>

          <h3
            className={cn(
              "mt-2.5 font-display leading-snug font-semibold text-balance text-ink transition-colors group-hover:text-moss",
              size === "lg" ? "text-2xl md:text-3xl" : "text-xl",
            )}
          >
            {post.title}
          </h3>

          {post.excerpt ? (
            <p
              className={cn(
                "mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted",
                size === "lg" ? "line-clamp-3" : "line-clamp-2",
              )}
            >
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
