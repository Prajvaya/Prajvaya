"use client";

import React, { useState } from "react";
import { CanvasBackground } from "@/components/CanvasBackground";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, EyeOff, Loader2, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // OTP Fallback state (if login fails because email is unverified)
  const [showOtpVerify, setShowOtpVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleResendOtp = async () => {
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: unverifiedEmail, type: "verify" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to resend OTP.");
      } else {
        setSuccessMsg(data.message || "New OTP dispatched successfully.");
        setResendCooldown(30);
      }
    } catch (err) {
      setError("Failed to resend OTP. Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (!formData.email.trim() || !formData.password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.unverified) {
          // Redirect user to verification stage directly
          setUnverifiedEmail(data.email);
          setError("");
          setSuccessMsg(data.error || "Please verify your email address.");
          setShowOtpVerify(true);
        } else {
          setError(data.error || "Login failed.");
        }
      } else {
        setSuccessMsg("Welcome back!");
        // Refresh page so cookies are updated, then redirect
        router.refresh();
        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
      }
    } catch (err) {
      setError("Network connection failure. Please try again.");
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
        body: JSON.stringify({ email: unverifiedEmail, token: otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed.");
      } else {
        setSuccessMsg(data.message || "Account activated! You may now login.");
        setShowOtpVerify(false);
        setOtp("");
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
          {!showOtpVerify ? (
            <motion.div
              key="login-form"
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
                  Welcome Back
                </h2>
                <p className="font-outfit text-xs text-cream/70 font-light">
                  Sign in to enter the Prajvaya cohort console.
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

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
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

                {/* Password */}
                <div className="flex flex-col gap-1.5 relative">
                  <div className="flex justify-between items-center px-1">
                    <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="font-outfit text-[10px] text-gold hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password..."
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

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-3.5 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-300 transform active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      <span>Secure Login</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>

              <p className="font-outfit text-xs text-cream/60 mt-8">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-gold hover:underline font-bold">
                  Register Here
                </Link>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="otp-form"
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
                  Verify Account
                </h2>
                <p className="font-outfit text-xs text-cream/70 font-light">
                  A verification OTP code has been logged to your inbox.
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
                {/* OTP Input */}
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

              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowOtpVerify(false);
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="font-outfit text-xs text-cream/60 hover:text-gold hover:underline font-bold cursor-pointer"
                >
                  Back to Login
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading || resendCooldown > 0}
                  className="font-outfit text-xs text-gold hover:text-gold-light hover:underline font-bold cursor-pointer disabled:opacity-50 disabled:no-underline"
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
