import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Better Earth Ventures handles personal data collected through this site.",
  robots: { index: false, follow: true },
};

/*
  Placeholder. Replace with copy reviewed against Singapore’s PDPA before launch -
  this text is a structural stand-in, not legal advice.
*/
const sections = [
  {
    title: "What we collect",
    body: "When you submit an enquiry or subscribe to our newsletter we collect the details you give us: your name, email address, organisation and the content of your message. We also collect aggregate, non-identifying analytics about how the site is used.",
  },
  {
    title: "Why we collect it",
    body: "To reply to your enquiry, to assess programme applications, and to send you programme announcements if you have asked for them. We do not sell personal data.",
  },
  {
    title: "Where it is stored",
    body: "Submissions are stored in our database, hosted in a managed cloud environment. Access is limited to members of the Better Earth Ventures team who need it.",
  },
  {
    title: "How long we keep it",
    body: "Enquiries are retained for as long as needed to respond and to keep a record of the conversation. You can ask us to delete your data at any time.",
  },
  {
    title: "Your choices",
    body: "Every newsletter includes an unsubscribe link. To request access to, correction of, or deletion of your data, email hello@betterearthventures.com.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        intro="How we handle the personal data you share with us through this website."
      />

      <div className="shell max-w-2xl pb-24">
        <p className="rounded-xl border border-orange-deep/30 bg-orange-deep/8 px-5 py-4 text-sm text-ink-muted">
          Draft policy: to be reviewed against Singapore&rsquo;s Personal Data Protection Act
          before launch.
        </p>

        {sections.map((section) => (
          <section key={section.title} className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-ink">{section.title}</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
