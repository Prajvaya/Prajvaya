"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  HeartHandshake, 
  Leaf, 
  BookOpen, 
  Activity, 
  GraduationCap, 
  Palette, 
  X, 
  Send, 
  BrainCircuit, 
  Database, 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  Trash2, 
  Edit3, 
  Download, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Sliders
} from "lucide-react";
import { COMPANIONS, COMPANION_LIST } from "@/lib/prajvaya-ai/companions";
import { CompanionId, MemoryItem, PrajvayaMessage } from "@/lib/prajvaya-ai/types";
import { memoryStore } from "@/lib/prajvaya-ai/memory-store";

interface PrajvayaAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMPANION_ICONS: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={18} />,
  HeartHandshake: <HeartHandshake size={18} />,
  Leaf: <Leaf size={18} />,
  BookOpen: <BookOpen size={18} />,
  Activity: <Activity size={18} />,
  GraduationCap: <GraduationCap size={18} />,
  Palette: <Palette size={18} />
};

export const PrajvayaAIModal: React.FC<PrajvayaAIModalProps> = ({ isOpen, onClose }) => {
  const [activeCompanion, setActiveCompanion] = useState<CompanionId>("master");
  const [messages, setMessages] = useState<PrajvayaMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Controls & Modals
  const [showReasoningMap, setShowReasoningMap] = useState<Record<string, boolean>>({});
  const [showMemoryDrawer, setShowMemoryDrawer] = useState(false);
  const [completedActionItems, setCompletedActionItems] = useState<Record<string, boolean>>({});

  // Memory Store States
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  
  // New Memory Manual Form
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newCategory, setNewCategory] = useState<MemoryItem["category"]>("goal");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize Memory and Welcome Message
  useEffect(() => {
    if (typeof window !== "undefined") {
      const settings = memoryStore.getSettings();
      setMemoryEnabled(settings.enabled);
      setMemories(memoryStore.getMemories());
    }

    setMessages([
      {
        id: "msg_welcome",
        sender: "prajvaya",
        content: `Namaste! 🌱 Welcome to **Prajvaya AI Platform**.\n\nI am your companion, designed from first principles to bridge timeless classical Indian wisdom with modern scientific evidence. I operate without third-party tracking or commercial LLM API dependencies.\n\nYou can select specialized guides above (like **Jeevan** for habits, **Prakriti** for eco-living, or **Parampara** for heritage) or ask me anything directly!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        companionId: "master"
      }
    ]);
  }, []);

  // Auto Scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Lock Body Scroll when Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Refresh Memory List
  const refreshMemories = () => {
    setMemories(memoryStore.getMemories());
  };

  // Toggle Memory Enabled
  const handleToggleMemory = () => {
    const nextState = !memoryEnabled;
    setMemoryEnabled(nextState);
    memoryStore.saveSettings({ enabled: nextState, allowAutoSave: nextState });
  };

  // Add Manual Memory
  const handleAddManualMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;
    memoryStore.addMemory({
      key: newKey.trim(),
      value: newValue.trim(),
      category: newCategory,
      companionSource: activeCompanion
    });
    setNewKey("");
    setNewValue("");
    refreshMemories();
  };

  // Delete Memory
  const handleDeleteMemory = (id: string) => {
    memoryStore.deleteMemory(id);
    refreshMemories();
  };

  // Save Edit Memory
  const handleSaveEditMemory = (id: string) => {
    if (editValue.trim()) {
      memoryStore.updateMemory(id, editValue.trim());
    }
    setEditingMemoryId(null);
    setEditValue("");
    refreshMemories();
  };

  // Export Memories
  const handleExportMemories = () => {
    const jsonStr = memoryStore.exportMemoriesJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prajvaya-memories-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Toggle Checklist item
  const toggleActionItem = (msgId: string, itemIdx: number) => {
    const key = `${msgId}_${itemIdx}`;
    setCompletedActionItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Toggle Reasoning Dropdown
  const toggleReasoningMap = (msgId: string) => {
    setShowReasoningMap((prev) => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  // Send Message Handler
  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || input.trim();
    if (!textToSend || loading) return;

    const userMsgId = "usr_" + Date.now();
    const newMsg: PrajvayaMessage = {
      id: userMsgId,
      sender: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          companionId: activeCompanion,
          memories: memoryEnabled ? memories : [],
          memoryEnabled
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process reasoning.");
      }

      const botMsgId = "ai_" + Date.now();
      const botMsg: PrajvayaMessage = {
        id: botMsgId,
        sender: "prajvaya",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        companionId: data.activeCompanion,
        collaborators: data.collaboratingCompanions,
        reasoningChain: data.reasoningChain,
        recalledMemories: data.recalledMemoriesUsed,
        evidenceBadge: data.evidenceBadge,
        actionPlan: data.actionPlan
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: "err_" + Date.now(),
          sender: "prajvaya",
          content: "I encountered an error executing the local reasoning pipeline. Please try asking again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          companionId: activeCompanion
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const currentComp = COMPANIONS[activeCompanion];

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-charcoal-dark/95 backdrop-blur-md">
      {/* Outer Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] p-2.5 rounded-full bg-charcoal border border-gold/30 text-gold hover:bg-gold hover:text-charcoal-dark smooth-transition cursor-pointer shadow-lg"
        aria-label="Close Prajvaya AI"
      >
        <X size={20} />
      </button>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl bg-charcoal border border-gold/25 rounded-3xl overflow-hidden flex flex-col h-[92vh] max-h-[900px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative"
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-gold/15 bg-charcoal-dark/60">
          <div className="flex items-center gap-3">
            <div 
              className="h-10 w-10 rounded-xl flex items-center justify-center border shadow-sm transition-colors"
              style={{ backgroundColor: `${currentComp.accentColor}15`, borderColor: `${currentComp.accentColor}40`, color: currentComp.accentColor }}
            >
              {COMPANION_ICONS[currentComp.iconName] || <Sparkles size={20} />}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg font-bold text-cream">Prajvaya AI</h2>
                <span 
                  className="font-outfit text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                  style={{ backgroundColor: `${currentComp.accentColor}20`, borderColor: `${currentComp.accentColor}40`, color: currentComp.accentColor }}
                >
                  {currentComp.sanskritTitle}
                </span>
              </div>
              <span className="font-outfit text-[11px] text-cream/70 font-light">
                {currentComp.role} • Zero External API Dependencies
              </span>
            </div>
          </div>

          {/* Action Bar Right */}
          <div className="flex items-center gap-2.5">
            {/* Memory Control Pill */}
            <button
              onClick={() => setShowMemoryDrawer(true)}
              className={`px-3 py-1.5 rounded-full border font-outfit text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 smooth-transition cursor-pointer ${
                memoryEnabled 
                  ? "bg-gold/10 border-gold/40 text-gold hover:bg-gold/20" 
                  : "bg-charcoal-dark border-cream/20 text-cream/50 hover:border-cream/40"
              }`}
            >
              <Database size={12} />
              <span>Memory: {memoryEnabled ? `ON (${memories.length})` : "OFF"}</span>
            </button>

            {/* Privacy Manager Button */}
            <button
              onClick={() => setShowMemoryDrawer(true)}
              className="p-2 rounded-full bg-charcoal-dark border border-gold/20 text-gold hover:bg-gold/10 smooth-transition cursor-pointer"
              title="Memory & Privacy Settings"
            >
              <Sliders size={15} />
            </button>
          </div>
        </div>

        {/* Companion Picker Tabs Bar */}
        <div className="px-6 py-2.5 border-b border-gold/10 bg-charcoal-dark/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {COMPANION_LIST.map((comp) => {
            const isActive = activeCompanion === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => setActiveCompanion(comp.id)}
                className={`px-3.5 py-1.5 rounded-full font-outfit text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 smooth-transition cursor-pointer border ${
                  isActive 
                    ? "bg-gold text-charcoal-dark border-gold font-bold shadow-md" 
                    : "bg-charcoal/40 text-cream/70 border-gold/15 hover:border-gold/40 hover:text-cream"
                }`}
              >
                <span className={isActive ? "text-charcoal-dark" : "text-gold"}>
                  {COMPANION_ICONS[comp.iconName]}
                </span>
                <span>{comp.name}</span>
              </button>
            );
          })}
        </div>

        {/* Chat Feed Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 flex flex-col bg-charcoal/30">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            const msgComp = msg.companionId ? COMPANIONS[msg.companionId] : currentComp;
            const isReasoningOpen = !!showReasoningMap[msg.id];

            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[90%] md:max-w-[82%] ${
                  isUser ? "self-end items-end" : "self-start items-start"
                }`}
              >
                {/* Message Header (for AI) */}
                {!isUser && (
                  <div className="flex items-center gap-2 mb-1.5">
                    <span 
                      className="h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold border"
                      style={{ backgroundColor: `${msgComp.accentColor}20`, borderColor: `${msgComp.accentColor}40`, color: msgComp.accentColor }}
                    >
                      {COMPANION_ICONS[msgComp.iconName]}
                    </span>
                    <span className="font-cinzel text-xs font-bold text-cream">
                      {msgComp.name}
                    </span>
                    <span className="font-outfit text-[9px] text-gold uppercase tracking-wider">
                      ({msgComp.sanskritTitle})
                    </span>
                    {msg.collaborators && msg.collaborators.length > 0 && (
                      <span className="font-outfit text-[9px] text-cream/50">
                        + {msg.collaborators.map((c) => COMPANIONS[c].name).join(", ")}
                      </span>
                    )}
                    <span className="font-outfit text-[10px] text-cream/40 ml-auto">
                      {msg.timestamp}
                    </span>
                  </div>
                )}

                {/* Message Body Box */}
                <div
                  className={`rounded-2xl p-4 sm:p-5 font-outfit text-sm leading-relaxed whitespace-pre-line shadow-md ${
                    isUser
                      ? "bg-gold/15 border border-gold/30 text-cream rounded-tr-none text-right"
                      : "bg-charcoal-dark/80 border border-gold/15 text-cream/90 rounded-tl-none text-left"
                  }`}
                >
                  {msg.content}

                  {/* Evidence & Safety Demarcation Badge */}
                  {msg.evidenceBadge && (
                    <div className="mt-4 pt-3 border-t border-gold/15 flex flex-col gap-2 bg-charcoal/40 p-3 rounded-xl">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-outfit text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck size={14} />
                        <span>Evidence & Tradition Demarcation</span>
                      </div>

                      <div className="text-xs text-cream/80 space-y-1 font-light">
                        <p><strong className="text-gold">🔬 Scientific Basis:</strong> {msg.evidenceBadge.scientificBasis}</p>
                        <p><strong className="text-amber-400">📜 Heritage Context:</strong> {msg.evidenceBadge.culturalContext}</p>
                        {msg.evidenceBadge.safetyCaveat && (
                          <p className="text-rose-300 bg-rose-950/40 p-2 rounded-lg border border-rose-800/30 mt-1">
                            <strong className="text-rose-400">⚠️ Disclaimer:</strong> {msg.evidenceBadge.safetyCaveat}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Interactive Action Plan Checklist */}
                  {msg.actionPlan && msg.actionPlan.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gold/15 bg-gold/5 p-3.5 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-cinzel text-xs font-bold text-gold uppercase tracking-wider">
                          📋 Recommended Action Plan
                        </span>
                        <span className="font-outfit text-[10px] text-cream/60">
                          Click items to mark complete
                        </span>
                      </div>
                      <div className="space-y-2">
                        {msg.actionPlan.map((step, idx) => {
                          const itemKey = `${msg.id}_${idx}`;
                          const isDone = !!completedActionItems[itemKey];
                          return (
                            <div
                              key={idx}
                              onClick={() => toggleActionItem(msg.id, idx)}
                              className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                                isDone ? "bg-emerald-950/40 text-emerald-300 line-through opacity-70" : "bg-charcoal/50 text-cream/90 hover:bg-gold/10"
                              }`}
                            >
                              <button type="button" className="mt-0.5 shrink-0 text-gold">
                                {isDone ? <CheckSquare size={14} className="text-emerald-400" /> : <Square size={14} />}
                              </button>
                              <span>{step}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Deep Thought / Reasoning Accordion */}
                  {msg.reasoningChain && msg.reasoningChain.length > 0 && (
                    <div className="mt-3 pt-2">
                      <button
                        onClick={() => toggleReasoningMap(msg.id)}
                        className="text-[10px] font-bold text-gold/80 hover:text-gold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
                      >
                        <BrainCircuit size={12} />
                        <span>Prajvaya Thought Process</span>
                        {isReasoningOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>

                      {isReasoningOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 p-3 bg-charcoal-dark border border-gold/15 rounded-xl space-y-2 text-xs"
                        >
                          {msg.reasoningChain.map((step, idx) => (
                            <div key={idx} className="flex flex-col text-left">
                              <span className="font-cinzel text-[10px] font-bold text-gold uppercase tracking-wider">
                                Stage {idx + 1}: {step.stage}
                              </span>
                              <span className="font-outfit text-cream/70 font-light text-[11px]">
                                {step.detail}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div className="self-start flex flex-col items-start max-w-[80%] animate-pulse">
              <div className="bg-charcoal-dark/80 border border-gold/15 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                <BrainCircuit size={16} className="text-gold animate-spin" />
                <span className="font-outfit text-xs text-gold font-semibold uppercase tracking-wider">
                  Prajvaya Reasoning Engine is synthesizing response...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-6 py-2 border-t border-gold/10 bg-charcoal-dark/20 flex flex-wrap gap-2 justify-center">
          {[
            { label: "🧘 Relieve Stress", prompt: "I feel overwhelmed with stress and burnout. Guide me." },
            { label: "📖 Bhagavad Gita", prompt: "Explain the core wisdom of Bhagavad Gita for daily decisions." },
            { label: "🌱 Zero-Waste Living", prompt: "How can I start a zero-waste lifestyle and reduce digital pollution?" },
            { label: "🎓 Learning Blueprint", prompt: "Guide me on structured first-principles learning for my career." },
            { label: "💡 Creative Expression", prompt: "Help me overcome creative block and brainstorm innovative ideas." }
          ].map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.prompt)}
              disabled={loading}
              className="px-3 py-1 border border-gold/20 hover:border-gold text-cream/70 hover:text-gold font-outfit text-[10px] font-bold tracking-wider uppercase rounded-full bg-charcoal/40 hover:bg-gold/10 smooth-transition cursor-pointer disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-4 border-t border-gold/15 bg-charcoal-dark/60 flex gap-3 items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${currentComp.name} (${currentComp.tagline})...`}
            disabled={loading}
            className="w-full bg-charcoal/50 border border-gold/20 focus:border-gold text-cream rounded-full py-3 px-5 font-outfit text-sm outline-none transition-all placeholder:text-cream/35"
            required
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-11 w-11 rounded-full bg-gold hover:bg-gold-light text-charcoal-dark flex items-center justify-center shrink-0 shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </form>
      </motion.div>

      {/* Memory Manager Drawer / Modal */}
      <AnimatePresence>
        {showMemoryDrawer && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-charcoal-dark/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-charcoal border border-gold/30 rounded-3xl p-6 overflow-y-auto max-h-[85vh] shadow-2xl relative text-cream"
            >
              <button
                onClick={() => setShowMemoryDrawer(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-charcoal-dark border border-gold/20 text-gold hover:bg-gold hover:text-charcoal-dark smooth-transition cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/15">
                <Database className="text-gold" size={24} />
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-cream">Memory & Privacy Controls</h3>
                  <p className="font-outfit text-xs text-gold uppercase tracking-wider">
                    Privacy-First Client Storage
                  </p>
                </div>
              </div>

              {/* Memory Toggle Bar */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-charcoal-dark/60 border border-gold/15 mb-6">
                <div>
                  <h4 className="font-outfit text-sm font-bold text-cream">Enable Memory System</h4>
                  <p className="font-outfit text-xs text-cream/60">
                    Stores your goals, preferences, and habits locally on your browser. Never transmitted to third parties.
                  </p>
                </div>
                <button
                  onClick={handleToggleMemory}
                  className={`px-4 py-2 rounded-full font-outfit text-xs font-bold uppercase tracking-wider cursor-pointer border ${
                    memoryEnabled ? "bg-emerald-500 text-charcoal-dark border-emerald-400" : "bg-rose-950 text-rose-300 border-rose-800"
                  }`}
                >
                  {memoryEnabled ? "Active" : "Disabled"}
                </button>
              </div>

              {/* Add Manual Memory Form */}
              <form onSubmit={handleAddManualMemory} className="mb-6 p-4 rounded-2xl bg-charcoal-dark/40 border border-gold/15 space-y-3">
                <h4 className="font-cinzel text-xs font-bold text-gold uppercase tracking-wider">
                  Add Context Memory
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Memory Key (e.g. Daily Goal)"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    className="bg-charcoal/50 border border-gold/20 px-3 py-2 rounded-lg font-outfit text-xs text-cream outline-none focus:border-gold"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g. 15 min morning Pranayama)"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="bg-charcoal/50 border border-gold/20 px-3 py-2 rounded-lg font-outfit text-xs text-cream outline-none focus:border-gold"
                  />
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="bg-charcoal/50 border border-gold/20 px-3 py-2 rounded-lg font-outfit text-xs text-cream outline-none focus:border-gold"
                  >
                    <option value="goal">Goal</option>
                    <option value="preference">Preference</option>
                    <option value="habit">Habit</option>
                    <option value="value">Value</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Save Memory</span>
                </button>
              </form>

              {/* Memory List */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-xs font-bold text-cream uppercase tracking-wider">
                    Stored Memories ({memories.length})
                  </h4>
                  <button
                    onClick={handleExportMemories}
                    className="text-xs text-gold hover:underline flex items-center gap-1 bg-transparent border-none cursor-pointer"
                  >
                    <Download size={12} />
                    <span>Export JSON</span>
                  </button>
                </div>

                {memories.length === 0 ? (
                  <p className="text-xs text-cream/40 italic text-center py-4 bg-charcoal-dark/30 rounded-xl">
                    No memories stored yet. Memory is empty.
                  </p>
                ) : (
                  memories.map((m) => (
                    <div key={m.id} className="p-3 rounded-xl bg-charcoal-dark/50 border border-gold/15 flex items-center justify-between gap-3 text-xs">
                      <div className="flex flex-col flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gold">{m.key}:</span>
                          <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-gold/10 text-gold font-bold">
                            {m.category}
                          </span>
                        </div>
                        {editingMemoryId === m.id ? (
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="bg-charcoal border border-gold px-2 py-1 rounded text-xs text-cream flex-grow"
                            />
                            <button
                              onClick={() => handleSaveEditMemory(m.id)}
                              className="px-2 py-1 bg-gold text-charcoal-dark font-bold rounded text-[10px]"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <span className="text-cream/80 truncate mt-0.5">{m.value}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => { setEditingMemoryId(m.id); setEditValue(m.value); }}
                          className="p-1.5 text-cream/60 hover:text-gold bg-transparent border-none cursor-pointer"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteMemory(m.id)}
                          className="p-1.5 text-cream/60 hover:text-rose-400 bg-transparent border-none cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Danger Zone */}
              <div className="pt-4 border-t border-rose-900/30 flex items-center justify-between">
                <span className="text-xs text-rose-300/70 font-outfit">
                  Want to erase all stored data?
                </span>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete all stored memories?")) {
                      memoryStore.clearAllMemories();
                      refreshMemories();
                    }
                  }}
                  className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Clear All Memory
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
