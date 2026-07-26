"use client";

import React, { useState, useEffect } from "react";
import { AudioProvider, useAudio } from "@/components/AudioDrone";
import { CanvasBackground } from "@/components/CanvasBackground";
import { LoadingProvider } from "@/components/SectionLoading";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Storytelling } from "@/components/Storytelling";
import { Philosophy } from "@/components/Philosophy";
import { ThreePillars } from "@/components/ThreePillars";
import { HowItWorks } from "@/components/HowItWorks";
import { MissionMetrics } from "@/components/MissionMetrics";
import { FocusAreas } from "@/components/FocusAreas";
import { WhyNow } from "@/components/WhyNow";
import { TimelineRoadmap } from "@/components/TimelineRoadmap";
import { Projects } from "@/components/Projects";
import { Swadeshi } from "@/components/Swadeshi";
import { Founders } from "@/components/Founders";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const SLIDES = [
  {
    title: "Epoch I: The Cosmic Cosmos",
    subtitle: "Galaxy & Cosmic Origin",
    description: "In the beginning, order emerged from the deep cosmic silence, weaving the canvas of time and space.",
    image: "/assets/galaxy_slide.png"
  },
  {
    title: "Epoch II: Divine consciousness",
    subtitle: "Gods, Goddesses & Sages",
    description: "Ancient Vedic sages realized the primary forces of nature as living deities, establishing universal harmony.",
    image: "/assets/deities_slide.png"
  },
  {
    title: "Epoch III: The Blue Oasis",
    subtitle: "Planet Earth & Solar Order",
    description: "Our pristine home materialized—a sacred biosphere suspended in the void, governed by natural rhythms.",
    image: "/assets/earth_planets_slide.png"
  },
  {
    title: "Epoch IV: Primeval Sanctuaries",
    subtitle: "Ancient Forests & Pristine Waters",
    description: "Unbroken green canopies and wild, pure rivers breathed in perfect, self-renewing balance.",
    image: "/assets/hero_forest_bg.png"
  },
  {
    title: "Epoch V: Sacred Structures",
    subtitle: "Temples & Stone Geometry",
    description: "Great stone temples rose, aligning human architecture with celestial orbits and sacred mathematics.",
    image: "/assets/deities_slide.png",
    filter: "sepia(0.65) hue-rotate(15deg) saturate(1.1) brightness(0.9)"
  },
  {
    title: "Epoch VI: Swadeshi Legacy",
    subtitle: "Indian Wisdom & History",
    description: "Centuries of sustainable living, palm scroll records, and traditional circular crafts.",
    image: "/assets/hero_forest_bg.png",
    filter: "sepia(0.55) hue-rotate(25deg) saturate(1.05) brightness(0.85)"
  }
];

