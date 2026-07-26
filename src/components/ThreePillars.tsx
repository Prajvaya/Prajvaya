"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardTilt } from "./CardTilt";
import { BookOpen, Heart, Cpu, Leaf, Users } from "lucide-react";

interface Pillar {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  items: string[];
}

const PILLARS: Pillar[] = [
  {
    title: "Timeless Wisdom",
    icon: <BookOpen className="text-gold" size={24} />,
    subtitle: "Bringing ancient knowledge into modern life.",
    items: [
      "Scriptural analysis & translation",
      "Daily routines & dinacharya",
      "Grounded, timeless worldview",
      "Ancestral life principles",
    ],
  },
  {
    title: "Human Well-being",
    icon: <Heart className="text-rose-500" size={24} />,
    subtitle: "Supporting emotional, mental, and physical growth.",
    items: [
      "Mindfulness & attention tools",
      "Stress & anxiety reduction",
      "Emotional resilience logs",
      "Physical health harmony",
    ],
  },
  {
    title: "Purposeful Technology",
    icon: <Cpu className="text-indigo-600 dark:text-indigo-400" size={24} />,
    subtitle: "Building AI and digital tools that empower instead of distract.",
    items: [
      "Notification-free design layouts",
      "Private, local-first AI",
      "Attention agency boundaries",
      "Intention-first user interfaces",
    ],
  },
  {
    title: "Sustainable Living",
    icon: <Leaf className="text-emerald-600 dark:text-emerald-400" size={24} />,
    subtitle: "Encouraging balanced lifestyles inspired by nature.",
    items: [
      "Zero-waste circular habits",
      "Local resource optimization",
      "Eco-harmonious workflows",
      "Regenerative space planning",
    ],
  },
  {
    title: "Community & Learning",
    icon: <Users className="text-blue-500" size={24} />,
    subtitle: "Creating spaces where people grow together.",
    items: [
      "Knowledge sharing circles",
      "Real-world local workshops",
      "Collaborative skill building",
      "Cooperative network nodes",
    ],
  },
];

export const ThreePillars: React.FC = () => {
  return (
    <section
      id="pillar"
      className="relative py-24 px-6 md:px-12 bg-cream-dark/10 dark:bg-forest-light/5 border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Prajvaya Pillars
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Our Core Pillars
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            We structure our work around five core pillars that weave timeless Indian wisdom with modern tech to improve human well-being.
          </p>
        </div>

        {/* Pillars Grid - 5 items layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {PILLARS.slice(0, 3).map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="md:col-span-2"
            >
              <CardTilt className="h-full p-8 flex flex-col items-start min-h-[380px]">
                {/* Icon wrapper */}
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/25 mb-6">
                  {pillar.icon}
                </div>

                {/* Card Title */}
                <h3 className="font-cinzel text-xl font-bold text-charcoal dark:text-cream mb-2 leading-snug">
                  {pillar.title}
                </h3>

                {/* Subtitle */}
                <p className="font-outfit text-xs text-charcoal/60 dark:text-cream/60 mb-6 leading-normal font-light">
                  {pillar.subtitle}
                </p>

                {/* List items */}
                <ul className="space-y-3.5 mt-auto w-full">
                  {pillar.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 font-outfit text-sm text-charcoal/80 dark:text-cream/90"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardTilt>
            </motion.div>
          ))}

          {PILLARS.slice(3, 5).map((pillar, idx) => (
            <motion.div
              key={idx + 3}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx + 3) * 0.15 }}
              className="md:col-span-3"
            >
              <CardTilt className="h-full p-8 flex flex-col items-start min-h-[380px]">
                {/* Icon wrapper */}
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/25 mb-6">
                  {pillar.icon}
                </div>

                {/* Card Title */}
                <h3 className="font-cinzel text-xl font-bold text-charcoal dark:text-cream mb-2 leading-snug">
                  {pillar.title}
                </h3>

                {/* Subtitle */}
                <p className="font-outfit text-xs text-charcoal/60 dark:text-cream/60 mb-6 leading-normal font-light">
                  {pillar.subtitle}
                </p>

                {/* List items */}
                <ul className="space-y-3.5 mt-auto w-full">
                  {pillar.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 font-outfit text-sm text-charcoal/80 dark:text-cream/90"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
