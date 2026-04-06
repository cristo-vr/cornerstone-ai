"use client";
import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
    {
        question: "What exactly does Cornerstone AI do?",
        answer: "We build custom operating systems for founder-led businesses. Everything your team is already doing - onboarding, follow-ups, project tracking, invoicing, reporting - all in one platform, built exactly for how your business works. 80% of it runs itself."
    },
    {
        question: "Who is this for?",
        answer: "Founders and business owners running teams of 5-50 who are personally stuck in the day-to-day operations. If you can't take a week off without things slipping, or you're saying no to growth because your team can't keep up - that's exactly where we come in. We've built operating systems across restaurants, fintech, accounting, fashion, and more. The industry doesn't matter - the founder bottleneck does."
    },
    {
        question: "Is this custom software?",
        answer: "Yes. We build you a real platform - not a collection of Zapier automations or a CRM skin. Your team logs into one place. It's designed around how your specific business actually works, not a generic template."
    },
    {
        question: "How long does it take to build?",
        answer: "Discovery is 5 days. Build is 6 weeks. But we don't wait until the end to go live - modules launch as they're ready, so your team starts running on the OS within the first couple of weeks."
    },
    {
        question: "Do you only work with South African businesses?",
        answer: "We're based in South Africa, but we work with founders internationally. We've built operating systems for clients in the US and South Africa. If you need a system, geography doesn't matter."
    },
    {
        question: "What if my team doesn't use it?",
        answer: "That's our problem to solve, not yours. We don't hand over a platform and walk away. Phase 03 of every engagement is Adoption - we train every user, handle edge cases, and stay until the new way is the default way. We measure adoption, not delivery. If your team isn't running on it confidently, we're not done."
    }
];

const FAQ = () => {
    return (
        <section className="py-24 bg-background w-full" id="faq">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Straight answers to the questions we hear most.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border border-border rounded-lg overflow-hidden bg-card"
                        >
                            <details className="group">
                                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                                    <h3 className="text-lg font-medium text-foreground pr-8">
                                        {faq.question}
                                    </h3>
                                    <span className="transition-transform duration-300 group-open:rotate-180">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-muted-foreground group-open:animate-in group-open:fade-in group-open:slide-in-from-top-2">
                                    <p>{faq.answer}</p>
                                </div>
                            </details>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
