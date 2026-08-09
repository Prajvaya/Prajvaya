import json
import os

def verify_dataset(filepath: str, sample_check_count: int = 5):
    print("==================================================")
    print("Prajvaya AI Companion Dataset Verification")
    print("==================================================")
    
    if not os.path.exists(filepath):
        print(f"Error: File '{filepath}' not found.")
        return
        
    file_size_mb = os.path.getsize(filepath) / (1024 * 1024)
    print(f"File Path    : {os.path.abspath(filepath)}")
    print(f"File Size    : {file_size_mb:.2f} MB")
    
    total_lines = 0
    persona_counts = {}
    emotion_counts = {}
    sample_dialogues = []

    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            total_lines += 1
            data = json.loads(line)
            
            comp_id = data.get("companion_id", "unknown")
            emotion = data.get("emotion", "unknown")
            
            persona_counts[comp_id] = persona_counts.get(comp_id, 0) + 1
            emotion_counts[emotion] = emotion_counts.get(emotion, 0) + 1
            
            if total_lines <= sample_check_count:
                sample_dialogues.append(data)

    print(f"Total Rows   : {total_lines:,} samples")
    print("--------------------------------------------------")
    print("Distribution by Specialized Companion Persona:")
    for comp, count in persona_counts.items():
        pct = (count / total_lines) * 100
        print(f" - {comp.capitalize():<12}: {count:,} samples ({pct:.1f}%)")
        
    print("--------------------------------------------------")
    print("Distribution by Emotional Spectrum:")
    for emo, count in emotion_counts.items():
        pct = (count / total_lines) * 100
        print(f" - {emo.capitalize():<12}: {count:,} samples ({pct:.1f}%)")

    print("--------------------------------------------------")
    print("Sample Inspection (Record #1):")
    sample = sample_dialogues[0]
    print(f"ID           : {sample['id']}")
    print(f"Companion    : {sample['companion_id']}")
    print(f"Emotion      : {sample['emotion']}")
    print(f"Topic        : {sample['topic']}")
    print("Messages:")
    for msg in sample["messages"]:
        role = msg["role"].upper()
        content = msg["content"][:120].replace('\n', ' ')
        print(f"  [{role}]: {content}...")

    print("==================================================")

if __name__ == "__main__":
    import sys
    filepath = sys.argv[1] if len(sys.argv) > 1 else "dataset/prajvaya_companion_10k.jsonl"
    verify_dataset(filepath)
