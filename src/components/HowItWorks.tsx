"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, PencilRuler, Construction, HeartHandshake } from "lucide-react";

interface TimelineNode {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bullets: string[];
}

const TIMELINE_NODES: TimelineNode[] = [
  {
    step: "01",
    title: "Research",
    description: "Deep archeological and literature study of forgotten traditional practices, indigenous technologies, and historical sustainability patterns.",
    icon: <BookOpen className="text-gold" size={20} />,
    bullets: ["Deconstruct ancient architectures", "Audit traditional material workflows", "Study community cohesion dynamics"],
  },
  {
    step: "02",
    title: "Design",
    description: "Adapt forgotten wisdom for modern applications, synthesizing ancient wisdom with clean, robust modern software and hardware paradigms.",
    icon: <PencilRuler className="text-gold" size={20} />,
    bullets: ["Zero-Trust encryption models", "Organic material science integration", "Stress-reducing UX/UI layouts"],
  },
  {
    step: "03",
    title: "Build",
    description: "Construct local, sovereign products, physical systems, and community groups, compile software codebases, and deploy hardware layers.",
    icon: <Construction className="text-gold" size={20} />,
    bullets: ["Decentralized messaging platforms", "Indigenous IoT drone nodes", "Mindful tech micro-collectives"],
  },
  {
    step: "04",
    title: "Impact",
    description: "Real-world manifestation of healthier people, cleaner physical environments, quieter digital minds, and remembered systems.",
    icon: <HeartHandshake className="text-gold" size={20} />,
    bullets: ["Reduced plastic dependency", "Decluttered digital spaces", "Resilient local economies"],
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how"
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Methodology
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            How Prajvaya Works
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            We follow a rigorous sequence to bridge ancestral longevity patterns with tomorrow&apos;s 
            high-performance architectures.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Background Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-gold/10 via-gold/45 to-gold/10 z-0" />

          {TIMELINE_NODES.map((node, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group"
            >
              {/* Animated Node Circle */}
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-cream-dark dark:bg-forest-light border border-gold/30 group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(194,157,102,0.25)] smooth-transition z-10 mb-6">
                {node.icon}
              </div>

              {/* Step Counter Indicator */}
              <span className="font-cinzel text-[10px] font-bold text-gold tracking-widest uppercase mb-1">
                Phase {node.step}
              </span>

              {/* Title */}
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-charcoal dark:text-cream mb-3 leading-snug">
                {node.title}
              </h3>

              {/* Description */}
              <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mb-6 leading-relaxed font-light">
                {node.description}
              </p>

              {/* Details Bullet List */}
              <ul className="space-y-2 mt-auto w-full border-t border-gold/10 pt-4 text-left">
                {node.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-center gap-2 font-outfit text-xs text-charcoal/80 dark:text-cream/90"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold/70" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
