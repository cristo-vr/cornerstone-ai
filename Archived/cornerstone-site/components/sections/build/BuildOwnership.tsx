"use client";

import React from "react";
import { Key, FileText, Ban, DoorOpen } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

/* This section used to carry a "handover, itemised" card next to the bullet
   list below. Its four rows were those four bullets restated as nouns, so it
   was a diagram of the paragraph beside it. Deleted rather than trimmed. */
const ownership = [
  { icon: Key, text: "It lives in your accounts." },
  { icon: FileText, text: "The system and its code belong to you in writing." },
  { icon: Ban, text: "No platform fee. The only thing you can pay me for is more work." },
  { icon: DoorOpen, text: "You can revoke my access any day, during the eight weeks as much as after." },
];

const BuildOwnership: React.FC = () => (
  <section id="ownership" className="py-20 md:py-26 border-t border-line">
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-3xl mb-12">
        <Reveal>
          <h2 className="font-display font-bold uppercase text-foreground leading-[0.92] tracking-[0.005em] text-[clamp(2.4rem,6vw,4.2rem)] mb-7">
            You own it. All of it.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-lg text-ink-2 leading-relaxed mb-10">
            There is no licence and no subscription. I build the system inside your own
            accounts, hand it over, and it runs without me.
          </p>
        </Reveal>
        <ul className="space-y-4">
          {ownership.map((item, i) => (
            <Reveal as="li" key={item.text} delay={i * 0.06} y={12}>
              <span className="flex items-center gap-4 text-lg text-foreground">
                <item.icon className="w-5 h-5 text-accent-ink shrink-0" strokeWidth={1.5} />
                {item.text}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal>
        <div className="rounded-xl border border-line bg-surface/50 p-8 md:p-10">
          <h3 className="font-display uppercase tracking-[0.005em] text-2xl md:text-3xl font-bold text-foreground mb-5">
            Your client data stays in your business.
          </h3>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-lg text-ink-2 leading-relaxed">
            <p>Your data never moves into mine. It stays exactly where it lives today.</p>
            <p>
              I sign a confidentiality agreement before I look at anything. If your
              industry has rules about client information, I build to them.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default BuildOwnership;
