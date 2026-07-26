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
          Core Belief
        </span>

        {/* Decorative Quote Icon */}
        <Quote size={40} className="text-gold/20 mb-8 transform -rotate-180" />

        {/* Philosophy Main Title */}
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide text-charcoal dark:text-cream leading-tight mb-8">
          Our Philosophy
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
            &ldquo;We do not believe old means outdated. We believe forgotten wisdom is humanity&apos;s greatest untapped technology.&rdquo;
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
            Every civilization in history survived by understanding nature rather than fighting it. 
            We traded decades of sustainable practices for seconds of digital gratification. 
            Our mission is to build modern hardware, software, and community systems that respect these 
            timeless principles while solving today&apos;s challenges.
          </motion.p>
        </div>
      </div>

      {/* Decorative organic shapes in background */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-forest-light/10 dark:bg-cream-dark/5 blur-[120px] pointer-events-none z-0" />
    </section>
  );
};
