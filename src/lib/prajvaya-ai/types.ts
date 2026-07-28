export type CompanionId = 
  | "master"
  | "jeevan"
  | "prakriti"
  | "parampara"
  | "arogya"
  | "vidya"
  | "srijan";

export interface Companion {
  id: CompanionId;
  name: string;
  sanskritTitle: string;
  role: string;
  tagline: string;
  iconName: string;
  accentColor: string;
  description: string;
  domains: string[];
  tone: string;
}

export type EmotionType = 
  | "calm"
  | "stress"
  | "anxiety"
  | "loneliness"
  | "burnout"
  | "confusion"
  | "anger"
  | "grief"
  | "hope"
  | "motivation";

export interface EmotionalAnalysis {
  primaryEmotion: EmotionType;
  confidence: number;
  empathyNote: string;
}

export interface MemoryItem {
  id: string;
  category: "preference" | "goal" | "habit" | "context" | "value";
  key: string;
  value: string;
  createdAt: string;
  companionSource?: CompanionId;
}

export interface MemorySettings {
  enabled: boolean;
  allowAutoSave: boolean;
}

export interface ReasoningStep {
  stage: "Intent & Emotion" | "Root Problem" | "Companion Selection" | "Knowledge Retrieval" | "Solution Tradeoffs" | "Action Plan";
  detail: string;
}

export interface PrajvayaAIResponse {
  reply: string;
  activeCompanion: CompanionId;
  collaboratingCompanions?: CompanionId[];
  emotionalProfile: EmotionalAnalysis;
  reasoningChain: ReasoningStep[];
  recalledMemoriesUsed?: string[];
  evidenceBadge?: {
    scientificBasis: string;
    culturalContext: string;
    safetyCaveat?: string;
  };
  actionPlan?: string[];
}

export interface PrajvayaMessage {
  id: string;
  sender: "user" | "prajvaya";
  content: string;
  timestamp: string;
  companionId?: CompanionId;
  collaborators?: CompanionId[];
  reasoningChain?: ReasoningStep[];
  recalledMemories?: string[];
  evidenceBadge?: {
    scientificBasis: string;
    culturalContext: string;
    safetyCaveat?: string;
  };
  actionPlan?: string[];
}
