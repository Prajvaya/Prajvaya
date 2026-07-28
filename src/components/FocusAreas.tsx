"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CardTilt } from "./CardTilt";
import { Sparkles, BookOpen, Users, Leaf, School, ShieldCheck, ArrowRight } from "lucide-react";
import { PrajvayaAIModal } from "./PrajvayaAIModal";
import { WisdomLibraryModal } from "./wisdom-library/WisdomLibraryModal";

interface FocusArea {
  id: string;
  title: string;
  icon: React.ReactNode;
  tagline: string;
  mission: string;
  badge: string;
  badgeStyle: string;
  stats: string[];
  actionLabel?: string;
}

const FOCUS_AREAS: FocusArea[] = [
  {
    id: "ai_companion",
    title: "Prajvaya AI Platform",
    icon: <Sparkles className="text-gold" size={24} />,
    tagline: "Vedic & Emotional Intelligence",
    mission: "Deploying 6 specialized AI companions (Jeevan, Prakriti, Parampara, Arogya, Vidya, Srijan) coordinated by a Master Intelligence engine. Built with privacy-first local memory, 6-stage deep reasoning, and interactive action checklists.",
    badge: "LIVE NOW • 6 COMPANIONS",
    badgeStyle: "bg-gold/10 border-gold/40 text-gold animate-pulse",
    stats: ["Master Intelligence", "6 Stage Reasoning", "Local Memory Control"],
    actionLabel: "Launch Prajvaya AI"
  },
  {
    id: "wisdom_library",
    title: "Interactive Wisdom Library",
    icon: <BookOpen className="text-amber-400" size={24} />,
    tagline: "18 Public Domain Classics",
    mission: "A calm, distraction-free digital library featuring Indian & global wisdom classics across 6 categories. Integrated with sentence-synced Web Speech audiobooks, Web Audio ambient soundscapes, concept network graphs, and personal journal tools.",
    badge: "LIVE NOW • 18 BOOKS",
    badgeStyle: "bg-amber-500/10 border-amber-400/40 text-amber-300 animate-pulse",
    stats: ["18 Master Texts", "Web Speech Audio", "Concept Graphs"],
    actionLabel: "Explore Wisdom Library"
  },
  {
    id: "privacy_community",
    title: "Swadeshi Community Platform",
    icon: <Users className="text-purple-400" size={24} />,
    tagline: "100% Local & Sovereign Data",
    mission: "Facilitating notification-free, privacy-sovereign digital spaces where user data remains strictly stored on device in local memory without third-party tracking, surveillance, or cloud lock-in.",
    badge: "LIVE NOW • LOCAL PRIVACY",
    badgeStyle: "bg-purple-500/10 border-purple-400/40 text-purple-300 animate-pulse",
    stats: ["Zero Third-Party APIs", "Client-Side Memory", "Digital Sovereignty"],
    actionLabel: "View Community Blueprint"
  },
  {
    id: "sustainable_living",
    title: "Prakriti Sustainable Living",
    icon: <Leaf className="text-emerald-400" size={24} />,
    tagline: "Regenerative Daily Lifestyles",
    mission: "Translating Vedic ecological principles and resource conservation practices into modern domestic habits, eco-conscious habit trackers, and zero-waste daily routines.",
    badge: "ACTIVE INITIATIVE",
    badgeStyle: "bg-emerald-500/10 border-emerald-400/30 text-emerald-300",
    stats: ["Zero Waste Habits", "Eco-Systemic Living", "Resource Conservation"]
  },
  {
    id: "holistic_education",
    title: "Vidya Holistic Learning",
    icon: <School className="text-sky-400" size={24} />,
    tagline: "Mindful Systems & Philosophy",
    mission: "Creating interactive self-mastery modules, philosophical reasoning exercises, and emotional resilience workshops that integrate ancient systems thinking into modern technical education.",
    badge: "EXPANDING MODULES",
    badgeStyle: "bg-sky-500/10 border-sky-400/30 text-sky-300",
    stats: ["Systems Thinking", "Emotional Resilience", "Philosophical Logic"]
  }
];

