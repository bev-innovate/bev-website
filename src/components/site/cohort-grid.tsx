import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import type { Company } from "@/lib/types";

export function CohortGrid({ companies }: { companies: Company[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company, i) => {
        const Wrapper = company.url ? "a" : "div";
        return (
          <Reveal as="li" key={company.name} delay={Math.min(i, 6) * 0.04}>
            <Wrapper
              {...(company.url
                ? { href: company.url, target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="group flex h-full flex-col rounded-2xl border border-line bg-canvas-raised p-6 transition-colors hover:border-line-strong"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-ink">{company.name}</h3>
                {company.url ? (
                  <ArrowUpRight
                    className="size-4 shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                ) : null}
              </div>

              {company.blurb ? (
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                  {company.blurb}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                {company.vertical ? <Badge tone="moss">{company.vertical}</Badge> : null}
                {company.country ? <Badge>{company.country}</Badge> : null}
                {company.womenCofounded ? <Badge tone="clay">Women co-founded</Badge> : null}
              </div>
            </Wrapper>
          </Reveal>
        );
      })}
    </ul>
  );
}
