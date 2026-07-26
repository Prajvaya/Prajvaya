"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardTilt } from "./CardTilt";
import {
  Trees,
  BellOff,
  Lightbulb,
  RefreshCw,
  Scroll,
  Cpu,
  Users,
  Sprout,
} from "lucide-react";

interface FocusArea {
  title: string;
  icon: React.ReactNode;
  tagline: string;
  mission: string;
}

const FOCUS_AREAS: FocusArea[] = [
  {
    title: "Sustainable Living",
    icon: <Trees className="text-emerald-600 dark:text-emerald-400" size={22} />,
    tagline: "Eco-Architectural Harmony",
    mission: "Reviving local building materials, natural insulation styles, and structural models that breathe in harmony with geographic seasons.",
  },
  {
    title: "Digital Wellness",
    icon: <BellOff className="text-gold" size={22} />,
    tagline: "Cognitive Liberation",
    mission: "Architecting software platforms that discourage scrolling loops, reduce sensory fatigue, and restore user attention agency.",
  },
  {
    title: "Village Innovation",
    icon: <Lightbulb className="text-amber-500" size={22} />,
    tagline: "Decentralized Autonomy",
    mission: "Equipping rural communities with off-grid power solutions, local communication hubs, and digital tools tailored for self-sufficiency.",
  },
  {
    title: "Circular Economy",
    icon: <RefreshCw className="text-teal-600 dark:text-teal-400" size={22} />,
    tagline: "Zero-Waste Pipelines",
    mission: "Transitioning product lifecycles into regenerative systems where all parts are compostable or safely returnable to the manufacturer.",
  },
  {
    title: "Traditional Knowledge",
    icon: <Scroll className="text-rose-500" size={22} />,
    tagline: "Preserving Ancestral Assets",
    mission: "Indexing, validating, and archiving ancient medicinal, agricultural, and craft methodologies in decentralized, immutable logs.",
  },
  {
    title: "Mindful Technology",
    icon: <Cpu className="text-indigo-600 dark:text-indigo-400" size={22} />,
    tagline: "Technology with Intent",
    mission: "Engineering zero-telemetry hardware, local-first database designs, and cryptographic systems built to respect human dignity.",
  },
  {
    title: "Community Building",
    icon: <Users className="text-blue-500" size={22} />,
    tagline: "Restoring Human Interconnection",
    mission: "Creating physical meeting circles, tool-sharing registries, and neighborhood forums to combat rising modern isolation.",
  },
  {
    title: "Environmental Restoration",
    icon: <Sprout className="text-emerald-700 dark:text-emerald-300" size={22} />,
    tagline: "Soil and Water Reclamation",
    mission: "Deploying local drone seeding, traditional check-dam architecture, and indigenous afforestation blueprints in degraded topographies.",
  },
];

export const FocusAreas: React.FC = () => {
  return (
    <section
      id="focus"
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Initiatives
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Current Focus Areas
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            We structure our operations around actionable initiatives. Each area is treated as a 
            collective mission to restore structural balance to modern society.
          </p>
        </div>

        {/* Focus Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOCUS_AREAS.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <CardTilt className="h-full p-6 flex flex-col items-start min-h-[300px] border border-gold/10 hover:border-gold/25 shadow-sm hover:shadow-md transition-all duration-300">
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
