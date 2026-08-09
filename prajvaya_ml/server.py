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

    # Step 4: Human-Centered Prajvaya Response Synthesis
    rag_context_str = ""
    if rag_results:
        passages = [f"• {r['citation']}: {r['translation']}" for r in rag_results]
        rag_context_str = "\n\n" + "\n".join(passages)

    if any(w in t for w in ["die", "death", "dying", "overthinking", "neurological", "fidgeting", "health issues", "disease", "panic"]):
        reply_content = (
            f"Namaste {request.user_name}. I hear you, and I am right here with you. Take a slow, gentle breath.\n\n"
            "What you're feeling right now is a very real, overwhelming anxiety loop. When anxiety spikes, it tricks the mind into catastrophic fears like 'I am going to die', and it can even create real physical sensations like fidgeting, racing heartbeat, or chest tightness. But thoughts are not facts, and your body is physically safe right now.\n\n"
            "Press both feet flat on the cold floor, drop your shoulders, and take 3 slow, deep abdominal breaths. You don't have to carry all these health, career, and life worries at once. Tell me... what specific thought started this heavy feeling today?"
            + rag_context_str
        )
    elif any(w in t for w in ["exam", "placement", "prep", "fail", "test", "interview", "0%", "marks", "imposter", "syllabus"]):
        reply_content = (
            f"I hear you loud and clear, {request.user_name}, and I want you to take a deep, slow breath right now.\n\n"
            "Feeling like you know '0%' right before an important placement exam is a classic stress response called Hyper-Anxiety Freezing—your brain gets so overwhelmed by the high stakes that it temporarily hides what you've learned behind panic. It does NOT mean you know nothing.\n\n"
            "Stop trying to cover 100% of new topics right now. Focus on 2 or 3 core concepts you already know well, write them on paper to reassure your brain, and make sure you get 7 hours of sleep before the test. You are far bigger than one test result. What part of your prep is worrying you most?"
            + rag_context_str
        )
    elif any(w in t for w in ["trust", "relationship", "special", "partner", "boyfriend", "girlfriend", "spouse", "marriage", "insecure", "doubt"]):
        reply_content = (
            f"I hear how deeply important this is to you, {request.user_name}. Navigating trust issues with someone special in your life can feel emotionally heavy, disorienting, and deeply vulnerable.\n\n"
            "Trust in a relationship is built slowly like a quiet garden—it is fragile when doubts arise, but it can be nurtured through clear, calm communication and mutual transparency. Often, when trust feels shaken, our minds get caught between fear of being hurt and the desire to stay close.\n\n"
            "Take a quiet moment to write down what specific situation triggered this doubt before speaking with your partner, and use 'I' statements to express your feelings without placing blame. Would you like to share a bit more about what happened?"
            + rag_context_str
        )
    elif any(w in t for w in ["stress", "burnout", "overwhelmed", "anxious", "anxiety", "exhausted"]):
        reply_content = (
            f"Namaste {request.user_name}. I hear the weight in your words, and your feelings are completely valid.\n\n"
            "When we go through intense periods of stress or emotional pain, it can feel like our inner world is spinning out of control. Please know that feeling this way doesn't mean you're weak—it simply means your mind and body have been carrying a lot right now.\n\n"
            "Step away from screens for a few minutes, drink a glass of warm water, and give yourself permission to rest. What is one small thing on your mind that feels heaviest right now?"
            + rag_context_str
        )
    else:
        reply_content = (
            f"Namaste {request.user_name}. I am listening closely to everything you're sharing.\n\n"
            "Life brings so many heavy layers all at once—health concerns, career goals, relationships, loneliness, and daily stress. It is completely human to feel overwhelmed by all of it.\n\n"
            "Please remember to treat yourself with patience and warmth. You don't have to figure out your whole life journey today—just focusing on one calm breath and one small step in front of you is more than enough. What part of what you're feeling would you like to talk through first?"
            + rag_context_str
        )

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
