import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Waypoints, Bot, Factory, Rocket, UserCheck, X, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

// Define the structure for our case studies
interface CaseStudy {
  id: string;
  title: string;
  icon: React.ElementType;
  pain: string;
  fix: string;
  win: string;
}

const cases: CaseStudy[] = [
  {
    id: "1",
    title: "The Automated Analyst",
    icon: BrainCircuit,
    pain: "This team was drowning in raw data. Their highest-paid brokers were spending hours digging through messy, confusing spreadsheets just to get a basic pulse on performance. It was impossible for leadership to make decisions because the data was always a \"work in progress.\"",
    fix: "We built a custom engine that pulls all that data automatically. No humans involved. It does the math and turns that raw mess into a clean, consolidated report.",
    win: "We gave executives clarity. Instead of staring at rows of numbers, they get a clear report on demand that lets them make strategic decisions instantly. The \"grunt work\" is gone."
  },
  {
    id: "2",
    title: "The Zero-Loss Router",
    icon: Waypoints,
    pain: "They were losing money because leads were getting stuck in a manual bottleneck. Every time a lead came in, someone literally had to copy the data, type up a new email, and hit send to the right branch. It was slow, boring, and prone to typos.",
    fix: "We built a logic system that sits between the ad and the inbox. The second a lead comes in, our system looks at where they are and instantly routes them to the correct branch's pipeline.",
    win: "Zero leakage. We removed the \"traffic cop\" role entirely. Now, the sales team gets the lead while the prospect is still looking at the screen. Speed to lead went from \"hours\" to \"seconds.\""
  },
  {
    id: "3",
    title: "The 24/7 Qualifier",
    icon: Bot,
    pain: "Their sales team was burning out. They were getting hundreds of leads, but 80% of them weren't qualified. The closers were wasting their entire day asking basic questions like \"Do you have a job?\" instead of closing deals.",
    fix: "We deployed a WhatsApp bot trained on their specific sales scripts. It chats with every new lead, answers their questions, and collects their financial info before a human ever speaks to them.",
    win: "We filtered out the noise. Now, the sales team only picks up the phone when a lead is qualified and ready to buy. Same team size, double the closing rate."
  },
  {
    id: "4",
    title: "The Content Machine",
    icon: Factory,
    pain: "Their marketing team was stuck on a hamster wheel. They knew they needed SEO blogs and social posts to grow, but creating it all manually was eating up their entire week. They had no time to actually be creative.",
    fix: "We built a workflow that does the heavy lifting. It drafts the blog posts for them to review, then automatically turns those blogs into Instagram captions and visuals, and queues them for posting.",
    win: "A perfect blend of human and machine. The team provides the strategy and the final \"thumbs up,\" and our system handles the production. They 5x'd their output without hiring a single extra writer."
  },
  {
    id: "5",
    title: "The 3-Day SaaS Build",
    icon: Rocket,
    pain: "The client had a massive idea to disrupt the security industry, but they were staring down the barrel of a 6-month development cycle. They needed to prove the concept was viable before sinking a fortune into it.",
    fix: "We didn't just consult; we built. In a 3-day live workshop, we coded the MVP from scratch. That MVP proved the value instantly, justifying the full push to production.",
    win: "A double capacity unlock. We saved the client months of development time, and the platform we built uses AI to unlock capacity for their users. Speed to market was instant, and the tech is exponential."
  },
  {
    id: "6",
    title: "Recruitment on Autopilot",
    icon: UserCheck,
    pain: "One of their best recruiters was barely recruiting. She was spending 80% of her day acting like an admin assistant—scheduling interviews, chasing candidates for documents, and updating the CRM.",
    fix: "We automated the entire boring part of her funnel. From the moment a candidate applies, our system handles the vetting, the emails, and the calendar booking.",
    win: "We automated 80% of the job. Every single lead is handled instantly, 24/7, for less than the cost of a cup of coffee a day. She got her job back, and the agency got a machine that never sleeps."
  }
];

const Work: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="results" className="py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Proven Results</h2>
          <div className="w-24 h-1 bg-primary mb-6"></div>
          <p className="text-muted text-lg max-w-2xl">
            Real operations. Engineered solutions. Measurable wins.
            Click on any card to see the breakdown of how we solved it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedCase(project)}
              className="group cursor-pointer bg-surface border border-neutral-800 p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)] flex flex-col h-full"
            >
              <div className="mb-6 w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center border border-neutral-800 group-hover:border-primary/50 transition-colors">
                <project.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-muted text-sm line-clamp-3 mb-6 flex-grow">
                {project.win}
              </p>

              <div className="flex items-center text-primary text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                View Case Study <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedCase && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCase(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-surface border border-neutral-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm"
              >
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 text-muted hover:text-primary transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                      <selectedCase.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      {selectedCase.title}
                    </h3>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-primary font-bold uppercase tracking-wider text-sm mb-2 border-l-2 border-primary pl-3">The Pain</h4>
                      <p className="text-muted leading-relaxed pl-3.5">
                        {selectedCase.pain}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-primary font-bold uppercase tracking-wider text-sm mb-2 border-l-2 border-primary pl-3">The Fix</h4>
                      <p className="text-muted leading-relaxed pl-3.5">
                        {selectedCase.fix}
                      </p>
                    </div>

                    <div className="bg-neutral-900/50 p-6 border border-neutral-800 rounded-sm">
                      <h4 className="text-primary font-bold uppercase tracking-wider text-sm mb-3">The Win</h4>
                      <p className="text-foreground text-lg leading-relaxed">
                        {selectedCase.win}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-neutral-800 flex justify-end">
                    <Button onClick={() => { setSelectedCase(null); onOpenContact(); }} icon>Book Discovery</Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Work;