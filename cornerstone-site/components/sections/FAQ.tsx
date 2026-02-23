"use client";
import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
    {
        question: "What exactly does Cornerstone AI do?",
        answer: "Cornerstone AI is an Operations Accelerator for founder-led businesses. We automate the three pillars your company runs on — Acquisition, Service & Retention, and Visibility — so you can scale without drowning in admin or hiring to keep up."
    },
    {
        question: "Who is this solution for?",
        answer: "We work best with founders running businesses of 10\u201350 people who know they've hit an operational ceiling. If you're spending more time managing than growing \u2014 or you can't step away without things falling apart \u2014 this was built for you."
    },
    {
        question: "Is this a CRM replacement?",
        answer: "No, we are not a CRM. We are an operational infrastructure layer that sits on top of your existing systems. We integrate with your current tools to automate workflows and data movement, making your existing tech stack more efficient."
    },
    {
        question: "How long does implementation take?",
        answer: "Discovery takes 5 days. Development takes 6 weeks. Systems go live one at a time \u2014 your team starts using them immediately. Most founders see measurable time savings within the first two weeks."
    },
    {
        question: "Do you only work with South African businesses?",
        answer: "While we are based in South Africa, our automation infrastructure can be deployed for businesses globally."
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
                        Common questions about how we help businesses scale.
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
