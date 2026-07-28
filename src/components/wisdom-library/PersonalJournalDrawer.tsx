"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookMarked, Bookmark, BookmarkCheck, Trash2, Download, Plus, X, Tag } from "lucide-react";
import { userLibraryStore } from "@/lib/wisdom-library/user-library-store";
import { BookmarkItem, HighlightItem, UserJournalEntry } from "@/lib/wisdom-library/types";

interface PersonalJournalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalJournalDrawer: React.FC<PersonalJournalDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<"journal" | "highlights" | "bookmarks">("journal");
  const [journalEntries, setJournalEntries] = useState<UserJournalEntry[]>([]);
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  // New Note Form
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");

  const refreshData = () => {
    setJournalEntries(userLibraryStore.getJournalEntries());
    setHighlights(userLibraryStore.getHighlights());
    setBookmarks(userLibraryStore.getBookmarks());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    userLibraryStore.addJournalEntry({
      title: newTitle.trim(),
      content: newContent.trim(),
      tags: newTags ? newTags.split(",").map((t) => t.trim()) : ["reflection"]
    });
    setNewTitle("");
    setNewContent("");
    setNewTags("");
    refreshData();
  };

  const handleDeleteJournal = (id: string) => {
    userLibraryStore.deleteJournalEntry(id);
    refreshData();
  };

  const handleDeleteHighlight = (id: string) => {
    userLibraryStore.deleteHighlight(id);
    refreshData();
  };

  const handleDeleteBookmark = (id: string) => {
    userLibraryStore.deleteBookmark(id);
    refreshData();
  };

  const handleExportData = () => {
    const data = {
      journal: userLibraryStore.getJournalEntries(),
      highlights: userLibraryStore.getHighlights(),
      bookmarks: userLibraryStore.getBookmarks(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prajvaya-wisdom-journal-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-charcoal-dark/95 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-charcoal border border-gold/25 rounded-3xl p-6 overflow-y-auto max-h-[88vh] shadow-2xl relative text-cream"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-charcoal-dark border border-gold/20 text-gold hover:bg-gold hover:text-charcoal-dark smooth-transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/15">
          <BookMarked className="text-gold" size={26} />
          <div>
            <h2 className="font-cinzel text-xl font-bold text-cream">Personal Wisdom Notebook</h2>
            <p className="font-outfit text-xs text-gold uppercase tracking-widest">
              Private Saved Insights & Reflections
            </p>
          </div>
        </div>

        {/* Tab Selection Bar & Export */}
        <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
          <div className="flex items-center gap-2 bg-charcoal-dark/60 p-1 rounded-full border border-gold/15">
            {[
              { id: "journal", label: `Reflections (${journalEntries.length})` },
              { id: "highlights", label: `Highlights (${highlights.length})` },
              { id: "bookmarks", label: `Bookmarks (${bookmarks.length})` }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3.5 py-1.5 rounded-full font-outfit text-xs font-semibold uppercase tracking-wider smooth-transition cursor-pointer ${
                  activeTab === t.id
                    ? "bg-gold text-charcoal-dark font-bold shadow-md"
                    : "text-cream/60 hover:text-cream"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportData}
            className="px-3.5 py-1.5 bg-gold/10 hover:bg-gold text-gold hover:text-charcoal-dark border border-gold/25 rounded-full text-xs font-bold font-outfit uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Download size={14} />
            <span>Export JSON</span>
          </button>
        </div>

        {/* JOURNAL TAB */}
        {activeTab === "journal" && (
          <div className="space-y-6">
            <form onSubmit={handleAddJournal} className="p-4 rounded-2xl bg-charcoal-dark/50 border border-gold/15 space-y-3">
              <h3 className="font-cinzel text-xs font-bold text-gold uppercase tracking-wider">
                Write Personal Reflection
              </h3>
              <input
                type="text"
                placeholder="Title (e.g., Reflections on Detachment)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-charcoal/60 border border-gold/20 px-3 py-2 rounded-lg font-outfit text-xs text-cream outline-none focus:border-gold"
                required
              />
              <textarea
                placeholder="Write your thoughts or real-life application plan..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={3}
                className="w-full bg-charcoal/60 border border-gold/20 px-3 py-2 rounded-lg font-outfit text-xs text-cream outline-none focus:border-gold resize-none"
                required
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Tags (comma separated: duty, quiet, sleep)"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full bg-charcoal/60 border border-gold/20 px-3 py-2 rounded-lg font-outfit text-xs text-cream outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold hover:bg-gold-light text-charcoal-dark font-outfit text-xs font-bold uppercase tracking-wider rounded-lg shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Save Note</span>
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {journalEntries.length === 0 ? (
                <p className="text-xs text-cream/40 italic text-center py-6 bg-charcoal-dark/30 rounded-xl">
                  No personal journal entries written yet.
                </p>
              ) : (
                journalEntries.map((j) => (
                  <div key={j.id} className="p-4 rounded-xl bg-charcoal-dark/60 border border-gold/15 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <h4 className="font-cinzel text-sm font-bold text-cream">{j.title}</h4>
                      <button
                        onClick={() => handleDeleteJournal(j.id)}
                        className="text-cream/40 hover:text-rose-400 p-1 bg-transparent border-none cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="font-outfit text-xs text-cream/80 leading-relaxed whitespace-pre-line font-light">
                      {j.content}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-gold/10 text-[10px]">
                      <div className="flex items-center gap-1.5 text-gold">
                        <Tag size={10} />
                        <span>{j.tags.join(", ")}</span>
                      </div>
                      <span className="text-cream/40">{new Date(j.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* HIGHLIGHTS TAB */}
        {activeTab === "highlights" && (
          <div className="space-y-3">
            {highlights.length === 0 ? (
              <p className="text-xs text-cream/40 italic text-center py-6 bg-charcoal-dark/30 rounded-xl">
                No passages highlighted yet. While reading, select any sentence to save a highlight!
              </p>
            ) : (
              highlights.map((h) => (
                <div key={h.id} className="p-4 rounded-xl bg-charcoal-dark/60 border border-gold/15 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-[10px] font-bold text-gold uppercase tracking-widest">
                      Saved Passage
                    </span>
                    <button
                      onClick={() => handleDeleteHighlight(h.id)}
                      className="text-cream/40 hover:text-rose-400 p-1 bg-transparent border-none cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="font-outfit text-xs text-cream italic border-l-2 border-gold pl-3 py-1">
                    &ldquo;{h.text}&rdquo;
                  </p>
                  {h.note && (
                    <p className="font-outfit text-xs text-gold/80 pl-3">
                      Note: {h.note}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* BOOKMARKS TAB */}
        {activeTab === "bookmarks" && (
          <div className="space-y-3">
            {bookmarks.length === 0 ? (
              <p className="text-xs text-cream/40 italic text-center py-6 bg-charcoal-dark/30 rounded-xl">
                No bookmarks created yet.
              </p>
            ) : (
              bookmarks.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-charcoal-dark/60 border border-gold/15 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <BookmarkCheck size={16} className="text-gold" />
                    <div>
                      <h4 className="font-cinzel text-xs font-bold text-cream">{b.title}</h4>
                      <span className="font-outfit text-[10px] text-cream/50">{new Date(b.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteBookmark(b.id)}
                    className="text-cream/40 hover:text-rose-400 p-1 bg-transparent border-none cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
