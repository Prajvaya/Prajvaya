"use client";

import React, { useEffect, useRef } from "react";

const SHLOKAS = [
  "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
  "तमसो मा ज्योतिर्गमय",
  "सत्यमेव जयते नानृतं",
  "विजयाय बुद्धिः",
  "संगच्छध्वं संवदध्वं सं वो मनांसि जानताम्",
  "ज्ञानं परमं बलम्",
];

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: CosmicParticle[] = [];
    const shlokas: ShlokaParticle[] = [];
    const shapes: GeometricShape[] = [];
    const waves: CosmicWave[] = [];

    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    const shapeCount = 5;
    const connectionDistance = 140;
    const mouse = { x: null as number | null, y: null as number | null, radius: 180 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // 1. Cosmic Particles (Stars)
    class CosmicParticle {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      radius!: number;
      color!: string;
      alpha!: number;
      glow!: boolean;

      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.radius = Math.random() * 1.5 + 0.5;

        // Custom Earthy Warm Colors
        const colors = [
          "#c29d66", // Gold
          "#dec095", // Cream Gold
          "#422d20", // Copper Brown
          "#163624", // Forest Green Accent
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.4 + 0.15;
        this.glow = Math.random() > 0.7;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 0.35;
            this.y += (dy / dist) * force * 0.35;
          }
        }

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
          if (Math.random() > 0.5) {
            this.x = this.vx > 0 ? 0 : width;
          } else {
            this.y = this.vy > 0 ? 0 : height;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;

        if (this.glow) {
          ctx.shadowColor = this.color;
          ctx.shadowBlur = this.radius * 3;
        }

        ctx.fill();
        ctx.restore();
      }
    }

    // 2. Drifting Outlined Triangles and Circles
    class GeometricShape {
      x!: number;
      y!: number;
      type!: "circle" | "triangle";
      size!: number;
      vx!: number;
      vy!: number;
      rotation!: number;
      rotationSpeed!: number;
      color!: string;
      alpha!: number;
      maxAlpha!: number;
      fadeSpeed!: number;
      phase!: "fade-in" | "drift" | "fade-out";
      driftDuration!: number;

      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 80 + 20;
        this.type = Math.random() > 0.5 ? "circle" : "triangle";
        this.size = Math.random() * 20 + 10;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = -0.15 - Math.random() * 0.2; // Slow upwards drift
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.004;

        const colors = ["#c29d66", "#f2ebd9", "#163624"];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.06 + 0.02;
        this.fadeSpeed = 0.001 + Math.random() * 0.001;
        this.phase = "fade-in";
        this.driftDuration = 500 + Math.random() * 500;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.phase === "fade-in") {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= this.maxAlpha) {
            this.alpha = this.maxAlpha;
            this.phase = "drift";
          }
        } else if (this.phase === "drift") {
          this.driftDuration--;
          if (this.driftDuration <= 0) {
            this.phase = "fade-out";
          }
        } else if (this.phase === "fade-out") {
          this.alpha -= this.fadeSpeed;
          if (this.alpha <= 0) {
            this.reset();
          }
        }

        if (this.y < -50 || this.x < -50 || this.x > width + 50) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.lineWidth = 0.75;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 3;

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.beginPath();
        if (this.type === "circle") {
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        } else {
          const r = this.size / 2;
          ctx.moveTo(0, -r);
          ctx.lineTo(r * 0.866, r * 0.5);
          ctx.lineTo(-r * 0.866, r * 0.5);
          ctx.closePath();
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    // 3. Floating Sanskrit Shloka Calligraphy
    class ShlokaParticle {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      text!: string;
      alpha!: number;
      maxAlpha!: number;
      fadeSpeed!: number;
      phase!: "fade-in" | "drift" | "fade-out";
      driftDuration!: number;

      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * Math.max(100, width - 400) + 20;
        this.y = height + Math.random() * 80 + 20;
        this.vx = (Math.random() - 0.5) * 0.05;
        this.vy = -0.12 - Math.random() * 0.15;
        this.text = SHLOKAS[Math.floor(Math.random() * SHLOKAS.length)];
        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.16 + 0.12; // Muted readability
        this.fadeSpeed = 0.001 + Math.random() * 0.001;
        this.phase = "fade-in";
        this.driftDuration = 600 + Math.random() * 600;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.phase === "fade-in") {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= this.maxAlpha) {
            this.alpha = this.maxAlpha;
            this.phase = "drift";
          }
        } else if (this.phase === "drift") {
          this.driftDuration--;
          if (this.driftDuration <= 0) {
            this.phase = "fade-out";
          }
        } else if (this.phase === "fade-out") {
          this.alpha -= this.fadeSpeed;
          if (this.alpha <= 0) {
            this.reset();
          }
        }

        if (this.y < -50 || this.x < -100 || this.x > width + 100) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.font = "16px var(--font-yatra), 'Yatra One', cursive";
        ctx.fillStyle = `rgba(194, 157, 102, ${this.alpha})`; // Muted Earthy Gold
        ctx.shadowColor = "rgba(194, 157, 102, 0.3)";
        ctx.shadowBlur = 8;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }

    // 4. Ambient Energy Waves
    class CosmicWave {
      y!: number;
      speed!: number;
      amplitude!: number;
      frequency!: number;
      phase!: number;
      color!: string;

      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.y = Math.random() * height;
        this.speed = Math.random() * 0.002 + 0.001;
        this.amplitude = Math.random() * 20 + 5;
        this.frequency = Math.random() * 0.0015 + 0.0005;
        this.phase = Math.random() * Math.PI * 2;

        const colors = [
          "rgba(194, 157, 102, 0.03)", // Muted gold
          "rgba(22, 54, 36, 0.03)",    // Muted forest green
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.phase += this.speed;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.0;
        ctx.beginPath();

        for (let x = 0; x < width; x += 20) {
          const waveY = this.y + Math.sin(x * this.frequency + this.phase) * this.amplitude;
          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    // 5. Holographic Mandala (Sri Yantra) spinning slowly at center
    class HolographicMandala {
      x: number;
      y: number;
      angle: number;
      rotationSpeed: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.angle = 0;
        this.rotationSpeed = 0.0002; // slow, meditative
        this.color = "#c29d66"; // Gold
        this.alpha = 0.03; // watermark
      }

      update() {
        this.x = width / 2;
        this.y = height / 2;
        this.angle += this.rotationSpeed;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.lineWidth = 0.75;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 3;

        const r = Math.min(width, height) * 0.32;

        // Bhupura (Square outer boundary)
        ctx.beginPath();
        ctx.rect(-r * 1.1, -r * 1.1, r * 2.2, r * 2.2);
        ctx.stroke();

        // Concentric Circles
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.arc(0, 0, r * 0.85, 0, Math.PI * 2);
        ctx.arc(0, 0, r * 0.7, 0, Math.PI * 2);
        ctx.stroke();

        // Overlaying Sri Yantra Triangles
        const scales = [0.7, 0.55, 0.4, 0.25];
        scales.forEach((scale) => {
          const tr = r * scale;
          // Upward
          ctx.beginPath();
          ctx.moveTo(0, -tr);
          ctx.lineTo(tr * 0.866, tr * 0.5);
          ctx.lineTo(-tr * 0.866, tr * 0.5);
          ctx.closePath();
          ctx.stroke();

          // Downward
          ctx.beginPath();
          ctx.moveTo(0, tr);
          ctx.lineTo(tr * 0.866, -tr * 0.5);
          ctx.lineTo(-tr * 0.866, -tr * 0.5);
          ctx.closePath();
          ctx.stroke();
        });

        // 8 Petals
        const petals = 8;
        for (let i = 0; i < petals; i++) {
          const petalAngle = (i * Math.PI * 2) / petals;
          ctx.save();
          ctx.rotate(petalAngle);
          ctx.beginPath();
          ctx.arc(0, -r * 0.775, r * 0.075, 0, Math.PI, true);
          ctx.stroke();
          ctx.restore();
        }

        // Center Bindu
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha * 1.8;
        ctx.fill();

        ctx.restore();
      }
    }

    // Populate objects
    for (let i = 0; i < particleCount; i++) {
      particles.push(new CosmicParticle());
    }

    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new GeometricShape());
    }

    for (let i = 0; i < 4; i++) {
      shlokas.push(new ShlokaParticle());
    }

    for (let i = 0; i < 2; i++) {
      waves.push(new CosmicWave());
    }

    const mandala = new HolographicMandala();

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Render Mandala
      mandala.update();
      mandala.draw();

      // Render Waves
      waves.forEach((wave) => {
        wave.update();
        wave.draw();
      });

      // Render Shapes
      shapes.forEach((shape) => {
        shape.update();
        shape.draw();
      });

      // Render Shlokas
      shlokas.forEach((shloka) => {
        shloka.update();
        shloka.draw();
      });

      // Render Particles & Links
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect near neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            if (mouse.x !== null && mouse.y !== null) {
              const mdx1 = mouse.x - particles[i].x;
              const mdy1 = mouse.y - particles[i].y;
              const mdist1 = Math.sqrt(mdx1 * mdx1 + mdy1 * mdy1);

              if (mdist1 < mouse.radius) {
                // Interactive glow near cursor (Gold highlights)
                ctx.strokeStyle = `rgba(194, 157, 102, ${alpha * 2.2})`;
              } else {
                ctx.strokeStyle = `rgba(66, 45, 32, ${alpha})`; // Muted brown links
              }
            } else {
              ctx.strokeStyle = `rgba(66, 45, 32, ${alpha})`;
            }

            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-cream dark:bg-earth transition-colors duration-1000">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-1000"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 w-full h-full bg-cream/65 dark:bg-earth/78 transition-colors duration-1000" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full bg-transparent opacity-85"
      />
    </div>
  );
};