const RitualOverlays: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { startAudio } = useAudio();
  const [subScene, setSubScene] = useState<"intro" | "slideshow" | "book">("intro");
  const [introOut, setIntroOut] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bookOpened, setBookOpened] = useState(false);
  const [bookFadeOut, setBookFadeOut] = useState(false);

  // Scene 1: Welcome Intro Text Delay
  useEffect(() => {
    if (subScene !== "intro") return;
    const introTimer = setTimeout(() => {
      setIntroOut(true);
      // Wait for blur transition (1.2s) before showing slideshow
      const showSlidesTimer = setTimeout(() => {
        setSubScene("slideshow");
      }, 1200);
      return () => clearTimeout(showSlidesTimer);
    }, 3800); // 3.8s welcome screen

    return () => clearTimeout(introTimer);
  }, [subScene]);

  // Scene 1.5: Slideshow player logic
  useEffect(() => {
    if (subScene !== "slideshow") return;

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === SLIDES.length - 1) {
          clearInterval(slideTimer);
          // Transitions to the book cover stage
          setTimeout(() => {
            setSubScene("book");
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 3600); // 3.6s per slide

    return () => clearInterval(slideTimer);
  }, [subScene]);

  // Scene 2: Book Cover Open handler
  const handleBookClick = () => {
    if (bookOpened) return;
    setBookOpened(true);
    startAudio(); // play sitar drone

    // Wait for cover swing transition (1.5s)
    setTimeout(() => {
      setBookFadeOut(true);
      onComplete(); // Mount main site
    }, 1500);
  };

  return (
    <>
      {/* SCENE 1: CINEMATIC WELCOME INTRO OVERLAY */}
      {subScene === "intro" && (
        <div
          id="intro-stage"
          className={`stage active ${introOut ? "intro-stage-out" : ""}`}
        >
          <div className="intro-content">
            <h1 className="intro-title" id="intro-title-text">
              WELCOME TO PRAJVAYA
            </h1>
            <p className="intro-subtitle" id="intro-subtitle-text">
              Victory Through Intellect
            </p>
          </div>
        </div>
      )}

      {/* SCENE 1.5: COSMIC HISTORY SLIDESHOW JOURNEY */}
      {subScene === "slideshow" && (
        <div className="fixed inset-0 z-[1000] bg-transparent flex flex-col justify-between p-8 text-cream select-none overflow-hidden">
          {/* Top Bar: Progress Indicator & Skip */}
          <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto pt-6">
            <div className="flex gap-2.5 items-center">
              {SLIDES.map((_, idx) => (
                <div
                  key={idx}
                  className="h-[3px] rounded-full transition-all duration-500"
                  style={{
                    width: idx === currentSlide ? "40px" : "15px",
                    backgroundColor: idx === currentSlide ? "#c29d66" : "rgba(194,157,102,0.25)"
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setSubScene("book")}
              className="px-6 py-2 border border-gold/30 hover:border-gold text-gold text-xs font-semibold tracking-widest uppercase rounded-full bg-charcoal-dark/40 hover:bg-gold/15 smooth-transition cursor-pointer"
            >
              Skip Intro
            </button>
          </div>

          {/* Center: Small translucent narrative box telling about Prajvaya */}
          <div className="relative z-10 w-full max-w-lg mx-auto p-8 rounded-2xl border border-gold/25 bg-charcoal-dark/65 backdrop-blur-lg shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center my-auto">
            <span className="font-cinzel text-xs font-bold text-gold uppercase tracking-[0.25em] mb-2.5 block animate-pulse">
              {SLIDES[currentSlide].title}
            </span>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-cream mb-4">
              {SLIDES[currentSlide].subtitle}
            </h2>
            <p className="font-outfit text-xs sm:text-sm text-cream/90 leading-relaxed font-light">
              {SLIDES[currentSlide].description}
            </p>
          </div>

          {/* Bottom Spacer to center the box vertically */}
          <div className="h-16" />
        </div>
      )}

      {/* SCENE 2: THE SACRED GEOMETRY PORTAL GATEWAY */}
      {subScene === "book" && (
        <div
          id="portal-stage"
          className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center p-6 text-cream select-none overflow-hidden transition-all duration-1000 ease-in-out ${
            bookFadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Main interactive portal button */}
          <button
            onClick={handleBookClick}
            disabled={bookOpened}
            className="group relative flex flex-col items-center justify-center cursor-pointer outline-none transition-transform duration-700 bg-transparent border-0"
            style={{
              transform: bookOpened ? "scale(2.5)" : "scale(1)",
              opacity: bookOpened ? 0 : 1,
              transition: "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-in-out",
            }}
          >
            {/* Holographic Glowing Rings */}
            <div className="absolute h-72 w-72 md:h-80 md:w-80 rounded-full border border-gold/15 group-hover:border-gold/30 animate-spin-reverse pointer-events-none transition-all duration-500" />
            <div className="absolute h-60 w-60 md:h-68 md:w-68 rounded-full border border-dashed border-gold/35 group-hover:border-gold/50 animate-spin-slow pointer-events-none transition-all duration-500" />
            <div className="absolute h-48 w-48 md:h-56 md:w-56 rounded-full bg-gold/5 blur-2xl group-hover:bg-gold/10 transition-all duration-500 pointer-events-none" />

            {/* Glowing Yantra Symbol */}
            <svg
              className="w-40 h-40 md:w-48 md:h-48 text-gold drop-shadow-[0_0_15px_rgba(194,157,102,0.35)] group-hover:drop-shadow-[0_0_25px_rgba(194,157,102,0.6)] transition-all duration-700 ease-out"
              viewBox="0 0 500 500"
              style={{
                animation: bookOpened ? "spinFast 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "rotateSlow 40s linear infinite",
              }}
            >
              <rect x="40" y="40" width="420" height="420" rx="20" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="250" cy="250" r="190" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="250" cy="250" r="150" fill="none" stroke="currentColor" strokeWidth="2" />
              <polygon points="170,185 330,185 250,335" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <polygon points="170,315 330,315 250,165" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="250" cy="250" r="3" fill="currentColor" />
            </svg>

            {/* Micro-interactive text prompt inside rings */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none transform scale-90 group-hover:scale-110">
              <span className="font-cinzel text-sm sm:text-base md:text-lg font-bold text-gold uppercase tracking-[0.35em] drop-shadow-[0_0_12px_rgba(194,157,102,0.8)] text-center px-4 animate-pulse">
                Click to enter
              </span>
            </div>
          </button>

          {/* Gateway Titles */}
          <div
            className="text-center mt-12 transition-all duration-1000 ease-out"
            style={{
              opacity: bookOpened ? 0 : 1,
              transform: bookOpened ? "translateY(20px)" : "translateY(0)"
            }}
          >
            <h2 className="font-yatra text-2xl sm:text-3xl text-gold mb-2 tracking-wide drop-shadow-[0_0_10px_rgba(194,157,102,0.2)]">
              प्राज्वय ग्रन्थः
            </h2>
            <p className="font-cinzel text-xs sm:text-sm text-cream/80 tracking-[0.25em] uppercase">
              Enter the Chronicle
            </p>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mt-4" />
          </div>
        </div>
      )}
    </>
  );
};

export default function Home() {
  const [entered, setEntered] = useState(false);

  // Disable scroll when welcoming overlays are active
  useEffect(() => {
    if (!entered) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [entered]);

  return (
    <LoadingProvider>
      <AudioProvider>
        <CanvasBackground />
        
        {/* Cinematic Welcome Stage Overlay Loop */}
        {!entered ? (
          <RitualOverlays onComplete={() => setEntered(true)} />
        ) : (
          <div id="web-content" className="visible-web relative w-full flex flex-col min-h-screen z-10">
            <Header />
            <main className="flex-grow">
              <Hero />
              <Storytelling />
              <Philosophy />
              <ThreePillars />
              <HowItWorks />
              <MissionMetrics />
              <FocusAreas />
              <WhyNow />
              <TimelineRoadmap />
              <Projects />
              <Swadeshi />
              <Founders />
              <Contact />
            </main>
            <Footer />
          </div>
        )}
      </AudioProvider>
    </LoadingProvider>
  );
}
