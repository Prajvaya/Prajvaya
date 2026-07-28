import { MemoryItem, MemorySettings } from "./types";

const MEMORY_KEY = "prajvaya_ai_memories_v1";
const SETTINGS_KEY = "prajvaya_ai_memory_settings_v1";

const DEFAULT_SETTINGS: MemorySettings = {
  enabled: true,
  allowAutoSave: true,
};

export const memoryStore = {
  getSettings(): MemorySettings {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: MemorySettings): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save memory settings:", e);
    }
  },

  getMemories(): MemoryItem[] {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(MEMORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  addMemory(memory: Omit<MemoryItem, "id" | "createdAt">): MemoryItem | null {
    const settings = this.getSettings();
    if (!settings.enabled) return null;

    const memories = this.getMemories();
    
    // Avoid duplicate memory keys
    const existingIdx = memories.findIndex(
      (m) => m.key.toLowerCase() === memory.key.toLowerCase()
    );

    const newMemory: MemoryItem = {
      ...memory,
      id: existingIdx >= 0 ? memories[existingIdx].id : "mem_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
    };

    if (existingIdx >= 0) {
      memories[existingIdx] = newMemory;
    } else {
      memories.push(newMemory);
    }

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(MEMORY_KEY, JSON.stringify(memories));
      } catch (e) {
        console.error("Failed to store memory item:", e);
      }
    }

    return newMemory;
  },

  updateMemory(id: string, updatedValue: string): boolean {
    const memories = this.getMemories();
    const idx = memories.findIndex((m) => m.id === id);
    if (idx === -1) return false;

    memories[idx].value = updatedValue;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(MEMORY_KEY, JSON.stringify(memories));
        return true;
      } catch {
        return false;
      }
    }
    return false;
  },

  deleteMemory(id: string): boolean {
    const memories = this.getMemories();
    const filtered = memories.filter((m) => m.id !== id);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(MEMORY_KEY, JSON.stringify(filtered));
        return true;
      } catch {
        return false;
      }
    }
    return false;
  },

  clearAllMemories(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(MEMORY_KEY);
    } catch (e) {
      console.error("Failed to clear memories:", e);
    }
  },

  exportMemoriesJSON(): string {
    const memories = this.getMemories();
    const settings = this.getSettings();
    return JSON.stringify({ settings, memories, exportedAt: new Date().toISOString() }, null, 2);
  }
};
