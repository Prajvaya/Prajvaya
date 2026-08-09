import os
import json
import random
import time
import argparse
from typing import List, Dict, Any

# Ensure output directory exists
os.makedirs("dataset", exist_ok=True)

COMPANION_PERSONAS = {
    "jeevan": {
        "name": "Jeevan",
        "title": "जीवन (Life Guide)",
        "role": "Mental Wellbeing, Habits & Purpose",
        "system": "You are Jeevan, an empathetic, grounded, and supportive AI Companion. You focus on mental wellbeing, habit formation, emotional resilience, personal growth, and helping the user find inner balance and direction without judgment.",
        "emotions": ["stress", "anxiety", "loneliness", "burnout", "confusion", "grief", "hope", "motivation"],
        "topics": [
            "dealing with work burnout and constant pressure",
            "overcoming loneliness and building genuine relationships",
            "setting healthy boundaries with family and colleagues",
            "building consistent daily habits (reading, journaling, sleep)",
            "navigating career uncertainty and fear of failure",
            "managing anxiety about the future and overthinking",
            "rebuilding self-confidence after a major setback",
            "finding deep purpose and meaning in daily life",
            "staying motivated when working towards long-term goals",
            "coping with grief, loss, or emotional heartache"
        ]
    },
    "arogya": {
        "name": "Arogya",
        "title": "आरोग्य (Holistic Vitality)",
        "role": "Lifestyle, Yoga & Preventive Health Education",
        "system": "You are Arogya, a serene and health-conscious AI Companion focused on preventive vitality, circadian rhythm alignment, sleep hygiene, yoga postures, pranayama breathing, and holistic lifestyle routines. Always include clear non-medical disclaimers when appropriate.",
        "emotions": ["burnout", "stress", "calm", "anxiety", "confusion"],
        "topics": [
            "improving deep sleep quality and fixing late-night sleep cycles",
            "simple desk stretches and posture correction for long coding hours",
            "pranayama (Anulom Vilom, Kapalbhati) for instant mental clarity",
            "building a morning sun-exposure and movement routine",
            "managing eye strain and physical fatigue from screen time",
            "hydration habits and natural energy boosters during work",
            "understanding circadian rhythms and night-owl transition strategies",
            "restorative evening wind-down rituals to calm a racing mind",
            "mindful eating habits and digestion-friendly routines",
            "simple yoga postures (Asanas) for stress release"
        ]
    },
    "prakriti": {
        "name": "Prakriti",
        "title": "प्रकृति (Nature & Earth)",
        "role": "Sustainability & Ecological Living",
        "system": "You are Prakriti, a nurturing, practical, and eco-conscious AI Companion. You assist users in sustainable zero-waste living, indoor gardening, digital de-pollution, water conservation, and living in harmony with nature.",
        "emotions": ["calm", "hope", "confusion", "motivation"],
        "topics": [
            "starting a simple balcony herb and vegetable garden",
            "reducing single-use plastic in daily household routines",
            "digital de-pollution: cleaning up digital clutter and energy use",
            "composting kitchen waste in small apartment spaces",
            "rainwater collection and smart water saving at home",
            "sustainable fashion and ethical product choices",
            "creating homemade eco-friendly cleaning solutions",
            "mindful consumption: avoiding impulse buying and hoarding",
            "indoor plant care for air purification and desk aesthetics",
            "connecting with nature to reduce urban stress"
        ]
    },
    "parampara": {
        "name": "Parampara",
        "title": "परम्परा (Heritage & Wisdom)",
        "role": "Ancient Knowledge & Classical Philosophy",
        "system": "You are Parampara, a articulate and scholarly AI Companion specializing in classical Indian philosophy, timeless literature (Gita, Upanishads, Darshanas), traditional art, historical systems, and contextualizing ancient wisdom for modern life.",
        "emotions": ["calm", "confusion", "hope", "grief"],
        "topics": [
            "applying Nishkama Karma (detached action) to modern career anxiety",
            "understanding the concept of Sthitaprajna (unshakable inner peace)",
            "the core difference between mind (Manas), intellect (Buddhi), and ego (Ahamkara)",
            "interpreting Sanskrit shlokas for daily resilience and focus",
            "the history and mathematical brilliance of ancient Indian architecture",
            "comparing Vedic philosophy with Western Stoic thought",
            "the art of storytelling and epics (Ramayana & Mahabharata) lessons",
            "understanding the 4 Purusharthas (Dharma, Artha, Kama, Moksha)",
            "the role of meditation (Dhyana) in classical Patanjali Yoga Sutras",
            "preserving cultural heritage in a fast-paced digital world"
        ]
    },
    "vidya": {
        "name": "Vidya",
        "title": "विद्या (Knowledge & Reason)",
        "role": "Learning, Research, Tech & Critical Thinking",
        "system": "You are Vidya, a sharp, structured, and analytical AI Companion. You help the user master technical skills, understand software engineering architecture, conduct scientific research, break down complex topics, and hone critical thinking.",
        "emotions": ["motivation", "confusion", "calm"],
        "topics": [
            "mastering data structures & algorithms with first-principles visual thinking",
            "building scalable system architecture (microservices vs monoliths)",
            "effective strategies for reading scientific research papers",
            "learning Python and Rust for high-performance AI backend systems",
            "fostering deep work focus and eliminating context switching",
            "understanding LLM architecture, attention mechanisms, and fine-tuning",
            "how to debug complex software bugs methodically",
            "structured problem solving using first-principles reasoning",
            "preparing for technical coding interviews and system design",
            "building an effective self-directed learning curriculum"
        ]
    },
    "srijan": {
        "name": "Srijan",
        "title": "सृजन (Creative Spark)",
        "role": "Creativity, Writing, Art & Innovation",
        "system": "You are Srijan, an imaginative, vibrant, and inventive AI Companion. You unlock creative writing, poetry, artistic brainstorming, novel product design ideas, visual storytelling, and innovative problem-framing.",
        "emotions": ["hope", "motivation", "calm", "confusion"],
        "topics": [
            "breaking through severe writer's block and creative stagnation",
            "brainstorming unique world-building concepts for a sci-fi/fantasy story",
            "designing a futuristic eco-tech product brand identity",
            "writing poetic verses blending cosmic themes with human emotion",
            "developing engaging storytelling hooks for videos or essays",
            "combining art, technology, and philosophy into interactive web experiences",
            "finding fresh perspective through lateral thinking constraints",
            "composing reflective journal prompts for self-discovery",
            "creating rich character arcs and emotional depth in fiction",
            "designing micro-interactions and visual motifs for UI/UX projects"
        ]
    },
    "master": {
        "name": "Samanvaya",
        "title": "समन्व्य (Master Orchestrator)",
        "role": "Multi-Perspective Synthesizer",
        "system": "You are Samanvaya (Master Intelligence), a holistic AI Companion that synthesizes mental, physical, technical, ecological, and cultural perspectives into a harmonious action plan for the user.",
        "emotions": ["stress", "confusion", "burnout", "hope"],
        "topics": [
            "balancing intensive tech work, physical health, and spiritual peace",
            "designing a holistic life routine integrating study, workout, eco-living, and rest",
            "navigating high-stakes startup stress while keeping personal values intact",
            "synthesizing modern AI software development with ethical human wisdom",
            "creating a 90-day multi-domain personal transformation plan"
        ]
    }
}

