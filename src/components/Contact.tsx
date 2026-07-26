"use client";

import React, { useState, useRef } from "react";
import { Mail, Terminal } from "lucide-react";

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

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "> terminal initialized. waiting to register early supporter payload...",
  ]);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const logScreenRef = useRef<HTMLDivElement | null>(null);

  const addLogLine = (text: string, delay: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, text]);
        setTimeout(() => {
          if (logScreenRef.current) {
            logScreenRef.current.scrollTop = logScreenRef.current.scrollHeight;
          }
        }, 10);
        resolve();
      }, delay);
    });
  };

  const handleTransmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || isTransmitting) return;

    setIsTransmitting(true);
    setLogs([]);

    await addLogLine("> initiating pioneer registration sequence...", 100);
    await addLogLine(`> prajvaya --register-supporter --identity "${name.toUpperCase()}"`, 300);
    await addLogLine("> ESTABLISHING SECURE CONVERGENCE CHANNELS...", 400);
    await addLogLine(`> VERIFYING SECURITY ENDPOINT: [${email.toUpperCase()}]`, 400);
    await addLogLine(`> SYNCING COGNITIVE CONSCIOUSNESS PACKET... 0%`, 500);

    // Progress Simulation
    for (let percent = 25; percent <= 100; percent += 25) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setLogs((prev) => {
            const next = [...prev];
            next[next.length - 1] = `> SYNCING COGNITIVE CONSCIOUSNESS PACKET... ${percent}%`;
            return next;
          });
          resolve();
        }, 250);
      });
    }

    await addLogLine("> WELCOME TO THE COHORT. SIGNAL COMMITTED.", 200);
    await addLogLine(
      `> SYSTEM LOGGED: "Knowledge creates possibility. Determination creates reality. Together we rise."`,
      400
    );
    await addLogLine("> registration sequence complete. status: active supporter.", 300);

    // Reset inputs
    setName("");
    setEmail("");
    setMessage("");
    setIsTransmitting(false);
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-12 bg-cream-dark/15 dark:bg-forest-light/5 border-t border-gold/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Side Info Panel */}
        <div className="flex flex-col justify-center">
          <span className="font-outfit text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-3 block">
            Join the Pioneer Cohort
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wide text-charcoal dark:text-cream leading-tight">
            Become an Early Supporter
          </h2>
          <p className="font-outfit text-sm text-charcoal/70 dark:text-cream/80 mt-5 leading-relaxed font-light">
            Prajvaya is a community-driven movement. Register below to become an early supporter, 
            participate in alpha-testing our upcoming mindful apps, or join our local circular ecology circles.
          </p>

          {/* Contact coordinates list */}
          <div className="mt-10 space-y-4">
            <a
              href="mailto:prajvaya@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl border border-gold/10 hover:border-gold/30 bg-cream-dark/20 dark:bg-forest-light/20 hover:bg-gold/5 smooth-transition group"
            >
              <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gold/15 text-gold">
                <Mail size={16} />
              </div>
              <div>
                <span className="font-cinzel text-xs font-bold text-charcoal dark:text-cream block">
                  Direct Mailbox
                </span>
                <span className="font-outfit text-xs text-gold group-hover:underline">
                  prajvaya@gmail.com
                </span>
              </div>
            </a>

            <a
              href="https://github.com/Prajvaya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-gold/10 hover:border-gold/30 bg-cream-dark/20 dark:bg-forest-light/20 hover:bg-gold/5 smooth-transition group"
            >
              <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gold/15 text-gold">
                <GithubIcon size={16} />
              </div>
              <div>
                <span className="font-cinzel text-xs font-bold text-charcoal dark:text-cream block">
                  Vision Coordinates
                </span>
                <span className="font-outfit text-xs text-gold group-hover:underline">
                  github.com/Prajvaya
                </span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/company/prajvaya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-gold/10 hover:border-gold/30 bg-cream-dark/20 dark:bg-forest-light/20 hover:bg-gold/5 smooth-transition group"
            >
              <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gold/15 text-gold">
                <LinkedinIcon size={16} />
              </div>
              <div>
                <span className="font-cinzel text-xs font-bold text-charcoal dark:text-cream block">
                  Synergy Coordinates
                </span>
                <span className="font-outfit text-xs text-gold group-hover:underline">
                  linkedin.com/company/prajvaya
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side Interactive Terminal */}
        <div className="rounded-2xl border border-gold/20 overflow-hidden shadow-xl bg-charcoal text-cream-dark flex flex-col min-h-[450px]">
          {/* Terminal Window Header */}
          <div className="bg-charcoal-dark border-b border-gold/10 px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-1.5 font-outfit text-[10px] font-bold text-gold tracking-widest uppercase">
              <Terminal size={10} />
              <span>Prajvaya Terminal v2.0.4</span>
            </div>
            <span className="font-outfit text-[9px] text-emerald-400 font-bold tracking-widest uppercase">
              CON_SECURE
            </span>
          </div>

          {/* Terminal Input Form */}
          <form onSubmit={handleTransmit} className="p-6 flex-grow flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="font-cinzel text-[10px] font-bold text-gold uppercase tracking-wider">
                Client Identity
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isTransmitting}
                className="w-full bg-charcoal-dark border border-gold/15 px-4 py-2.5 rounded-lg font-outfit text-xs text-cream outline-none focus:border-gold/50 smooth-transition"
                placeholder="e.g., Subhajit Ghosh"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-cinzel text-[10px] font-bold text-gold uppercase tracking-wider">
                Return Frequency (Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isTransmitting}
                className="w-full bg-charcoal-dark border border-gold/15 px-4 py-2.5 rounded-lg font-outfit text-xs text-cream outline-none focus:border-gold/50 smooth-transition"
                placeholder="e.g., client@network.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-cinzel text-[10px] font-bold text-gold uppercase tracking-wider">
                Cognitive Payload (Message)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isTransmitting}
                rows={3}
                className="w-full bg-charcoal-dark border border-gold/15 px-4 py-2.5 rounded-lg font-outfit text-xs text-cream outline-none focus:border-gold/50 smooth-transition resize-none"
                placeholder="Enter transmission details..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isTransmitting}
              className="mt-2 w-full py-3 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-lg transition-all duration-300 transform active:scale-95 cursor-pointer disabled:opacity-50"
            >
              Transmit Signal
            </button>
          </form>

          {/* Terminal Console Logs Display */}
          <div
            ref={logScreenRef}
            className="bg-charcoal-dark border-t border-gold/10 p-5 h-36 overflow-y-auto font-mono text-[10px] text-left text-gold-light/70 space-y-1"
          >
            {logs.map((log, i) => (
              <p key={i} className="leading-relaxed">
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
