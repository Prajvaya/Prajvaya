"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center py-20 pl-6 pr-12 md:pl-12 md:pr-20 lg:pr-28 bg-transparent select-none z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Premium Headline Text & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Sanskrit Floating Motto Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 border rounded-full border-gold/30 bg-cream/70 dark:bg-earth/80 backdrop-blur-md shadow-md mb-6"
          >
            <Sparkles size={12} className="text-gold animate-pulse" />
            <span className="font-yatra text-xs tracking-wider text-gold-light dark:text-gold uppercase">
              विजयाय बुद्धिः • Victory Through Intellect
            </span>
          </motion.div>

          {/* Headline - Line by Line reveal */}
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight max-w-2xl">
            <motion.span
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Ancient Wisdom.
            </motion.span>
            <motion.span
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Modern Solutions
            </motion.span>
            <motion.span
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="block text-gold font-semibold relative mt-1"
            >
              for Modern Humanity.
              <span className="absolute left-0 bottom-1 w-full h-[2px] bg-gold/20 rounded-full" />
            </motion.span>
          </h1>

          {/* Supporting Copy - Smooth fade upward */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0 }}
            className="font-outfit text-sm sm:text-base md:text-lg text-charcoal/80 dark:text-cream/90 max-w-xl mt-6 leading-relaxed font-light"
          >
            Prajvaya bridges timeless Indian heritage and modern technology, creating practical, sustainable solutions to restore harmony, mental clarity, and purpose in an increasingly complex world.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full shadow-lg hover:shadow-gold/25 transition-all duration-300 transform hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              Join the Movement
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleScrollTo("vision")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 border border-gold/30 hover:border-gold text-charcoal dark:text-cream bg-cream/30 dark:bg-earth/30 hover:bg-gold/5 backdrop-blur-md font-outfit text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              Discover Our Vision
            </button>
          </motion.div>

          {/* Quick Links to New Sections */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.6 }}
            className="flex flex-wrap items-center gap-3 mt-8 font-outfit text-[11px] font-semibold uppercase tracking-widest text-charcoal/70 dark:text-cream/70 animate-pulse"
          >
            <span className="text-gold">Explore:</span>
            <button
              onClick={() => handleScrollTo("problems")}
              className="hover:text-gold border-b border-dashed border-charcoal/30 dark:border-cream/30 hover:border-gold pb-0.5 cursor-pointer transition-colors"
            >
              Problems We Solve
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => handleScrollTo("helps")}
              className="hover:text-gold border-b border-dashed border-charcoal/30 dark:border-cream/30 hover:border-gold pb-0.5 cursor-pointer transition-colors"
            >
              How We Help
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => handleScrollTo("ecosystem")}
              className="hover:text-gold border-b border-dashed border-charcoal/30 dark:border-cream/30 hover:border-gold pb-0.5 cursor-pointer transition-colors"
            >
              Future Ecosystem
            </button>
          </motion.div>
        </div>

        {/* Right Column: Premium Illustration Card with Parallax Zoom */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] aspect-[4/5] w-full max-w-sm sm:max-w-md bg-charcoal"
          >
            <img
              src="/assets/2.png"
              alt="Ancient Wisdom"
              className="w-full h-full object-cover object-center pointer-events-none select-none"
            />
            {/* Subtle Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/50 via-transparent to-transparent pointer-events-none" />
            
            {/* Ambient Breathe Glow Effect */}
            <div className="absolute inset-0 bg-gold/5 mix-blend-overlay animate-pulse pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Ambient Breathing Light Overlay (floating backdrop highlight) */}
      <div className="absolute top-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-gold/5 dark:bg-gold/3 blur-[120px] pointer-events-none animate-pulse -z-10" />
      <div className="absolute bottom-[10%] left-[5%] h-[300px] w-[300px] rounded-full bg-forest-light/10 dark:bg-cream-dark/3 blur-[100px] pointer-events-none -z-10" />

      {/* Decorative Bottom Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 smooth-transition">
        <span className="font-outfit text-[9px] font-bold tracking-[0.25em] text-charcoal dark:text-cream uppercase">
          Scroll to explore
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent animate-bounce" />
      </div>
    </section>
  );
};
