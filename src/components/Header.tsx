"use client";

import React, { useState, useEffect } from "react";
import { AudioControl } from "./AudioDrone";
import { Menu, X } from "lucide-react";
import { useLoading } from "./SectionLoading";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const { triggerLoading } = useLoading();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        // No session found
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.refresh();
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section highlighters
      const sections = [
        "home", 
        "vision", 
        "philosophy", 
        "ecosystem", 
        "pillar", 
        "timeline", 
        "core-initiatives", 
        "roadmap", 
        "projects", 
        "swadeshi", 
        "founders", 
        "contact"
      ];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allNavLinks = [
    { label: "Home", href: "#home", id: "home", primary: true },
    { label: "Vision", href: "#vision", id: "vision", primary: true },
    { label: "Philosophy", href: "#philosophy", id: "philosophy", primary: false },
    { label: "Ecosystem", href: "#ecosystem", id: "ecosystem", primary: true },
    { label: "Pillars", href: "#pillar", id: "pillar", primary: false },
    { label: "Timeline", href: "#timeline", id: "timeline", primary: false },
    { label: "Initiatives", href: "#core-initiatives", id: "core-initiatives", primary: true },
    { label: "Roadmap", href: "#roadmap", id: "roadmap", primary: false },
    { label: "Projects", href: "#projects", id: "projects", primary: true },
    { label: "Swadeshi", href: "#swadeshi", id: "swadeshi", primary: true },
    { label: "Founders", href: "#founders", id: "founders", primary: false },
    { label: "Terminal", href: "#contact", id: "contact", primary: true },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    triggerLoading(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "py-2.5 bg-cream/90 dark:bg-earth/95 backdrop-blur-xl shadow-md border-gold/20"
          : "py-3 bg-earth-dark/40 backdrop-blur-md border-gold/10"
      }`}
    >
      <div className="w-full px-4 md:px-8 xl:px-10 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-2.5 group select-none cursor-pointer shrink-0"
        >
          <div className="h-8 w-8 rounded-full overflow-hidden border border-gold/30 p-0.5 bg-gold/5 flex items-center justify-center shrink-0">
            <img src="/assets/logo.png" alt="Prajvaya Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-sm font-extrabold tracking-[0.18em] text-charcoal dark:text-cream leading-tight">
              PRAJVAYA
            </span>
            <span className="font-outfit text-[8px] font-semibold tracking-[0.2em] text-gold uppercase leading-none mt-[1px]">
              Victory through Intellect
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Responsive display for laptops vs widescreen) */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5">
          <ul className="flex items-center gap-2 xl:gap-3.5">
            {allNavLinks.map((link) => (
              <li key={link.id} className={link.primary ? "block" : "hidden xl:block"}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-outfit text-[11px] xl:text-xs font-semibold tracking-wider uppercase transition-colors duration-300 relative py-1 hover:text-gold ${
                    activeSection === link.id
                      ? "text-gold"
                      : "text-charcoal/80 dark:text-cream/80"
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Telemetry and Controls */}
        <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 lg:ml-2 shrink-0">
          <AudioControl />

          {/* Dynamic Session Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="font-outfit text-[10px] xl:text-[11px] font-bold tracking-wider uppercase text-gold hover:text-gold-light smooth-transition"
                >
                  Console
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-rose-950/20 hover:bg-rose-900/40 border border-rose-500/20 hover:border-rose-500 text-rose-300 font-outfit text-[10px] xl:text-[11px] font-bold tracking-wider uppercase rounded-full smooth-transition cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="font-outfit text-[10px] xl:text-[11px] font-bold tracking-wider uppercase text-cream/80 hover:text-gold smooth-transition whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1 border border-gold/30 hover:border-gold text-gold font-outfit text-[10px] xl:text-[11px] font-bold tracking-wider uppercase rounded-full bg-gold/10 hover:bg-gold hover:text-charcoal-dark smooth-transition whitespace-nowrap shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="sm:hidden">
            <AudioControl />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 border rounded-full border-gold/20 text-charcoal dark:text-cream hover:bg-gold/5 smooth-transition"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 right-0 border-b border-gold/15 bg-cream/95 dark:bg-forest/98 backdrop-blur-xl transition-all duration-300 py-6 px-8 flex flex-col gap-6 shadow-xl">
          <ul className="flex flex-col gap-4">
            {allNavLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`block font-outfit text-sm font-semibold tracking-widest uppercase hover:text-gold py-2 ${
                    activeSection === link.id
                      ? "text-gold pl-2 border-l border-gold"
                      : "text-charcoal/80 dark:text-cream/80"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-end gap-4 pt-4 border-t border-gold/10 w-full">
            {/* Mobile Auth Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-outfit text-xs font-bold tracking-widest uppercase text-gold py-1"
                  >
                    Console
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="px-4 py-1.5 bg-rose-950/20 border border-rose-500/20 text-rose-300 font-outfit text-xs font-bold tracking-widest uppercase rounded-full cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-outfit text-xs font-bold tracking-widest uppercase text-charcoal/80 dark:text-cream/80 py-1"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-1.5 border border-gold/30 hover:border-gold text-gold font-outfit text-xs font-bold tracking-widest uppercase rounded-full bg-gold/5 smooth-transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
