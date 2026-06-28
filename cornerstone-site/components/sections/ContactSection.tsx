import React from 'react';
import ContactForm from '../ui/ContactForm';

const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="py-32 bg-surface/40 border-y border-neutral-900">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
                        Want to see what your right hand would{' '}
                        <span className="text-primary">take over first?</span>
                    </h2>
                    <p className="text-muted text-lg max-w-xl mx-auto">
                        Book a call. We'll show you where the hours are leaking and what we'd build first. If it's not clearly worth it, we'll tell you straight.
                    </p>
                </div>

                <div className="bg-neutral-900/30 p-8 md:p-12 border border-neutral-800 rounded-xl">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
