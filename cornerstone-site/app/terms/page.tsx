import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Cornerstone AI — the terms governing your use of our website and services.',
  alternates: {
    canonical: 'https://cornerstone-ai.pro/terms',
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <Link href="/" className="text-primary text-sm font-mono uppercase tracking-widest hover:text-white transition-colors mb-12 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Terms of Service</h1>
        <p className="text-muted mb-12">Effective date: 3 March 2026</p>

        <div className="prose-custom space-y-10 text-muted text-base leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Cornerstone AI website at <a href="https://cornerstone-ai.pro" className="text-primary hover:text-white transition-colors">cornerstone-ai.pro</a> (&quot;the Site&quot;), or by submitting information through our discovery form, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Description of Services</h2>
            <p>
              This website is informational in nature. It describes the operations automation services offered by Cornerstone AI (Pty) Ltd. The Site includes a discovery form that allows prospective clients to express interest in our services.
            </p>
            <p className="mt-2">
              Actual service engagements are governed by separate written agreements entered into between Cornerstone AI and the client. Nothing on this Site constitutes a binding offer or contract for services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Intellectual Property</h2>
            <p>
              All content on this Site &mdash; including text, graphics, logos, design elements, code, and layout &mdash; is the property of Cornerstone AI (Pty) Ltd and is protected by South African and international intellectual property laws.
            </p>
            <p className="mt-2">
              You may not copy, reproduce, distribute, modify, or create derivative works from any content on this Site without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Use of the Website</h2>
            <p>You agree to use this Site only for lawful purposes. You may not:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the Site in any way that violates applicable South African or international law</li>
              <li>Attempt to gain unauthorised access to any part of the Site, its servers, or any connected systems</li>
              <li>Submit false, misleading, or fraudulent information through the discovery form</li>
              <li>Use automated tools (bots, scrapers) to access or extract content from the Site without permission</li>
              <li>Interfere with or disrupt the operation of the Site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. ECT Act Disclosures (Section 43)</h2>
            <p>
              In compliance with the Electronic Communications and Transactions Act, 2002 (Act No. 25 of 2002), the following information is provided:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Full name:</strong> Cornerstone AI (Pty) Ltd</li>
              <li><strong className="text-foreground">Main business:</strong> Operations automation consulting and implementation for founder-led businesses</li>
              <li><strong className="text-foreground">Contact email:</strong> <a href="mailto:info@cornerstone-ai.pro" className="text-primary hover:text-white transition-colors">info@cornerstone-ai.pro</a></li>
              <li><strong className="text-foreground">Website:</strong> <a href="https://cornerstone-ai.pro" className="text-primary hover:text-white transition-colors">cornerstone-ai.pro</a></li>
              <li><strong className="text-foreground">Country:</strong> South Africa</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The Site and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis. Cornerstone AI makes no representations or warranties of any kind, express or implied, regarding:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>The accuracy, completeness, or reliability of any information on the Site</li>
              <li>The uninterrupted or error-free operation of the Site</li>
              <li>The suitability of our services for your particular business needs</li>
            </ul>
            <p className="mt-2">
              Information on this Site is general in nature and does not constitute professional, legal, financial, or technical advice. You should consult with appropriate professionals before making business decisions based on any information found here.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by South African law, Cornerstone AI (Pty) Ltd, its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Site.
            </p>
            <p className="mt-2">
              Our total liability for any direct claim arising from your use of this Site shall not exceed the amount you have paid to Cornerstone AI for services in the 12 months preceding the claim, or R1,000 (one thousand South African Rand), whichever is greater.
            </p>
            <p className="mt-2">
              Nothing in these Terms excludes or limits our liability for fraud, gross negligence, or any liability that cannot be excluded under South African law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from or relating to these Terms or your use of the Site shall be subject to the jurisdiction of the South African courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Dispute Resolution</h2>
            <p>
              In the event of any dispute arising from these Terms or your use of the Site, the parties agree to the following process:
            </p>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Internal escalation:</strong> The dispute will first be raised with Cornerstone AI&apos;s management via email for good-faith resolution.</li>
              <li><strong className="text-foreground">Mediation:</strong> If the dispute is not resolved within 30 days, either party may refer the matter to mediation.</li>
              <li><strong className="text-foreground">Arbitration:</strong> If mediation fails, the dispute shall be submitted to binding arbitration in accordance with the Arbitration Act, 1965 (Act No. 42 of 1965).</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">11. Entire Agreement</h2>
            <p>
              These Terms, together with our <Link href="/privacy" className="text-primary hover:text-white transition-colors">Privacy Policy</Link> and <Link href="/refund-policy" className="text-primary hover:text-white transition-colors">Refund &amp; Cancellation Policy</Link>, constitute the entire agreement between you and Cornerstone AI regarding your use of this Site. These Terms do not govern any separate service agreements entered into between Cornerstone AI and its clients.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">12. Contact</h2>
            <p>
              For any questions about these Terms of Service, please contact us:
            </p>
            <p className="mt-2">
              Email: <a href="mailto:info@cornerstone-ai.pro" className="text-primary hover:text-white transition-colors">info@cornerstone-ai.pro</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