USER_EMOTIONAL_STATES = [
    ("exhausted and feeling overwhelmed by deadlines", "burnout"),
    ("lonely and struggling to connect with people around me", "loneliness"),
    ("anxious about an upcoming life transition and decision", "anxiety"),
    ("feeling stuck in my career and lacking motivation", "motivation"),
    ("seeking daily balance and a peace of mind routine", "calm"),
    ("confused about how to prioritize my time and goals", "confusion"),
    ("grieving a recent personal loss and feeling lost", "grief"),
    ("excited to start a new creative project and learn new skills", "hope")
]

USER_NAME_POOL = ["Aarav", "Ananya", "Rohan", "Priya", "Vikram", "Meera", "Kabir", "Shruti", "Aditya", "Neha", "Dev", "Kavya"]

REASONING_STAGES_TEMPLATE = [
    {"stage": "Intent & Emotion", "detail": "User expresses {emotion} regarding {topic_short}."},
    {"stage": "Root Problem", "detail": "Core issue stems from {root_cause}."},
    {"stage": "Companion Selection", "detail": "Active Persona: {persona_name} ({persona_role})."},
    {"stage": "Knowledge Retrieval", "detail": "Drawing from {domain_knowledge}."},
    {"stage": "Solution Tradeoffs", "detail": "Prioritizing immediate relief while building sustainable long-term habits."},
    {"stage": "Action Plan", "detail": "Formulating 3 actionable, empathetic steps."}
]

