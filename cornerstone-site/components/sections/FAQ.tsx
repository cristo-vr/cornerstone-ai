"use client";
import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
    {
        question: "What exactly does Cornerstone AI do?",
        answer: "We automate the operational side of your business — how you get clients, how you serve them, and how you see what's actually happening. Think of us as the team that builds the machine so your people can stop being the machine."
    },
    {
        question: "Who is this for?",
        answer: "Founders running teams of 10–50 who know they've hit a ceiling. If you can't take a week off without things slipping, or you're saying no to growth because your operations can't keep up — that's exactly where we come in."
    },
    {
        question: "Is this a CRM replacement?",
        answer: "No. We're not replacing your tools — we're connecting them. We sit on top of what you already use and automate the workflows and data movement between them. Your CRM stays, it just works harder."
    },
    {
        question: "How long does implementation take?",
        answer: "Discovery is 5 days. Build is 6 weeks. But we don't wait until the end to go live — systems launch as they're ready, so your team starts seeing results in the first couple of weeks."
    },
    {
        question: "Do you only work with South African businesses?",
        answer: "We're based in South Africa, but the systems we build work anywhere. If your operations are broken, geography doesn't matter — we can help."
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
