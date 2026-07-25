import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Cornerstone AI — how we collect, use, and protect your personal information under POPIA.',
  alternates: {
    canonical: 'https://cornerstone-ai.pro/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <Link href="/" className="text-accent-ink text-[0.72rem] font-semibold uppercase tracking-[0.18em] hover:text-accent-ink transition-colors mb-12 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="font-display text-[clamp(2.4rem,6vw,3.6rem)] font-bold uppercase tracking-[0.005em] leading-[0.92] mb-4">Privacy Policy</h1>
        <p className="text-ink-2 mb-14">Effective date: 3 March 2026</p>

        <div className="prose-concrete space-y-10 text-ink-2 text-base leading-relaxed">

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">1. Who We Are</h2>
            <p>
              Cornerstone AI (Pty) Ltd (&quot;Cornerstone AI&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is an operations automation company based in South Africa. We help founder-led businesses automate acquisition, service delivery, and operational visibility.
            </p>
            <p className="mt-2">
              Contact email: <a href="mailto:info@cornerstone-ai.pro" className="text-accent-ink hover:text-accent-ink underline underline-offset-2 transition-colors">info@cornerstone-ai.pro</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">2. Information We Collect</h2>
            <p>When you submit our discovery form, we collect the following personal information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full name</li>
              <li>Role or job title</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Company website</li>
              <li>Team size</li>
              <li>Description of your operational pain points</li>
              <li>Any additional information you choose to provide</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">3. How We Collect Your Information</h2>
            <p>
              We collect personal information directly from you when you voluntarily submit it through our website&apos;s discovery form. We do not collect personal information through any other means on this website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">4. Purpose of Processing</h2>
            <p>We process your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>To respond to your business enquiry</li>
              <li>To assess your operational needs and provide a relevant quote</li>
              <li>To schedule and conduct your discovery session</li>
              <li>To deliver our automation and consulting services</li>
              <li>To follow up on your enquiry if you have expressed interest</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">5. Lawful Basis for Processing</h2>
            <p>
              Under the Protection of Personal Information Act, 2013 (POPIA), we process your personal information on the following grounds:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Consent:</strong> By submitting the discovery form, you consent to the collection and processing of your personal information for the purposes stated above.</li>
              <li><strong className="text-foreground">Legitimate interest:</strong> Following up on business enquiries and providing relevant services to prospective clients.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">6. Third-Party Processors</h2>
            <p>We use the following third-party services to process your information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Make.com</strong> &mdash; Form data is routed through Make.com for workflow automation and processing of your discovery submission.</li>
              <li><strong className="text-foreground">Cloudflare (Turnstile)</strong> &mdash; We use Cloudflare Turnstile to protect our form from spam and abuse. Cloudflare may process limited technical data (such as browser metadata) for security verification purposes.</li>
            </ul>
            <p className="mt-2">
              These services act as processors on our behalf and are bound by their own privacy and data protection policies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">7. Cross-Border Data Transfers</h2>
            <p>
              Your personal information may be processed outside of South Africa by our third-party service providers (Make.com and Cloudflare). These providers maintain their own data protection safeguards. By submitting the discovery form, you acknowledge and consent to this transfer. We take reasonable steps to ensure that your information remains protected in accordance with POPIA.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">8. Data Retention</h2>
            <p>
              We retain your personal information only for as long as is necessary to fulfil the purposes for which it was collected. Specifically:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Active client data is retained for the duration of our engagement and a reasonable period thereafter.</li>
              <li>Enquiry data from prospects who do not become clients is retained for up to 12 months, after which it is deleted unless you request earlier removal.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">9. Your Rights Under POPIA</h2>
            <p>As a data subject, you have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Access</strong> the personal information we hold about you</li>
              <li><strong className="text-foreground">Correct</strong> any inaccurate or incomplete information</li>
              <li><strong className="text-foreground">Request deletion</strong> of your personal information</li>
              <li><strong className="text-foreground">Object</strong> to the processing of your personal information</li>
              <li><strong className="text-foreground">Withdraw consent</strong> at any time (this does not affect the lawfulness of processing prior to withdrawal)</li>
              <li><strong className="text-foreground">Lodge a complaint</strong> with the Information Regulator if you believe your rights have been infringed</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at <a href="mailto:info@cornerstone-ai.pro" className="text-accent-ink hover:text-accent-ink underline underline-offset-2 transition-colors">info@cornerstone-ai.pro</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">10. Security Measures</h2>
            <p>We take the security of your personal information seriously and implement the following safeguards:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>All data is transmitted over HTTPS (encrypted in transit)</li>
              <li>Cloudflare Turnstile CAPTCHA protects form submissions from automated abuse</li>
              <li>Access to personal information is restricted to authorised personnel only</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">11. Cookies</h2>
            <p>
              This website does not use tracking cookies or analytics cookies. However, Cloudflare Turnstile (our CAPTCHA service) may set functional cookies necessary for its security verification process. These cookies are essential for the operation of the form and are not used for advertising or tracking purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically. Continued use of the website after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">13. Information Officer</h2>
            <p>
              Cornerstone AI&apos;s designated Information Officer can be reached at:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:info@cornerstone-ai.pro" className="text-accent-ink hover:text-accent-ink underline underline-offset-2 transition-colors">info@cornerstone-ai.pro</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-foreground mb-3">14. Information Regulator (South Africa)</h2>
            <p>
              If you are not satisfied with how we handle your personal information, you have the right to lodge a complaint with the Information Regulator:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:complaints.IR@justice.gov.za" className="text-accent-ink hover:text-accent-ink underline underline-offset-2 transition-colors">complaints.IR@justice.gov.za</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
