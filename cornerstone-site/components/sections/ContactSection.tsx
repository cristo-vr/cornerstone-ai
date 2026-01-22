import React from 'react';
import ContactForm from '../ui/ContactForm';

const ContactSection: React.FC = () => {
    return (
        <section className="py-32 bg-background border-y border-neutral-900">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Unlock <span className="text-primary">Your Capacity</span>
                    </h2>
                    <p className="text-muted text-lg">
                        Fill out the form below. We'll analyze your current setup and identify exactly where automation can unlock more capacity.
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
