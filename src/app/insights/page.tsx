import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { PageHeader } from "@/components/site/page-header";
import { PostCard } from "@/components/site/post-card";
import { Reveal } from "@/components/ui/reveal";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Programme news, cohort announcements and field notes from Better Earth Ventures across the Asia-Pacific climate and agrifood ecosystem.",
};

export default async function InsightsPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="What we’re seeing on the ground"
        intro="Programme news, cohort announcements and honest field notes from the work of moving climate solutions from proof of concept to proof of value."
      />

      <div className="shell pb-20 md:pb-28">
        {lead ? (
          <Reveal className="mb-16 border-b border-line pb-16">
            <PostCard post={lead} size="lg" />
          </Reveal>
        ) : null}

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i, 5) * 0.05}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>

      <CtaBand
        eyebrow="Newsletter"
        title="Get the next dispatch before it’s public"
        intro="Open calls, cohort news and field notes from across Asia-Pacific."
        primary={{ href: "/contact", label: "Get in touch" }}
        secondary={{ href: "/programmes", label: "Browse programmes" }}
      />
    </>
  );
}
