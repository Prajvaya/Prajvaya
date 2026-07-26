"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Heart, Users, Hammer, AlertTriangle, Cpu, Brain, Landmark, Compass, ShieldAlert } from "lucide-react";

interface StoryStep {
  title: string;
  category: "past" | "present" | "future";
  description: string;
  icon: React.ReactNode;
}

const STORY_STEPS: StoryStep[] = [
  {
    title: "Traditional Life & Nature",
    category: "past",
    description: "Indian heritage outlines a lifestyle in sync with natural cycles. We adapt these ecological frameworks for modern urban living.",
    icon: <Leaf className="text-emerald-700 dark:text-emerald-400" size={20} />,
  },
  {
    title: "Community & Craftsmanship",
    category: "past",
    description: "Timeless local coordination patterns are rebuilt to foster resilient neighborhood networks and support circular local trade.",
    icon: <Hammer className="text-amber-700 dark:text-amber-400" size={20} />,
  },
  {
    title: "Physical Pollution",
    category: "present",
    description: "Pioneering green architectures and circular product design to reclaim pure water, clean soil, and sustainable spaces.",
    icon: <AlertTriangle className="text-rose-600 dark:text-rose-400" size={20} />,
  },
  {
    title: "Digital Addiction",
    category: "present",
    description: "Designing mindful user interfaces and notification-free platforms that restore focus and mental agency.",
    icon: <Cpu className="text-red-500" size={20} />,
  },
  {
    title: "Modern Disconnection",
    category: "present",
    description: "Replacing screen-lit isolation with authentic, real-world community meetings and shared growth spaces.",
    icon: <Brain className="text-violet-600 dark:text-violet-400" size={20} />,
  },
  {
    title: "Prajvaya & Forgotten Wisdom",
    category: "future",
    description: "Transforming ancient shastras into functional, modern digital utilities and physical tools for everyday life.",
    icon: <Compass className="text-gold" size={20} />,
  },
  {
    title: "A Harmonious Future",
    category: "future",
    description: "A worldwide ecosystem where technology and wisdom empower humanity to lead balanced, purposeful, and nature-connected lives.",
    icon: <Heart className="text-teal-600 dark:text-teal-400" size={20} />,
  },
];

export const Storytelling: React.FC = () => {
  return (
    <section
      id="vision"
      className="relative py-24 px-6 md:px-12 bg-cream-dark/15 dark:bg-forest-light/5 border-y border-gold/10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
        {/* Sticky Left Editorial Side */}
        <div className="lg:col-span-2 flex flex-col justify-start lg:sticky lg:top-32 lg:h-[calc(100vh-200px)]">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3">
            Ancestral Roots
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Reclaiming What Already Worked
          </h2>
          <p className="font-outfit text-base text-charcoal/70 dark:text-cream/80 mt-6 leading-relaxed">
            Prajvaya is building a future where timeless Indian wisdom and modern technology work together to solve real-world challenges. Rather than simply preserving traditions, we focus on engineering practical solutions that cultivate healthier minds, foster stronger communities, enable sustainable living, and restore meaningful human connections in a hyper-digital era.
          </p>

          {/* Color Indicators */}
          <div className="hidden lg:flex flex-col gap-3 mt-12 border-l border-gold/20 pl-4 font-outfit text-[11px] font-medium uppercase tracking-widest text-charcoal/60 dark:text-cream/60">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              <span>Timeless Traditions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span>Modern Disruption</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span>The Reclamation</span>
            </div>
          </div>
        </div>

        {/* Right Scrollable Timeline Side */}
        <div className="lg:col-span-3 flex flex-col gap-12 relative pl-8 border-l border-gold/15">
          {STORY_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.05 }}
              className="relative flex flex-col gap-3 group"
            >
              {/* Timeline Connector node */}
              <div
                className={`absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-cream dark:bg-earth smooth-transition ${
                  step.category === "past"
                    ? "border-emerald-600/40 text-emerald-600"
                    : step.category === "present"
                    ? "border-rose-500/40 text-rose-500"
                    : "border-gold/40 text-gold"
                }`}
              >
                {step.icon}
              </div>

              {/* Step Category Tag */}
              <span
                className={`font-outfit text-[9px] font-bold uppercase tracking-widest ${
                  step.category === "past"
                    ? "text-emerald-700 dark:text-emerald-400"
                    : step.category === "present"
                    ? "text-rose-500"
                    : "text-gold"
                }`}
              >
                {step.category === "past"
                  ? "Traditional Harmony"
                  : step.category === "present"
                  ? "Modern Disconnection"
                  : "Sovereign Future"}
              </span>

              {/* Step Card Title */}
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-charcoal dark:text-cream leading-snug">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 leading-relaxed max-w-xl">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
