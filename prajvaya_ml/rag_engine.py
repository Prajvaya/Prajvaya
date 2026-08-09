import os
import json
from typing import List, Dict, Any

SEED_WISDOM_KNOWLEDGE = [
    {
        "id": "gita_2_47",
        "book": "Bhagavad Gita",
        "chapter": 2,
        "verse": 47,
        "original_text": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
        "translation": "You have a right to perform your prescribed duty, but at no point to the fruits of work. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
        "topic": "Duty, Focus, Anxiety Reduction, Nishkama Karma",
        "language": "Sanskrit & English",
        "source": "Bhagavad Gita As It Is",
        "citation": "Bhagavad Gita, Chapter 2, Verse 47"
    },
    {
        "id": "gita_2_56",
        "book": "Bhagavad Gita",
        "chapter": 2,
        "verse": 56,
        "original_text": "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः। वीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥",
        "translation": "One who is not disturbed in mind even amidst three-fold miseries or elated when there is happiness, and who is free from attachment, fear and anger, is called a sage of steady mind (Sthitaprajna).",
        "topic": "Emotional Resilience, Peace of Mind, Sthitaprajna",
        "language": "Sanskrit & English",
        "source": "Bhagavad Gita As It Is",
        "citation": "Bhagavad Gita, Chapter 2, Verse 56"
    },
    {
        "id": "gita_6_5",
        "book": "Bhagavad Gita",
        "chapter": 6,
        "verse": 5,
        "original_text": "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
        "translation": "One must elevate oneself by one's own mind, not degrade oneself. For the mind is the friend of the conditioned soul, and his enemy as well.",
        "topic": "Self-Discipline, Mind Control, Personal Growth",
        "language": "Sanskrit & English",
        "source": "Bhagavad Gita As It Is",
        "citation": "Bhagavad Gita, Chapter 6, Verse 5"
    },
    {
        "id": "eco_zero_waste_01",
        "book": "Prajvaya Eco-Living Handbook",
        "chapter": 1,
        "verse": 12,
        "original_text": "Zero-Waste Circular Habit Systems",
        "translation": "Segregate organic waste at source, convert kitchen scraps into active soil compost, and eliminate single-use plastics by adopting re-usable glass and stainless-steel alternatives.",
        "topic": "Sustainability, Zero Waste, Circular Living",
        "language": "English",
        "source": "Prajvaya Environmental Engineering Codex",
        "citation": "Prajvaya Eco Handbook, Vol 1, Section 12"
    },
    {
        "id": "wellness_sleep_01",
        "book": "Prajvaya Arogya Vitality Guide",
        "chapter": 3,
        "verse": 8,
        "original_text": "Circadian Rhythm & Blue-Light Mitigation",
        "translation": "Discontinue digital screen exposure 60 minutes prior to sleep to enable melatonin secretion. Practice 5 minutes of Anulom Vilom pranayama breathing to transition the autonomic nervous system into parasympathetic recovery mode.",
        "topic": "Sleep Hygiene, Circadian Alignment, Pranayama",
        "language": "English",
        "source": "Prajvaya Holistic Vitality Codex",
        "citation": "Prajvaya Arogya Guide, Vol 3, Section 8"
    }
]

class PrajvayaWisdomRAG:
    """
    Retrieval-Augmented Generation (RAG) Engine for Prajvaya AI.
    Queries verified knowledge bases to prevent quote hallucinations and ground responses in source metadata.
    """
    def __init__(self):
        self.knowledge_base = SEED_WISDOM_KNOWLEDGE

    def search(self, query: str, top_k: int = 2) -> List[Dict[str, Any]]:
        q_lower = query.lower()
        matched = []
        
        for entry in self.knowledge_base:
            score = 0
            keywords = entry["topic"].lower().split(", ") + [entry["book"].lower()]
            for kw in keywords:
                if kw in q_lower:
                    score += 2
            if any(w in q_lower for w in ["gita", "work", "duty", "fruit", "anxiety", "mind", "sleep", "waste"]):
                score += 1

            if score > 0:
                matched.append((score, entry))
                
        matched.sort(key=lambda x: x[0], reverse=True)
        results = [m[1] for m in matched[:top_k]]
        
        # Fallback to top entries if query didn't match keyword trigger
        if not results:
            results = self.knowledge_base[:top_k]
            
        return results

if __name__ == "__main__":
    rag = PrajvayaWisdomRAG()
    print("==================================================")
    print("STAGE 10: Prajvaya Wisdom RAG System Test")
    print("==================================================")
    res = rag.search("How do I reduce work anxiety using Gita wisdom?", top_k=2)
    for i, item in enumerate(res, 1):
        print(f"Match #{i}: {item['citation']}")
        print(f"Original : {item['original_text']}")
        print(f"Translation: {item['translation']}")
        print("--------------------------------------------------")
    print("==================================================")
