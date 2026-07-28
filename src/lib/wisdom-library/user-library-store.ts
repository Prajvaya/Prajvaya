import { 
  BookmarkItem, 
  HighlightItem, 
  ReaderSettings, 
  ReadingProgress, 
  UserJournalEntry 
} from "./types";

const HIGHLIGHTS_KEY = "prajvaya_wisdom_highlights_v1";
const BOOKMARKS_KEY = "prajvaya_wisdom_bookmarks_v1";
const JOURNAL_KEY = "prajvaya_wisdom_journal_v1";
const PROGRESS_KEY = "prajvaya_wisdom_progress_v1";
const SETTINGS_KEY = "prajvaya_wisdom_settings_v1";

const DEFAULT_SETTINGS: ReaderSettings = {
  theme: "dark",
  fontFamily: "serif",
  fontSizePx: 18,
  lineHeight: 1.8,
  marginWidthPx: 32,
  autoScrollAudio: true
};

export const userLibraryStore = {
  getSettings(): ReaderSettings {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: ReaderSettings): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save reader settings:", e);
    }
  },

  getHighlights(bookId?: string): HighlightItem[] {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(HIGHLIGHTS_KEY);
      const items: HighlightItem[] = saved ? JSON.parse(saved) : [];
      return bookId ? items.filter((i) => i.bookId === bookId) : items;
    } catch {
      return [];
    }
  },

  addHighlight(item: Omit<HighlightItem, "id" | "createdAt">): HighlightItem {
    const items = this.getHighlights();
    const newItem: HighlightItem = {
      ...item,
      id: "hl_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString()
    };
    items.push(newItem);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save highlight:", e);
      }
    }
    return newItem;
  },

  deleteHighlight(id: string): void {
    const items = this.getHighlights().filter((i) => i.id !== id);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to delete highlight:", e);
      }
    }
  },

  getBookmarks(bookId?: string): BookmarkItem[] {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      const items: BookmarkItem[] = saved ? JSON.parse(saved) : [];
      return bookId ? items.filter((b) => b.bookId === bookId) : items;
    } catch {
      return [];
    }
  },

  addBookmark(item: Omit<BookmarkItem, "id" | "createdAt">): BookmarkItem {
    const items = this.getBookmarks();
    const newItem: BookmarkItem = {
      ...item,
      id: "bm_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString()
    };
    items.push(newItem);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save bookmark:", e);
      }
    }
    return newItem;
  },

  deleteBookmark(id: string): void {
    const items = this.getBookmarks().filter((b) => b.id !== id);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to delete bookmark:", e);
      }
    }
  },

  getJournalEntries(): UserJournalEntry[] {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(JOURNAL_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  addJournalEntry(entry: Omit<UserJournalEntry, "id" | "createdAt">): UserJournalEntry {
    const items = this.getJournalEntries();
    const newEntry: UserJournalEntry = {
      ...entry,
      id: "jn_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString()
    };
    items.unshift(newEntry);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(JOURNAL_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save journal entry:", e);
      }
    }
    return newEntry;
  },

  deleteJournalEntry(id: string): void {
    const items = this.getJournalEntries().filter((j) => j.id !== id);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(JOURNAL_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to delete journal entry:", e);
      }
    }
  },

  getProgress(bookId: string): ReadingProgress | null {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      const all: Record<string, ReadingProgress> = saved ? JSON.parse(saved) : {};
      return all[bookId] || null;
    } catch {
      return null;
    }
  },

  saveProgress(progress: ReadingProgress): void {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      const all: Record<string, ReadingProgress> = saved ? JSON.parse(saved) : {};
      all[progress.bookId] = progress;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  }
};
