import React from 'react';

interface FooterProps {
  onOpenContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="bg-background border-t border-neutral-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-center">
          {/* Brand Section - Centered */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-3 h-3 bg-primary"></div>
              CORNERSTONE
            </h2>
            <p className="text-muted max-w-lg mb-10 text-lg leading-relaxed">
              An AI Chief of Staff for founder-led businesses. A right hand that runs your operations, built into your business and owned by you.
            </p>
            <div className="flex gap-4">
              <button
                onClick={onOpenContact}
                className="bg-primary text-background px-8 py-4 text-base font-semibold hover:bg-foreground transition-colors active:scale-[0.98]"
              >
                Book a call
              </button>
            </div>
          </div>

          {/* Sitemap - Right Aligned (or centered on mobile) */}
          <div className="flex flex-col items-center md:items-start pl-0 md:pl-12 border-t md:border-t-0 md:border-l border-neutral-800 pt-8 md:pt-0 mt-8 md:mt-0">
            <h4 className="text-foreground font-bold uppercase tracking-widest text-xs mb-6">Sitemap</h4>
            <ul className="space-y-4 text-sm text-muted text-center md:text-left">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/the-os-sprint" className="hover:text-primary transition-colors">The OS Sprint</a></li>
              <li><a href="/#how-it-works" className="hover:text-primary transition-colors">How it works</a></li>
              <li><a href="/#proof" className="hover:text-primary transition-colors">Proof</a></li>
              <li><a href="/#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="/#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
          <p>© 2026 Cornerstone AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-neutral-400">Terms of Service</a>
            <a href="/refund-policy" className="hover:text-neutral-400">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;