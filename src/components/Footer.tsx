"use client";

import React, { useState } from "react";
import { ArrowUp, Sparkles, Send } from "lucide-react";
import { useLoading } from "./SectionLoading";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const { triggerLoading } = useLoading();

  const handleScrollTo = (id: string) => {
    triggerLoading(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus("Uplink successful. Welcome.");
    setNewsletterEmail("");
  };

  return (
    <footer className="relative bg-cream-dark/20 dark:bg-earth-light/5 border-t border-gold/10 overflow-hidden">
      {/* FINAL CALL TO ACTION */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center border-b border-gold/10 select-none">
        <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-4 block">
          Become part of the movement
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight max-w-3xl">
          The next generation deserves better systems.
        </h2>
        <p className="font-outfit text-base text-charcoal/70 dark:text-cream/80 max-w-xl mt-6 leading-relaxed font-light">
          Together we can revive timeless wisdom, eliminate physical and digital pollution, and build a future 
          that respects both humanity and nature.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
          <button
            onClick={() => handleScrollTo("contact")}
            className="w-full sm:w-auto px-7 py-3.5 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-[1px] cursor-pointer"
          >
            Join Prajvaya
          </button>
          <a
            href="https://forms.gle/PtnM67mhoHyVqSCn6"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 border border-gold/30 hover:border-gold text-charcoal dark:text-cream bg-cream/35 dark:bg-forest/35 hover:bg-gold/5 backdrop-blur-md font-outfit text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 transform hover:-translate-y-[1px] cursor-pointer text-center inline-block"
          >
            Become a Contributor
          </a>
        </div>
      </div>

      {/* CORE FOOTER NAVIGATION & INFORMATION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand and Mission */}
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Prajvaya Logo" className="h-8 w-8 object-contain" />
            <span className="font-cinzel text-sm font-bold tracking-[0.2em] text-charcoal dark:text-cream uppercase">
              Prajvaya
            </span>
          </div>
          <p className="font-outfit text-xs text-charcoal/60 dark:text-cream/70 leading-relaxed font-light max-w-xs">
            We operate at the intersection of Vedic Philosophy and Futuristic Software Engineering, reviving 
            longevity principles to eliminate environmental and digital clutter.
          </p>
          <div className="font-yatra text-xs text-gold/80 mt-2 select-none">
            कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3">
          <h4 className="font-cinzel text-[11px] font-bold text-gold uppercase tracking-widest mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 font-outfit text-xs text-charcoal/70 dark:text-cream/80">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("home");
                }}
                className="hover:text-gold transition-colors duration-300"
              >
                Top / Home
              </a>
            </li>
            <li>
              <a
                href="#vision"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("vision");
                }}
                className="hover:text-gold transition-colors duration-300"
              >
                Our Vision
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("projects");
                }}
                className="hover:text-gold transition-colors duration-300"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("contact");
                }}
                className="hover:text-gold transition-colors duration-300"
              >
                Terminal Link
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-2">
          <h4 className="font-cinzel text-[11px] font-bold text-gold uppercase tracking-widest mb-4">
            Coordinates
          </h4>
          <ul className="space-y-2.5 font-outfit text-xs text-charcoal/70 dark:text-cream/80">
            <li>Durgapur, West Bengal</li>
            <li>India</li>
            <li>
              <a
                href="mailto:prajvaya@gmail.com"
                className="hover:text-gold transition-colors duration-300"
              >
                prajvaya@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="md:col-span-3">
          <h4 className="font-cinzel text-[11px] font-bold text-gold uppercase tracking-widest mb-4">
            Newsletter
          </h4>
          <p className="font-outfit text-xs text-charcoal/60 dark:text-cream/70 leading-relaxed font-light mb-4">
            Receive updates on our research archives, prototype launches, and community nodes.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-cream-dark/30 dark:bg-earth-light/35 border border-gold/15 px-3 py-2 rounded-lg font-outfit text-xs text-charcoal dark:text-cream outline-none focus:border-gold/50 flex-grow min-w-0"
              placeholder="Enter email coordinate..."
              required
            />
            <button
              type="submit"
              className="p-2.5 bg-gold hover:bg-gold-light text-charcoal-dark rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 active:scale-95"
              aria-label="Subscribe"
            >
              <Send size={12} />
            </button>
          </form>
          {newsletterStatus && (
            <span className="font-outfit text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block mt-2.5">
              {newsletterStatus}
            </span>
          )}
        </div>
      </div>

      {/* METADATA, COPYRIGHT & BACK TO TOP */}
      <div className="bg-cream-dark/30 dark:bg-earth-light/10 border-t border-gold/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-outfit text-[10px] text-charcoal/50 dark:text-cream/50 leading-relaxed font-light">
              &copy; 2026 PRAJVAYA. All rights reserved. Secure Swadeshi node.
            </span>
          </div>

          {/* Meditative quote */}
          <span className="font-cinzel text-[9px] font-bold text-gold tracking-widest uppercase italic">
            &ldquo;The future grows from remembered wisdom.&rdquo;
          </span>

          <button
            onClick={() => handleScrollTo("home")}
            className="flex items-center justify-center p-2 rounded-full border border-gold/20 text-charcoal dark:text-cream hover:bg-gold/5 hover:border-gold smooth-transition cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
