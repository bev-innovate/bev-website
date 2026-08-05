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

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="What we’re seeing on the ground"
        intro="Programme news, cohort announcements and honest field notes from the work of moving climate solutions from proof of concept to proof of value."
        image="/images/hero-miscellaneous-a7400018-medium-edited.webp"
      />

      {/* Equal cards throughout. No post is promoted above the others. */}
      <div className="shell py-16 md:py-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i, 5) * 0.05} className="h-full">
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
