export type BookCategory = 
  | "Indian Wisdom"
  | "Buddhism"
  | "Jain Philosophy"
  | "Sikh Literature"
  | "World Philosophy"
  | "Spiritual Classics";

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  sanskritTitle?: string;
  summary: string;
  content: string; // Full text with paragraph blocks
  estimatedReadTimeMinutes: number;
  reflectionQuestions: string[];
  keyLessons: string[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Book {
  id: string;
  title: string;
  sanskritTitle?: string;
  author: string;
  category: BookCategory;
  coverImage: string;
  description: string;
  historicalContext: string;
  publicDomainLicense: string;
  rating: number;
  chapters: Chapter[];
  audioAvailable: boolean;
  totalEstReadMinutes: number;
}

export type ReaderTheme = "dark" | "light" | "sepia" | "high-contrast";
export type ReaderFontFamily = "serif" | "sans" | "dyslexic";

export interface ReaderSettings {
  theme: ReaderTheme;
  fontFamily: ReaderFontFamily;
  fontSizePx: number;
  lineHeight: number;
  marginWidthPx: number;
  autoScrollAudio: boolean;
}

export interface HighlightItem {
  id: string;
  bookId: string;
  chapterId: string;
  text: string;
  color: "gold" | "emerald" | "amber" | "rose";
  createdAt: string;
  note?: string;
}

export interface BookmarkItem {
  id: string;
  bookId: string;
  chapterId: string;
  paragraphIndex: number;
  title: string;
  createdAt: string;
}

export interface UserJournalEntry {
  id: string;
  title: string;
  content: string;
  bookId?: string;
  chapterId?: string;
  quoteRef?: string;
  createdAt: string;
  tags: string[];
}

export interface ReadingProgress {
  bookId: string;
  lastChapterId: string;
  lastParagraphIndex: number;
  percentageComplete: number;
  lastReadAt: string;
}

export interface ConceptNode {
  id: string;
  concept: string; // e.g., "Duty", "Compassion", "Leadership", "Discipline", "Meditation", "Purpose"
  description: string;
  relatedBooks: {
    bookId: string;
    bookTitle: string;
    chapterTitle: string;
    quote: string;
  }[];
}

export interface DailyWisdom {
  date: string;
  bookTitle: string;
  passage: string;
  explanation: string;
  reflectionQuestion: string;
  actionPrompt: string;
}
