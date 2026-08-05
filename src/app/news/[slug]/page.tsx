import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/site/post-card";
import { RichText } from "@/components/site/portable-text";
import { Badge } from "@/components/ui/badge";
import { getPost, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function InsightPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getPosts();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="pb-20 md:pb-28">
      <div className="shell pt-10">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All news
        </Link>
      </div>

      <header className="shell mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-faint">
          {post.category ? <Badge tone="orange">{post.category}</Badge> : null}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.readingTime ? <span>{post.readingTime} min read</span> : null}
        </div>

        <h1 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance text-ink">
          {post.title}
        </h1>

        {post.excerpt ? (
          <p className="mt-6 text-xl leading-relaxed text-pretty text-ink-muted">{post.excerpt}</p>
        ) : null}
      </header>

      {post.coverImage ? (
        <div className="shell mt-12">
          <div className="relative aspect-16/9 overflow-hidden rounded-[1.75rem] bg-canvas-sunk">
            <Image
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="shell mt-14 max-w-3xl">
        {post.body?.length ? (
          <RichText value={post.body} />
        ) : (
          /*
            Article bodies have not been migrated out of Wix yet. Rather than show an
            empty page, link out to the original so nothing 404s during the transition.
          */
          <div className="rounded-2xl border border-line bg-canvas-sunk p-8">
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
              The full text of this article is still hosted on our previous site while we
              migrate content into the new CMS.
            </p>
            {post.externalUrl ? (
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-orange hover:text-purple"
              >
                Read the original
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ) : null}
          </div>
        )}

        {post.tags?.length ? (
          <ul className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Badge>#{tag}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {related.length ? (
        <section className="shell mt-24 border-t border-line pt-16">
          <h2 className="font-display text-2xl font-semibold text-ink">Keep reading</h2>
          <div className="mt-10 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
