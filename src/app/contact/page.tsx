import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { EnquiryForm } from "@/components/site/enquiry-form";
import { PageHeader } from "@/components/site/page-header";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Better Earth Ventures about programmes, partnerships, mentoring or media. Singapore-based, working across Asia-Pacific.",
};

const routes = [
  {
    title: "Founders",
    body: "Applying to a programme, or want to know when the next call opens.",
  },
  {
    title: "Corporates & funds",
    body: "Designing an acceleration pathway, sourcing technology or backing a cohort.",
  },
  {
    title: "Mentors & experts",
    body: "Operators and investors who want to work directly with founders in the region.",
  },
  {
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
      />

      <div className="shell grid gap-16 pb-24 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        <div>
          <dl className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange/12 text-orange">
                <Mail className="size-4" aria-hidden />
              </span>
              <div>
                <dt className="text-sm font-medium text-ink">Email</dt>
                <dd className="mt-1">
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
                <dt className="text-sm font-medium text-ink">Based in</dt>
                <dd className="mt-1 text-ink-muted">
                  {settings.contact.location} · working across Asia-Pacific
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-12 border-t border-line pt-10">
            <h2 className="text-xs font-semibold tracking-[0.16em] text-ink-faint uppercase">
              Who gets in touch
            </h2>
            <ul className="mt-6 space-y-6">
              {routes.map((route) => (
                <li key={route.title}>
                  <p className="font-display text-lg font-semibold text-ink">{route.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{route.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-line bg-canvas-sunk p-7 md:p-10">
          <EnquiryForm />
        </div>
      </div>
    </>
  );
}