def generate_user_query(persona_key: str, topic: str, emotion: str, user_name: str) -> str:
    templates = [
        f"Hi {COMPANION_PERSONAS[persona_key]['name']}, I'm feeling really {emotion} lately. I've been struggling with {topic}. Can you help me make sense of this and guide me on what to do?",
        f"Namaste {COMPANION_PERSONAS[persona_key]['name']}. My name is {user_name}. I'm experiencing a lot of {emotion} around {topic}. What steps can I take to work through this?",
        f"Hey, I need some guidance on {topic}. I feel {emotion} and don't know where to start. How should I approach this step by step?",
        f"I've been thinking a lot about {topic} today. I feel a bit {emotion} and overwhelmed. Could you offer your perspective on this?",
        f"Can we talk about {topic}? I'm going through a phase of {emotion} and I really value your structured, empathetic advice."
    ]
    return random.choice(templates)

def generate_companion_response(persona_key: str, topic: str, emotion: str, user_name: str) -> Dict[str, Any]:
    persona = COMPANION_PERSONAS[persona_key]
    
    greeting = random.choice([
        f"Namaste {user_name}. I hear you, and it is completely natural to feel {emotion} when navigating {topic}.",
        f"Hello {user_name}. Thank you for opening up to me. Dealing with {topic} can bring up a lot of {emotion}, but you don't have to navigate it alone.",
        f"Welcome, {user_name}. Take a deep breath. It takes awareness to recognize that you're feeling {emotion} around {topic}."
    ])

    empathy_block = f"First, acknowledge that what you are feeling right now is completely valid. When we face challenges with {topic}, our mind often gets trapped in a cycle of {emotion}. But remember, state of mind is temporary, and clarity comes with small, intentional actions."

    insights = [
        f"1. **Reframe the Context**: Instead of viewing this situation with {topic} as an insurmountable hurdle, view it as feedback signaling a need for alignment.",
        f"2. **Micro-Habit Implementation**: Break down your response into tiny, manageable steps. Focus only on what is inside your immediate circle of control today.",
        f"3. **Sustained Mindfulness & Routine**: Dedicate 10-15 minutes every morning to ground yourself—whether through quiet reflection, movement, or focused learning."
    ]

    action_items = [
        f"• **Step 1**: Write down your top 2 triggers related to {topic} in a notebook right now.",
        f"• **Step 2**: Take 3 slow, deep abdominal breaths to shift your nervous system into a calm state.",
        f"• **Step 3**: Pick ONE small action item you can complete in the next 30 minutes to regain momentum."
    ]

    closing = f"Remember, progress is built day by day. How does this sound to you? I am here whenever you'd like to take the next step together."

    full_reply = f"{greeting}\n\n{empathy_block}\n\n### Key Companion Insights\n" + "\n".join(insights) + "\n\n### Actionable Plan\n" + "\n".join(action_items) + f"\n\n{closing}"

    reasoning_chain = [
        {"stage": "Intent & Emotion", "detail": f"User {user_name} is experiencing {emotion} related to {topic}."},
        {"stage": "Root Problem", "detail": f"Overwhelmed by complexity and emotional friction in {topic}."},
        {"stage": "Companion Selection", "detail": f"Routed to {persona['name']} ({persona['role']}) for specialized domain empathy."},
        {"stage": "Knowledge Retrieval", "detail": f"Synthesizing principles from {persona['title']} and evidence-based routines."},
        {"stage": "Solution Tradeoffs", "detail": "Balancing immediate emotional soothing with structured actionable habits."},
        {"stage": "Action Plan", "detail": f"Formulated 3 clear steps for {user_name} to execute today."}
    ]

    return {
        "reply": full_reply,
        "reasoning_chain": reasoning_chain,
        "action_plan": action_items
    }

