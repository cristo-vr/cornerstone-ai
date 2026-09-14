import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { LibraryFooter, LibraryHeader } from "@/components/resources/LibraryChrome";
import { getResources, KIND_LABEL, fileSize } from "@/lib/resources";
import { siteConfig } from "@/lib/config";

const TITLE = "Free resources";
const DESCRIPTION =
  "Working tools for people who run a business: the skills, templates and guides I use on real client builds. Free, no call attached, yours to keep.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: `${siteConfig.url}/resources`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
    images: ["/images/og.jpg"],
  },
  alternates: { canonical: `${siteConfig.url}/resources` },
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <LibraryHeader />

      <main className="mx-auto max-w-6xl px-6">
        <section className="pb-14 pt-16 md:pb-20 md:pt-24">
          <Reveal>
            <Eyebrow>The library</Eyebrow>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,6vw,4.25rem)] font-extrabold uppercase leading-[0.94] tracking-[0.005em]">
              Things you can actually run
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
              Everything here is something I use on real builds, written down so you can use it without me. It is free,
              there is no call attached, and taking one is a completely fine outcome.
            </p>
          </Reveal>
        </section>

        {resources.length === 0 ? (
          <section className="rounded-xl border border-line bg-surface/60 px-6 py-16 text-center">
            <p className="text-lg text-ink-2">The first one lands shortly.</p>
            <p className="mt-2 text-sm text-muted">
              Put your address in below and it will come to you rather than you having to check back.
            </p>
          </section>
        ) : (
          <section className="grid gap-5 md:grid-cols-2">
            {/* h-full on the Reveal as well as the card: the Reveal is a real
                element in the grid, so without it the card's own h-full has
                nothing to fill and rows stop matching in height. */}
            {resources.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.05} className="h-full">
                <Link
                  href={`/resources/${r.slug}`}
                  className="ease-[var(--ease-out)] group flex h-full flex-col rounded-xl border border-line bg-surface/60 p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--shadow-soft)]"
                >
                  <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-dk">
                    <FileText className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    {KIND_LABEL[r.kind]}
                  </span>

                  <h2 className="mt-4 font-display text-2xl font-bold uppercase leading-[1.02] tracking-[0.005em]">
                    {r.title}
                  </h2>

                  {r.summary && <p className="mt-3 leading-relaxed text-ink-2">{r.summary}</p>}

                  <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-foreground">
                    Have a look
                    <ArrowRight
                      className="ease-[var(--ease-out)] h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {r.file_size ? (
                      <span className="ml-auto font-normal text-muted">{fileSize(r.file_size)}</span>
                    ) : null}
                  </span>
                </Link>
              </Reveal>
            ))}
          </section>
        )}

        <section className="mt-20 rounded-xl border border-line bg-surface/60 p-8 md:p-10">
          <Eyebrow>Get the next one</Eyebrow>
          {/* No cadence claim here. The newsletter promises a weekly issue and
              keeps that promise; the library fills up when something is worth
              building properly, and inventing a rhythm for it would be a
              promise to break in public. */}
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold uppercase leading-[1.02] tracking-[0.005em]">
            Nothing here stays finished
          </h2>
          <p className="mb-6 mt-3 max-w-2xl leading-relaxed text-ink-2">
            Bookmark this page, or put your address in and each new one comes to you as it goes up, along with Simple
            Systems Saturday. One email a week, one click to leave.
          </p>
          <div className="max-w-xl">
            <NewsletterForm cta="Send me the new ones" />
          </div>
        </section>
      </main>

      <LibraryFooter />
    </div>
  );
}
