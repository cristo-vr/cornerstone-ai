import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';

interface AboutProps {
  onOpenContact: () => void;
}

const About: React.FC<AboutProps> = ({ onOpenContact }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  // null = scroll-driven, 'real' = forced real photo, 'line' = forced line drawing
  const [clickState, setClickState] = useState<null | 'real' | 'line'>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Starts later (0.5) so the line drawing is visible when the section enters,
  // completes at full scroll (1.0)
  const scrollClipPercent = useTransform(scrollYProgress, [0.5, 1], [0, 200]);

  // Always derive the clip-path string from the scroll motion value (no conditional hooks)
  const scrollClipPath = useTransform(
    scrollClipPercent,
    (p) => `polygon(0% 0%, ${p}% 0%, 0% ${p}%)`
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 bg-background border-t border-foreground/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Left Column: Image with Scroll-Reveal */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div
              ref={imageRef}
              className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer"
              onClick={() => setClickState((prev) =>
                prev === null ? 'real' : prev === 'real' ? 'line' : 'real'
              )}
            >
              {/* Base layer: Line drawing */}
              <img
                src="/images/cristo-line-drawing.png"
                alt="Cristo Van Rensburg — line drawing"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay: Real photo — scroll-driven diagonal wipe, or animated on click */}
              <motion.div
                className="absolute inset-0"
                style={clickState === null ? { clipPath: scrollClipPath } : undefined}
                animate={
                  clickState === 'real'
                    ? { clipPath: 'polygon(0% 0%, 200% 0%, 0% 200%)' }
                    : clickState === 'line'
                      ? { clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%)' }
                      : undefined
                }
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <img
                  src="/images/cristo-real.png"
                  alt="Cristo Van Rensburg"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="text-primary font-mono text-sm tracking-widest uppercase">
                Meet the Founder
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tighter leading-[1.1]"
            >
              I started my first business at 16, selling firewood to neighbors.
            </motion.h2>

            {/* Journey paragraph */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-lg text-muted leading-relaxed"
            >
              <p>
                A year later I was making cold calls from my high school classroom. Since then I've built systems across hospitality, construction, real estate, insurance, fintech, and franchise operations. Every time, the same problem showed up: the founder was the operating system of their own business. Everything ran on them.
              </p>
              <p>
                I've built operating systems for the founder of a podcast, the founder of a financing platform, the founding team of an accounting practice, and the founder of a sport academy. Different industries, but the bottleneck was always the same - the founder. And the fix was always the same - a custom platform that puts everything in one place.
              </p>
              <p>
                That's what Cornerstone AI exists to build.
              </p>
            </motion.div>

            {/* Proof callout card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-primary/10 border border-primary/30 p-6 rounded-xl"
            >
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                R3.6M in annual returns.{' '}
                <span className="text-primary">From a R168K implementation.</span>
              </p>
              <p className="text-muted text-sm">
                Audited a 70+ branch franchise operation. Every recommendation backed by hard data — hours saved, revenue recovered, payback period calculated to the day.
              </p>
            </motion.div>

            {/* Faith/philosophy paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted leading-relaxed"
            >
              The name Cornerstone comes from my faith. Christ is the cornerstone of the church, and that's the foundation this company is built on. People come first, always. I don't build tech that looks impressive on a slide deck - I build operating systems that make a real difference to the actual humans using them every day.
            </motion.p>

            {/* Guarantee + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 border-t border-foreground/10"
            >
              <p className="text-foreground font-medium text-lg">
                If we can't prove the impact, you don't pay.
              </p>
              <div onClick={onOpenContact} className="shrink-0">
                <Button variant="primary" icon>Let's Talk</Button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
