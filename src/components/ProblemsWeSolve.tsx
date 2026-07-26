"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardTilt } from "./CardTilt";
import { Smartphone, Users, Brain, Trees, Scroll } from "lucide-react";

interface Problem {
  title: string;
  icon: React.ReactNode;
  description: string;
  tagline: string;
}

const PROBLEMS: Problem[] = [
  {
    title: "Digital Overload",
    icon: <Smartphone className="text-rose-500" size={24} />,
    tagline: "Cognitive Clutter",
    description: "Constant notification streams and attention-mining applications fragment our focus, disrupting mental peace and clarity.",
  },
  {
    title: "Loneliness",
    icon: <Users className="text-amber-500" size={24} />,
    tagline: "Social Isolation",
    description: "Despite being hyper-connected online, modern individuals suffer from unprecedented levels of genuine isolation and social alienation.",
  },
  {
    title: "Mental Burnout",
    icon: <Brain className="text-indigo-500" size={24} />,
    tagline: "Emotional Exhaustion",
    description: "The compounding stress of modern hyper-consumerism and achievement culture drains creative potential and emotional energy.",
  },
  {
    title: "Environmental Degradation",
    icon: <Trees className="text-emerald-500" size={24} />,
    tagline: "Ecological Decay",
    description: "Systemic micro-plastic accumulation and chemical waste depletion damage natural habitats and break organic cycles.",
  },
  {
    title: "Loss of Traditional Wisdom",
    icon: <Scroll className="text-gold" size={24} />,
    tagline: "Cultural Amnesia",
    description: "Centuries of localized ecological knowledge, community-centric values, and circular crafts are rapidly vanishing.",
  },
];

export const ProblemsWeSolve: React.FC = () => {
  return (
    <section
      id="problems"
      className="relative py-24 px-6 md:px-12 bg-cream-dark/10 dark:bg-forest-light/5 border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            The Challenges
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            The Problems We Solve
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            Modern civilization is facing deep systemic crises. We aim to address these issues by combining
            time-tested ancestral principles with mindful modern technologies.
          </p>
        </div>

        {/* Problems Grid - 5 items layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {PROBLEMS.slice(0, 3).map((problem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="md:col-span-2"
            >
              <CardTilt className="h-full p-8 flex flex-col items-start min-h-[300px]">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/25 mb-6">
                  {problem.icon}
                </div>
                <span className="font-outfit text-[9px] font-bold text-gold uppercase tracking-widest mb-1.5">
                  {problem.tagline}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-charcoal dark:text-cream mb-4 leading-snug">
                  {problem.title}
                </h3>
                <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 leading-relaxed font-light">
                  {problem.description}
                </p>
              </CardTilt>
            </motion.div>
          ))}

          {PROBLEMS.slice(3, 5).map((problem, idx) => (
            <motion.div
              key={idx + 3}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx + 3) * 0.15 }}
              className="md:col-span-3"
            >
              <CardTilt className="h-full p-8 flex flex-col items-start min-h-[280px]">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/25 mb-6">
                  {problem.icon}
                </div>
                <span className="font-outfit text-[9px] font-bold text-gold uppercase tracking-widest mb-1.5">
                  {problem.tagline}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-charcoal dark:text-cream mb-4 leading-snug">
                  {problem.title}
                </h3>
                <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 leading-relaxed font-light">
                  {problem.description}
                </p>
              </CardTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
