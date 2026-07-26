"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardTilt } from "./CardTilt";
import { Leaf, AlertTriangle, ShieldAlert } from "lucide-react";

interface Pillar {
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  items: string[];
}

const PILLARS: Pillar[] = [
  {
    title: "Physical Pollution",
    icon: <Leaf className="text-emerald-600 dark:text-emerald-400" size={24} />,
    subtitle: "The degradation of our material habitats.",
    items: [
      "Plastic waste accumulation",
      "Unsustainable consumer products",
      "Accelerating resource depletion",
      "Systemic environmental damage",
    ],
  },
  {
    title: "Digital Pollution",
    icon: <ShieldAlert className="text-gold" size={24} />,
    subtitle: "The cluttering of our cognitive spaces.",
    items: [
      "Addictive infinite scrolling",
      "Constant notification overload",
      "Ethically unguided AI misuse",
      "Attention fragmentation & clutter",
    ],
  },
  {
    title: "Human Pollution",
    icon: <AlertTriangle className="text-rose-500" size={24} />,
    subtitle: "The disruption of our social and mental health.",
    items: [
      "Chronic stress & anxiety",
      "Unchecked hyper-consumerism",
      "Growing alienation & isolation",
      "Loss of traditions & nature bond",
    ],
  },
];

export const ThreePillars: React.FC = () => {
  return (
    <section
      id="pillars"
      className="relative py-24 px-6 md:px-12 bg-cream-dark/10 dark:bg-forest-light/5 border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Prajvaya Pillars
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            The Three Pollutions We Combat
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            Our mission extends beyond typical green sustainability. We aim to purge physical environments, 
            digital frameworks, and human consciousness of systemic clutter.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
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
