"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Landmark } from "lucide-react";

export const Swadeshi: React.FC = () => {
  return (
    <section
      id="swadeshi"
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Details */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
              Aatmanirbhar Initiative
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
              Sovereign Swadeshi Node
            </h2>
            <h3 className="font-outfit text-base text-gold mt-2 font-medium">
              100% Indigenous Digital Sovereignty
            </h3>
            <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed font-light">
              Prajvaya is committed to building systems that are fully envisioned, architected, and compiled 
              locally. Our software codebases, encryption architectures, database endpoints, and hardware 
              integrations are crafted to safeguard data security and national digital sovereignty.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-gold/15 bg-cream-dark/20 dark:bg-forest-light/20 flex flex-col items-start">
              <ShieldCheck className="text-gold mb-4" size={20} />
              <h4 className="font-cinzel text-sm font-bold text-charcoal dark:text-cream mb-2 leading-tight">
                Sovereign Code
              </h4>
              <p className="font-outfit text-[11px] text-charcoal/60 dark:text-cream/70 leading-relaxed font-light">
                Constructed entirely locally to exclude foreign telemetry networks, backdoors, and data leakage channels.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gold/15 bg-cream-dark/20 dark:bg-forest-light/20 flex flex-col items-start">
              <Landmark className="text-gold mb-4" size={20} />
              <h4 className="font-cinzel text-sm font-bold text-charcoal dark:text-cream mb-2 leading-tight">
                Compliance
              </h4>
              <p className="font-outfit text-[11px] text-charcoal/60 dark:text-cream/70 leading-relaxed font-light">
                Tailored systems complying with strict national security directives and local cryptographic regulations.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gold/15 bg-cream-dark/20 dark:bg-forest-light/20 flex flex-col items-start">
              <Cpu className="text-gold mb-4" size={20} />
              <h4 className="font-cinzel text-sm font-bold text-charcoal dark:text-cream mb-2 leading-tight">
                Local Hardware
              </h4>
              <p className="font-outfit text-[11px] text-charcoal/60 dark:text-cream/70 leading-relaxed font-light">
                Embedded units, automated drone units, and IoT layers assembled in collaborative laboratory spaces.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Ashoka Chakra Graphic */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-8">
          <div className="relative h-64 w-64 md:h-80 md:w-80 flex items-center justify-center">
            {/* Spinning background halo */}
            <div className="absolute inset-0 rounded-full bg-gold/5 blur-[50px] pointer-events-none" />

            {/* Glowing outer orbit rings */}
            <div className="absolute h-[96%] w-[96%] rounded-full border border-gold/10 animate-spin-reverse pointer-events-none" />
            <div className="absolute h-[85%] w-[85%] rounded-full border border-dashed border-gold/25 animate-spin-slow pointer-events-none" />

            {/* Vector Ashoka Chakra SVG */}
            <svg
              className="w-[78%] h-[78%] text-gold pointer-events-none select-none drop-shadow-[0_0_15px_rgba(194,157,102,0.35)] animate-spin-slow"
              viewBox="0 0 200 200"
            >
              {/* Outer Ring */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-90"
              />
              {/* Inner Circle Ring */}
              <circle
                cx="100"
                cy="100"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />

              {/* 24 Spokes representing progress and the flow of time */}
              <g stroke="currentColor" strokeWidth="1.8" className="opacity-90">
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  return (
                    <line
                      key={i}
                      x1="100"
                      y1="100"
                      x2="100"
                      y2="20"
                      transform={`rotate(${angle}, 100, 100)`}
                    />
                  );
                })}
              </g>

              {/* Central Bindu Dot */}
              <circle cx="100" cy="100" r="5" fill="currentColor" />
            </svg>
          </div>

          <div className="mt-8 text-center bg-cream-dark/25 dark:bg-forest-light/25 border border-gold/15 px-5 py-2.5 rounded-xl">
            <span className="font-outfit text-[10px] font-bold text-gold uppercase tracking-[0.25em] block">
              Made in India
            </span>
            <span className="font-cinzel text-[9px] font-semibold text-charcoal/80 dark:text-cream/90 uppercase tracking-[0.18em] block mt-0.5">
              Swadeshi Technological Node
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 30s linear infinite;
        }
        .animate-spin-reverse {
          animation: spinReverse 20s linear infinite;
        }
      `}</style>
    </section>
  );
};
