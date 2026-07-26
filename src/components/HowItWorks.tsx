"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, AlertTriangle, Sparkles, Cpu, Brain, Compass, Heart } from "lucide-react";

interface TimelineNode {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bullets: string[];
}

const TIMELINE_NODES: TimelineNode[] = [
  {
    step: "01",
    title: "Ancient Wisdom",
    description: "Humanity thrived by living in complete harmony with natural laws, guided by deep introspective science and ancestral insights.",
    icon: <BookOpen className="text-gold" size={20} />,
    bullets: ["Scriptural insights", "Harmony with natural cycles", "Self-mastery frameworks"],
  },
  {
    step: "02",
    title: "Generations of Knowledge",
    description: "Centuries of local traditions, oral histories, and sustainable craftsmanship passed down to keep community bonds strong.",
    icon: <Users className="text-gold" size={20} />,
    bullets: ["Traditional check-dams", "Local agricultural logs", "Inter-generational values"],
  },
  {
    step: "03",
    title: "Modern Challenges",
    description: "Industrial expansion and hyper-digitization created cognitive overload, isolation, burnout, and ecological separation.",
    icon: <AlertTriangle className="text-gold" size={20} />,
    bullets: ["Constant digital noise", "Stress & emotional fatigue", "Resource exploitation"],
  },
  {
    step: "04",
    title: "Birth of Prajvaya",
    description: "A convergence of engineers, creators, and researchers uniting to bring timeless Indian wisdom back into daily practical life.",
    icon: <Sparkles className="text-gold" size={20} />,
    bullets: ["Uniting tech & heritage", "Core vision formulation", "Decentralized foundations"],
  },
  {
    step: "05",
    title: "Building Meaningful Technology",
    description: "Architecting software platforms and local hardware that prioritize user attention agency, security, and digital wellness.",
    icon: <Cpu className="text-gold" size={20} />,
    bullets: ["Zero-telemetry layouts", "Mindful design interfaces", "Sovereign local nodes"],
  },
  {
    step: "06",
    title: "AI Companion & Digital Ecosystem",
    description: "Creating an emotionally intelligent, private AI assistant and wisdom archive to make classical knowledge useful in daily life.",
    icon: <Brain className="text-gold" size={20} />,
    bullets: ["Empathetic conversations", "Vedic intelligence model", "Wisdom database sync"],
  },
  {
    step: "07",
    title: "Global Community",
    description: "Expanding collaborative local circles and tool-sharing registries, helping people interact face-to-face and grow together.",
    icon: <Compass className="text-gold" size={20} />,
    bullets: ["Local circular networks", "Interactive bootcamps", "Mindful living events"],
  },
  {
    step: "08",
    title: "A Future Rooted in Wisdom",
    description: "A worldwide ecosystem where technology and wisdom empower humanity to lead balanced, purposeful, and nature-connected lives.",
    icon: <Heart className="text-gold" size={20} />,
    bullets: ["Healthier digital minds", "Sustainable local communities", "Harmonious daily living"],
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="timeline"
      className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            The Journey
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Humanity&apos;s Journey
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            From the depths of ancient alignment, through modern complexity, into a wisdom-guided digital future.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
          {TIMELINE_NODES.map((node, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group"
            >
              {/* Animated Node Circle */}
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-cream-dark dark:bg-forest-light border border-gold/30 group-hover:border-gold group-hover:shadow-[0_0_15px_rgba(194,157,102,0.25)] smooth-transition z-10 mb-6">
                {node.icon}
              </div>

              {/* Step Counter Indicator */}
              <span className="font-cinzel text-[10px] font-bold text-gold tracking-widest uppercase mb-1">
                Step {node.step}
              </span>

              {/* Title */}
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-charcoal dark:text-cream mb-3 leading-snug">
                {node.title}
              </h3>

              {/* Description */}
              <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mb-6 leading-relaxed font-light min-h-[72px]">
                {node.description}
              </p>

              {/* Details Bullet List */}
              <ul className="space-y-2 mt-auto w-full border-t border-gold/10 pt-4 text-left">
                {node.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-center gap-2 font-outfit text-xs text-charcoal/80 dark:text-cream/90"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold/70" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
