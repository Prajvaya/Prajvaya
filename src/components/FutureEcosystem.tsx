"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardTilt } from "./CardTilt";
import { Sparkles, BookOpen, Heart, Users, School, X } from "lucide-react";

interface EcosystemItem {
  title: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  badge?: string;
}

const ECOSYSTEM: EcosystemItem[] = [
  {
    title: "AI Companion",
    icon: <Sparkles className="text-gold" size={24} />,
    tagline: "Vedic Intelligence",
    description: "A private, offline-first digital companion that helps individuals align their daily routines with ancient wisdom and mindfulness.",
    badge: "Coming Soon",
  },
  {
    title: "Wisdom Library",
    icon: <BookOpen className="text-amber-500" size={24} />,
    tagline: "Ancestral Archive",
    description: "A decentralized, open-source repository cataloging verified traditional practices, ancient manuscripts, and circular technologies.",
  },
  {
    title: "Sustainable Living",
    icon: <Heart className="text-emerald-500" size={24} />,
    tagline: "Regenerative Design",
    description: "Eco-architectural blueprints, check-dam coordinates, and organic agriculture practices made accessible for modern communities.",
  },
  {
    title: "Community Platform",
    icon: <Users className="text-blue-500" size={24} />,
    tagline: "Local Convergence",
    description: "A notification-free local connection network designed to rebuild neighborhood tool-sharing and real-world collaboration circles.",
  },
  {
    title: "Learning Experiences",
    icon: <School className="text-indigo-500" size={24} />,
    tagline: "Holistic Academics",
    description: "Interactive bootcamps and systems engineering courses integrating traditional philosophy with modern technical stacks.",
  },
];

export const FutureEcosystem: React.FC = () => {
  const [showGitaPdf, setShowGitaPdf] = useState(false);

  useEffect(() => {
    if (showGitaPdf) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showGitaPdf]);

  return (
    <section
      id="ecosystem"
      className="relative py-24 px-6 md:px-12 bg-cream-dark/15 dark:bg-forest-light/5 border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            The Horizon
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Our Future Ecosystem
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            We are designing a holistic ecosystem of tools, networks, and environments to integrate 
            ancient wisdom directly into modern daily life.
          </p>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {ECOSYSTEM.slice(0, 3).map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="md:col-span-2"
            >
              <CardTilt className="h-full p-8 flex flex-col items-start min-h-[300px] relative border border-gold/10 hover:border-gold/25 shadow-sm">
                {item.badge && (
                  <span className="absolute top-4 right-4 bg-gold/10 border border-gold/30 text-gold text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md animate-pulse">
                    {item.badge}
                  </span>
                )}
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/25 mb-6">
                  {item.icon}
                </div>
                <span className="font-outfit text-[9px] font-bold text-gold uppercase tracking-widest mb-1.5">
                  {item.tagline}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-charcoal dark:text-cream mb-4 leading-snug">
                  {item.title}
                </h3>
                
                {item.title === "Wisdom Library" ? (
                  <div className="w-full flex flex-col gap-4">
                    <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 leading-relaxed font-light">
                      {item.description}
                    </p>
                    
                    {/* Visual Gita Cover */}
                    <div 
                      onClick={() => setShowGitaPdf(true)} 
                      className="w-full relative rounded-xl overflow-hidden border border-gold/20 cursor-pointer group/gita aspect-[4/5] shadow-md"
                    >
                      <img 
                        src="/assets/gita_cover.png" 
                        alt="Bhagavad Gita Book" 
                        className="w-full h-full object-cover group-hover/gita:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/60 via-transparent to-transparent opacity-80 group-hover/gita:opacity-40 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-cream">
                        <span className="font-cinzel text-xs font-bold tracking-widest uppercase drop-shadow-md">
                          Gita PDF Active
                        </span>
                        <BookOpen size={14} className="text-gold animate-pulse" />
                      </div>
                    </div>

                    <button 
                      onClick={() => setShowGitaPdf(true)}
                      className="w-full py-3 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-300 transform active:scale-95"
                    >
                      <BookOpen size={13} />
                      <span>Read Bhagwad Gita</span>
                    </button>
                  </div>
                ) : (
                  <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 leading-relaxed font-light">
                    {item.description}
                  </p>
                )}
              </CardTilt>
            </motion.div>
          ))}

          {ECOSYSTEM.slice(3, 5).map((item, idx) => (
            <motion.div
              key={idx + 3}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx + 3) * 0.15 }}
              className="md:col-span-3"
            >
              <CardTilt className="h-full p-8 flex flex-col items-start min-h-[280px] relative border border-gold/10 hover:border-gold/25 shadow-sm">
                {item.badge && (
                  <span className="absolute top-4 right-4 bg-gold/10 border border-gold/30 text-gold text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md animate-pulse">
                    {item.badge}
                  </span>
                )}
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/25 mb-6">
                  {item.icon}
                </div>
                <span className="font-outfit text-[9px] font-bold text-gold uppercase tracking-widest mb-1.5">
                  {item.tagline}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-charcoal dark:text-cream mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </CardTilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bhagavad Gita PDF Viewer Overlay */}
      {showGitaPdf && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-charcoal-dark/90 backdrop-blur-md">
          {/* Close / Cross button */}
          <button
            onClick={() => setShowGitaPdf(false)}
            className="absolute top-6 right-6 z-[10000] p-3 rounded-full bg-charcoal border border-gold/30 text-gold hover:bg-gold hover:text-charcoal-dark smooth-transition cursor-pointer shadow-lg"
            aria-label="Close PDF"
          >
            <X size={20} />
          </button>
          
          {/* PDF Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-5xl h-[85vh] bg-charcoal border border-gold/25 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
          >
            <iframe
              src="/library/The-Bhagavad-Gita.pdf"
              className="w-full h-full border-none"
              title="The Bhagavad Gita"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
};
