import type { Metadata } from "next";

import { LegalDocument } from "@/components/site/legal-document";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.intro,
};

export default function PrivacyPage() {
  return <LegalDocument doc={privacyPolicy} />;
}