export const FocusAreas: React.FC = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);

  const handleActionClick = (id: string) => {
    if (id === "ai_companion") setIsAiModalOpen(true);
    if (id === "wisdom_library") setIsLibraryModalOpen(true);
    if (id === "privacy_community") {
      window.open("https://chat.whatsapp.com/HS6dVyedqtAKvGlkVjQSdJ", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="core-initiatives"
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase block">
            Core Initiatives • Live Updates
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold tracking-wide text-charcoal dark:text-cream leading-tight">
            Prajvaya Core Initiatives
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 leading-relaxed font-light">
            Our operational initiatives bring together AI innovation, timeless Indian philosophy, and data sovereignty. Explore the live platforms and active projects below.
          </p>
        </div>

        {/* Top Featured Row: 3 Primary Live Pillars (AI Companion, Wisdom Library, Community Platform) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {FOCUS_AREAS.slice(0, 3).map((area, idx) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <CardTilt className="h-full p-6 sm:p-8 flex flex-col justify-between border border-gold/30 bg-charcoal/40 dark:bg-forest/60 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-gold/10 transition-all duration-300 relative group/card">
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-gold/10 border border-gold/30">
                      {area.icon}
                    </div>
                    <span className={`text-[9px] font-bold font-outfit uppercase tracking-widest px-3 py-1 rounded-full border ${area.badgeStyle}`}>
                      {area.badge}
                    </span>
                  </div>

                  {/* Subtitle / Tagline */}
                  <span className="font-outfit text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-1 block">
                    {area.tagline}
                  </span>

                  {/* Title */}
                  <h3 className="font-cinzel text-lg font-bold text-charcoal dark:text-cream mb-3 leading-snug">
                    {area.title}
                  </h3>

                  {/* Mission Description */}
                  <p className="font-outfit text-xs text-charcoal/80 dark:text-cream/90 leading-relaxed font-light mb-6">
                    {area.mission}
                  </p>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {area.stats.map((st, sIdx) => (
                      <span key={sIdx} className="font-outfit text-[9px] px-2.5 py-1 rounded-lg bg-black/30 border border-gold/15 text-gold/90 font-medium">
                        ✓ {st}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Launch Action Button */}
                {area.actionLabel && (
                  <button
                    onClick={() => handleActionClick(area.id)}
                    className="w-full py-3 px-4 rounded-xl bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg smooth-transition cursor-pointer group-hover/card:scale-[1.02]"
                  >
                    <span>{area.actionLabel}</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </CardTilt>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row: 2 Supporting Initiatives (Sustainable Living & Holistic Education) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FOCUS_AREAS.slice(3, 5).map((area, idx) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (idx + 3) * 0.1 }}
            >
              <CardTilt className="h-full p-6 flex flex-col justify-between border border-gold/15 bg-charcoal/30 dark:bg-forest/40 backdrop-blur-md rounded-2xl shadow-sm hover:border-gold/30 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-gold/5 border border-gold/20">
                      {area.icon}
                    </div>
                    <span className={`text-[9px] font-bold font-outfit uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${area.badgeStyle}`}>
                      {area.badge}
                    </span>
                  </div>

                  <span className="font-outfit text-[9px] font-bold text-gold uppercase tracking-widest mb-1 block">
                    {area.tagline}
                  </span>

                  <h3 className="font-cinzel text-base font-bold text-charcoal dark:text-cream mb-2 leading-snug">
                    {area.title}
                  </h3>

                  <p className="font-outfit text-xs text-charcoal/70 dark:text-cream/80 leading-relaxed font-light mb-4">
                    {area.mission}
                  </p>
                </div>

                <div className="pt-3 border-t border-gold/10 flex flex-wrap gap-1.5">
                  {area.stats.map((st, sIdx) => (
                    <span key={sIdx} className="font-outfit text-[9px] px-2 py-0.5 rounded bg-black/20 text-cream/70">
                      • {st}
                    </span>
                  ))}
                </div>
              </CardTilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Modals */}
      <PrajvayaAIModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
      <WisdomLibraryModal isOpen={isLibraryModalOpen} onClose={() => setIsLibraryModalOpen(false)} />
    </section>
  );
};
