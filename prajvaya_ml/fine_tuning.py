import os
import json
from typing import Dict, Any

PRAJVAYA_FINE_TUNING_CONFIG = {
    "base_model": "Qwen/Qwen2.5-7B-Instruct",
    "output_dir": "models/prajvaya-7b-lora",
    "dataset_train": "dataset/train.jsonl",
    "dataset_val": "dataset/val.jsonl",
    "quantization": "4-bit QLoRA",
    "lora_params": {
        "r": 16,
        "lora_alpha": 16,
        "lora_dropout": 0.05,
        "target_modules": ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]
    },
    "training_args": {
        "per_device_train_batch_size": 4,
        "gradient_accumulation_steps": 4,
        "learning_rate": 2e-4,
        "warmup_ratio": 0.05,
        "num_train_epochs": 3,
        "max_seq_length": 4096,
        "logging_steps": 10,
        "save_strategy": "epoch",
        "evaluation_strategy": "epoch",
        "fp16": False,
        "bf16": True
    },
    "behavioral_alignment_guidelines": [
        "Communicate naturally and empathetically without judgement.",
        "Provide practical and actionable advice.",
        "Explain complex ancient wisdom in simple, modern everyday language.",
        "Only reference scriptural shlokas or historical wisdom when directly relevant.",
        "Never invent or hallucinate quotations, verses, sources, or references.",
        "Clearly distinguish between traditional philosophy/cultural wisdom and empirical scientific facts.",
        "Admit uncertainty when reliable information is not available."
    ]
}

def print_fine_tuning_summary():
    print("==================================================")
    print("STAGE 7: Prajvaya AI Model Fine-Tuning Pipeline")
    print("==================================================")
    print(f"Base Model    : {PRAJVAYA_FINE_TUNING_CONFIG['base_model']}")
    print(f"Quantization  : {PRAJVAYA_FINE_TUNING_CONFIG['quantization']}")
    print(f"Train Dataset : {PRAJVAYA_FINE_TUNING_CONFIG['dataset_train']}")
    print(f"Val Dataset   : {PRAJVAYA_FINE_TUNING_CONFIG['dataset_val']}")
    print(f"LoRA Target   : {', '.join(PRAJVAYA_FINE_TUNING_CONFIG['lora_params']['target_modules'][:4])}...")
    print("--------------------------------------------------")
    print("Behavioral Alignment Principles:")
    for rule in PRAJVAYA_FINE_TUNING_CONFIG["behavioral_alignment_guidelines"]:
        print(f" - {rule}")
    print("==================================================")

if __name__ == "__main__":
    print_fine_tuning_summary()
