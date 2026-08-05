import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

/**
 * The library's own header and footer.
 *
 * It does not reuse the main site's Navbar because these pages are served on
 * their own subdomain, where "The Build / Proof / About" would be a menu for a
 * different site. What it keeps instead is the mark, one way back to the main
 * site, and one way onto the newsletter, which is what a visitor arriving cold
 * from a post actually needs.
 */

export function LibraryHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6 md:h-[88px]">
        <Link href="/resources" aria-label="The Cornerstone resource library">
          <Logo markClassName="w-8 h-8 md:w-9 md:h-9" wordClassName="text-[1.5rem] md:text-[1.75rem]" />
        </Link>
        <a
          href="https://cornerstone-ai.pro"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-foreground"
        >
          cornerstone-ai.pro
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}

export function LibraryFooter() {
  return (
    <footer className="mt-24 bg-carbon text-[#BEB9AC]">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16">
        <div className="grid gap-10 border-b border-[#2C2B27] pb-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Logo tone="onDark" markClassName="w-8 h-8" wordClassName="text-2xl" />
            <p className="mt-5 max-w-md leading-relaxed">
              Everything here is free and stays free. If you would rather it were built into a single system your team
              runs on, rather than handed over one file at a time, that is the other thing I do.
            </p>
            <a
              href="https://cornerstone-ai.pro/build"
              className="ease-[var(--ease-out)] mt-6 inline-flex items-center gap-2 rounded-lg border border-primary bg-primary px-5 py-3 font-sans text-[0.9rem] font-semibold text-accent-txt transition-[transform,background-color] duration-200 hover:bg-accent-dk active:scale-[0.97]"
            >
              See what a build looks like
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <div className="md:col-span-5">
            <p className="font-display text-lg font-bold uppercase tracking-[0.005em] text-rail-text">
              Simple Systems Saturday
            </p>
            <p className="mt-3 leading-relaxed">
              One system a week, in plain English, for people who run a business. Free, and one click to leave.
            </p>
            <a
              href="https://cornerstone-ai.pro/simple-systems-saturday"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 hover:text-[#DDBB7D]"
            >
              Have a look at it
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cornerstone AI. Built by Cristo van Rensburg.</p>
          <div className="flex gap-5">
            <a href="https://cornerstone-ai.pro/privacy" className="hover:text-rail-text">
              Privacy
            </a>
            <a href="https://cornerstone-ai.pro/terms" className="hover:text-rail-text">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
