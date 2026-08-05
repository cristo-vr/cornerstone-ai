import type { Metadata } from "next";
import Link from "next/link";
import { Shuffle, Workflow, Wrench, AlertCircle, Repeat, Check, X, ArrowUpRight } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { siteConfig } from "@/lib/config";

const TITLE = "Simple Systems Saturday";
const DESCRIPTION =
  "A practical guide to AI for people who run a business. Grab a coffee on Saturday morning and I'll show you one simple system you can actually use. Free.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: `${siteConfig.url}/simple-systems-saturday`,
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
  alternates: { canonical: `${siteConfig.url}/simple-systems-saturday` },
};

/* What lands in the inbox. Five blocks, same order every week, so the shape is
   learnable in two issues. This is the issue anatomy from the spec, written for
   a reader rather than for the build doc. */
const anatomy = [
  {
    icon: Shuffle,
    label: "The mess",
    body: "The job as it runs right now, before anyone's built a system for it. You'll usually recognise it before the end of the first line.",
  },
  {
    icon: Workflow,
    label: "The system",
    body: "The fix, in plain English. Three or four steps, and I'll skip the tool names unless the tool is the whole point.",
  },
  {
    icon: Wrench,
    label: "Build it",
    body: "The bit you copy and paste. Twenty minutes or so, using software you're already paying for, ready to go on Monday.",
  },
  {
    icon: AlertCircle,
    label: "Where it breaks",
    body: "In every single issue. Where it falls over, who it won't suit, and what I got wrong the first time I tried it.",
  },
  {
    icon: Repeat,
    label: "The upgrade",
    body: "What the same system looks like once it runs on its own, and nobody has to remember it.",
  },
];

const forYou = [
  "You run a service business and you're still doing the delivery yourself",
  "You've got a small team and no real desire to hire your way out of it",
  "You want AI doing actual work in the business, not writing your LinkedIn posts",
];

const notForYou = [
  "You're a developer and you want the technical depth",
  "You're after model releases, benchmarks and tool roundups",
];

/* What is actually in the library, in the reader's terms. Deliberately concrete
   rather than a count, because "12 resources" says nothing about whether any of
   them are for you. */
const inTheLibrary = [
  "A time audit that gives you one number and a file you keep editing",
  "The context setup that stops you re-explaining your business to AI",
  "Templates and skills lifted straight out of real client builds",
  "Everything free, nothing gated behind a call",
];

