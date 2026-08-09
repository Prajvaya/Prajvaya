import fs from "fs";
import path from "path";

const DB_FILE_PATH = path.join(process.cwd(), "prajvaya.json");

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  registrationDate: string;
  lastLogin: string;
  status: "Active" | "Disabled";
  role: "User" | "Admin";
}

export interface Subscriber {
  id: string;
  email: string;
  subscriptionDate: string;
  verified: boolean;
}

export interface Token {
  id: string;
  email: string;
  token: string;
  type: "verify" | "reset" | "subscribe";
  expiresAt: string;
}

export interface DatabaseSchema {
  users: User[];
  subscribers: Subscriber[];
  tokens: Token[];
}

const DEFAULT_DB: DatabaseSchema = {
  users: [],
  subscribers: [],
  tokens: [],
};

// In-memory fallback store for read-only environments
let inMemoryStore: DatabaseSchema | null = null;

// Queue and locking mechanism for thread-safe operations on the file.
let isWriting = false;
const writeQueue: Array<{ resolve: () => void; reject: (err: any) => void; data: DatabaseSchema }> = [];

const processWriteQueue = async () => {
  if (isWriting || writeQueue.length === 0) return;
  isWriting = true;

  const { resolve, data } = writeQueue.shift()!;
  inMemoryStore = data;
  try {
    const tempPath = `${DB_FILE_PATH}.tmp`;
    await fs.promises.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
    await fs.promises.rename(tempPath, DB_FILE_PATH);
    resolve();
  } catch (err) {
    console.warn("[DB Storage Note] File write unavailable; using in-memory store fallback:", err);
    resolve(); // Always resolve so API calls proceed cleanly
  } finally {
    isWriting = false;
    processWriteQueue();
  }
};

const writeDb = (data: DatabaseSchema): Promise<void> => {
  return new Promise((resolve, reject) => {
    writeQueue.push({ resolve, reject, data });
    processWriteQueue();
  });
};

export const readDb = async (): Promise<DatabaseSchema> => {
  if (inMemoryStore) return inMemoryStore;
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      await writeDb(DEFAULT_DB);
      inMemoryStore = DEFAULT_DB;
      return DEFAULT_DB;
    }
    const content = await fs.promises.readFile(DB_FILE_PATH, "utf-8");
    inMemoryStore = JSON.parse(content) as DatabaseSchema;
    return inMemoryStore;
  } catch (err) {
    console.error("Database read error. Initializing fallback database.", err);
    inMemoryStore = DEFAULT_DB;
    return DEFAULT_DB;
  }
};

// High-level query helpers
export const db = {
  users: {
    findMany: async (): Promise<User[]> => {
      const store = await readDb();
      return store.users;
    },
    findUnique: async (criteria: { email?: string; id?: string }): Promise<User | null> => {
      const store = await readDb();
      if (criteria.email) {
        return store.users.find((u) => u.email.toLowerCase() === criteria.email!.toLowerCase()) || null;
      }
      if (criteria.id) {
        return store.users.find((u) => u.id === criteria.id) || null;
      }
      return null;
    },
    create: async (data: Omit<User, "id" | "registrationDate" | "lastLogin" | "role" | "status">): Promise<User> => {
      const store = await readDb();
      const newUser: User = {
        ...data,
        id: Math.random().toString(36).substring(2, 11),
        registrationDate: new Date().toISOString(),
        lastLogin: "",
        role: store.users.length === 0 ? "Admin" : "User", // Auto-elevate the first user to Admin
        status: "Active",
      };
      store.users.push(newUser);
      await writeDb(store);
      return newUser;
    },
    update: async (id: string, data: Partial<User>): Promise<User | null> => {
      const store = await readDb();
      const index = store.users.findIndex((u) => u.id === id);
      if (index === -1) return null;
      store.users[index] = { ...store.users[index], ...data };
      await writeDb(store);
      return store.users[index];
    },
    delete: async (id: string): Promise<boolean> => {
      const store = await readDb();
      const initialLength = store.users.length;
      store.users = store.users.filter((u) => u.id !== id);
      if (store.users.length !== initialLength) {
        await writeDb(store);
        return true;
      }
      return false;
    },
  },
  subscribers: {
    findMany: async (): Promise<Subscriber[]> => {
      const store = await readDb();
      return store.subscribers;
    },
    findUnique: async (email: string): Promise<Subscriber | null> => {
      const store = await readDb();
      return store.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase()) || null;
    },
    create: async (email: string): Promise<Subscriber> => {
      const store = await readDb();
      const existing = store.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
      if (existing) return existing;

      const newSubscriber: Subscriber = {
        id: Math.random().toString(36).substring(2, 11),
        email,
        subscriptionDate: new Date().toISOString(),
        verified: true, // Defaulting auto-verified for frictionless sub
      };
      store.subscribers.push(newSubscriber);
      await writeDb(store);
      return newSubscriber;
    },
    update: async (email: string, data: Partial<Subscriber>): Promise<Subscriber | null> => {
      const store = await readDb();
      const index = store.subscribers.findIndex((s) => s.email.toLowerCase() === email.toLowerCase());
      if (index === -1) return null;
      store.subscribers[index] = { ...store.subscribers[index], ...data };
      await writeDb(store);
      return store.subscribers[index];
    },
    delete: async (id: string): Promise<boolean> => {
      const store = await readDb();
      const initialLength = store.subscribers.length;
      store.subscribers = store.subscribers.filter((s) => s.id !== id);
      if (store.subscribers.length !== initialLength) {
        await writeDb(store);
        return true;
      }
      return false;
    },
  },
  tokens: {
    create: async (email: string, token: string, type: "verify" | "reset" | "subscribe", durationMinutes: number = 15): Promise<Token> => {
      const store = await readDb();
      // Remove any existing active tokens for this email and type
      store.tokens = store.tokens.filter((t) => !(t.email.toLowerCase() === email.toLowerCase() && t.type === type));

      const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();
      const newToken: Token = {
        id: Math.random().toString(36).substring(2, 11),
        email,
        token,
        type,
        expiresAt,
      };
      store.tokens.push(newToken);
      await writeDb(store);
      return newToken;
    },
    findUnique: async (criteria: { email: string; token: string; type: "verify" | "reset" | "subscribe" }): Promise<Token | null> => {
      const store = await readDb();
      const found = store.tokens.find(
        (t) => t.email.toLowerCase() === criteria.email.toLowerCase() && t.token === criteria.token && t.type === criteria.type
      );
      if (!found) return null;
      return found;
    },
    findValid: async (email: string, token: string, type: "verify" | "reset" | "subscribe"): Promise<Token | null> => {
      const store = await readDb();
      const found = store.tokens.find(
        (t) => t.email.toLowerCase() === email.toLowerCase() && t.token === token && t.type === type
      );

      if (!found) return null;
      if (new Date(found.expiresAt) < new Date()) return null; // Token expired
      return found;
    },
    delete: async (id: string): Promise<boolean> => {
      const store = await readDb();
      const initialLength = store.tokens.length;
      store.tokens = store.tokens.filter((t) => t.id !== id);
      if (store.tokens.length !== initialLength) {
        await writeDb(store);
        return true;
      }
      return false;
    },
    consume: async (id: string): Promise<void> => {
      const store = await readDb();
      store.tokens = store.tokens.filter((t) => t.id !== id);
      await writeDb(store);
    },
  },
};
