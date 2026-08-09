import os
import json
import time
import argparse
from typing import List, Dict, Any

CATEGORIES = [
    "Emotional support",
    "Daily-life problems",
    "Study pressure",
    "Career",
    "Relationships",
    "Self-discipline",
    "Digital wellbeing",
    "Sustainability",
    "Mental wellbeing",
    "Meditation",
    "Ancient wisdom",
    "Bhagavad Gita",
    "Indian philosophical texts",
    "Traditional knowledge",
    "General life questions"
]

COMPANION_CATEGORY_MAPPING = {
    "jeevan": ["Emotional support", "Daily-life problems", "Mental wellbeing", "Relationships", "Self-discipline"],
    "arogya": ["Mental wellbeing", "Meditation", "Digital wellbeing", "Daily-life problems", "Traditional knowledge"],
    "prakriti": ["Sustainability", "Digital wellbeing", "Daily-life problems", "Traditional knowledge"],
    "vidya": ["Study pressure", "Career", "Self-discipline", "General life questions"],
    "parampara": ["Ancient wisdom", "Bhagavad Gita", "Indian philosophical texts", "Traditional knowledge", "Meditation"],
    "srijan": ["Career", "Self-discipline", "General life questions"],
    "master": ["Emotional support", "Mental wellbeing", "Ancient wisdom", "Sustainability", "General life questions"]
}

def annotate_record(record: Dict[str, Any]) -> Dict[str, Any]:
    comp_id = record.get("companion_id", "master")
    topic = record.get("topic", "")
    messages = record.get("messages", [])
    
    user_query = ""
    assistant_response = ""
    for msg in messages:
        if msg.get("role") == "user" and not user_query:
            user_query = msg.get("content", "")
        elif msg.get("role") == "assistant" and not assistant_response:
            assistant_response = msg.get("content", "")

    # Multi-label category assignment
    assigned_categories = set(COMPANION_CATEGORY_MAPPING.get(comp_id, ["General life questions"]))
    
    t_lower = topic.lower() + " " + user_query.lower()
    if "gita" in t_lower or "shloka" in t_lower or "gita" in t_lower:
        assigned_categories.add("Bhagavad Gita")
        assigned_categories.add("Ancient wisdom")
    if "sleep" in t_lower or "anxiety" in t_lower or "burnout" in t_lower:
        assigned_categories.add("Mental wellbeing")
        assigned_categories.add("Emotional support")
    if "work" in t_lower or "job" in t_lower or "code" in t_lower or "architecture" in t_lower:
        assigned_categories.add("Career")
    if "garden" in t_lower or "plastic" in t_lower or "waste" in t_lower:
        assigned_categories.add("Sustainability")
        
    structured_record = {
        "id": record.get("id"),
        "instruction": user_query,
        "context": f"Prajvaya AI Persona: {comp_id.capitalize()} | Emotion: {record.get('emotion', 'calm')}",
        "response": assistant_response,
        "source": "Prajvaya AI Core Codex v1.0",
        "book": "Prajvaya Classical Knowledge Series" if comp_id in ["parampara", "arogya"] else "Prajvaya Life Codex",
        "chapter": record.get("emotion", "general").capitalize(),
        "verse": f"Section-{record.get('id', '')[-6:]}",
        "topic": topic,
        "language": "English (Devanagari-aware)",
        "categories": list(assigned_categories),
        "metadata": {
            "companion_id": comp_id,
            "primary_emotion": record.get("emotion"),
            "multi_turn": len(messages) > 2,
            "turns_count": len(messages),
            "reasoning_included": "reasoning_chain" in record
        },
        "citation_reference": f"Prajvaya Knowledge Base [{comp_id.upper()}-{record.get('emotion', 'general').upper()}]",
        "messages": messages
    }
    
    return structured_record

def process_structuring(input_path: str, output_path: str):
    print("==================================================")
    print("STAGES 2 & 3: Dataset Structuring, Categorization & Annotation")
    print("==================================================")
    print(f"Input file  : {input_path}")
    print(f"Output file : {output_path}")

    start_time = time.time()
    count = 0
    
    with open(input_path, "r", encoding="utf-8") as infile, \
         open(output_path, "w", encoding="utf-8") as outfile:
        
        for line in infile:
            record = json.loads(line.strip())
            structured = annotate_record(record)
            outfile.write(json.dumps(structured, ensure_ascii=False) + "\n")
            count += 1
            
            if count % 50000 == 0:
                print(f"Structured & Annotated {count:,} records...")

    elapsed = time.time() - start_time
    file_size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print("--------------------------------------------------")
    print(f"Successfully processed {count:,} dataset samples!")
    print(f"File Saved to : {os.path.abspath(output_path)}")
    print(f"Dataset Size  : {file_size_mb:.2f} MB")
    print(f"Total Time    : {elapsed:.2f} seconds")
    print("==================================================")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Prajvaya Dataset Structuring & Annotation Engine")
    parser.add_argument("--input", type=str, default="dataset/prajvaya_cleaned_350k.jsonl")
    parser.add_argument("--output", type=str, default="dataset/prajvaya_structured_annotated_350k.jsonl")
    args = parser.parse_args()

    process_structuring(args.input, args.output)
