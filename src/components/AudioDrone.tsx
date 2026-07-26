"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  startAudio: () => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate audio elements locally (safe for SSR/Next.js)
    const audio = new Audio("/audio.mp3");
    audio.loop = true;
    audio.volume = 0.45; // Meditative soft volume
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) return;

    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      })
      .catch((err) => {
        console.warn("Autoplay block or audio error:", err);
      });
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      startAudio();
      return;
    }

    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, startAudio, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};

export const AudioControl: React.FC = () => {
  const { isPlaying, isMuted, toggleMute } = useAudio();

  return (
    <button
      onClick={toggleMute}
      className={`relative flex items-center gap-3 px-4 py-2 border rounded-full font-outfit text-xs font-semibold tracking-wider transition-all duration-500 overflow-hidden cursor-pointer select-none group border-gold/40 text-gold hover:border-gold hover:bg-gold/5 ${
        isPlaying && !isMuted ? "bg-gold/5" : ""
      }`}
      aria-label="Toggle Ambient Audio"
    >
      {/* Ambient Pulse Beacon */}
      <span className="relative flex h-2 w-2">
        {isPlaying && !isMuted ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold/50"></span>
        )}
      </span>

      <span className="uppercase tracking-widest text-[10px]">
        {!isPlaying ? "PLAY AUDIO" : isMuted ? "AUDIO: MUTED" : "AUDIO: ON"}
      </span>

      {/* Visual Audio Bars (micro-animation) */}
      <div className="flex items-end gap-[2px] h-3 w-4">
        <span
          className={`w-[2px] bg-gold rounded-full transition-all duration-300 ${
            isPlaying && !isMuted ? "animate-bar-1" : "h-[2px]"
          }`}
          style={{ height: isPlaying && !isMuted ? undefined : "2px" }}
        />
        <span
          className={`w-[2px] bg-gold rounded-full transition-all duration-300 ${
            isPlaying && !isMuted ? "animate-bar-2" : "h-[2px]"
          }`}
          style={{ height: isPlaying && !isMuted ? undefined : "2px" }}
        />
        <span
          className={`w-[2px] bg-gold rounded-full transition-all duration-300 ${
            isPlaying && !isMuted ? "animate-bar-3" : "h-[2px]"
          }`}
          style={{ height: isPlaying && !isMuted ? undefined : "2px" }}
        />
      </div>

      <style jsx global>{`
        @keyframes soundBar1 {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        @keyframes soundBar2 {
          0%, 100% { height: 10px; }
          50% { height: 4px; }
        }
        @keyframes soundBar3 {
          0%, 100% { height: 6px; }
          50% { height: 12px; }
        }
        .animate-bar-1 {
          animation: soundBar1 1.2s ease-in-out infinite;
        }
        .animate-bar-2 {
          animation: soundBar2 0.8s ease-in-out infinite;
        }
        .animate-bar-3 {
          animation: soundBar3 1.0s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
};
