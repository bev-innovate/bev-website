"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();

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
        Always opaque. Programme pages open on a dark purple hero, and a transparent
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
                  "relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                  active ? "text-white" : "text-ink-muted hover:text-ink",
                )}
              >
                {/*
                  One pill, shared across every nav item by `layoutId`: on a route change
                  framer-motion tweens it from the old item to the new one rather than
                  cross-fading two separate pills.
                */}
                {active ? (
                  <motion.span
                    aria-hidden
                    layoutId={reduceMotion ? undefined : "nav-active-pill"}
                    className="absolute inset-0 -z-10 rounded-full bg-purple"
                    transition={{ type: "spring", stiffness: 400, damping: 34, mass: 0.7 }}
                  />
                ) : null}
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
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "border-b border-line py-4 font-display text-2xl last:border-0",
                    active ? "text-purple" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <ButtonLink href="/contact" onClick={() => setOpen(false)} className="mt-5 w-full">
              Work with us
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
