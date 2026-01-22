import React, { useState } from 'react';
import Turnstile from 'react-turnstile';

const SITE_KEY = '0x4AAAAAACN3bXEw6zTOBNYc';
const WEBHOOK_URL = 'https://hook.us1.make.com/hq86ivay0995yhx6in8v4ttr7max7o53';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        role: '',
        email: '',
        phone: '',
        businessName: '',
        website: '',
        teamSize: '2-5',
        revenue: '$20k to $50k',
        limitingProcesses: '',
        anythingElse: ''
    });

    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileToken) {
            alert('Please complete the security check.');
            return;
        }

        setStatus('submitting');

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    turnstileToken,
                    submittedAt: new Date().toISOString()
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    fullName: '',
                    role: '',
                    email: '',
                    phone: '',
                    businessName: '',
                    website: '',
                    teamSize: '2-5',
                    revenue: '$20k to $50k',
                    limitingProcesses: '',
                    anythingElse: ''
                });
                setTurnstileToken(null); // Reset token
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground">Application Received</h3>
                <p className="text-muted">We'll review your details and get back to you within 24 hours.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-primary font-bold uppercase tracking-widest text-sm hover:text-white transition-colors mt-4"
                >
                    Submit Another
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted uppercase tracking-wider">Full Name *</label>
                    <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-foreground p-4 focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted uppercase tracking-wider">Role *</label>
                    <input
                        type="text"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-foreground p-4 focus:outline-none focus:border-primary transition-colors"
                        placeholder="Founder / CEO"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted uppercase tracking-wider">Email *</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-foreground p-4 focus:outline-none focus:border-primary transition-colors"
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted uppercase tracking-wider">Phone *</label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-foreground p-4 focus:outline-none focus:border-primary transition-colors"
                        placeholder="+1 (555) 000-0000"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted uppercase tracking-wider">Business Name *</label>
                    <input
                        type="text"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-foreground p-4 focus:outline-none focus:border-primary transition-colors"
                        placeholder="Acme Corp"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted uppercase tracking-wider">Website *</label>
                    <input
                        type="url"
                        name="website"
                        required
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-foreground p-4 focus:outline-none focus:border-primary transition-colors"
                        placeholder="https://acme.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted uppercase tracking-wider">How big is your team currently? *</label>
                    <select
                        name="teamSize"
                        required
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-foreground p-4 focus:outline-none focus:border-primary transition-colors appearance-none"
                    >
                        <option value="Just me">Just me</option>
                        <option value="2-5">2-5</option>
                        <option value="5-20">5-20</option>
                        <option value="20-50">20-50</option>
                        <option value="50+">50+</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted uppercase tracking-wider">What is your monthly revenue? *</label>
                    <select
                        name="revenue"
                        required
                        value={formData.revenue}
                        onChange={handleChange}
                        className="w-full bg-neutral-900/50 border border-neutral-800 text-foreground p-4 focus:outline-none focus:border-primary transition-colors appearance-none"
                    >
                        <option value="Less than $20k">Less than $20k</option>
                        <option value="$20k to $50k">$20k to $50k</option>
                        <option value="$50k to $200k">$50k to $200k</option>
                        <option value="$200K+">$200K+</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-muted uppercase tracking-wider">Describe some processes that you feel are limiting capacity: *</label>
                <textarea
                    name="limitingProcesses"
                    required
                    value={formData.limitingProcesses}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-neutral-900/50 border border-neutral-800 text-foreground p-4 focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="e.g. Manual data entry, repetitive reporting, client onboarding..."
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-muted uppercase tracking-wider">Anything else we should know?</label>
                <textarea
                    name="anythingElse"
                    value={formData.anythingElse}
                    onChange={handleChange}
                    rows={2}
                    className="w-full bg-neutral-900/50 border border-neutral-800 text-foreground p-4 focus:outline-none focus:border-primary transition-colors resize-none"
                />
            </div>

            <div className="space-y-4">
                <Turnstile
                    sitekey={SITE_KEY}
                    onVerify={(token) => setTurnstileToken(token)}
                    theme="dark"
                />

                {status === 'error' && (
                    <div className="text-red-500 text-sm font-medium">
                        Something went wrong. Please try again.
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-primary text-background font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
