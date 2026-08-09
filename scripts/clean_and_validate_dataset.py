import os
import json
import time
import re
import argparse
from typing import Dict, Any, Tuple, Set

def is_valid_text(text: str) -> bool:
    if not text or len(text.strip()) < 5:
        return False
    # Check for excessive repetition or spam patterns
    if len(set(text.split())) < 2 and len(text.split()) > 10:
        return False
    return True

def clean_and_validate(input_path: str, output_path: str, report_path: str):
    print("==================================================")
    print("STAGE 1: Prajvaya Dataset Cleaning & Validation")
    print("==================================================")
    print(f"Input file  : {input_path}")
    print(f"Output file : {output_path}")

    start_time = time.time()
    
    total_records = 0
    retained_records = 0
    removed_duplicates = 0
    removed_corrupted = 0
    removed_formatting_issues = 0
    modified_records = 0
    
    seen_hashes: Set[int] = set()
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(input_path, "r", encoding="utf-8") as infile, \
         open(output_path, "w", encoding="utf-8") as outfile:
        
        for line in infile:
            total_records += 1
            line_str = line.strip()
            if not line_str:
                removed_corrupted += 1
                continue
                
            try:
                record = json.loads(line_str)
            except json.JSONDecodeError:
                removed_corrupted += 1
                continue
                
            # Validate required keys
            messages = record.get("messages", [])
            if not messages or len(messages) < 2:
                removed_corrupted += 1
                continue

            # Extract full text for exact/fuzzy deduplication
            full_text = " ".join([m.get("content", "") for m in messages])
            text_hash = hash(full_text)
            
            if text_hash in seen_hashes:
                removed_duplicates += 1
                continue
                
            # Quality & formatting validation
            valid = True
            for msg in messages:
                content = msg.get("content", "")
                if not is_valid_text(content):
                    valid = False
                    break
            
            if not valid:
                removed_formatting_issues += 1
                continue

            # Preserving scriptural & cultural quotes without silent modification
            # Strip trailing space anomalies
            cleaned_messages = []
            for msg in messages:
                c = msg["content"].strip()
                cleaned_messages.append({"role": msg["role"], "content": c})
            
            record["messages"] = cleaned_messages
            seen_hashes.add(text_hash)
            outfile.write(json.dumps(record, ensure_ascii=False) + "\n")
            retained_records += 1

            if total_records % 50000 == 0:
                print(f"Processed {total_records:,} records... ({retained_records:,} retained)")

    elapsed = time.time() - start_time
    retention_pct = (retained_records / total_records * 100) if total_records > 0 else 0

    validation_report = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "input_file": os.path.abspath(input_path),
        "output_file": os.path.abspath(output_path),
        "total_input_records": total_records,
        "retained_records": retained_records,
        "retention_percentage": round(retention_pct, 2),
        "removed_metrics": {
            "duplicates": removed_duplicates,
            "corrupted_json": removed_corrupted,
            "formatting_and_spam": removed_formatting_issues
        },
        "execution_time_seconds": round(elapsed, 2)
    }

    with open(report_path, "w", encoding="utf-8") as rfile:
        json.dump(validation_report, rfile, indent=2, ensure_ascii=False)

    print("--------------------------------------------------")
    print(f"Total Processed : {total_records:,} records")
    print(f"Retained        : {retained_records:,} records ({retention_pct:.2f}%)")
    print(f"Duplicates      : {removed_duplicates:,}")
    print(f"Corrupted/Short : {removed_corrupted + removed_formatting_issues:,}")
    print(f"Validation Log  : {os.path.abspath(report_path)}")
    print(f"Total Time      : {elapsed:.2f} seconds")
    print("==================================================")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Prajvaya Dataset Cleaning & Validation Engine")
    parser.add_argument("--input", type=str, default="dataset/prajvaya_companion_350k.jsonl")
    parser.add_argument("--output", type=str, default="dataset/prajvaya_cleaned_350k.jsonl")
    parser.add_argument("--report", type=str, default="dataset/validation_report.json")
    args = parser.parse_args()

    clean_and_validate(args.input, args.output, args.report)
