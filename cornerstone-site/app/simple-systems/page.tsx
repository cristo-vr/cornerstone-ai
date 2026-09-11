import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import Reveal from "@/components/ui/Reveal";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { siteConfig } from "@/lib/config";

const TITLE = "Simple Systems";
/* What a pasted link says. Different job to the <title>: this one is read in a
   feed, where it has to ask for the click. */
const SHARE_TITLE = "Join Simple Systems";
const DESCRIPTION =
  "You don't scale a business by adding more to it. Once a week, the lessons I'm learning scaling my own company and helping clients scale theirs. Simple systems, not more moving parts. Free.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}/simple-systems`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/images/og-simple-systems.jpg",
        width: 1200,
        height: 630,
        alt: "Simple Systems. Simpler businesses scale further.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: DESCRIPTION,
    images: ["/images/og-simple-systems.jpg"],
  },
  alternates: { canonical: `${siteConfig.url}/simple-systems` },
};

/* Three lines, because three is what someone reads before deciding. The old
   page explained the five-block issue anatomy, the library and the whole bio,
   which is a lot of reading to sell one email address. */
const promises = [
  {
    label: "Simple scales",
    body: "Every lesson in here points the same way. Take something out, don't bolt something on.",
  },
  {
    label: "From real work",
    body: "My own company, and whatever I'm building for a client that week. Nothing theoretical.",
  },
  {
    label: "The misses too",
    body: "What I got wrong gets written up as well. Those weeks are usually the useful ones.",
  },
];

export default function SimpleSystemsPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      {/* Paid and social traffic lands here with one job. The logo is the only
          way out, on purpose. */}
      <header className="py-7 md:py-9">
        <div className="px-6 flex justify-center">
          <Link href="/" aria-label="Cornerstone AI, home">
            <Logo markClassName="w-6 h-6" wordClassName="text-lg" />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center">
        {/* ------------------------------------------------------------ hero */}
        <section className="px-6 pt-8 pb-16 md:pt-10 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-accent-ink">
                Simple Systems
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display font-extrabold uppercase leading-[0.9] tracking-[0.005em] text-[clamp(2.4rem,9vw,5rem)] text-foreground text-balance">
                Simpler businesses scale further.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 mx-auto max-w-xl text-lg md:text-xl text-ink-2 leading-relaxed text-pretty">
                You don&apos;t scale a business by adding more to it. Once a week I write up
                the lessons I&apos;m learning scaling my own company and helping clients scale
                theirs. Simple systems, not more moving parts.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 mx-auto max-w-xl text-left">
                <NewsletterForm cta="Send me the next one" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- what it is */}
        <section className="px-6 pb-16 md:pb-20">
          <div className="max-w-3xl mx-auto border-t border-line pt-12 md:pt-14">
            <ul className="grid sm:grid-cols-3 gap-9 sm:gap-8 text-center">
              {promises.map((item, i) => (
                <Reveal as="li" key={item.label} delay={i * 0.06} y={12}>
                  <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-foreground">
                    {item.label}
                  </h2>
                  <p className="mt-2.5 text-[0.95rem] text-ink-2 leading-relaxed">{item.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ----------------------------------------------------------- byline */}
        {/* The only proof on the page. There are no subscriber numbers worth
            printing yet and no testimonials, so it says who is writing and why
            he would know, then stops. */}
        <section className="px-6 pb-20 md:pb-24">
          <div className="max-w-xl mx-auto text-center">
            <Reveal>
              <p className="text-[0.95rem] md:text-base text-ink-2 leading-relaxed">
                Written by{" "}
                <span className="text-foreground font-medium">Cristo Van Rensburg</span>. I run
                Cornerstone AI, building operating systems for founders. This is where I think
                out loud about what I&apos;m getting right and wrong along the way.
              </p>
            </Reveal>
          </div>
        </section>

      </main>

      <footer className="bg-carbon">
        <div className="max-w-4xl mx-auto px-6 py-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <Link href="/" aria-label="Cornerstone AI, home">
            <Logo tone="onDark" markClassName="w-5 h-5" wordClassName="text-base" />
          </Link>
          <div className="flex items-center gap-6 text-xs text-[#8F8B7E]">
            <Link href="/privacy" className="hover:text-rail-text transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-rail-text transition-colors duration-200">
              Terms
            </Link>
            <span>&copy; {new Date().getFullYear()} Cornerstone AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
