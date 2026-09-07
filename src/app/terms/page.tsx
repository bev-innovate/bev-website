import type { Metadata } from "next";

import { LegalDocument } from "@/components/site/legal-document";
import { termsOfUse } from "@/lib/legal";

export const metadata: Metadata = {
  title: termsOfUse.title,
  description: termsOfUse.intro,
};

export default function TermsPage() {
  return <LegalDocument doc={termsOfUse} />;
}
