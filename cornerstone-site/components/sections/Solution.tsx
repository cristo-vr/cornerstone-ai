
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Heart, Zap } from 'lucide-react';

const Solution: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  // Scroll spy logic
  React.useEffect(() => {
    const handleScroll = () => {
      const section1 = document.getElementById('solution-tab-1');
      const section2 = document.getElementById('solution-tab-2');

      if (section1 && section2) {
        const rect1 = section1.getBoundingClientRect();
        const rect2 = section2.getBoundingClientRect();

        // Simple logic: if section 2 is close to the middle of the viewport or above it
        if (rect2.top < window.innerHeight / 2) {
          setActiveTab(1);
        } else {
          setActiveTab(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="method" className="py-32 bg-brand-black relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Main Headline */}
        <div className="max-w-4xl mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-white leading-tight">
            The best automation in the world is worthless if your <span className="text-brand-gold">Account Managers hate using it.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 relative">

          {/* Left Column: Sticky Tabs */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:h-fit space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm transition-all duration-500">
              <div className="space-y-6">
                {/* Tab 1 Indicator */}
                <div
                  className={`group flex items-center gap-4 cursor-pointer transition-all duration-500 ${activeTab === 0 ? 'opacity-100 translate-x-2' : 'opacity-40'}`}
                  onClick={() => document.getElementById('solution-tab-1')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className={`w-1 h-8 rounded-full transition-all duration-500 ${activeTab === 0 ? 'bg-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]' : 'bg-neutral-800'}`} />
                  <div>
                    <h3 className={`text-2xl font-bold transition-colors duration-500 ${activeTab === 0 ? 'text-brand-white' : 'text-brand-gray'}`}>The Strategy</h3>
                    <p className="text-sm text-brand-gray uppercase tracking-widest">Process First</p>
                  </div>
                </div>

                {/* Connector Line */}
                <div className="ml-0.5 w-[2px] h-8 bg-white/5" />

                {/* Tab 2 Indicator */}
                <div
                  className={`group flex items-center gap-4 cursor-pointer transition-all duration-500 ${activeTab === 1 ? 'opacity-100 translate-x-2' : 'opacity-40'}`}
                  onClick={() => document.getElementById('solution-tab-2')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className={`w-1 h-8 rounded-full transition-all duration-500 ${activeTab === 1 ? 'bg-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]' : 'bg-neutral-800'}`} />
                  <div>
                    <h3 className={`text-2xl font-bold transition-colors duration-500 ${activeTab === 1 ? 'text-brand-white' : 'text-brand-gray'}`}>The Build</h3>
                    <p className="text-sm text-neutral-600 uppercase tracking-widest transition-colors duration-500">Infrastructure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scrollable Content */}
          <div className="lg:col-span-8 space-y-32 pb-32">

            {/* Tab 1 Content: The Strategy */}
            <div id="solution-tab-1" className="scroll-mt-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-mono uppercase tracking-widest mb-4">
                  Phase 01
                </div>
                <h3 className="text-4xl font-bold text-brand-white">We don't automate chaos.</h3>
                <p className="text-xl text-brand-gray leading-relaxed font-light">
                  Automating a bad process just speeds up the mess. We focus on the bottlenecks your team hates the most, and the direction leadership wants to take the company. We don't replace your people; <span className="text-brand-white font-medium">we remove their friction so they can perform.</span>
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-neutral-900/50 p-6 rounded-lg border border-white/5 transition-colors hover:border-brand-gold/20">
                    <Heart className="w-8 h-8 text-brand-gray mb-4" />
                    <h4 className="text-brand-white font-bold">Relieve Burnout</h4>
                  </div>
                  <div className="bg-neutral-900/50 p-6 rounded-lg border border-white/5 transition-colors hover:border-brand-gold/20">
                    <Cpu className="w-8 h-8 text-brand-gray mb-4" />
                    <h4 className="text-brand-white font-bold">Remove Robot Work</h4>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tab 2 Content: The Build */}
            <div id="solution-tab-2" className="scroll-mt-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6 pt-12 border-t border-white/5"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-widest mb-4">
                  Phase 02
                </div>
                <h3 className="text-4xl font-bold text-brand-white">Assets, not duct tape.</h3>
                <p className="text-xl text-brand-gray leading-relaxed font-light">
                  We don't build for novelty. We engineer around your team's natural workflow so they actually use it. We only target bottlenecks with a clear ROI, creating secure, documented infrastructure that belongs to you. <span className="text-brand-white font-medium">This is a permanent asset that scales, not a quick fix that breaks.</span>
                </p>
                <div className="bg-brand-black border border-white/10 p-8 rounded-xl relative overflow-hidden group hover:border-brand-gold/30 transition-colors">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
                  <div className="relative z-10 flex items-center gap-4">
                    <Zap className="w-10 h-10 text-brand-gold" />
                    <div>
                      <h4 className="text-xl font-bold text-brand-white">Verified Architecture</h4>
                      <p className="text-brand-gray text-sm">Documented. Secure. Scalable.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

        </div>

        {/* Footer Statement */}
        <div className="mt-32 pt-12 border-t border-white/10 text-center">
          <p className="text-2xl md:text-3xl font-bold text-brand-gray max-w-4xl mx-auto">
            "Put it this way: If your team doesn't feel relief the day we launch, <span className="text-brand-white border-b-2 border-brand-gold pb-1">we failed.</span>"
          </p>
        </div>

      </div>
    </section>
  );
};

export default Solution;