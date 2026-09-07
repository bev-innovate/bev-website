import { PageHeader } from "@/components/site/page-header";
import type { LegalDocument as Doc } from "@/lib/legal";

/**
 * Renders a legal document: numbered sections, generous measure, nothing decorative.
 *
 * Both the policy and the terms have the same shape, so they share this rather than each
 * carrying its own markup and drifting apart the first time one of them is edited.
 *
 * The measure is deliberately narrow. These are read in a hurry by someone looking for one
 * clause, and a long line makes finding it harder.
 */
export function LegalDocument({ doc }: { doc: Doc }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={doc.title} intro={doc.intro} />

      {/*
        The measure is constrained on an inner element rather than by narrowing `.shell`.
        Both are utilities, and which one wins the `max-width` depends on the order they
        land in the stylesheet, which is not something to rely on.
      */}
      <div className="shell pt-14 pb-24 md:pt-16">
        <div className="max-w-2xl">
          <p className="text-sm text-ink-faint">Last updated: {doc.updated}</p>

          <ol className="mt-10 space-y-12">
            {doc.sections.map((section, i) => (
              <li key={section.title}>
                <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
                  {/* The number lives in the markup rather than the copy, so reordering a
                    section cannot leave the list mis-numbered. */}
                  <span className="text-ink-faint tabular-nums">{i + 1}.</span>{" "}
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </li>
            ))}

            <li>
              <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
                <span className="text-ink-faint tabular-nums">
                  {doc.sections.length + 1}.
                </span>{" "}
                Contact
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted">
                {doc.contact.lead}{" "}
                <a
                  href={`mailto:${doc.contact.email}`}
                  className="font-medium text-primary underline underline-offset-4"
                >
                  {doc.contact.email}
                </a>
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
