"use client";

import React, { useRef, useState } from "react";

interface CardTiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees
}

export const CardTilt: React.FC<CardTiltProps> = ({
  children,
  className = "",
  maxTilt = 7,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within the element
    const y = e.clientY - rect.top;  // y coordinate within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles based on cursor position relative to card center
    const rotateX = ((centerY - y) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.1s ease-out",
    });

    const percentageX = (x / rect.width) * 100;
    const percentageY = (y / rect.height) * 100;

    setGlareStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255, 255, 255, 0.08) 0%, transparent 80%)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s ease",
    });
    setGlareStyle({
      opacity: 0,
      transition: "opacity 0.5s ease",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-gold/15 bg-cream-dark/30 dark:bg-forest-light/30 backdrop-blur-md smooth-transition shadow-lg ${className}`}
      style={tiltStyle}
      {...props}
    >
      {/* Glare Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={glareStyle}
      />
      {children}
    </div>
  );
};
