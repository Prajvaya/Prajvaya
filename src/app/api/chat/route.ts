import { NextResponse } from "next/server";
import { processPrajvayaReasoning } from "@/lib/prajvaya-ai/reasoning-engine";
import { CompanionId, MemoryItem } from "@/lib/prajvaya-ai/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, companionId = "master", memories = [], memoryEnabled = true } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages payload format." }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userText = lastMessage?.content || "Hello";

    // Attempt connecting to Prajvaya Python FastAPI ML/RAG Backend
    try {
      const mlRes = await fetch("http://127.0.0.1:8000/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userText }],
          companion_id: companionId,
          user_name: "Aarav"
        })
      });

      if (mlRes.ok) {
        const mlData = await mlRes.json();
        return NextResponse.json({
          reply: mlData.reply,
          activeCompanion: mlData.active_companion || companionId,
          collaboratingCompanions: [],
          emotionalProfile: {
            primaryEmotion: "calm",
            confidence: 0.95,
            empathyNote: "Prajvaya ML Model Engine active."
          },
          reasoningChain: [
            { stage: "Intent & Emotion", detail: "Query received by Prajvaya ML Core." },
            { stage: "Safety Check", detail: mlData.safety_flagged ? "Safety filter triggered." : "Inputs verified safe." },
            { stage: "RAG Knowledge Retrieval", detail: mlData.rag_citations?.join(", ") || "Retrieved verified passages." },
            { stage: "Action Plan", detail: "Formulated practical steps." }
          ],
          evidenceBadge: mlData.rag_citations?.length ? {
            scientificBasis: "Verified Prajvaya Knowledge Base",
            culturalContext: mlData.rag_citations[0]
          } : undefined,
          actionPlan: ["Take a deep breath", "Focus on immediate control", "Execute step 1"]
        });
      }
    } catch (e) {
      console.log("Prajvaya ML Backend offline, using local TS reasoning engine fallback.");
    }

    // Fallback: Run Prajvaya's local multi-stage reasoning engine
    const reasoningResult = processPrajvayaReasoning(
      userText,
      companionId as CompanionId,
      memories as MemoryItem[],
      memoryEnabled
    );

    return NextResponse.json({
      reply: reasoningResult.reply,
      activeCompanion: reasoningResult.activeCompanion,
      collaboratingCompanions: reasoningResult.collaboratingCompanions,
      emotionalProfile: reasoningResult.emotionalProfile,
      reasoningChain: reasoningResult.reasoningChain,
      evidenceBadge: reasoningResult.evidenceBadge,
      actionPlan: reasoningResult.actionPlan,
    });
  } catch (err: any) {
    console.error("Prajvaya AI Route error:", err);
    return NextResponse.json(
      { error: "An error occurred inside Prajvaya's reasoning engine." },
      { status: 500 }
    );
  }
}
