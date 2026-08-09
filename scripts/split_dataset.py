import os
import json
import random
import time
import argparse
from typing import List, Dict, Any

def perform_dataset_split(input_path: str, train_ratio: float = 0.8, val_ratio: float = 0.1, test_ratio: float = 0.1):
    print("==================================================")
    print("STAGE 4: Train / Validation / Test Dataset Split")
    print("==================================================")
    print(f"Input file  : {input_path}")
    print(f"Ratio Split : {int(train_ratio*100)}% Train / {int(val_ratio*100)}% Val / {int(test_ratio*100)}% Test")

    start_time = time.time()
    
    out_dir = os.path.dirname(input_path) or "dataset"
    train_file = os.path.join(out_dir, "train.jsonl")
    val_file = os.path.join(out_dir, "val.jsonl")
    test_file = os.path.join(out_dir, "test.jsonl")

    # Read all records
    print("Reading and shuffling records to ensure zero cross-split leakage...")
    records = []
    with open(input_path, "r", encoding="utf-8") as infile:
        for line in infile:
            records.append(line.strip())

    total = len(records)
    random.seed(42)
    random.shuffle(records)

    train_end = int(total * train_ratio)
    val_end = train_end + int(total * val_ratio)

    train_data = records[:train_end]
    val_data = records[train_end:val_end]
    test_data = records[val_end:]

    print(f"Writing Train split      : {len(train_data):,} records ({train_file})")
    with open(train_file, "w", encoding="utf-8") as f:
        f.write("\n".join(train_data) + "\n")

    print(f"Writing Validation split : {len(val_data):,} records ({val_file})")
    with open(val_file, "w", encoding="utf-8") as f:
        f.write("\n".join(val_data) + "\n")

    print(f"Writing Test split       : {len(test_data):,} records ({test_file})")
    with open(test_file, "w", encoding="utf-8") as f:
        f.write("\n".join(test_data) + "\n")

    elapsed = time.time() - start_time
    print("--------------------------------------------------")
    print(f"Total Processed Split : {total:,} records")
    print(f"Train Split           : {len(train_data):,} records")
    print(f"Validation Split      : {len(val_data):,} records")
    print(f"Test Split            : {len(test_data):,} records")
    print(f"Total Time            : {elapsed:.2f} seconds")
    print("==================================================")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Prajvaya Dataset Splitter Engine")
    parser.add_argument("--input", type=str, default="dataset/prajvaya_structured_annotated_350k.jsonl")
    parser.add_argument("--train-ratio", type=float, default=0.8)
    parser.add_argument("--val-ratio", type=float, default=0.1)
    parser.add_argument("--test-ratio", type=float, default=0.1)
    args = parser.parse_args()

    perform_dataset_split(args.input, args.train_ratio, args.val_ratio, args.test_ratio)
