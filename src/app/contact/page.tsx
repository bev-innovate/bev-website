import { Building2, Mail, MapPin, Megaphone, Rocket, UserRoundCheck } from "lucide-react";
import type { Metadata } from "next";

import { EnquiryForm } from "@/components/site/enquiry-form";
import { PageHeader } from "@/components/site/page-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { Text } from "@/components/ui/typography";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Better Earth Ventures about programmes, partnerships, mentoring or media. Singapore-based, working across Asia-Pacific.",
};

const routes = [
  {
    icon: Rocket,
    title: "Founders",
    body: "Applying to a programme, or want to know when the next call opens.",
  },
  {
    icon: Building2,
    title: "Corporates & funds",
    body: "Designing an acceleration pathway, sourcing technology or backing a cohort.",
  },
  {
    icon: UserRoundCheck,
    title: "Mentors & experts",
    body: "Operators and investors who want to work directly with founders in the region.",
  },
  {
    icon: Megaphone,
    title: "Media & speaking",
    body: "Press enquiries, panels and events across the climate and agrifood ecosystem.",
  },
];

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you’re working on"
        intro="One inbox for founders, funders, corporates and collaborators. We read everything and reply to what we can act on."
        image="/images/hero-miscellaneous-2.webp"
      />

      <div className="shell grid gap-16 py-16 md:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        <div>
          <dl className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange/12 text-orange">
                <Mail className="size-4" aria-hidden />
              </span>
              <div>
                <dt className="font-display text-lg font-bold text-ink">Email</dt>
                <dd className="mt-1 text-lg">
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="text-ink-muted underline underline-offset-4 hover:text-orange"
                  >
                    {settings.contact.email}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange/12 text-orange">
                <MapPin className="size-4" aria-hidden />
              </span>
              <div>
                <dt className="font-display text-lg font-bold text-ink">Based in</dt>
                <dd className="mt-1 text-lg text-ink-muted">
                  {settings.contact.location} · working across Asia-Pacific
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-12 border-t border-border pt-10">
            <Text variant="subtitle" as="h2">
              Who gets in touch
            </Text>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {routes.map((route) => (
                <li key={route.title}>
                  <FeatureCard
                    icon={route.icon}
                    title={route.title}
                    description={route.body}
                    tone="orange"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The form brings its own panel now, so it no longer needs wrapping in one. */}
        <EnquiryForm />
      </div>
    </>
  );
}
