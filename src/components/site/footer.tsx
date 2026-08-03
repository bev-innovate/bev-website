import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { NewsletterForm } from "@/components/site/newsletter-form";
import type { SiteSettings } from "@/lib/types";

const columns = [
  {
    title: "Programmes",
    links: [
      { label: "Women Founders & Funders", href: "/programmes/women-founders-and-funders" },
      { label: "ClimateLaunchpad Singapore", href: "/programmes/climatelaunchpad" },
      { label: "AgriTech ClimAccelerator", href: "/programmes/climaccelerator" },
      { label: "Global Incubator Programme", href: "/programmes/global-incubator-programme" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Climate Expeditions", href: "/climate-expeditions" },
      { label: "News", href: "/news" },
      { label: "About", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="relative overflow-hidden bg-purple text-canvas">
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
                className="underline decoration-yellow/60 underline-offset-4 hover:text-yellow"
              >
                {settings.contact.email}
              </a>
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-xs font-semibold tracking-[0.16em] text-yellow uppercase">
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
            <h2 className="text-xs font-semibold tracking-[0.16em] text-yellow uppercase">
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
                className="inline-flex items-center gap-1 text-xs text-canvas/60 transition-colors hover:text-yellow"
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
