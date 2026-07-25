"use client";

import React from "react";
import ContactForm from "../ui/ContactForm";
import Reveal from "../ui/Reveal";

const ContactSection: React.FC = () => (
  <section id="contact" className="py-28 md:py-36 bg-surface/50 border-t border-line">
    <div className="max-w-3xl mx-auto px-6">
      <div className="text-center mb-14">
        <Reveal>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.2rem,5.5vw,3.6rem)] mb-6">
            Want to see what your right hand would{" "}
            <span className="text-accent-ink">take over first?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg text-ink-2 leading-relaxed max-w-xl mx-auto">
            Book a call. We&apos;ll show you where the hours are leaking and what we&apos;d
            build first. If it&apos;s not clearly worth it, we&apos;ll tell you straight.
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
