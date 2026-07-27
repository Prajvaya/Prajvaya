"use client";

import React, { useState } from "react";
import { CanvasBackground } from "@/components/CanvasBackground";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, EyeOff, Loader2, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State machine: "register" -> "verify" -> "success"
  const [step, setStep] = useState<"register" | "verify" | "success">("register");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation checks
    if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
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
      setError("Password must be at least 8 characters and contain both letters and numbers.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to register.");
      } else {
        setSuccessMsg(data.message || "Registration successful!");
        setStep("verify");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, token: otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed.");
      } else {
        setStep("success");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 select-none overflow-hidden">
      <CanvasBackground />

      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 font-cinzel text-xs font-bold tracking-[0.2em] text-gold uppercase hover:text-gold-light smooth-transition"
        >
          <ArrowLeft size={12} /> Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-gold/20 bg-charcoal-dark/75 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center"
      >
        <AnimatePresence mode="wait">
          {/* STEP 1: REGISTRATION FORM */}
          {step === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center gap-2 mb-8">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-gold/5 border border-gold/20 mb-2">
                  <Sparkles className="text-gold" size={20} />
                </div>
                <h2 className="font-cinzel text-2xl font-bold tracking-wide text-cream">
                  Create Account
                </h2>
                <p className="font-outfit text-xs text-cream/70 font-light">
                  Join the cohort bridging ancient wisdom & tech.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 font-outfit text-xs text-left leading-relaxed">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name..."
                    className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 font-outfit text-sm outline-none transition-all placeholder:text-cream/35"
                    required
                  />
                </div>

                {/* Email Address */}
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

                {/* Password */}
                <div className="flex flex-col gap-1.5 relative">
                  <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
                    Password
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
                    Confirm Password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Verify your password..."
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

                {/* Register Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-3.5 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-300 transform active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      <span>Register Account</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              <p className="font-outfit text-xs text-cream/60 mt-8">
                Already registered?{" "}
                <Link href="/login" className="text-gold hover:underline font-bold">
                  Login Here
                </Link>
              </p>
            </motion.div>
          )}

          {/* STEP 2: OTP VERIFICATION FORM */}
          {step === "verify" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center gap-2 mb-8">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-gold/5 border border-gold/20 mb-2">
                  <Sparkles className="text-gold" size={20} />
                </div>
                <h2 className="font-cinzel text-2xl font-bold tracking-wide text-cream">
                  Verify Email
                </h2>
                <p className="font-outfit text-xs text-cream/70 font-light">
                  A verification code has been logged to your inbox.
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

              <form onSubmit={handleVerifySubmit} className="space-y-6 text-left">
                {/* OTP Code */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
                    OTP Verification Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, ""));
                      setError("");
                    }}
                    maxLength={6}
                    placeholder="Enter 6-digit code..."
                    className="w-full text-center tracking-[0.5em] bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 font-outfit text-lg font-bold outline-none transition-all placeholder:text-cream/35 placeholder:tracking-normal"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-300 transform active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      <span>Activate Account</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              <button
                type="button"
                onClick={() => setStep("register")}
                className="mt-6 font-outfit text-xs text-gold hover:underline font-bold cursor-pointer"
              >
                Back to Registration
              </button>
            </motion.div>
          )}

          {/* STEP 3: REGISTRATION COMPLETE SUCCESS */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-6"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 rounded-full flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <h2 className="font-cinzel text-2xl font-bold tracking-wide text-cream">
                  Verification Complete
                </h2>
                <p className="font-outfit text-sm text-cream/80 max-w-sm mt-2 leading-relaxed">
                  Your email has been verified successfully. Your Prajvaya cohort account is now activated.
                </p>
                
                <button
                  onClick={() => router.push("/login")}
                  className="w-full mt-10 py-3.5 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-300 transform active:scale-95"
                >
                  <span>Login to Dashboard</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
