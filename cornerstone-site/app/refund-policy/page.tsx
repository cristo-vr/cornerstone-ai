import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description: 'Refund and Cancellation Policy for Cornerstone AI — how we handle refunds, cancellations, and project changes.',
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
        <p className="text-ink-2 mb-14">Effective date: 9 April 2026</p>

        <div className="prose-concrete space-y-10 text-ink-2 text-base leading-relaxed">

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">1. Overview</h2>
            <p>
              Cornerstone AI builds custom operating systems for founder-led businesses. Our engagements are structured in clearly defined phases, each with its own scope and deliverables. This policy explains how refunds and cancellations are handled at each stage.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">2. Discovery Sprint</h2>
            <p>
              Every engagement begins with a paid Discovery Sprint - a short diagnostic phase where we map how your business operates, identify automation opportunities, and design the architecture for your custom operating system.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Full refund guarantee:</strong> If we are unable to demonstrate measurable operational impact during the Discovery Sprint, you receive a full refund of the sprint fee.</li>
              <li><strong className="text-foreground">Credit toward build:</strong> If you proceed to the build phase, your Discovery Sprint fee is credited in full toward the project cost.</li>
              <li><strong className="text-foreground">Cancellation before sprint begins:</strong> If you cancel before the Discovery Sprint has started, you will receive a full refund.</li>
              <li><strong className="text-foreground">Cancellation during sprint:</strong> If you cancel after the Discovery Sprint has begun, the sprint fee is non-refundable, as diagnostic work will already be underway. You will still receive all completed deliverables up to the point of cancellation.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">3. Build Phase (OS Development)</h2>
            <p>
              Build-phase projects are billed on a milestone basis. Each milestone represents a defined scope of work agreed upon before development begins.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Cancellation before a milestone:</strong> You may cancel or pause the project before any unstarted milestone with no further payment obligation.</li>
              <li><strong className="text-foreground">Completed milestones:</strong> Payments for milestones that have been completed and delivered are non-refundable, as you retain full ownership of all work produced.</li>
              <li><strong className="text-foreground">In-progress milestones:</strong> If you cancel while a milestone is in progress, you will be billed for work completed up to the date of cancellation. Any deliverables produced will be handed over to you.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">4. Retainer &amp; Hourly Engagements</h2>
            <p>
              Some clients engage Cornerstone AI on a retainer or hourly basis for ongoing development, support, or training.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Retainer cancellation:</strong> Either party may cancel a retainer arrangement with 14 days&apos; written notice. Any prepaid retainer fees for unused hours within the notice period will be refunded on a pro-rata basis.</li>
              <li><strong className="text-foreground">Hourly work:</strong> Hourly sessions are billed for time worked. No refunds apply for completed sessions, as the service has been delivered.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">5. Scope Changes</h2>
            <p>
              If the scope of a project changes during the engagement, we will discuss and agree on adjusted timelines and costs before proceeding. You are never billed for work that was not agreed upon in advance.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">6. Ownership of Deliverables</h2>
            <p>
              Upon payment, you own all deliverables produced during the engagement. This includes system designs, documentation, and any custom software built for your business. Cancellation does not affect ownership of work that has been paid for and delivered.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">7. How to Request a Refund or Cancel</h2>
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
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">8. Governing Law</h2>
            <p>
              This policy is governed by the laws of the Republic of South Africa, including the Consumer Protection Act, 2008 (Act No. 68 of 2008) and the Electronic Communications and Transactions Act, 2002 (Act No. 25 of 2002), where applicable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Any changes will be posted on this page with an updated effective date. Existing engagements will be governed by the policy in effect at the time the engagement was entered into.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
