import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'Refund and Cancellation Policy for Cornerstone AI: how we handle refunds, cancellations, and project changes.',
  alternates: {
    canonical: 'https://cornerstone-ai.pro/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <Link href="/" className="text-accent-ink text-[0.72rem] font-semibold uppercase tracking-[0.18em] hover:text-accent-ink transition-colors mb-12 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="font-display text-[clamp(2.4rem,6vw,3.6rem)] font-bold uppercase tracking-[0.005em] leading-[0.92] mb-4">Refund &amp; Cancellation Policy</h1>
        <p className="text-ink-2 mb-14">Effective date: 27 July 2026</p>

        <div className="prose-concrete space-y-10 text-ink-2 text-base leading-relaxed">

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">1. Overview</h2>
            <p>
              Cornerstone AI builds custom operating systems for growing businesses. Our core engagement is the eight-week OS build: a single, fixed-scope project, priced and agreed in writing before week one begins. This policy explains how refunds and cancellations are handled.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">2. The eight-week OS build</h2>
            <p>
              The build is a fixed fee covering the week-one mapping workshop, eight weeks of embedded development, weekly training for your team, and handover. It is payable either in two instalments across the eight weeks, or in full up front at a 10% discount.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Cancellation before the build begins:</strong> if you cancel before the week-one workshop, you receive a full refund of anything paid.</li>
              <li><strong className="text-foreground">Cancellation during the build:</strong> you may stop at any point. You will be billed only for work completed to the date of cancellation, and every deliverable produced to that point is handed over to you.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">3. Ongoing retainers</h2>
            <p>
              After handover, some clients engage Cornerstone AI on an optional monthly retainer for continued development, support and training. A retainer is never a condition of the build, and the system keeps running without one.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">No lock-in:</strong> a retainer may be cancelled at the end of any monthly period. There is no minimum term.</li>
              <li><strong className="text-foreground">Prepaid fees:</strong> any prepaid retainer fees for unused work within a notice period are refunded on a pro-rata basis.</li>
              <li><strong className="text-foreground">Work already delivered:</strong> retainer months in which work has been delivered are not refundable, as the service has been provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">4. Third-party and usage costs</h2>
            <p>
              Your system runs inside your own accounts, so the AI&apos;s usage and any third-party software you use are billed to you directly by those providers, not by us. Those costs are outside this policy and are not refundable by Cornerstone AI. We will tell you what to expect before anything is connected.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">5. Scope changes</h2>
            <p>
              If the scope of a project changes during the engagement, we will discuss and agree on adjusted timelines and costs before proceeding. You are never billed for work that was not agreed upon in advance.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">6. Ownership of deliverables</h2>
            <p>
              Everything is built inside your own accounts from day one, and on payment you own all deliverables produced during the engagement: system designs, documentation, and any custom software built for your business. Cancellation does not affect ownership of work that has been paid for and delivered.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">7. How to request a refund or cancel</h2>
            <p>
              To request a refund or cancel an engagement, please contact us in writing:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:info@cornerstone-ai.pro" className="text-accent-ink hover:text-accent-ink underline underline-offset-2 transition-colors">info@cornerstone-ai.pro</a>
            </p>
            <p className="mt-2">
              We will acknowledge your request within 2 business days and process any applicable refund within 14 business days of approval.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">8. Governing law</h2>
            <p>
              This policy is governed by the laws of the Republic of South Africa, including the Consumer Protection Act, 2008 (Act No. 68 of 2008) and the Electronic Communications and Transactions Act, 2002 (Act No. 25 of 2002), where applicable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">9. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Any changes will be posted on this page with an updated effective date. Existing engagements will be governed by the policy in effect at the time the engagement was entered into.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
