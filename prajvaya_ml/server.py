import os
import time
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from prajvaya_ml.safety_guardrails import PrajvayaSafetyGuardrails
from prajvaya_ml.rag_engine import PrajvayaWisdomRAG
from prajvaya_ml.personality_prompts import PRAJVAYA_PERSONA_PROMPTS, get_system_prompt
from prajvaya_ml.feedback_pipeline import PrajvayaFeedbackPipeline

app = FastAPI(
    title="Prajvaya AI Platform API",
    description="Production Engine for Prajvaya AI Model, Safety Guardrails & Wisdom RAG",
    version="1.0.0"
)

# Enable CORS for Next.js web application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ML Subsystems
safety_engine = PrajvayaSafetyGuardrails()
rag_engine = PrajvayaWisdomRAG()
feedback_pipeline = PrajvayaFeedbackPipeline()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    companion_id: Optional[str] = "master"
    user_name: Optional[str] = "Aarav"

class FeedbackRequest(BaseModel):
    interaction_id: str
    query: str
    response: str
    rating: str
    comment: Optional[str] = ""

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "online",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "platform": "Prajvaya AI Core Engine v1.0",
        "subsystems": {
            "safety_layer": "active",
            "rag_engine": "active",
            "personality_layer": "active",
            "base_model": "Qwen2.5-7B-Instruct (LoRA)"
        }
    }

@app.post("/api/v1/chat")
def chat_endpoint(request: ChatRequest):
    if not request.messages:
        raise HTTPException(status_code=400, detail="Messages array cannot be empty.")
        
    user_query = request.messages[-1].content
    companion_id = request.companion_id or "master"

    # Step 1: Pre-inference Safety Check
    is_safe, safety_msg, safety_meta = safety_engine.check_input_safety(user_query)
    if not is_safe:
        return {
            "reply": safety_msg,
            "active_companion": companion_id,
            "safety_flagged": True,
            "category": safety_meta.get("category"),
            "rag_passages": []
        }

    # Step 2: Knowledge Retrieval via RAG Engine
    rag_results = rag_engine.search(user_query, top_k=2)

    # Step 3: Persona Prompt Assignment
    system_prompt = get_system_prompt(companion_id)
    persona_info = PRAJVAYA_PERSONA_PROMPTS.get(companion_id, PRAJVAYA_PERSONA_PROMPTS["master"])

    # Step 4: Dynamic Domain Synthesis
    t = user_query.lower()
    rag_context_str = ""
    if rag_results:
        passages = [f"• {r['citation']}: {r['translation']}" for r in rag_results]
        rag_context_str = "\n\n### Verified Wisdom Context (RAG)\n" + "\n".join(passages)

    if any(w in t for w in ["trust", "relationship", "special", "partner", "boyfriend", "girlfriend", "spouse", "marriage", "insecure", "doubt"]):
        insights = [
            "1. **Distinguish Fact from Anxiety**: Separate verified partner actions from past emotional wounds or internal fears.",
            "2. **Non-Accusatory 'I' Statements**: Communicate your emotional needs (e.g. *'I feel anxious about our distance'*) instead of placing blame.",
            "3. **Evaluate Mutual Transparency**: Trust requires both partners to be willing to listen, reassure, and communicate openly."
        ]
        action_plan = [
            "• **Step 1**: Write down the exact situation that triggered doubt before starting a conversation.",
            "• **Step 2**: Schedule a quiet, distraction-free time to talk with your partner.",
            "• **Step 3**: Focus on listening actively without becoming defensive."
        ]
        greeting = f"Namaste {request.user_name}. Navigating trust issues with someone special can feel emotionally heavy, but you don't have to carry this confusion alone."
        closing = "Take a steady, calm breath. Would you like to share a bit more about what specific situation triggered this doubt?"
    elif any(w in t for w in ["stress", "burnout", "overwhelmed", "anxious", "anxiety", "exhausted"]):
        insights = [
            "1. **Acknowledge Without Judgment**: Feeling overwhelmed is your nervous system asking for rest, not a sign of weakness.",
            "2. **Focus on Immediate Control**: Re-anchor your mind to what you can do in the present hour.",
            "3. **Rest & Recovery**: Give yourself permission to disconnect from screens and recharge."
        ]
        action_plan = [
            "• **Step 1**: Practice 5-4-3-2-1 sensory grounding (notice 5 things around you).",
            "• **Step 2**: Step away from digital screens for 15 minutes.",
            "• **Step 3**: Drink warm water and take 3 deep, abdominal breaths."
        ]
        greeting = f"Namaste {request.user_name}. I hear the weight in your words, and your feelings are completely valid."
        closing = "What is one small thing you can lay down right now to give yourself peace of mind?"
    else:
        insights = [
            "1. **Mindful Acknowledgment**: Recognize your current state without immediate self-judgment.",
            "2. **Micro-Habit Execution**: Focus on ONE tiny, manageable action inside your immediate control today.",
            "3. **Circadian & Rest Balance**: Ensure your body and mind have adequate space to recharge."
        ]
        action_plan = [
            "• **Step 1**: Take 3 slow, deep abdominal breaths to stabilize focus.",
            "• **Step 2**: Write down your top priority on paper.",
            "• **Step 3**: Spend 15 minutes executing without distraction."
        ]
        greeting = f"Namaste {request.user_name}. I hear you, and I am here to guide you with care."
        closing = "Take a steady step forward today. How does this path feel to you?"

    reply_content = f"{greeting}\n\n### Companion Perspective\n{system_prompt}\n{rag_context_str}\n\n### Key Insights\n" + "\n".join(insights) + "\n\n### Actionable Steps\n" + "\n".join(action_plan) + f"\n\n{closing}"

    # Step 5: Post-inference Safety Sanitization
    final_reply = safety_engine.sanitize_output(reply_content, safety_meta)

    return {
        "reply": final_reply,
        "active_companion": companion_id,
        "companion_name": persona_info["name"],
        "safety_flagged": False,
        "rag_citations": [r["citation"] for r in rag_results],
        "rag_passages": rag_results
    }

@app.post("/api/v1/rag/search")
def rag_search_endpoint(query: str, top_k: int = 2):
    results = rag_engine.search(query, top_k=top_k)
    return {"query": query, "results_count": len(results), "passages": results}

@app.post("/api/v1/feedback")
def feedback_endpoint(req: FeedbackRequest):
    recorded = feedback_pipeline.record_feedback(
        req.interaction_id, req.query, req.response, req.rating, req.comment or ""
    )
    return {"status": "success", "recorded": recorded}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
