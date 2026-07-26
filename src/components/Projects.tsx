"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardTilt } from "./CardTilt";
import { ExternalLink } from "lucide-react";

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

interface Project {
  title: string;
  image: string;
  description: string;
  tags: string[];
  repoUrl: string;
}

const PROJECTS: Project[] = [
  {
    title: "Kavach SecureComm",
    image: "/assets/kavach.png",
    description: "A proof-of-concept closed-group encrypted messaging platform designed for defense personnel and families, following Zero-Trust security. Featuring a Kotlin Jetpack Compose mobile app, Android Keystore, E2E Signal Protocol encryption, a Node.js API WebSocket blind relay backend, PostgreSQL with Row-Level Security, and Keycloak OAuth authentication.",
    tags: ["Jetpack Compose", "Signal Protocol", "Zero-Trust", "WebSockets", "PostgreSQL RLS"],
    repoUrl: "https://github.com/Prajvaya/kavachsecurecom",
  },
  {
    title: "SYNRAX SS",
    image: "/assets/synrax.png",
    description: "An AI-powered, real-time event media sharing platform. Invites participants via dynamically generated QR codes for real-time WebSocket gallery uploads. Runs backend face clustering (scikit-learn) to allow participants to automatically filter photos. Structured on a Python FastAPI backend and Java Android client using Retrofit, Glide, and ML Kit scanner.",
    tags: ["FastAPI", "WebSockets", "Face Clustering", "Android ML Kit", "Python"],
    repoUrl: "https://github.com/Prajvaya/SYNRAX-SS",
  },
];

export const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative py-24 px-6 md:px-12 bg-cream-dark/15 dark:bg-forest-light/5 border-y border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Portfolio
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Technical Artifacts
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-4 leading-relaxed">
            Systems we have built to push the boundary of local software autonomy, secure encryption, and mindful computing.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
            >
              <CardTilt className="h-full flex flex-col border border-gold/10 hover:border-gold/25 shadow-md">
                {/* Visual Image container */}
                <div className="relative h-60 w-full overflow-hidden bg-charcoal">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle vignette layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/70 to-transparent" />
                </div>

                {/* Details Section */}
                <div className="p-8 flex flex-col flex-grow items-start">
                  {/* Title */}
                  <h3 className="font-cinzel text-xl font-bold text-charcoal dark:text-cream mb-4">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/85 mb-6 leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2.5 mb-8 mt-auto">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-outfit text-[9px] font-bold text-gold uppercase border border-gold/25 bg-gold/5 px-2.5 py-1 rounded-md tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-gold/30 hover:border-gold text-charcoal dark:text-cream bg-cream-dark/20 dark:bg-forest-light/20 hover:bg-gold/5 backdrop-blur-md rounded-lg font-outfit text-xs font-semibold tracking-wider uppercase smooth-transition"
                  >
                    <GithubIcon size={14} />
                    <span>View Repository</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                </div>
              </CardTilt>
            </motion.div>
          ))}
        </div>

        {/* Contributor CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-16"
        >
          <a
            href="https://forms.gle/PtnM67mhoHyVqSCn6"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-[1px] cursor-pointer"
          >
            Join as Contributor
          </a>
        </motion.div>
      </div>
    </section>
  );
};
