"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardTilt } from "./CardTilt";
import { Mail, Cpu, BrainCircuit } from "lucide-react";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Founder {
  name: string;
  role: string;
  image: string;
  bio: string;
  focus: string;
  email: string;
  github: string;
  linkedin: string;
  icon: React.ReactNode;
}

const FOUNDERS: Founder[] = [
  {
    name: "Subhajit Ghosh",
    role: "Co-Founder & Chief Architect",
    image: "/assets/subhajit.png",
    bio: "Robotics and IoT Developer passionate about Embedded Systems and hardware-software integration. Currently pursuing his engineering degree, he designs automated drone nodes, smart environmental sensors, and civic telemetry networks. He leads the development of physical Swadeshi hardware layers.",
    focus: "Robotics, IoT Automation & Embedded C++",
    email: "subhajit.ghosh.dev@gmail.com",
    github: "https://github.com/subhajit-ghosh-dev",
    linkedin: "https://www.linkedin.com/in/subhajit-ghosh-a17104348/",
    icon: <Cpu className="text-gold" size={16} />,
  },
  {
    name: "Survi Mukherjee",
    role: "Co-Founder & Director of AI",
    image: "/assets/survi.png",
    bio: "Full-Stack Developer and Machine Learning researcher graduating in CSE '26. An active community organizer with GDG Durgapur and published IEEE CIACON author, she focuses on computer vision models, data pipelines, and full-stack software systems that drive Prajvaya's digital wellness platforms.",
    focus: "Full-Stack Web, ML Research & Computer Vision",
    email: "survi.mukherjee09@gmail.com",
    github: "https://github.com/survi09mukherjee",
    linkedin: "https://www.linkedin.com/in/survi-mukherjee-8302272a3",
    icon: <BrainCircuit className="text-gold" size={16} />,
  },
];

export const Founders: React.FC = () => {
  return (
    <section
      id="founders"
      className="relative py-24 px-6 md:px-12 bg-cream-dark/10 dark:bg-forest-light/5 border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Synergistic Alliance
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Our Co-Founders
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            The engineering minds directing the software, hardware, and research architectures of the movement.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {FOUNDERS.map((founder, idx) => (
            <div key={idx}>
              <CardTilt className="h-full p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 border border-gold/10 hover:border-gold/25 shadow-md">
                {/* Founder Photo */}
                <div className="h-32 w-32 rounded-full overflow-hidden bg-charcoal border border-gold/20 flex-shrink-0 relative group">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gold/5 mix-blend-color pointer-events-none" />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow items-center sm:items-start text-center sm:text-left">
                  {/* Name and Role */}
                  <h3 className="font-cinzel text-lg font-bold text-charcoal dark:text-cream leading-snug">
                    {founder.name}
                  </h3>
                  <span className="font-outfit text-xs font-semibold text-gold tracking-wide mt-1">
                    {founder.role}
                  </span>

                  {/* Bio */}
                  <p className="font-outfit text-xs text-charcoal/70 dark:text-cream/85 my-4 leading-relaxed font-light">
                    {founder.bio}
                  </p>

                  {/* Tech Focus Block */}
                  <div className="flex items-center gap-2 border border-gold/15 bg-gold/5 px-3 py-1.5 rounded-lg w-full mb-5 text-[10px] text-charcoal/80 dark:text-cream/90 font-outfit font-medium">
                    {founder.icon}
                    <span className="truncate">{founder.focus}</span>
                  </div>

                  {/* Social and Communication links */}
                  <div className="flex items-center gap-4 mt-auto">
                    <a
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border rounded-full border-gold/20 text-charcoal/70 dark:text-cream/70 hover:text-gold hover:border-gold hover:bg-gold/5 smooth-transition"
                      aria-label="GitHub Profile"
                    >
                      <GithubIcon size={14} />
                    </a>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border rounded-full border-gold/20 text-charcoal/70 dark:text-cream/70 hover:text-gold hover:border-gold hover:bg-gold/5 smooth-transition"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedinIcon size={14} />
                    </a>
                    <a
                      href={`mailto:${founder.email}`}
                      className="p-2 border rounded-full border-gold/20 text-charcoal/70 dark:text-cream/70 hover:text-gold hover:border-gold hover:bg-gold/5 smooth-transition"
                      aria-label="Email Link"
                    >
                      <Mail size={14} />
                    </a>
                  </div>
                </div>
              </CardTilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
