"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Search, 
  Network, 
  BookMarked, 
  Sparkles, 
  X, 
  Star, 
  Clock, 
  ShieldCheck, 
  Filter
} from "lucide-react";
import { Book, BookCategory } from "@/lib/wisdom-library/types";
import { WISDOM_BOOKS, DAILY_WISDOM_TODAY } from "@/lib/wisdom-library/catalog-data";
import { EbookReaderView } from "./EbookReaderView";
import { WisdomGraphModal } from "./WisdomGraphModal";
import { PersonalJournalDrawer } from "./PersonalJournalDrawer";
import { BookCover } from "./BookCover";

interface WisdomLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WisdomLibraryModal: React.FC<WisdomLibraryModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  // Sub-modal triggers
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [showJournalDrawer, setShowJournalDrawer] = useState(false);

  // Lock Body Scroll when Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filtered Books Logic
  const filteredBooks = WISDOM_BOOKS.filter((b) => {
    const matchesCat = selectedCategory === "All" || b.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !q || 
      b.title.toLowerCase().includes(q) || 
      b.author.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      (b.sanskritTitle && b.sanskritTitle.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  const categories = [
    "All", 
    "Indian Wisdom", 
    "Buddhism", 
    "Jain Philosophy", 
    "Sikh Literature", 
    "World Philosophy", 
    "Spiritual Classics"
  ];

  return (
    <>
      <div className="fixed inset-0 z-[9998] flex items-center justify-center p-3 sm:p-6 bg-charcoal-dark/95 backdrop-blur-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] p-3 rounded-full bg-charcoal border border-gold/30 text-gold hover:bg-gold hover:text-charcoal-dark smooth-transition cursor-pointer shadow-lg"
          aria-label="Close Library"
        >
          <X size={20} />
        </button>

        {/* Main Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-6xl bg-charcoal border border-gold/25 rounded-3xl overflow-hidden flex flex-col h-[92vh] max-h-[920px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative text-cream"
        >
          {/* Top Header & Search Bar */}
          <div className="p-6 border-b border-gold/15 bg-charcoal-dark/60 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/25 text-gold">
                  <BookOpen size={24} className="animate-pulse" />
                </div>
                <div>
                  <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide text-cream">
                    Prajvaya Wisdom Library
                  </h2>
                  <p className="font-outfit text-xs text-gold uppercase tracking-[0.2em]">
                    Ancestral Archive & Living Learning Ecosystem
                  </p>
                </div>
              </div>

              {/* Sub-tools Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGraphModal(true)}
                  className="px-3.5 py-1.5 rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-charcoal-dark border border-gold/25 font-outfit text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer smooth-transition"
                >
                  <Network size={14} />
                  <span>Wisdom Graph</span>
                </button>

                <button
                  onClick={() => setShowJournalDrawer(true)}
                  className="px-3.5 py-1.5 rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-charcoal-dark border border-gold/25 font-outfit text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer smooth-transition"
                >
                  <BookMarked size={14} />
                  <span>Journal</span>
                </button>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" size={16} />
              <input
                type="text"
                placeholder="Search across books, classical authors, shlokas, themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-charcoal/50 border border-gold/20 focus:border-gold text-cream rounded-full py-2.5 pl-11 pr-4 font-outfit text-xs outline-none transition-all placeholder:text-cream/35"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              <span className="font-outfit text-[10px] font-bold text-cream/50 uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
                <Filter size={12} /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full font-outfit text-xs font-semibold whitespace-nowrap smooth-transition cursor-pointer border ${
                    selectedCategory === cat
                      ? "bg-gold text-charcoal-dark border-gold font-bold shadow-md"
                      : "bg-charcoal/40 text-cream/70 border-gold/15 hover:border-gold/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Main Content Scroll Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-8 bg-charcoal/30">
            {/* Daily Wisdom Featured Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-gold/15 via-amber-950/20 to-charcoal-dark border border-gold/30 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2 text-gold font-cinzel text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkles size={16} />
                <span>{DAILY_WISDOM_TODAY.date}</span>
              </div>

              <h3 className="font-cinzel text-lg font-bold text-cream mb-1">
                {DAILY_WISDOM_TODAY.bookTitle}
              </h3>
              <p className="font-serif text-sm text-gold italic border-l-2 border-gold pl-3 py-1 mb-3">
                &ldquo;{DAILY_WISDOM_TODAY.passage}&rdquo;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-outfit text-cream/90 pt-2 border-t border-gold/15">
                <div>
                  <strong className="text-gold block">💡 Practical Wisdom:</strong>
                  <p className="font-light">{DAILY_WISDOM_TODAY.explanation}</p>
                </div>
                <div>
                  <strong className="text-amber-400 block">⚡ Today&apos;s Action:</strong>
                  <p className="font-light">{DAILY_WISDOM_TODAY.actionPrompt}</p>
                </div>
              </div>
            </div>

            {/* Book Catalog Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-base font-bold text-cream">
                  Public Domain Classical Archive ({filteredBooks.length} Masterworks)
                </h3>
                <span className="font-outfit text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck size={14} /> Verified Open Access
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl bg-charcoal-dark/70 border border-gold/15 hover:border-gold/40 smooth-transition flex flex-col justify-between group/card shadow-md"
                  >
                    <div>
                      {/* Distinct Book Cover Component */}
                      <div 
                        onClick={() => setActiveBook(b)}
                        className="cursor-pointer mb-4 group-hover/card:scale-[1.02] transition-transform duration-300"
                      >
                        <BookCover book={b} />
                      </div>

                      <h4 className="font-cinzel text-base font-bold text-cream group-hover/card:text-gold transition-colors">
                        {b.title}
                      </h4>
                      {b.sanskritTitle && (
                        <span className="font-yatra text-xs text-gold/80 block mb-1">
                          {b.sanskritTitle}
                        </span>
                      )}
                      <span className="font-outfit text-[11px] font-semibold text-cream/50 block mb-2">
                        by {b.author}
                      </span>
                      <p className="font-outfit text-xs text-cream/70 leading-relaxed font-light line-clamp-3 mb-4">
                        {b.description}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-gold/10 flex items-center justify-between gap-2">
                      <span className="font-outfit text-[10px] text-gold/80 flex items-center gap-1 font-bold">
                        <Star size={12} className="fill-gold text-gold" /> {b.rating}
                      </span>

                      <button
                        onClick={() => setActiveBook(b)}
                        className="px-4 py-2 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
                      >
                        <BookOpen size={13} />
                        <span>Read Book</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Active Ebook Reader Overlay */}
      {activeBook && (
        <EbookReaderView book={activeBook} onClose={() => setActiveBook(null)} />
      )}

      {/* Concept Graph Modal */}
      <WisdomGraphModal
        isOpen={showGraphModal}
        onClose={() => setShowGraphModal(false)}
        onOpenBook={(bId) => {
          const found = WISDOM_BOOKS.find((b) => b.id === bId);
          if (found) setActiveBook(found);
        }}
      />

      {/* Personal Journal Drawer */}
      <PersonalJournalDrawer
        isOpen={showJournalDrawer}
        onClose={() => setShowJournalDrawer(false)}
      />
    </>
  );
};
