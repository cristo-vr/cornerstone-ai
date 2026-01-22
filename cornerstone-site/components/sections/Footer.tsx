import React from 'react';

interface FooterProps {
  onOpenContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="bg-brand-black border-t border-neutral-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-center">
          {/* Brand Section - Centered */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-brand-white mb-6 flex items-center gap-3">
              <div className="w-3 h-3 bg-brand-gold"></div>
              CORNERSTONE
            </h2>
            <p className="text-brand-gray max-w-lg mb-10 text-lg leading-relaxed">
              Building the foundation for the next generation of enterprise.
              We turn chaos into structure through intelligent automation.
            </p>
            <div className="flex gap-4">
              <button
                onClick={onOpenContact}
                className="bg-brand-gold text-brand-black px-8 py-4 text-base font-bold uppercase hover:bg-white transition-colors tracking-wider"
              >
                Start The Conversation
              </button>
            </div>
          </div>

          {/* Sitemap - Right Aligned (or centered on mobile) */}
          <div className="flex flex-col items-center md:items-start pl-0 md:pl-12 border-t md:border-t-0 md:border-l border-neutral-800 pt-8 md:pt-0 mt-8 md:mt-0">
            <h4 className="text-brand-white font-bold uppercase tracking-widest text-xs mb-6">Sitemap</h4>
            <ul className="space-y-4 text-sm text-brand-gray text-center md:text-left">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Home</a></li>
              <li><a href="#method" className="hover:text-brand-gold transition-colors">Methodology</a></li>
              <li><a href="#work" className="hover:text-brand-gold transition-colors">Case Studies</a></li>
              <li><a href="#process" className="hover:text-brand-gold transition-colors">Process</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
          <p>© 2024 Cornerstone AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;