"use client";

import React, { useState, useEffect } from "react";
import { CanvasBackground } from "@/components/CanvasBackground";
import { motion } from "framer-motion";
import { Users, Mail, BarChart3, Search, Download, ShieldCheck, ToggleLeft, ToggleRight, Loader2, ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  registrationDate: string;
  lastLogin: string;
  status: "Active" | "Disabled";
  role: "User" | "Admin";
}

interface AdminSubscriber {
  id: string;
  email: string;
  subscriptionDate: string;
  verified: boolean;
}

interface AdminStats {
  totalUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  disabledUsers: number;
  totalSubscribers: number;
  verifiedSubscribers: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "subscribers" | "statistics">("users");

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to load admin registry.");
        // Redirect to dashboard if they are forbidden
        if (res.status === 403) {
          setTimeout(() => router.push("/dashboard"), 2000);
        }
      } else {
        setUsers(data.users);
        setSubscribers(data.subscribers);
        setStats(data.statistics);
      }
    } catch (err) {
      setError("Connection failure. Failed to query server.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: "Active" | "Disabled") => {
    setError("");
    setSuccess("");
    const newStatus = currentStatus === "Active" ? "Disabled" : "Active";
    
    try {
      const res = await fetch("/api/admin/data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: userId, status: newStatus }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to update user status.");
      } else {
        setSuccess(`User status changed successfully to ${newStatus}.`);
        // Update local state instantly
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
        if (stats) {
          setStats({
            ...stats,
            disabledUsers: stats.disabledUsers + (newStatus === "Disabled" ? 1 : -1)
          });
        }
      }
    } catch (err) {
      setError("Failed to execute toggle command. Try again.");
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      setError("No record data available to export.");
      return;
    }
    setError("");
    try {
      const headers = Object.keys(data[0]).join(",");
      const rows = data.map((item) =>
        Object.values(item)
          .map((val) => `"${String(val).replace(/"/g, '""')}"`)
          .join(",")
      );
      const csvContent = [headers, ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setSuccess(`${filename} exported successfully.`);
    } catch (err) {
      setError("CSV compilation error.");
    }
  };

  // Filter users based on query
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter subscribers based on query
  const filteredSubscribers = subscribers.filter(s =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center select-none overflow-hidden bg-earth-dark">
        <CanvasBackground />
        <div className="relative z-10 text-gold flex flex-col items-center gap-3">
          <Loader2 className="animate-spin" size={32} />
          <span className="font-outfit text-xs tracking-widest uppercase">Querying Central Database...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start py-28 px-6 select-none overflow-x-hidden">
      <CanvasBackground />

      {/* Top Breadcrumb Bar */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 border-b border-gold/10 pb-6">
        <div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-cinzel text-[10px] font-bold text-gold uppercase tracking-[0.2em] hover:text-gold-light smooth-transition mb-2"
          >
            <ArrowLeft size={10} /> User Console
          </Link>
          <h1 className="font-cinzel text-3xl font-bold tracking-wide text-cream">
            Cohort Registry Panel
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => exportToCSV(users, "prajvaya_users.csv")}
            className="px-5 py-2.5 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold tracking-widest uppercase rounded-full flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md"
          >
            <Download size={13} />
            <span>Export Users</span>
          </button>
          <button
            onClick={() => exportToCSV(subscribers, "prajvaya_newsletter_subscribers.csv")}
            className="px-5 py-2.5 border border-gold/30 hover:border-gold text-gold font-outfit text-xs font-bold tracking-widest uppercase rounded-full bg-gold/5 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Download size={13} />
            <span>Export Subscribers</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 font-outfit text-xs text-left">
            <AlertTriangle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-outfit text-xs text-left">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Quick Stats Banner */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-2xl border border-gold/15 bg-charcoal-dark/65 backdrop-blur-xl p-5 flex items-center justify-between text-left">
              <div>
                <span className="font-outfit text-[10px] font-bold text-gold uppercase tracking-wider">Registered Cohorts</span>
                <h3 className="font-cinzel text-3xl font-bold text-cream mt-1">{stats.totalUsers}</h3>
                <span className="text-[10px] text-cream/50 font-outfit mt-1 block">Verified: {stats.verifiedUsers}</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-gold/5 border border-gold/15 flex items-center justify-center text-gold">
                <Users size={20} />
              </div>
            </div>

            <div className="rounded-2xl border border-gold/15 bg-charcoal-dark/65 backdrop-blur-xl p-5 flex items-center justify-between text-left">
              <div>
                <span className="font-outfit text-[10px] font-bold text-gold uppercase tracking-wider">Newsletter Subscribers</span>
                <h3 className="font-cinzel text-3xl font-bold text-cream mt-1">{stats.totalSubscribers}</h3>
                <span className="text-[10px] text-cream/50 font-outfit mt-1 block">Verified Logs: {stats.verifiedSubscribers}</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-gold/5 border border-gold/15 flex items-center justify-center text-gold">
                <Mail size={20} />
              </div>
            </div>

            <div className="rounded-2xl border border-gold/15 bg-charcoal-dark/65 backdrop-blur-xl p-5 flex items-center justify-between text-left">
              <div>
                <span className="font-outfit text-[10px] font-bold text-gold uppercase tracking-wider">Security State</span>
                <h3 className="font-cinzel text-xl font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
                  <ShieldCheck size={18} /> Enabled
                </h3>
                <span className="text-[10px] text-cream/50 font-outfit mt-1 block">Disabled Users: {stats.disabledUsers}</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={20} />
              </div>
            </div>
          </div>
        )}

        {/* Tab Controls and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 bg-charcoal-dark/45 border border-gold/10 rounded-2xl p-4">
          <div className="flex gap-2">
            <button
              onClick={() => { setActiveTab("users"); setSearchQuery(""); }}
              className={`px-4 py-2 rounded-lg font-outfit text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "users" ? "bg-gold text-charcoal-dark" : "text-cream/70 hover:text-gold"
              }`}
            >
              Registered Cohorts
            </button>
            <button
              onClick={() => { setActiveTab("subscribers"); setSearchQuery(""); }}
              className={`px-4 py-2 rounded-lg font-outfit text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "subscribers" ? "bg-gold text-charcoal-dark" : "text-cream/70 hover:text-gold"
              }`}
            >
              Newsletter Logs
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder={`Search by ${activeTab === "users" ? "name or email" : "email"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-charcoal/40 border border-gold/15 focus:border-gold/50 text-cream rounded-xl py-2.5 pl-10 pr-4 font-outfit text-xs outline-none transition-all placeholder:text-cream/35"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/35" size={14} />
          </div>
        </div>

        {/* Table Content */}
        <div className="rounded-2xl border border-gold/15 bg-charcoal-dark/65 backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto w-full">
            {activeTab === "users" ? (
              <table className="w-full text-left font-outfit text-xs">
                <thead>
                  <tr className="border-b border-gold/15 bg-charcoal/30 text-gold uppercase tracking-wider font-bold">
                    <th className="p-4">Cohort Name</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Verify Status</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Created Date</th>
                    <th className="p-4 text-center">Account Switch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5 text-cream/80">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-cream/45">No registered cohorts match your query.</td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gold/5 transition-all">
                        <td className="p-4 font-semibold text-cream">{u.name}</td>
                        <td className="p-4 font-mono">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.emailVerified ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}>
                            {u.emailVerified ? "Verified" : "Pending"}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-gold">{u.role}</td>
                        <td className="p-4">{new Date(u.registrationDate).toLocaleDateString()}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleToggleUserStatus(u.id, u.status)}
                            className="cursor-pointer hover:text-gold transition-all"
                            title={u.status === "Active" ? "Disable User" : "Enable User"}
                          >
                            {u.status === "Active" ? (
                              <span className="flex items-center justify-center gap-1.5 text-emerald-400">
                                <ToggleRight size={20} />
                                <span className="text-[9px] uppercase font-bold">Active</span>
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-1.5 text-rose-400">
                                <ToggleLeft size={20} />
                                <span className="text-[9px] uppercase font-bold">Disabled</span>
                              </span>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left font-outfit text-xs">
                <thead>
                  <tr className="border-b border-gold/15 bg-charcoal/30 text-gold uppercase tracking-wider font-bold">
                    <th className="p-4">Subscriber ID</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Verify Status</th>
                    <th className="p-4">Subscribed Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5 text-cream/80">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-cream/45">No subscriber records match your query.</td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((s) => (
                      <tr key={s.id} className="hover:bg-gold/5 transition-all">
                        <td className="p-4 font-mono">{s.id}</td>
                        <td className="p-4 font-semibold text-cream">{s.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.verified ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}>
                            {s.verified ? "Verified" : "Pending"}
                          </span>
                        </td>
                        <td className="p-4">{new Date(s.subscriptionDate).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
