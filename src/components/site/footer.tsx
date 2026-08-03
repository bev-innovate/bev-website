import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { NewsletterForm } from "@/components/site/newsletter-form";
import type { SiteSettings } from "@/lib/types";

const columns = [
  {
    title: "Programmes",
    links: [
      { label: "AgriTech ClimAccelerator", href: "/programmes/climaccelerator" },
      { label: "Women Founders & Funders", href: "/programmes/women-founders-and-funders" },
      { label: "Climate Innovation Summit", href: "/programmes/climate-innovation-summit" },
      { label: "ClimateLaunchpad", href: "/programmes/climatelaunchpad" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Approach", href: "/approach" },
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="grain relative overflow-hidden bg-forest text-canvas">
      <div className="shell relative z-10 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr]">
          <div>
            <p className="font-display text-2xl leading-tight text-balance">
              {settings.tagline}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-canvas/65">
              {settings.contact.location} · {" "}
              <a
                href={`mailto:${settings.contact.email}`}
                className="underline decoration-signal/60 underline-offset-4 hover:text-signal"
              >
                {settings.contact.email}
              </a>
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-xs font-semibold tracking-[0.16em] text-signal uppercase">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-canvas/75 transition-colors hover:text-canvas"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-xs font-semibold tracking-[0.16em] text-signal uppercase">
              Stay close to the work
            </h2>
            <p className="mt-5 text-sm text-canvas/70">
              Programme calls, cohort news and field notes from across Asia-Pacific. No noise.
            </p>
            <NewsletterForm className="mt-5" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-canvas/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-canvas/50">
            © {new Date().getFullYear()} {settings.title}. Registered in Singapore.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {settings.social.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-xs text-canvas/60 transition-colors hover:text-signal"
              >
                {social.platform}
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
            ))}
            <Link href="/privacy" className="text-xs text-canvas/50 hover:text-canvas/80">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
