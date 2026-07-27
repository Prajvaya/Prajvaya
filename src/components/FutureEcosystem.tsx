"use client";

import React, { useState, useEffect, useRef } from "react";
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
    description: "A private, interactive digital companion that helps individuals align their daily routines with ancient wisdom and mindfulness.",
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
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [showGitaPdf, setShowGitaPdf] = useState(false);
  
  // AI Companion Chat States
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; content: string }>>([
    {
      sender: "ai",
      content: "Welcome to Prajvaya! 🌱\n\nI'm your Prajvaya AI Companion. I can help you explore sustainable living, understand our mission, answer questions about environmental conservation, traditional wisdom, digital wellbeing, and guide you through the Prajvaya platform.\n\nHow can I assist you today?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto Scroll Chat Messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatLoading]);

  // Lock scrolling when overlays are active
  useEffect(() => {
    if (showLibraryModal || showGitaPdf || showChatModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLibraryModal, showGitaPdf, showChatModal]);

  // Chat message sender logic
  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || chatInput.trim();
    if (!textToSend || chatLoading) return;

    // Add user message
    const updatedMessages = [...chatMessages, { sender: "user" as const, content: textToSend }];
    setChatMessages(updatedMessages);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to get response.");
      }
      setChatMessages(prev => [...prev, { sender: "ai" as const, content: data.reply }]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        { sender: "ai" as const, content: "I apologize, but I am currently having trouble connecting to the cohort nodes. Please check your network connection and try again." }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

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
              <CardTilt 
                onClick={() => {
                  if (item.title === "Wisdom Library") {
                    setShowLibraryModal(true);
                  } else if (item.title === "AI Companion") {
                    setShowChatModal(true);
                  }
                }}
                className={`h-full p-8 flex flex-col items-start min-h-[300px] relative border border-gold/10 hover:border-gold/25 shadow-sm ${
                  item.title === "Wisdom Library" || item.title === "AI Companion" ? "cursor-pointer hover:bg-gold/5 group/interactive" : ""
                }`}
              >
                {item.badge && (
                  <span className="absolute top-4 right-4 bg-gold/10 border border-gold/30 text-gold text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md animate-pulse">
                    {item.badge}
                  </span>
                )}
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/25 mb-6 group-hover/interactive:border-gold/50 transition-colors">
                  {item.icon}
                </div>
                <span className="font-outfit text-[9px] font-bold text-gold uppercase tracking-widest mb-1.5">
                  {item.tagline}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-charcoal dark:text-cream mb-4 leading-snug group-hover/interactive:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 leading-relaxed font-light">
                  {item.description}
                </p>

                {item.title === "Wisdom Library" && (
                  <span className="mt-auto pt-6 font-outfit text-[10px] font-bold tracking-widest uppercase text-gold hover:underline flex items-center gap-1">
                    Enter Archive <X className="rotate-45" size={10} />
                  </span>
                )}
                {item.title === "AI Companion" && (
                  <span className="mt-auto pt-6 font-outfit text-[10px] font-bold tracking-widest uppercase text-gold hover:underline flex items-center gap-1">
                    Chat Now <X className="rotate-45" size={10} />
                  </span>
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
              <CardTilt 
                onClick={() => {
                  if (item.title === "Community Platform") {
                    window.open("https://chat.whatsapp.com/HS6dVyedqtAKvGlkVjQSdJ", "_blank", "noopener,noreferrer");
                  }
                }}
                className={`h-full p-8 flex flex-col items-start min-h-[280px] relative border border-gold/10 hover:border-gold/25 shadow-sm ${
                  item.title === "Community Platform" ? "cursor-pointer hover:bg-gold/5 group/community" : ""
                }`}
              >
                {item.badge && (
                  <span className="absolute top-4 right-4 bg-gold/10 border border-gold/30 text-gold text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md animate-pulse">
                    {item.badge}
                  </span>
                )}
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/25 mb-6 group-hover/community:border-gold/50 transition-colors">
                  {item.icon}
                </div>
                <span className="font-outfit text-[9px] font-bold text-gold uppercase tracking-widest mb-1.5">
                  {item.tagline}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-charcoal dark:text-cream mb-4 leading-snug group-hover/community:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 leading-relaxed font-light">
                  {item.description}
                </p>

                {item.title === "Community Platform" && (
                  <span className="mt-auto pt-6 font-outfit text-[10px] font-bold tracking-widest uppercase text-gold hover:underline flex items-center gap-1">
                    Join Community <X className="rotate-45" size={10} />
                  </span>
                )}
              </CardTilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wisdom Library Archive Modal */}
      {showLibraryModal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-8 bg-charcoal-dark/95 backdrop-blur-md">
          {/* Close button */}
          <button
            onClick={() => setShowLibraryModal(false)}
            className="absolute top-6 right-6 z-[9999] p-3 rounded-full bg-charcoal border border-gold/30 text-gold hover:bg-gold hover:text-charcoal-dark smooth-transition cursor-pointer shadow-lg"
            aria-label="Close Library"
          >
            <X size={20} />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-charcoal border border-gold/20 rounded-3xl p-6 md:p-8 overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
          >
            {/* Library Header */}
            <div className="flex flex-col items-center text-center mb-8 pb-6 border-b border-gold/15">
              <BookOpen className="text-amber-500 mb-3 animate-pulse" size={32} />
              <h2 className="font-cinzel text-2xl md:text-3xl font-bold tracking-wide text-cream">
                Prajvaya Wisdom Library
              </h2>
              <p className="font-outfit text-xs text-gold uppercase tracking-[0.2em] mt-2">
                Ancestral Archive & Sacred Texts
              </p>
            </div>

            {/* Archive Library Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Card 1: Bhagavad Gita */}
              <div className="flex flex-col items-center p-4 border border-gold/10 hover:border-gold/30 rounded-2xl bg-charcoal-dark/50 smooth-transition">
                <div 
                  onClick={() => setShowGitaPdf(true)}
                  className="w-full relative rounded-xl overflow-hidden border border-gold/20 cursor-pointer group/gita aspect-[4/5] shadow-md mb-4"
                >
                  <img 
                    src="/assets/gita_cover.png" 
                    alt="Bhagavad Gita Book" 
                    className="w-full h-full object-cover group-hover/gita:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/60 via-transparent to-transparent opacity-80 group-hover/gita:opacity-40 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-cream">
                    <span className="font-cinzel text-[10px] font-bold tracking-widest uppercase">
                      Open PDF
                    </span>
                    <BookOpen size={12} className="text-gold" />
                  </div>
                </div>
                
                <h3 className="font-cinzel text-base font-bold text-cream text-center mb-1">
                  The Bhagavad Gita
                </h3>
                <p className="font-outfit text-[11px] text-cream/60 text-center mb-4 leading-relaxed line-clamp-2">
                  Universal guidelines on duty, consciousness, and the path of righteousness.
                </p>

                <button 
                  onClick={() => setShowGitaPdf(true)}
                  className="w-full py-2 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-[10px] font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all duration-300 active:scale-95"
                >
                  <BookOpen size={11} />
                  <span>Read Text</span>
                </button>
              </div>

              {/* Placeholder Card 2: Upanishads */}
              <div className="flex flex-col items-center justify-center p-6 border border-dashed border-gold/10 rounded-2xl bg-charcoal-dark/20 text-cream/40 min-h-[220px]">
                <BookOpen size={24} className="opacity-30 mb-2" />
                <span className="font-cinzel text-xs font-bold tracking-wider uppercase text-gold/40">
                  Upanishads
                </span>
                <span className="font-outfit text-[9px] uppercase tracking-widest mt-1">
                  Cataloging...
                </span>
              </div>

              {/* Placeholder Card 3: Patanjali Sutras */}
              <div className="flex flex-col items-center justify-center p-6 border border-dashed border-gold/10 rounded-2xl bg-charcoal-dark/20 text-cream/40 min-h-[220px]">
                <BookOpen size={24} className="opacity-30 mb-2" />
                <span className="font-cinzel text-xs font-bold tracking-wider uppercase text-gold/40">
                  Patanjali Sutras
                </span>
                <span className="font-outfit text-[9px] uppercase tracking-widest mt-1">
                  Cataloging...
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

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

      {/* Prajvaya AI Companion Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-charcoal-dark/95 backdrop-blur-md">
          {/* Close button */}
          <button
            onClick={() => setShowChatModal(false)}
            className="absolute top-6 right-6 z-[10000] p-3 rounded-full bg-charcoal border border-gold/30 text-gold hover:bg-gold hover:text-charcoal-dark smooth-transition cursor-pointer shadow-lg"
            aria-label="Close Chat"
          >
            <X size={20} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl bg-charcoal border border-gold/20 rounded-3xl overflow-hidden flex flex-col h-[85vh] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
          >
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-6 border-b border-gold/15 bg-charcoal-dark/40">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/25">
                <Sparkles className="text-gold" size={20} />
              </div>
              <div className="flex flex-col text-left">
                <h3 className="font-cinzel text-lg font-bold text-cream">
                  Prajvaya AI
                </h3>
                <span className="font-outfit text-[10px] font-bold text-gold uppercase tracking-wider">
                  Official Cohort Companion
                </span>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 flex flex-col bg-charcoal/20">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 font-outfit text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-gold/10 border border-gold/30 text-cream rounded-tr-none text-right"
                        : "bg-charcoal-dark/60 border border-gold/10 text-cream/90 rounded-tl-none text-left"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {chatLoading && (
                <div className="self-start flex flex-col items-start max-w-[85%] animate-pulse">
                  <div className="bg-charcoal-dark/60 border border-gold/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-gold animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-gold animate-bounce [animation-delay:0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-gold animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Panel */}
            <div className="px-6 py-3 border-t border-gold/10 bg-charcoal-dark/20 flex flex-wrap gap-2 justify-center">
              {[
                { label: "About Prajvaya", query: "Tell me about Prajvaya's mission" },
                { label: "Digital Wellbeing", query: "How to reduce digital pollution?" },
                { label: "Traditional Farming", query: "What is traditional circular farming?" },
                { label: "Yoga & Breathing", query: "Recommend a healthy mindfulness routine" },
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  disabled={chatLoading}
                  className="px-3 py-1.5 border border-gold/20 hover:border-gold text-cream/70 hover:text-gold font-outfit text-[10px] font-bold tracking-wider uppercase rounded-full bg-charcoal/30 hover:bg-gold/5 smooth-transition cursor-pointer disabled:opacity-50"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-4 border-t border-gold/15 bg-charcoal-dark/40 flex gap-2.5 items-center"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask your companion..."
                disabled={chatLoading}
                className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-full py-3 px-5 font-outfit text-sm outline-none transition-all placeholder:text-cream/35"
                required
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="h-11 w-11 rounded-full bg-gold hover:bg-gold-light text-charcoal-dark flex items-center justify-center shrink-0 shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-50"
              >
                <Sparkles size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};
