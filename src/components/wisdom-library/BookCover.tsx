"use client";

import React from "react";
import { Book } from "@/lib/wisdom-library/types";
import { 
  BookOpen, 
  Sparkles, 
  Sun, 
  Compass, 
  Crown, 
  Feather, 
  Flame, 
  Globe, 
  Heart, 
  Moon, 
  Mountain, 
  Shield, 
  TreePine, 
  Zap 
} from "lucide-react";

interface BookCoverProps {
  book: Book;
  className?: string;
  showBadge?: boolean;
}

// Unique Color Gradients & Icons for Each Book ID
const BOOK_THEMES: Record<string, { gradient: string; accent: string; icon: React.ReactNode; motif: string }> = {
  gita: {
    gradient: "from-amber-950 via-amber-900 to-charcoal-dark",
    accent: "text-amber-400 border-amber-500/40",
    icon: <Sun size={28} className="text-amber-400" />,
    motif: "☸"
  },
  patanjali_yoga: {
    gradient: "from-emerald-950 via-teal-900 to-charcoal-dark",
    accent: "text-emerald-400 border-emerald-500/40",
    icon: <Sparkles size={28} className="text-emerald-400" />,
    motif: "🕉"
  },
  arthashastra: {
    gradient: "from-rose-950 via-red-900 to-charcoal-dark",
    accent: "text-rose-400 border-rose-500/40",
    icon: <Crown size={28} className="text-rose-400" />,
    motif: "👑"
  },
  chanakya_niti: {
    gradient: "from-amber-900 via-orange-950 to-charcoal-dark",
    accent: "text-amber-300 border-amber-400/40",
    icon: <Shield size={28} className="text-amber-300" />,
    motif: "📜"
  },
  upanishads: {
    gradient: "from-indigo-950 via-purple-900 to-charcoal-dark",
    accent: "text-purple-300 border-purple-400/40",
    icon: <Moon size={28} className="text-purple-300" />,
    motif: "☯"
  },
  ramayana: {
    gradient: "from-blue-950 via-cyan-900 to-charcoal-dark",
    accent: "text-cyan-300 border-cyan-400/40",
    icon: <Compass size={28} className="text-cyan-300" />,
    motif: "🏹"
  },
  mahabharata: {
    gradient: "from-stone-900 via-zinc-900 to-charcoal-dark",
    accent: "text-yellow-400 border-yellow-500/40",
    icon: <Flame size={28} className="text-yellow-400" />,
    motif: "⚔"
  },
  rig_veda: {
    gradient: "from-yellow-950 via-amber-800 to-charcoal-dark",
    accent: "text-yellow-300 border-yellow-400/40",
    icon: <Zap size={28} className="text-yellow-300" />,
    motif: "⚡"
  },
  dhammapada: {
    gradient: "from-amber-900 via-yellow-950 to-charcoal-dark",
    accent: "text-amber-300 border-amber-400/40",
    icon: <Feather size={28} className="text-amber-300" />,
    motif: "☸"
  },
  diamond_sutra: {
    gradient: "from-sky-950 via-slate-900 to-charcoal-dark",
    accent: "text-sky-300 border-sky-400/40",
    icon: <Sparkles size={28} className="text-sky-300" />,
    motif: "💎"
  },
  tattvartha_sutra: {
    gradient: "from-emerald-900 via-green-950 to-charcoal-dark",
    accent: "text-emerald-300 border-emerald-400/40",
    icon: <Heart size={28} className="text-emerald-300" />,
    motif: "✋"
  },
  japji_sahib: {
    gradient: "from-amber-950 via-orange-900 to-charcoal-dark",
    accent: "text-amber-400 border-amber-500/40",
    icon: <Sun size={28} className="text-amber-400" />,
    motif: "ੴ"
  },
  marcus_meditations: {
    gradient: "from-slate-950 via-gray-900 to-charcoal-dark",
    accent: "text-slate-300 border-slate-400/40",
    icon: <Mountain size={28} className="text-slate-300" />,
    motif: "🏛"
  },
  enchiridion: {
    gradient: "from-stone-950 via-neutral-900 to-charcoal-dark",
    accent: "text-stone-300 border-stone-400/40",
    icon: <Shield size={28} className="text-stone-300" />,
    motif: "⚓"
  },
  confucius_analects: {
    gradient: "from-red-950 via-rose-950 to-charcoal-dark",
    accent: "text-red-400 border-red-500/40",
    icon: <Globe size={28} className="text-red-400" />,
    motif: "仁"
  },
  tao_te_ching: {
    gradient: "from-teal-950 via-emerald-950 to-charcoal-dark",
    accent: "text-teal-300 border-teal-400/40",
    icon: <TreePine size={28} className="text-teal-300" />,
    motif: "☯"
  },
  plato_republic: {
    gradient: "from-indigo-950 via-blue-950 to-charcoal-dark",
    accent: "text-indigo-300 border-indigo-400/40",
    icon: <BookOpen size={28} className="text-indigo-300" />,
    motif: "🏛"
  },
  aristotle_ethics: {
    gradient: "from-purple-950 via-violet-950 to-charcoal-dark",
    accent: "text-violet-300 border-violet-400/40",
    icon: <Compass size={28} className="text-violet-300" />,
    motif: "⚖"
  },
  gibran_prophet: {
    gradient: "from-amber-950 via-yellow-950 to-charcoal-dark",
    accent: "text-amber-300 border-amber-400/40",
    icon: <Feather size={28} className="text-amber-300" />,
    motif: "🕊"
  }
};

