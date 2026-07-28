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

    // Run Prajvaya's local multi-stage reasoning engine
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
      recalledMemoriesUsed: reasoningResult.recalledMemoriesUsed,
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
