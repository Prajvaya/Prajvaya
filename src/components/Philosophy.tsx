"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const Philosophy: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="relative py-24 px-6 select-none bg-transparent overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        {/* Editorial Subtitle */}
        <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-6">
          The Confluence
        </span>

        {/* Decorative Quote Icon */}
        <Quote size={40} className="text-gold/20 mb-8 transform -rotate-180" />

        {/* Philosophy Main Title */}
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide text-charcoal dark:text-cream leading-tight mb-8">
          Ancient Principles, Modern Paradigms
        </h2>

        {/* Paragraph Blocks */}
        <div className="space-y-6 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0 }}
            className="font-cinzel text-lg sm:text-xl md:text-2xl text-gold-light dark:text-gold leading-relaxed italic"
          >
            &ldquo;Ancient knowledge should not remain locked in books or historical archives—it must become practical, accessible, and active in modern everyday life.&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="h-[1px] w-24 bg-gold/30 mx-auto my-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="font-outfit text-base sm:text-lg text-charcoal/80 dark:text-cream/80 leading-relaxed font-light"
          >
            Prajvaya bridges the gap between historical wisdom and daily modern action. We build tools that make 
            ancient insights practical for the digital era, focusing on deep empathy, conscious living, and continuous 
            learning. By engineering in harmony with nature, we foster responsible innovation that prioritizes human 
            well-being over empty consumption.
          </motion.p>
        </div>
      </div>

      {/* Decorative organic shapes in background */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-forest-light/10 dark:bg-cream-dark/5 blur-[120px] pointer-events-none z-0" />
    </section>
  );
};
