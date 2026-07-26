"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Landmark, ShieldAlert, Cpu } from "lucide-react";

export const WhyNow: React.FC = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-cream-dark/10 dark:bg-forest-light/5 border-y border-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Bold Headline */}
        <div className="lg:col-span-5">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            The Urgency
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            The Urgency of Alignment
          </h2>
          <div className="h-[2px] w-20 bg-gold mt-6 mb-8" />
          <p className="font-cinzel text-lg md:text-xl text-gold-light dark:text-gold italic leading-relaxed">
            &ldquo;Humanity has more processing power than ever before. Yet we experience unprecedented distraction, isolation, and burnout. It is time to realign with natural rhythms.&rdquo;
          </p>
        </div>

        {/* Right Side Editorial Explanation */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex gap-4 p-5 rounded-2xl bg-cream-dark/25 dark:bg-forest-light/25 border border-gold/10"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-gold/10 border border-gold/25 text-gold flex-shrink-0 mt-1">
              <ShieldAlert size={16} />
            </div>
            <div>
              <h3 className="font-cinzel text-base font-bold text-charcoal dark:text-cream mb-2">
                A Disconnected Civilization
              </h3>
              <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/85 leading-relaxed font-light">
                We are connected globally, yet isolated locally. We possess the processing capacity to analyze 
                infinite variables, yet fail to manage basic physical waste. Modern technology has solved many 
                convenience bottlenecks, but created massive structural and mental wellness crises.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex gap-4 p-5 rounded-2xl bg-cream-dark/25 dark:bg-forest-light/25 border border-gold/10"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-gold/10 border border-gold/25 text-gold flex-shrink-0 mt-1">
              <Cpu size={16} />
            </div>
            <div>
              <h3 className="font-cinzel text-base font-bold text-charcoal dark:text-cream mb-2">
                The Solution is Remembering
              </h3>
              <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/85 leading-relaxed font-light">
                The solution is not abandoning innovation. We do not advocate returning to caves or rejecting 
                the digital age. Instead, the solution lies in remembering what worked, stripping away artificial 
                noise, and building modern, high-performance systems upon ancestral sustainability blueprints.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
