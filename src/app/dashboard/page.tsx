"use client";

import React, { useState, useEffect } from "react";
import { CanvasBackground } from "@/components/CanvasBackground";
import { motion } from "framer-motion";
import { User, Shield, Bell, LogOut, Loader2, CheckCircle2, AlertTriangle, Key, Edit, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "User" | "Admin";
  registrationDate: string;
  lastLogin: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Edit Profile Form States
  const [editName, setEditName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("profile");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (data.user) {
        setProfile(data.user);
        setEditName(data.user.name);
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("Failed to fetch session. Please log in again.");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setUpdating(true);

    if (activeTab === "profile") {
      if (!editName.trim()) {
        setError("Name cannot be empty.");
        setUpdating(false);
        return;
      }
      try {
        const res = await fetch("/api/auth/session", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: editName }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to update profile.");
        } else {
          setSuccess("Name updated successfully!");
          setProfile(data.user);
        }
      } catch (err) {
        setError("Update failed. Connection error.");
      } finally {
        setUpdating(false);
      }
    } else if (activeTab === "security") {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError("All password fields are required.");
        setUpdating(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New passwords do not match.");
        setUpdating(false);
        return;
      }
      if (newPassword.length < 8 || !/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
        setError("New password must be at least 8 characters and contain both letters and numbers.");
        setUpdating(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/session", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to update password.");
        } else {
          setSuccess("Password updated successfully!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      } catch (err) {
        setError("Update failed. Connection error.");
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.refresh();
      router.push("/login");
    } catch (err) {
      setError("Logout failed. Try again.");
    }
  };

  if (loadingProfile) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center select-none overflow-hidden bg-earth-dark">
        <CanvasBackground />
        <div className="relative z-10 text-gold flex flex-col items-center gap-3">
          <Loader2 className="animate-spin" size={32} />
          <span className="font-outfit text-xs tracking-widest uppercase">Initializing Cohort Console...</span>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start py-28 px-6 select-none overflow-x-hidden">
      <CanvasBackground />

      {/* Top Header Dashboard Bar */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 border-b border-gold/10 pb-6">
        <div>
          <span className="font-outfit text-[10px] font-bold text-gold uppercase tracking-[0.25em]">
            Console Node // {profile.role}
          </span>
          <h1 className="font-cinzel text-3xl font-bold tracking-wide text-cream mt-1">
            Welcome back, {profile.name}
          </h1>
        </div>
        <div className="flex gap-3">
          {profile.role === "Admin" && (
            <Link
              href="/admin"
              className="px-5 py-2.5 border border-gold/30 hover:border-gold text-gold font-outfit text-xs font-bold tracking-widest uppercase rounded-full bg-gold/5 transition-all cursor-pointer"
            >
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-rose-950/40 border border-rose-500/20 hover:border-rose-500 text-rose-300 font-outfit text-xs font-bold tracking-widest uppercase rounded-full flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-3 rounded-2xl border border-gold/15 bg-charcoal-dark/65 backdrop-blur-xl p-4">
          <button
            onClick={() => { setActiveTab("profile"); setError(""); setSuccess(""); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-outfit text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
              activeTab === "profile"
                ? "bg-gold text-charcoal-dark"
                : "text-cream/70 hover:text-gold hover:bg-gold/5"
            }`}
          >
            <User size={16} />
            <span>Profile Information</span>
          </button>

          <button
            onClick={() => { setActiveTab("security"); setError(""); setSuccess(""); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-outfit text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
              activeTab === "security"
                ? "bg-gold text-charcoal-dark"
                : "text-cream/70 hover:text-gold hover:bg-gold/5"
            }`}
          >
            <Shield size={16} />
            <span>Security & Password</span>
          </button>

          <button
            onClick={() => { setActiveTab("notifications"); setError(""); setSuccess(""); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-outfit text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
              activeTab === "notifications"
                ? "bg-gold text-charcoal-dark"
                : "text-cream/70 hover:text-gold hover:bg-gold/5"
            }`}
          >
            <Bell size={16} />
            <span>Alerts & Notifications</span>
          </button>
        </div>

        {/* Action Panel Content */}
        <div className="lg:col-span-8 rounded-2xl border border-gold/15 bg-charcoal-dark/65 backdrop-blur-xl p-8 min-h-[400px]">
          {error && (
            <div className="flex items-center gap-3 p-4 mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 font-outfit text-xs">
              <AlertTriangle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 p-4 mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-outfit text-xs">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* PROFILE INFORMATION */}
          {activeTab === "profile" && (
            <div>
              <h2 className="font-cinzel text-xl font-bold text-cream mb-6 flex items-center gap-2 border-b border-gold/10 pb-3">
                <Edit size={18} className="text-gold" />
                <span>Profile Information</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left bg-charcoal/20 p-4 rounded-xl border border-gold/5 font-outfit text-xs">
                <div className="flex flex-col gap-1">
                  <span className="text-gold uppercase tracking-wider font-semibold">Account ID</span>
                  <span className="text-cream font-mono">{profile.id}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gold uppercase tracking-wider font-semibold">Email Registry</span>
                  <span className="text-cream">{profile.email}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gold uppercase tracking-wider font-semibold">Verification Date</span>
                  <span className="text-cream flex items-center gap-1.5">
                    <Calendar size={13} className="text-emerald-400" />
                    {profile.registrationDate ? new Date(profile.registrationDate).toLocaleDateString() : "Active"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gold uppercase tracking-wider font-semibold">Last login log</span>
                  <span className="text-cream">{profile.lastLogin ? new Date(profile.lastLogin).toLocaleString() : "First Login Session"}</span>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => { setEditName(e.target.value); setError(""); }}
                    className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 font-outfit text-sm outline-none transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="px-6 py-3 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {updating ? <Loader2 className="animate-spin" size={14} /> : "Update Details"}
                </button>
              </form>
            </div>
          )}

          {/* SECURITY & PASSWORD */}
          {activeTab === "security" && (
            <div>
              <h2 className="font-cinzel text-xl font-bold text-cream mb-6 flex items-center gap-2 border-b border-gold/10 pb-3">
                <Key size={18} className="text-gold" />
                <span>Security Configuration</span>
              </h2>

              <form onSubmit={handleUpdateProfile} className="space-y-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => { setCurrentPassword(e.target.value); setError(""); }}
                    placeholder="Enter current password..."
                    className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 font-outfit text-sm outline-none transition-all placeholder:text-cream/35"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                    placeholder="Min. 8 characters (letters & numbers)"
                    className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 font-outfit text-sm outline-none transition-all placeholder:text-cream/35"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-outfit text-[11px] font-bold text-gold uppercase tracking-wider pl-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                    placeholder="Confirm new password..."
                    className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-3 px-4 font-outfit text-sm outline-none transition-all placeholder:text-cream/35"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="px-6 py-3 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {updating ? <Loader2 className="animate-spin" size={14} /> : "Update Password"}
                </button>
              </form>
            </div>
          )}

          {/* ALERTS & NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div>
              <h2 className="font-cinzel text-xl font-bold text-cream mb-6 flex items-center gap-2 border-b border-gold/10 pb-3">
                <Bell size={18} className="text-gold" />
                <span>Console Log Notifications</span>
              </h2>

              <div className="space-y-4 text-left font-outfit">
                <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-cream uppercase tracking-wide">Prajvaya Onboarding Log</h4>
                    <p className="text-[11px] text-cream/70 mt-1 leading-relaxed">
                      Verification success. Welcome to the pioneer supporter registry. Email welcome dispatch completed.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gold/10 bg-gold/5 flex items-start gap-3">
                  <Shield size={16} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-cream uppercase tracking-wide">Security Handshake Complete</h4>
                    <p className="text-[11px] text-cream/70 mt-1 leading-relaxed">
                      JWT secure session cookies established. TLS end-to-end handshake validated. Rate-limiting safeguards configured.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
