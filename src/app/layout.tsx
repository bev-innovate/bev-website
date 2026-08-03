import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Fraunces, Open_Sans } from "next/font/google";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { getSiteSettings } from "@/lib/content";
import { siteSettings as fallbackSettings } from "@/lib/seed-content";

import "./globals.css";

/** Open Sans carries body copy; Fraunces carries display. */
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.betterearthventures.com",
  ),
  title: {
    default: `${fallbackSettings.title} — ${fallbackSettings.tagline}`,
    template: `%s — ${fallbackSettings.title}`,
  },
  description: fallbackSettings.description,
  openGraph: {
    type: "website",
    locale: "en_SG",
    siteName: fallbackSettings.title,
    title: `${fallbackSettings.title} — ${fallbackSettings.tagline}`,
    description: fallbackSettings.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en-SG" className={`${openSans.variable} ${fraunces.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-purple focus:px-5 focus:py-3 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        <Header navigation={settings.navigation} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer settings={settings} />
        <Analytics />
      </body>
    </html>
  );
}
