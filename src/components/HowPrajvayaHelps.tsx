"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardTilt } from "./CardTilt";
import { Cpu, BookOpen, Brain, Sprout } from "lucide-react";

interface HelpMethod {
  title: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
}

const METHODS: HelpMethod[] = [
  {
    title: "Technology",
    icon: <Cpu className="text-indigo-600 dark:text-indigo-400" size={24} />,
    tagline: "Mindful Systems",
    description: "Developing local-first, zero-telemetry hardware and notification-free software that respects user attention agency.",
  },
  {
    title: "Education",
    icon: <BookOpen className="text-amber-600 dark:text-amber-400" size={24} />,
    tagline: "Ancestral Learning",
    description: "Reviving ancient shastras, traditional agricultural techniques, and holistic life practices through modern media.",
  },
  {
    title: "Artificial Intelligence",
    icon: <Brain className="text-gold" size={24} />,
    tagline: "Cognitive Alignment",
    description: "Training local-first, private AI systems to translate and adapt timeless scriptures into actionable daily routines.",
  },
  {
    title: "Sustainable Practices",
    icon: <Sprout className="text-emerald-600 dark:text-emerald-400" size={24} />,
    tagline: "Circular Living",
    description: "Integrating traditional Indian village check-dams, organic agriculture, and zero-waste packaging in local hubs.",
  },
];

export const HowPrajvayaHelps: React.FC = () => {
  return (
    <section
      id="helps"
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Our Approach
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            How Prajvaya Helps
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            We transform timeless ancestral knowledge into modern, accessible solutions. By converging 
            technology, education, AI, and sustainable practices, we build systems designed for human flourishing.
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {METHODS.map((method, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <CardTilt className="h-full p-6 flex flex-col items-start min-h-[280px] border border-gold/10 hover:border-gold/25 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gold/5 border border-gold/20 mb-5">
                  {method.icon}
                </div>
                <span className="font-outfit text-[9px] font-bold text-gold uppercase tracking-widest mb-1.5">
                  {method.tagline}
                </span>
                <h3 className="font-cinzel text-base font-bold text-charcoal dark:text-cream mb-3 leading-snug">
                  {method.title}
                </h3>
                <p className="font-outfit text-xs text-charcoal/70 dark:text-cream/85 leading-relaxed font-light">
                  {method.description}
                </p>
              </CardTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
