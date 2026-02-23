import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { UserPlus, FileCheck, RefreshCw, BarChart3, CheckCircle2 } from 'lucide-react';

const Solution: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const tab1 = document.getElementById('solution-tab-0');
      const tab2 = document.getElementById('solution-tab-1');
      const tab3 = document.getElementById('solution-tab-2');

      if (tab1 && tab2 && tab3) {
        const rect1 = tab1.getBoundingClientRect();
        const rect2 = tab2.getBoundingClientRect();
        const rect3 = tab3.getBoundingClientRect();
        const triggerPoint = window.innerHeight / 2;

        if (rect3.top < triggerPoint) {
          setActiveTab(2);
        } else if (rect2.top < triggerPoint) {
          setActiveTab(1);
        } else {
          setActiveTab(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { title: 'Acquisition', subtitle: 'Getting Clients' },
    { title: 'Service & Retention', subtitle: 'Keeping Clients' },
    { title: 'Visibility', subtitle: 'Knowing Everything' },
  ];

  return (
    <section id="pillars" ref={containerRef} className="bg-background relative">
      <div className="max-w-7xl mx-auto px-6 py-32">

        {/* Section Header */}
        <div className="mb-24 md:text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tighter mb-8">
            Every business you've built runs on three pillars. <br />
            <span className="text-primary">We automate all three.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 relative">

          {/* Sticky Left Navigation */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit hidden lg:block">
            <div className="relative pl-8 border-l border-neutral-800 space-y-12">
              {/* Animated Line */}
              <motion.div
                className="absolute left-[-1px] top-0 w-[1px] bg-primary"
                animate={{
                  height: activeTab === 0 ? '33%' : activeTab === 1 ? '66%' : '100%',
                  transition: { duration: 0.5, ease: "easeInOut" }
                }}
              />

              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 ${activeTab === index ? 'opacity-100 translate-x-2' : 'opacity-40'}`}
                >
                  <h3 className={`text-2xl font-bold mb-1 ${activeTab === index ? 'text-primary' : 'text-foreground'}`}>
                    {tab.title}
                  </h3>
                  <p className="text-muted text-sm uppercase tracking-widest">{tab.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content Scrollable Area */}
          <div className="lg:col-span-8 space-y-32">

            {/* PILLAR 1: ACQUISITION */}
            <div id="solution-tab-0" className="min-h-[80vh] flex flex-col justify-center">
              <div className="lg:hidden mb-8">
                <span className="text-primary text-xs font-mono uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">Pillar 01</span>
                <h3 className="text-3xl font-bold text-foreground mt-2">Acquisition</h3>
              </div>

              <div className="bg-neutral-900/50 border border-white/5 p-8 md:p-12 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  <span className="text-8xl font-black text-white/5">01</span>
                </div>

                <span className="text-primary text-xs font-mono uppercase tracking-widest bg-primary/10 px-2 py-1 rounded mb-6 inline-block">
                  Pillar 01
                </span>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  New business without the bottleneck.
                </h3>
                <p className="text-xl text-neutral-400 mb-12 leading-relaxed max-w-2xl">
                  Your team should be closing deals or serving clients, not chasing paperwork. We build the systems that capture leads, qualify prospects, and route them to the right team member — automatically. <span className="text-white font-medium">From first enquiry to signed contract, every step is tracked.</span>
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-neutral-800/50 p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit text-primary mb-4">
                      <UserPlus className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Lead Capture & Routing</h4>
                    <p className="text-neutral-400 text-sm">Leads from website, email, or ads are instantly captured and assigned to the right team member.</p>
                  </div>

                  <div className="bg-neutral-800/50 p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit text-primary mb-4">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Pipeline Automation</h4>
                    <p className="text-neutral-400 text-sm">Automated follow-ups, document collection, and status updates keep deals moving.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PILLAR 2: SERVICE & RETENTION */}
            <div id="solution-tab-1" className="min-h-[80vh] flex flex-col justify-center">
              <div className="lg:hidden mb-8">
                <span className="text-blue-400 text-xs font-mono uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded">Pillar 02</span>
                <h3 className="text-3xl font-bold text-foreground mt-2">Service & Retention</h3>
              </div>

              <div className="bg-neutral-900/50 border border-white/5 p-8 md:p-12 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  <span className="text-8xl font-black text-white/5">02</span>
                </div>

                <span className="text-blue-400 text-xs font-mono uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded mb-6 inline-block">
                  Pillar 02
                </span>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Clients stay because the experience is effortless.
                </h3>
                <p className="text-xl text-neutral-400 mb-12 leading-relaxed max-w-2xl">
                  Onboarding clients, scheduled check-ins, delivering regular service. The work that keeps a business alive and retains clients is repetitive and exact — the perfect candidate for automation. <span className="text-white font-medium">Your team focuses on the relationship. The system handles the rhythm.</span>
                </p>

                <div className="bg-neutral-800/50 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg w-fit text-blue-400 shrink-0">
                      <RefreshCw className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Retention Engine</h4>
                      <p className="text-neutral-400 mb-4">Never miss a client milestone or follow-up again. The system triggers tasks and communications automatically.</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-neutral-400">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" /> Automated Check-in Reminders
                        </li>
                        <li className="flex items-center gap-2 text-sm text-neutral-400">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" /> Automated Onboarding Sequences
                        </li>
                        <li className="flex items-center gap-2 text-sm text-neutral-400">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" /> Project or Service Updates
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PILLAR 3: VISIBILITY */}
            <div id="solution-tab-2" className="min-h-[80vh] flex flex-col justify-center">
              <div className="lg:hidden mb-8">
                <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded">Pillar 03</span>
                <h3 className="text-3xl font-bold text-foreground mt-2">Visibility</h3>
              </div>

              <div className="bg-neutral-900/50 border border-white/5 p-8 md:p-12 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  <span className="text-8xl font-black text-white/5">03</span>
                </div>

                <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded mb-6 inline-block">
                  Pillar 03
                </span>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  You can't manage what you can't measure.
                </h3>
                <p className="text-xl text-neutral-400 mb-12 leading-relaxed max-w-2xl">
                  How many clients churned this month? Which rep hasn't followed up on their pipeline? If you can't answer without digging through five systems, you're flying blind. <span className="text-white font-medium">We give you a single source of truth. Real-time. No digging.</span>
                </p>

                <div className="bg-neutral-800/50 p-6 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-lg w-fit text-emerald-400 shrink-0">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Operations Dashboard</h4>
                      <p className="text-neutral-400">One screen. Every metric. Updated live.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-32 text-center border-t border-white/5 pt-12">
          <p className="text-2xl md:text-3xl font-semibold text-foreground max-w-3xl mx-auto">
            We stay until your team prefers the new way. <br />
            <span className="text-muted">That's when we know it works.</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Solution;