const DEFAULT_THEME = {
  gradient: "from-charcoal-dark via-amber-950 to-charcoal-dark",
  accent: "text-gold border-gold/40",
  icon: <BookOpen size={28} className="text-gold" />,
  motif: "📖"
};

export const BookCover: React.FC<BookCoverProps> = ({ book, className = "", showBadge = true }) => {
  const theme = BOOK_THEMES[book.id] || DEFAULT_THEME;

  // Use actual image if it's the Gita and requested, else custom procedural art cover
  if (book.id === "gita" && book.coverImage && book.coverImage.endsWith(".png")) {
    return (
      <div className={`relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-gold/30 shadow-lg ${className}`}>
        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-cream">
          <span className="font-cinzel text-[10px] font-bold uppercase tracking-wider text-gold">
            {book.category}
          </span>
          <span className="font-outfit text-[10px] text-cream/70 font-light">
            {book.totalEstReadMinutes} min read
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden border ${theme.accent} bg-gradient-to-b ${theme.gradient} p-4 flex flex-col justify-between shadow-xl group/cover transition-all duration-300 ${className}`}
    >
      {/* Background Decorative Motif Watermark */}
      <span className="absolute -right-4 -bottom-6 text-7xl opacity-10 select-none pointer-events-none font-serif text-cream">
        {theme.motif}
      </span>

      {/* Top Header Badge */}
      <div className="flex items-center justify-between z-10">
        <span className="font-outfit text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-gold border border-gold/20">
          {book.category}
        </span>
        {theme.icon}
      </div>

      {/* Central Title & Native Script Artwork */}
      <div className="my-auto text-center z-10 px-2 space-y-1">
        {book.sanskritTitle && (
          <span className="font-yatra text-lg font-bold text-gold/90 drop-shadow-md block">
            {book.sanskritTitle}
          </span>
        )}
        <h3 className="font-cinzel text-base font-extrabold text-cream tracking-wide uppercase leading-snug drop-shadow-md">
          {book.title}
        </h3>
        <div className="w-12 h-0.5 bg-gold/50 mx-auto my-2 rounded-full" />
        <span className="font-outfit text-[11px] text-cream/70 font-medium italic block">
          by {book.author}
        </span>
      </div>

      {/* Bottom Footer Info */}
      <div className="flex items-center justify-between text-[10px] font-outfit text-cream/60 pt-2 border-t border-cream/10 z-10">
        <span>Public Domain</span>
        <span>{book.totalEstReadMinutes}m read</span>
      </div>
    </div>
  );
};
