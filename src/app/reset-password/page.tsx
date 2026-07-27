"use client";

import React, { useState, useEffect, Suspense } from "react";
import { CanvasBackground } from "@/components/CanvasBackground";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff, Loader2, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setFormData((prev) => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (!formData.email || !formData.token || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8 || !/[a-zA-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      setError("New password must be at least 8 characters and contain both letters and numbers.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Reset failed.");
      } else {
        setSuccessMsg(data.message || "Password updated successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err) {
      setError("Network error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          Reset Password
        </h2>
        <p className="font-outfit text-xs text-cream/70 font-light">
          Enter the OTP code received and set a new password.
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 font-outfit text-sm outline-none transition-all placeholder:text-cream/35"
            required
          />
        </div>

        {/* OTP code */}
        <div className="flex flex-col gap-1.5">
          <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
            OTP Recovery Code
          </label>
          <input
            type="text"
            name="token"
            value={formData.token}
            onChange={(e) => {
              setFormData({ ...formData, token: e.target.value.replace(/\D/g, "") });
              setError("");
            }}
            maxLength={6}
            placeholder="6-digit reset code..."
            className="w-full text-center tracking-[0.2em] bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 font-outfit text-sm outline-none transition-all placeholder:text-cream/35 placeholder:tracking-normal font-bold"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5 relative">
          <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
            New Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 8 chars (letter & number)"
              className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 pr-12 font-outfit text-sm outline-none transition-all placeholder:text-cream/35"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50 hover:text-gold cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5 relative">
          <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
            Confirm New Password
          </label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Verify new password..."
              className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 pr-12 font-outfit text-sm outline-none transition-all placeholder:text-cream/35"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/50 hover:text-gold cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
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
              <span>Reset Password</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default function ResetPassword() {
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

      <Suspense fallback={
        <div className="relative z-10 text-gold flex flex-col items-center gap-3">
          <Loader2 className="animate-spin" size={32} />
          <span className="font-outfit text-xs tracking-widest uppercase">Loading parameters...</span>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
