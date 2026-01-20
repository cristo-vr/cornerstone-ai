import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-neutral-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-brand-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-gold"></div>
              CORNERSTONE
            </h2>
            <p className="text-brand-gray max-w-sm mb-8">
              Building the foundation for the next generation of enterprise.
              We turn chaos into structure through intelligent automation.
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-neutral-900 border border-neutral-800 text-brand-white px-4 py-2 focus:outline-none focus:border-brand-gold w-64 text-sm"
              />
              <button className="bg-brand-gold text-brand-black px-4 py-2 text-sm font-bold uppercase hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-brand-white font-bold uppercase tracking-widest text-xs mb-6">Sitemap</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Home</a></li>
              <li><a href="#method" className="hover:text-brand-gold transition-colors">Methodology</a></li>
              <li><a href="#work" className="hover:text-brand-gold transition-colors">Case Studies</a></li>
              <li><a href="#process" className="hover:text-brand-gold transition-colors">Process</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-white font-bold uppercase tracking-widest text-xs mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Email Us</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
          <p>© 2024 Cornerstone Automation. All rights reserved.</p>
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