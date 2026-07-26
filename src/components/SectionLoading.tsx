"use client";

import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingContextType {
  isLoading: boolean;
  triggerLoading: (scrollCallback: () => void) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = (scrollCallback: () => void) => {
    if (isLoading) return;
    setIsLoading(true);

    // Wait for overlay to fade in (800ms)
    setTimeout(() => {
      scrollCallback();
      
      // Keep loading visible to let the user see the Sudarshan Chakra (1.2s more)
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    }, 800);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, triggerLoading }}>
      {children}
      <AnimatePresence>
        {isLoading && <SudarshanOverlay />}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};

const SudarshanOverlay: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal-dark/95 backdrop-blur-md select-none pointer-events-auto"
    >
      {/* Outer ambient glow circles */}
      <div className="absolute h-64 w-64 rounded-full bg-gold/5 blur-[60px] animate-pulse pointer-events-none" />

      {/* Sudarshan Chakra Spinning Graphics */}
      <div className="relative flex items-center justify-center">
        {/* Flame ring aura */}
        <div className="absolute h-36 w-36 rounded-full border border-dashed border-gold/30 animate-spin-slow" />
        <div className="absolute h-40 w-40 rounded-full border border-gold/10 animate-spin-reverse" />

        {/* Sudarshan Chakra SVG */}
        <svg
          className="w-28 h-28 text-gold drop-shadow-[0_0_25px_rgba(194,157,102,0.6)] animate-spin-fast"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Inner ring */}
          <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />

          {/* Spokes (16 traditional rods of the Sudarshan) */}
          <g stroke="currentColor" strokeWidth="2">
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              return (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="45"
                  transform={`rotate(${angle}, 100, 100)`}
                />
              );
            })}
          </g>

          {/* Sharp Flame/Spike Teeth (Serrated edges pointing clockwise) */}
          <g fill="currentColor">
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 360) / 36;
              // Draws a sharp serrated curved triangle pointing clockwise
              return (
                <path
                  key={i}
                  d="M 100 45 C 103 33, 114 36, 110 45 C 107 48, 103 48, 100 45 Z"
                  transform={`rotate(${angle}, 100, 100)`}
                />
              );
            })}
          </g>

          {/* Inner Hub Bindu */}
          <circle cx="100" cy="100" r="10" fill="currentColor" />
          <circle cx="100" cy="100" r="3" fill="#121212" />
        </svg>
      </div>

      {/* Telemetry Label */}
      <div className="mt-8 text-center">
        <span className="font-cinzel text-xs font-bold text-gold uppercase tracking-[0.25em] block animate-pulse">
          Sudarshan Coordinates Lock
        </span>
        <span className="font-outfit text-[9px] font-semibold text-cream/50 uppercase tracking-[0.18em] block mt-1.5">
          Transitioning Sector...
        </span>
      </div>

      <style jsx global>{`
        @keyframes spinFast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-fast {
          animation: spinFast 1.5s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};
