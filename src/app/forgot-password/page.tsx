"use client";

import React, { useState } from "react";
import { CanvasBackground } from "@/components/CanvasBackground";
import { motion } from "framer-motion";
import { Sparkles, Loader2, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (!email.trim()) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit request.");
      } else {
        setSuccessMsg(data.message || "Recovery code sent!");
        setTimeout(() => {
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        }, 1500);
      }
    } catch (err) {
      setError("Failed to execute password recovery. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 select-none overflow-hidden">
      <CanvasBackground />

      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/login"
          className="flex items-center gap-2 font-cinzel text-xs font-bold tracking-[0.2em] text-gold uppercase hover:text-gold-light smooth-transition"
        >
          <ArrowLeft size={12} /> Back to Login
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-gold/20 bg-charcoal-dark/75 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center"
      >
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-gold/5 border border-gold/20 mb-2">
            <Sparkles className="text-gold" size={20} />
          </div>
          <h2 className="font-cinzel text-2xl font-bold tracking-wide text-cream">
            Forgot Password
          </h2>
          <p className="font-outfit text-xs text-cream/70 font-light">
            Enter your email to receive a password reset OTP code.
          </p>
        </div>

        {successMsg && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-outfit text-xs text-left leading-relaxed">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 font-outfit text-xs text-left leading-relaxed">
            <AlertTriangle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="name@example.com"
              className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 font-outfit text-sm outline-none transition-all placeholder:text-cream/35"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3.5 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-300 transform active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <span>Send Reset Code</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
