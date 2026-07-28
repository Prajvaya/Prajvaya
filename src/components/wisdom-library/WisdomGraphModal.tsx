"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Network, BookOpen, X, ArrowRight, Sparkles } from "lucide-react";
import { WISDOM_CONCEPT_GRAPH } from "@/lib/wisdom-library/wisdom-graph-data";
import { ConceptNode } from "@/lib/wisdom-library/types";

interface WisdomGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBook: (bookId: string) => void;
}

export const WisdomGraphModal: React.FC<WisdomGraphModalProps> = ({
  isOpen,
  onClose,
  onOpenBook
}) => {
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode>(WISDOM_CONCEPT_GRAPH[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-charcoal-dark/95 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-charcoal border border-gold/25 rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative text-cream"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-charcoal-dark border border-gold/20 text-gold hover:bg-gold hover:text-charcoal-dark smooth-transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/15">
          <Network className="text-gold animate-pulse" size={28} />
          <div>
            <h2 className="font-cinzel text-2xl font-bold text-cream">Prajvaya Wisdom Graph</h2>
            <p className="font-outfit text-xs text-gold uppercase tracking-widest">
              Visual Knowledge Network Connecting Universal Ideas
            </p>
          </div>
        </div>

        {/* Concept Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {WISDOM_CONCEPT_GRAPH.map((node) => {
            const isSelected = selectedConcept.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedConcept(node)}
                className={`p-4 rounded-2xl border text-left smooth-transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-gold text-charcoal-dark border-gold font-bold shadow-lg scale-105"
                    : "bg-charcoal-dark/60 border-gold/15 text-cream hover:border-gold/40 hover:bg-gold/10"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Sparkles size={16} className={isSelected ? "text-charcoal-dark" : "text-gold"} />
                  <span className={`text-[9px] uppercase tracking-wider font-mono ${isSelected ? "text-charcoal-dark/70" : "text-cream/40"}`}>
                    {node.relatedBooks.length} Links
                  </span>
                </div>
                <span className="font-cinzel text-xs font-bold leading-tight">
                  {node.concept}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Concept Deep Dive View */}
        <div className="p-6 rounded-2xl bg-charcoal-dark/80 border border-gold/20 space-y-6">
          <div>
            <span className="font-outfit text-[10px] text-gold uppercase tracking-widest font-bold block mb-1">
              Active Concept Axis
            </span>
            <h3 className="font-cinzel text-xl font-bold text-cream">
              {selectedConcept.concept}
            </h3>
            <p className="font-outfit text-sm text-cream/70 mt-2 leading-relaxed font-light">
              {selectedConcept.description}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-cinzel text-xs font-bold text-gold uppercase tracking-wider">
              Cross-Text Passages & Paralells
            </h4>

            {selectedConcept.relatedBooks.map((ref, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-charcoal/60 border border-gold/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-gold/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-gold" />
                    <span className="font-cinzel text-xs font-bold text-cream">
                      {ref.bookTitle}
                    </span>
                    <span className="font-outfit text-[10px] text-gold/70 font-semibold uppercase">
                      ({ref.chapterTitle})
                    </span>
                  </div>
                  <p className="font-outfit text-xs text-cream/80 italic pl-5">
                    &ldquo;{ref.quote}&rdquo;
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBook(ref.bookId);
                  }}
                  className="px-3.5 py-1.5 bg-gold/10 hover:bg-gold text-gold hover:text-charcoal-dark rounded-full text-xs font-bold font-outfit uppercase tracking-wider shrink-0 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <span>Read Book</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
