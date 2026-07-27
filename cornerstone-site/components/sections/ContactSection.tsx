"use client";

import React from "react";
import ContactForm from "../ui/ContactForm";
import Reveal from "../ui/Reveal";

const ContactSection: React.FC = () => (
  <section id="contact" className="py-28 md:py-36 bg-surface/40 border-t border-line">
    <div className="max-w-3xl mx-auto px-6">
      <div className="text-center mb-14">
        <Reveal>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-6">
            See what <span className="text-accent-ink">yours</span> would look like.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg text-ink-2 leading-relaxed max-w-xl mx-auto">
            A 30-minute call. We map where your hours go and show you what an operating
            system would change. No pitch deck. If it&apos;s not clearly worth it,
            we&apos;ll tell you straight.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="rounded-xl border border-line bg-background p-7 md:p-10 shadow-[var(--shadow-soft)]">
          <ContactForm />
        </div>
      </Reveal>
    </div>
  </section>
);

export default ContactSection;