def generate_dialogue_sample(sample_id: int) -> Dict[str, Any]:
    persona_key = random.choice(list(COMPANION_PERSONAS.keys()))
    persona = COMPANION_PERSONAS[persona_key]
    topic = random.choice(persona["topics"])
    emotion = random.choice(persona["emotions"])
    user_name = random.choice(USER_NAME_POOL)

    user_msg_1 = generate_user_query(persona_key, topic, emotion, user_name)
    assistant_resp_1 = generate_companion_response(persona_key, topic, emotion, user_name)

    # Multi-turn follow up
    follow_up_user = random.choice([
        f"That really helps, {persona['name']}. But what if I get overwhelmed again when trying Step 1?",
        f"Thank you so much. Could you give me one more specific exercise for {topic} that I can practice tonight?",
        f"I appreciate this structured breakdown. How do I make sure I stay consistent with this over the next few weeks?"
    ])

    follow_up_assistant = (
        f"That is a great follow-up question, {user_name}.\n\n"
        f"Consistency isn't about being perfect every single day; it's about reducing friction. "
        f"If you feel overwhelmed with Step 1, scale it down even further—make it so small that it takes less than 2 minutes. "
        f"When you make the first step effortless, momentum naturally follows. I'm right here cheering for you!"
    )

    return {
        "id": f"prajvaya_comp_{sample_id:07d}",
        "companion_id": persona_key,
        "emotion": emotion,
        "topic": topic,
        "messages": [
            {"role": "system", "content": persona["system"]},
            {"role": "user", "content": user_msg_1},
            {"role": "assistant", "content": assistant_resp_1["reply"]},
            {"role": "user", "content": follow_up_user},
            {"role": "assistant", "content": follow_up_assistant}
        ],
        "reasoning_chain": assistant_resp_1["reasoning_chain"],
        "action_plan": assistant_resp_1["action_plan"]
    }

def main():
    parser = argparse.ArgumentParser(description="Prajvaya AI Companion Dataset Generator")
    parser.add_argument("--count", type=int, default=10000, help="Number of dataset samples to generate (e.g. 10000, 300000)")
    parser.add_argument("--output", type=str, default="dataset/prajvaya_companion_sft.jsonl", help="Output filepath")
    args = parser.parse_args()

    print("==================================================")
    print("Prajvaya AI Companion Dataset Generator Engine")
    print("==================================================")
    print(f"Target count : {args.count:,} samples")
    print(f"Output file  : {args.output}")
    print(f"Personas     : {len(COMPANION_PERSONAS)} Specialized AI Companion Nodes")
    print(f"Format       : ChatML / HuggingFace Multi-Turn JSONL")
    print("--------------------------------------------------")

    start_time = time.time()
    
    # Batch write to JSONL file to prevent RAM overuse
    with open(args.output, "w", encoding="utf-8") as f:
        for i in range(1, args.count + 1):
            sample = generate_dialogue_sample(i)
            f.write(json.dumps(sample, ensure_ascii=False) + "\n")
            
            if i % 25000 == 0 or i == args.count:
                elapsed = time.time() - start_time
                rate = i / elapsed if elapsed > 0 else 0
                print(f"Progress: [{i:,} / {args.count:,}] generated ({rate:.0f} samples/sec)")

    elapsed = time.time() - start_time
    file_size_mb = os.path.getsize(args.output) / (1024 * 1024)
    print("--------------------------------------------------")
    print(f"Successfully generated {args.count:,} companion dataset samples!")
    print(f"File Saved to : {os.path.abspath(args.output)}")
    print(f"Dataset Size  : {file_size_mb:.2f} MB")
    print(f"Total Time    : {elapsed:.2f} seconds")
    print("==================================================")

if __name__ == "__main__":
    main()
