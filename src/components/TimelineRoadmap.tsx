"use client";

import React from "react";
import { motion } from "framer-motion";

interface Milestone {
  step: string;
  title: string;
  description: string;
  status: "completed" | "active" | "planned";
}

const MILESTONES: Milestone[] = [
  {
    step: "01",
    title: "Research Phase",
    description: "Deep indexing of ancient manuscripts, local organic agricultural manuals, and traditional materials.",
    status: "completed",
  },
  {
    step: "02",
    title: "Traditional Knowledge Archive",
    description: "Publishing a decentralized, open-source library cataloging verified ancestral practices.",
    status: "completed",
  },
  {
    step: "03",
    title: "Community Collaboration",
    description: "Establishing localized knowledge circles, craft guilds, and academic partnerships across India.",
    status: "active",
  },
  {
    step: "04",
    title: "Prototype Development",
    description: "Developing physical compostable goods and zero-telemetry hardware/software applications.",
    status: "active",
  },
  {
    step: "05",
    title: "Pilot Programs",
    description: "Testing agricultural restoration patterns, village network nodes, and mindful tech circles in real locations.",
    status: "planned",
  },
  {
    step: "06",
    title: "Products & Systems Scale",
    description: "Distributing verified, sustainable consumer goods and decentralized network infrastructure.",
    status: "planned",
  },
  {
    step: "07",
    title: "Global Movement",
    description: "Expanding systems globally, setting a new benchmark for integrated physical, digital, and mental ecology.",
    status: "planned",
  },
];

export const TimelineRoadmap: React.FC = () => {
  return (
    <section
      id="roadmap"
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Roadmap
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Timeline of Evolution
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            From initial research coordinates to a scalable, global framework for conscious living.
          </p>
        </div>

        {/* Alternate Roadmap timeline */}
        <div className="relative border-l border-gold/15 max-w-3xl mx-auto pl-8 space-y-12">
          {MILESTONES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.08 }}
              className="relative flex flex-col items-start gap-2"
            >
              {/* Timeline Connector node */}
              <div
                className={`absolute -left-[41px] top-1.5 h-6 w-6 rounded-full border bg-cream dark:bg-earth flex items-center justify-center smooth-transition ${
                  item.status === "completed"
                    ? "border-emerald-600/40 text-emerald-600"
                    : item.status === "active"
                    ? "border-gold/50 text-gold shadow-[0_0_10px_rgba(194,157,102,0.2)]"
                    : "border-gold/15 text-gold/30"
                }`}
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    item.status === "completed"
                      ? "bg-emerald-600"
                      : item.status === "active"
                      ? "bg-gold animate-pulse"
                      : "bg-gold/10"
                  }`}
                />
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-3">
                <span className="font-cinzel text-[10px] font-bold text-gold tracking-widest uppercase">
                  Phase {item.step}
                </span>
                <span
                  className={`font-outfit text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full border tracking-widest ${
                    item.status === "completed"
                      ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                      : item.status === "active"
                      ? "bg-gold/5 border-gold/30 text-gold"
                      : "bg-transparent border-gold/10 text-charcoal/40 dark:text-cream/40"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-cinzel text-lg font-bold text-charcoal dark:text-cream leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 leading-relaxed font-light max-w-xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
