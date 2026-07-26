"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardTilt } from "./CardTilt";
import { Sparkles, BookOpen, Leaf, School, Users } from "lucide-react";

interface FocusArea {
  title: string;
  icon: React.ReactNode;
  tagline: string;
  mission: string;
  badge?: string;
}

const FOCUS_AREAS: FocusArea[] = [
  {
    title: "AI Companion",
    icon: <Sparkles className="text-gold" size={22} />,
    tagline: "Vedic Intelligence",
    mission: "Designing an emotionally intelligent, private AI companion that acts as a daily guide, translating timeless principles into practical wellness routines.",
    badge: "Coming Soon",
  },
  {
    title: "Wisdom Library",
    icon: <BookOpen className="text-amber-500" size={22} />,
    tagline: "Ancestral Archive",
    mission: "Transforming ancient texts and holistic teachings into clear, modern, and practical concepts accessible to anyone in everyday life.",
  },
  {
    title: "Sustainable Living",
    icon: <Leaf className="text-emerald-500" size={22} />,
    tagline: "Regenerative Lifestyles",
    mission: "Adapting traditional ecological habits, home designs, and resource-conscious workflows to fit modern domestic lifestyles.",
  },
  {
    title: "Education & Learning",
    icon: <School className="text-indigo-500" size={22} />,
    tagline: "Personal Alignment",
    mission: "Creating interactive bootcamps, workshops, and courses that teach holistic systems thinking and emotional resilience.",
  },
  {
    title: "Community Platform",
    icon: <Users className="text-blue-500" size={22} />,
    tagline: "Mindful Coordination",
    mission: "Facilitating real-world, notification-free digital spaces to support deep local cooperation, sharing, and meaningful dialogue.",
  },
];

export const FocusAreas: React.FC = () => {
  return (
    <section
      id="core-initiatives"
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Initiatives
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Our Core Initiatives
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            We structure our operations around actionable initiatives. Each area is treated as a 
            collective mission to integrate traditional Indian socio-environmental concepts directly 
            into mindful hardware and software development.
          </p>
        </div>

        {/* Focus Grid - 3+2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {FOCUS_AREAS.slice(0, 3).map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="md:col-span-2"
            >
              <CardTilt className="h-full p-6 flex flex-col items-start min-h-[300px] border border-gold/10 hover:border-gold/25 shadow-sm hover:shadow-md transition-all duration-300 relative">
                {area.badge && (
                  <span className="absolute top-4 right-4 bg-gold/10 border border-gold/30 text-gold text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md animate-pulse">
                    {area.badge}
                  </span>
                )}
                
                {/* Icon wrapper */}
                <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gold/5 border border-gold/20 mb-5">
                  {area.icon}
                </div>

                {/* Tagline */}
                <span className="font-outfit text-[9px] font-bold text-gold uppercase tracking-widest mb-1.5">
                  {area.tagline}
                </span>

                {/* Title */}
                <h3 className="font-cinzel text-base font-bold text-charcoal dark:text-cream mb-3 leading-snug">
                  {area.title}
                </h3>

                {/* Mission description */}
                <p className="font-outfit text-xs text-charcoal/70 dark:text-cream/85 leading-relaxed font-light">
                  {area.mission}
                </p>
              </CardTilt>
            </motion.div>
          ))}

          {FOCUS_AREAS.slice(3, 5).map((area, idx) => (
            <motion.div
              key={idx + 3}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (idx + 3) * 0.08 }}
              className="md:col-span-3"
            >
              <CardTilt className="h-full p-6 flex flex-col items-start min-h-[280px] border border-gold/10 hover:border-gold/25 shadow-sm hover:shadow-md transition-all duration-300 relative">
                {area.badge && (
                  <span className="absolute top-4 right-4 bg-gold/10 border border-gold/30 text-gold text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md animate-pulse">
                    {area.badge}
                  </span>
                )}

                {/* Icon wrapper */}
                <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gold/5 border border-gold/20 mb-5">
                  {area.icon}
                </div>

                {/* Tagline */}
                <span className="font-outfit text-[9px] font-bold text-gold uppercase tracking-widest mb-1.5">
                  {area.tagline}
                </span>

                {/* Title */}
                <h3 className="font-cinzel text-base font-bold text-charcoal dark:text-cream mb-3 leading-snug">
                  {area.title}
                </h3>

                {/* Mission description */}
                <p className="font-outfit text-xs text-charcoal/70 dark:text-cream/85 leading-relaxed font-light">
                  {area.mission}
                </p>
              </CardTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