export default function SimpleSystemsSaturdayPage() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      {/* Deliberately thin. Paid traffic lands here with one job to do, so the
          only way out is the logo. */}
      <header className="border-b border-line">
        <div className="max-w-5xl mx-auto px-6 h-[68px] md:h-[76px] flex items-center">
          <Link href="/" aria-label="Cornerstone AI, home">
            <Logo markClassName="w-7 h-7" wordClassName="text-xl" />
          </Link>
        </div>
      </header>

      <main>
        {/* ------------------------------------------------------------ hero */}
        <section className="pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <Eyebrow>Simple Systems Saturday</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 font-display font-bold uppercase leading-[0.9] tracking-[0.005em] text-[clamp(2.7rem,8vw,5.2rem)] text-foreground max-w-4xl">
                AI for people who run a business.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 text-xl md:text-2xl text-ink-2 leading-relaxed max-w-2xl">
                Grab a coffee on Saturday morning and I&apos;ll show you one simple system
                you can actually use. Plain English, about sixty seconds, free.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-11 max-w-xl">
                <NewsletterForm />
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- the pitch */}
        <section className="py-20 md:py-28 border-t border-line">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)] max-w-3xl">
                Most AI advice is written for people who write code.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 space-y-5 text-lg text-ink-2 leading-relaxed max-w-2xl">
                <p>
                  I got tired of watching business owners get told they were falling behind,
                  usually by someone demoing a thing they were never going to use. Meanwhile
                  the change that would have helped was small, a bit boring, and sitting right
                  there in their week.
                </p>
                <p>
                  So that&apos;s what I write about. One job, one system, every Saturday. How
                  any of it works underneath is my problem.
                </p>
                <p>
                  And if an issue doesn&apos;t give you something you can use, I&apos;ve
                  wasted your minute. I&apos;d honestly rather skip a week than pad one out.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------- the anatomy */}
        <section className="py-20 md:py-28 border-t border-line">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <Eyebrow>Every issue</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)]">
                The same five parts, every week.
              </h2>
            </Reveal>

            <ul className="mt-14 grid md:grid-cols-2 gap-x-12 gap-y-10">
              {anatomy.map((item, i) => (
                <Reveal as="li" key={item.label} delay={i * 0.05} y={12}>
                  <div className="flex gap-5">
                    <span className="shrink-0 grid place-items-center w-11 h-11 rounded-lg border border-line bg-surface/60 text-accent-ink">
                      <item.icon className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent-ink mb-2.5">
                        {item.label}
                      </h3>
                      <p className="text-lg text-ink-2 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------- the sample issue */}
        <section className="py-20 md:py-28 border-t border-line">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <Eyebrow>What one looks like</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-7 font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)]">
                Have a read before you decide.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 mb-12 text-lg text-ink-2 leading-relaxed max-w-2xl">
                No sense asking for your email on a promise. Here&apos;s a whole issue.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <article className="rounded-xl border border-line bg-surface/50 overflow-hidden">
                <div className="border-b border-line px-6 md:px-9 py-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-2">
                    Subject
                  </p>
                  <p className="mt-2 font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.005em] text-foreground leading-[1.05]">
                    The Friday report you rebuild every week
                  </p>
                </div>

                <div className="px-6 md:px-9 py-9 space-y-9">
                  <div>
                    <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-ink mb-3">
                      The mess
                    </h3>
                    <p className="text-lg text-ink-2 leading-relaxed">
                      Friday afternoon. You&apos;re writing the same client update you wrote
                      last Friday, from a blank page, digging back through Slack and your own
                      memory to work out what actually happened this week. Four clients, about
                      thirty five minutes each. You know the feeling.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-ink mb-3">
                      The system
                    </h3>
                    <p className="text-lg text-ink-2 leading-relaxed">
                      Two changes. First, cut the update down to five lines (what shipped,
                      what&apos;s in progress, what you need from them, what&apos;s next,
                      anything about money). Go and look in your sent folder. The replies you
                      get are almost all about lines three and five. Second, stop
                      reconstructing the week on a Friday. Remembering is the expensive part.
                      The writing only takes four minutes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-ink mb-3">
                      Build it
                    </h3>
                    <ol className="space-y-3 text-lg text-ink-2 leading-relaxed list-decimal pl-5 marker:text-muted marker:font-semibold">
                      <li>Pick one place per client for notes. The notes app on your phone is fine.</li>
                      <li>
                        Every time a piece of work finishes, add one line: the date, what
                        shipped, one sentence on why it mattered. Twenty seconds, while
                        it&apos;s still fresh in your head.
                      </li>
                      <li>
                        On Friday, paste the week&apos;s lines into ChatGPT or Claude with
                        this:
                      </li>
                    </ol>

                    <blockquote className="mt-5 rounded-lg border border-line bg-background px-5 py-4 text-[1.02rem] text-foreground leading-relaxed">
                      Here are this week&apos;s notes for [client]. Write their update using
                      these exact headings: [paste your five]. Plain language, no adjectives,
                      flag anything I&apos;m waiting on them for, under 150 words.
                    </blockquote>

                    <p className="mt-5 text-lg text-ink-2 leading-relaxed">
                      Read it, fix the one line that sounds off, send it.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-ink mb-3">
                      Where it breaks
                    </h3>
                    <p className="text-lg text-ink-2 leading-relaxed">
                      Skip the twenty second note and you&apos;re straight back to thirty five
                      minutes, except now you don&apos;t trust the drafts either. I&apos;ll be
                      upfront: the first fortnight reads a bit flat, because your notes are
                      still thin. Week three is when it gets good. Most people quit in week
                      two, which is a shame.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-ink mb-3">
                      The upgrade
                    </h3>
                    <p className="text-lg text-ink-2 leading-relaxed">
                      The version running in a client&apos;s business collects the week&apos;s
                      work on its own and leaves four drafts sitting there on Friday morning.
                      Nobody writes notes. Nobody remembers to run anything. That&apos;s the
                      job I do during the week, and it&apos;s where these all end up
                      eventually.
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------ qualification */}
        <section className="py-20 md:py-28 border-t border-line">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2rem,5vw,3.4rem)] mb-12">
                Is this for you?
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-10 md:gap-14">
              <Reveal>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent-ink mb-6">
                  Come on in if
                </h3>
                <ul className="space-y-4">
                  {forYou.map((line) => (
                    <li key={line} className="flex gap-3.5 text-lg text-foreground leading-relaxed">
                      <Check className="w-5 h-5 mt-1 shrink-0 text-accent-ink" strokeWidth={2} />
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.08}>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-2 mb-6">
                  Give it a miss if
                </h3>
                <ul className="space-y-4">
                  {notForYou.map((line) => (
                    <li key={line} className="flex gap-3.5 text-lg text-ink-2 leading-relaxed">
                      <X className="w-5 h-5 mt-1 shrink-0 text-muted" strokeWidth={2} />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-base text-muted leading-relaxed">
                  There are better newsletters than mine for both of those, and I&apos;d
                  rather you read those instead.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ library */}
        {/* The second reason to subscribe. The newsletter is one system a week;
            the library is where the finished, downloadable version of that work
            accumulates. Signing up gets both, which is worth saying once here
            rather than leaving people to find the library from a post. */}
        <section className="py-20 md:py-28 border-t border-line">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
              <Reveal className="md:col-span-7">
                <Eyebrow>You also get the library</Eyebrow>
                <h2 className="mt-5 font-display font-bold uppercase text-foreground leading-[0.94] tracking-[0.005em] text-[clamp(1.8rem,4.4vw,2.9rem)]">
                  The tools, not just the reading
                </h2>
                <p className="mt-5 text-lg text-ink-2 leading-relaxed">
                  Some weeks the system is small enough to describe in an email. Some weeks it
                  is a real thing you run, so I build it properly and put it in the library:
                  the audits, templates and Claude Code skills I use on actual client work.
                </p>
                <p className="mt-4 text-lg text-ink-2 leading-relaxed">
                  It is all free and there is no call attached to any of it. Subscribers get
                  each one as it goes up.
                </p>
                <a
                  href="/resources"
                  className="mt-7 inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3
                             font-sans text-[0.9rem] font-semibold text-foreground
                             transition-[transform,border-color] duration-200 ease-[var(--ease-out)]
                             hover:border-primary active:scale-[0.97]"
                >
                  Browse the library
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </a>
              </Reveal>

              <Reveal delay={0.08} className="md:col-span-5">
                <ul className="space-y-4 rounded-xl border border-line bg-surface/60 p-6 md:p-7">
                  {inTheLibrary.map((line) => (
                    <li key={line} className="flex gap-3.5 text-base text-foreground leading-relaxed">
                      <Check className="w-5 h-5 mt-0.5 shrink-0 text-accent-ink" strokeWidth={2} />
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- author */}
        <section className="py-20 md:py-28 border-t border-line">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal>
              <Eyebrow>Who sends it</Eyebrow>
            </Reveal>

            <div className="mt-9 grid md:grid-cols-12 gap-9 md:gap-12 items-start">
              <Reveal className="md:col-span-4">
                <div className="relative aspect-[4/5] w-full max-w-[280px] md:max-w-none overflow-hidden rounded-xl border border-line shadow-[var(--shadow-soft)]">
                  <img
                    src="/images/cristo-newsletter.webp"
                    alt="Cristo Van Rensburg"
                    width={1000}
                    height={1284}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.08} className="md:col-span-8">
                <div className="space-y-5 text-lg text-ink-2 leading-relaxed">
                  <p>
                    I&apos;m Cristo. I started my first business at 16, selling firewood to
                    the neighbours, and I was cold calling from my high school classroom a
                    year later. Since then I&apos;ve built systems in hospitality,
                    construction, real estate, insurance, fintech and franchise operations,
                    and for the founders of a podcast, a financing platform, an accounting
                    practice and a sport academy.
                  </p>
                  <p className="text-foreground font-medium">
                    Different industries, same bottleneck every time. The founder had become
                    the operating system of their own business.
                  </p>
                  <p>
                    My job is working out the few places where AI can genuinely grow a
                    business, building those properly, and leaving the rest of the noise
                    alone. Nobody gets replaced along the way. I&apos;ve also got no interest
                    in tech that looks impressive on a slide deck and then does nothing for
                    you on a Tuesday.
                  </p>
                  <p>
                    I&apos;m not writing this from the sidelines either. I run a consultancy
                    and development agency where I build custom operating systems for
                    founders, using the exact things I write about in here. Every issue comes
                    out of that week&apos;s work, which is why the steps are specific and why
                    I can tell you where each one falls over. I&apos;ve usually fallen over it
                    myself first.
                  </p>
                  <p>
                    Some of what I try doesn&apos;t work, and I&apos;ll tell you about those
                    weeks too. They tend to be the more useful ones anyway.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- final CTA */}
        {/* Carbon is reserved for the foundation moments in the brand pack, so the
            page closes on stone the same way the main site does. */}
        <section className="bg-carbon py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <p className="font-display font-extrabold uppercase leading-[0.92] tracking-[0.005em] text-[clamp(2.2rem,6.5vw,4.2rem)] text-rail-text">
                One system. <span className="text-[#DDBB7D]">Every Saturday.</span>
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-7 text-lg md:text-xl leading-relaxed text-[#BEB9AC]">
                The next one lands on Saturday morning. Put your email in below and
                I&apos;ll see you then.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10">
                <NewsletterForm tone="dark" cta="Sign me up" />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-carbon border-t border-[#2C2B27]">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <Link href="/" aria-label="Cornerstone AI, home">
            <Logo tone="onDark" markClassName="w-6 h-6" wordClassName="text-lg" />
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
