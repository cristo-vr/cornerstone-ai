import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxGridProps {
    opacity?: number;
    color?: string;
    className?: string;
}

const ParallaxGrid: React.FC<ParallaxGridProps> = ({
    opacity = 0.02,
    color = "255, 255, 255",
    className = ""
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress relative to the viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Map scroll progress to a vertical translation (parallax effect)
    // Moving the background slightly slower than the scroll speed
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        >
            <motion.div
                style={{ y }}
                className="absolute -top-[50%] -bottom-[50%] w-full"
            >
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(${color}, ${opacity}) 1px, transparent 1px),
              linear-gradient(90deg, rgba(${color}, ${opacity}) 1px, transparent 1px)
            `,
                        backgroundSize: '4rem 4rem',
                        backgroundPosition: 'center',
                    }}
                />
            </motion.div>

            {/* Optional fade out at edges for better integration */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
    );
};

export default ParallaxGrid;
