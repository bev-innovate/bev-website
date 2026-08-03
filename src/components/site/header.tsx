"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import type { NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Header({ navigation }: { navigation: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      /*
        Always opaque. Programme pages open on a dark forest hero, and a transparent
        header would drop the wordmark and nav to unreadable contrast over it.
      */
      className={cn(
        "sticky top-0 z-50 border-b bg-canvas/90 backdrop-blur-xl transition-colors duration-300",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <div className="shell flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-canvas-sunk text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            Work with us
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-line text-ink md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-canvas md:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-display text-2xl text-ink last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/contact" onClick={() => setOpen(false)} className="mt-5 w-full">
              Work with us
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
