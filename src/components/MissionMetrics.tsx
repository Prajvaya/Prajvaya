"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Metric {
  label: string;
  target: number;
  suffix: string;
}

const METRICS: Metric[] = [
  { label: "Traditional Practices Revived", target: 24, suffix: "+" },
  { label: "Communities Inspired", target: 4500, suffix: "+" },
  { label: "Projects in Development", target: 8, suffix: "" },
  { label: "Waste Prevented (kg)", target: 12500, suffix: "+" },
  { label: "Knowledge Chapters Preserved", target: 120, suffix: "+" },
  { label: "People Empowered", target: 1800, suffix: "+" },
];

const AnimatedCounter: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const [count, setCount] = useState(Math.floor(target * 0.8));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    // Dynamically scale increment steps so both large and small metrics loop at visually pleasing speeds
    const stepRange = Math.max(1, Math.floor(target * 0.006));

    const timer = setInterval(() => {
      setCount((prev) => {
        const increment = Math.floor(Math.random() * stepRange) + 1;
        const next = prev + increment;
        
        const minVal = Math.floor(target * 0.8);
        const maxVal = Math.floor(target * 1.3);

        if (next > maxVal) {
          return minVal;
        }
        return next;
      });
    }, 80); // Telemetry high-frequency update loop (80ms)

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-gold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const MissionMetrics: React.FC = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 bg-cream-dark/10 dark:bg-forest-light/5 border-y border-gold/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Impact Telemetry
          </span>
          <h2 className="font-cinzel text-3xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Our Mission Metrics
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-3 leading-relaxed">
            Rather than tracking venture capital or growth multipliers, we measure success by our 
            ecological, cognitive, and community footprints.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 md:gap-12">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="flex flex-col items-center text-center p-6 border-b border-gold/10 hover:border-gold/30 smooth-transition"
            >
              {/* Counter */}
              <AnimatedCounter target={metric.target} suffix={metric.suffix} />

              {/* Label */}
              <span className="font-outfit text-xs sm:text-sm text-charcoal/80 dark:text-cream/90 mt-4 font-medium tracking-wide">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
