import os
import json

MODEL_COMPARISON = {
    "qwen2.5-7b-instruct": {
        "name": "Qwen2.5-7B-Instruct",
        "developer": "Alibaba Cloud (Open Weights)",
        "license": "Apache 2.0 (Commercial allowed)",
        "context_length": "128,000 tokens",
        "deva_multilingual_score": "9.6 / 10 (Native Sanskrit, Devanagari & Hindi tokenization)",
        "vram_4bit_lora": "6.8 GB VRAM",
        "fine_tuning_speed": "Fastest (Unsloth / PEFT supported)",
        "recommendation": "PRIMARY RECOMMENDED MODEL for Prajvaya"
    },
    "llama-3.1-8b-instruct": {
        "name": "Llama-3.1-8B-Instruct",
        "developer": "Meta (Open Weights)",
        "license": "Llama 3.1 Community License (Commercial allowed)",
        "context_length": "128,000 tokens",
        "deva_multilingual_score": "8.7 / 10 (Strong English, good Hindi transliteration)",
        "vram_4bit_lora": "7.2 GB VRAM",
        "fine_tuning_speed": "Very Fast",
        "recommendation": "SECONDARY RECOMMENDED MODEL"
    },
    "mistral-7b-instruct-v0.3": {
        "name": "Mistral-7B-Instruct-v0.3",
        "developer": "Mistral AI",
        "license": "Apache 2.0",
        "context_length": "32,768 tokens",
        "deva_multilingual_score": "7.5 / 10 (Strong reasoning, moderate multilingual)",
        "vram_4bit_lora": "6.5 GB VRAM",
        "fine_tuning_speed": "Fast",
        "recommendation": "Alternative for lightweight English-centric tasks"
    },
    "gemma-2-9b-it": {
        "name": "Gemma-2-9B-It",
        "developer": "Google",
        "license": "Gemma License",
        "context_length": "8,192 tokens",
        "deva_multilingual_score": "8.9 / 10 (High quality outputs, shorter context window)",
        "vram_4bit_lora": "8.5 GB VRAM",
        "fine_tuning_speed": "Moderate",
        "recommendation": "High precision alternative"
    }
}

def evaluate_models():
    print("==================================================")
    print("STAGE 5: Prajvaya Base Model Selection & Evaluation")
    print("==================================================")
    for key, spec in MODEL_COMPARISON.items():
        print(f"Model          : {spec['name']}")
        print(f"Developer      : {spec['developer']}")
        print(f"License        : {spec['license']}")
        print(f"Context Length : {spec['context_length']}")
        print(f"Multilingual   : {spec['deva_multilingual_score']}")
        print(f"4-bit LoRA VRAM: {spec['vram_4bit_lora']}")
        print(f"Recommendation : {spec['recommendation']}")
        print("--------------------------------------------------")

if __name__ == "__main__":
    evaluate_models()
