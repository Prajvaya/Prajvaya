import fs from "fs";
import path from "path";

// Define the file path for our local database.
// We'll store it in the user's workspace root directory for safety and accessibility.
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

// Queue and locking mechanism for thread-safe operations on the file.
let isWriting = false;
const writeQueue: Array<{ resolve: () => void; reject: (err: any) => void; data: DatabaseSchema }> = [];

const processWriteQueue = async () => {
  if (isWriting || writeQueue.length === 0) return;
  isWriting = true;

  const { resolve, reject, data } = writeQueue.shift()!;
  try {
    const tempPath = `${DB_FILE_PATH}.tmp`;
    // Write atomically: write to temp file first, then rename.
    await fs.promises.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
    await fs.promises.rename(tempPath, DB_FILE_PATH);
    resolve();
  } catch (err) {
    reject(err);
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
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      await writeDb(DEFAULT_DB);
      return DEFAULT_DB;
    }
    const content = await fs.promises.readFile(DB_FILE_PATH, "utf-8");
    return JSON.parse(content) as DatabaseSchema;
  } catch (err) {
    console.error("Database read error. Initializing fallback database.", err);
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
    update: async (id: string, updates: Partial<User>): Promise<User | null> => {
      const store = await readDb();
      const index = store.users.findIndex((u) => u.id === id);
      if (index === -1) return null;
      store.users[index] = { ...store.users[index], ...updates };
      await writeDb(store);
      return store.users[index];
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
    create: async (email: string, verified: boolean = false): Promise<Subscriber> => {
      const store = await readDb();
      const existing = store.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        existing.verified = verified;
        await writeDb(store);
        return existing;
      }
      const newSubscriber: Subscriber = {
        id: Math.random().toString(36).substring(2, 11),
        email,
        subscriptionDate: new Date().toISOString(),
        verified,
      };
      store.subscribers.push(newSubscriber);
      await writeDb(store);
      return newSubscriber;
    },
    update: async (email: string, updates: Partial<Subscriber>): Promise<Subscriber | null> => {
      const store = await readDb();
      const index = store.subscribers.findIndex((s) => s.email.toLowerCase() === email.toLowerCase());
      if (index === -1) return null;
      store.subscribers[index] = { ...store.subscribers[index], ...updates };
      await writeDb(store);
      return store.subscribers[index];
    },
  },
  tokens: {
    findUnique: async (criteria: { email: string; token: string; type: Token["type"] }): Promise<Token | null> => {
      const store = await readDb();
      return store.tokens.find(
        (t) =>
          t.email.toLowerCase() === criteria.email.toLowerCase() &&
          t.token === criteria.token &&
          t.type === criteria.type
      ) || null;
    },
    create: async (email: string, token: string, type: Token["type"], lifespanMinutes: number = 15): Promise<Token> => {
      const store = await readDb();
      // Remove any existing active token of the same type for this email to prevent spamming
      store.tokens = store.tokens.filter(
        (t) => !(t.email.toLowerCase() === email.toLowerCase() && t.type === type)
      );

      const expiresAt = new Date(Date.now() + lifespanMinutes * 60000).toISOString();
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
    delete: async (id: string): Promise<boolean> => {
      const store = await readDb();
      const initialLength = store.tokens.length;
      store.tokens = store.tokens.filter((t) => t.id !== id);
      await writeDb(store);
      return store.tokens.length < initialLength;
    },
    cleanupExpired: async (): Promise<void> => {
      const store = await readDb();
      const now = new Date().toISOString();
      store.tokens = store.tokens.filter((t) => t.expiresAt > now);
      await writeDb(store);
    },
  },
};
