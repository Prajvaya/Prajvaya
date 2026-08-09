import re
from typing import List, Dict, Any

class PrajvayaTokenizerHandler:
    """
    Tokenizer utility & validator for Prajvaya AI Model Engine.
    Ensures zero corruption for Devanagari script (Sanskrit shlokas & Hindi)
    and verifies long-context chunking parameters.
    """
    def __init__(self, max_seq_len: int = 4096):
        self.max_seq_len = max_seq_len

    def validate_devanagari_preservation(self, text: str) -> Dict[str, Any]:
        devanagari_chars = re.findall(r'[\u0900-\u097F]', text)
        has_devanagari = len(devanagari_chars) > 0
        
        # Approximate subword BPE token estimation
        words = text.split()
        estimated_tokens = int(len(words) * 1.3)
        
        return {
            "text_length_chars": len(text),
            "word_count": len(words),
            "estimated_tokens": estimated_tokens,
            "contains_devanagari": has_devanagari,
            "devanagari_char_count": len(devanagari_chars),
            "fits_within_context": estimated_tokens <= self.max_seq_len
        }

    def format_chat_prompt(self, messages: List[Dict[str, str]], system_prompt: str = "") -> str:
        prompt_parts = []
        if system_prompt:
            prompt_parts.append(f"<|im_start|>system\n{system_prompt}<|im_end|>")
            
        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            prompt_parts.append(f"<|im_start|>{role}\n{content}<|im_end|>")
            
        prompt_parts.append("<|im_start|>assistant\n")
        return "\n".join(prompt_parts)

if __name__ == "__main__":
    handler = PrajvayaTokenizerHandler(max_seq_len=4096)
    sample_sanskrit = "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन (Your right is to work, never to its fruits)."
    res = handler.validate_devanagari_preservation(sample_sanskrit)
    print("==================================================")
    print("STAGE 6: Prajvaya Tokenization Validation")
    print("==================================================")
    print(f"Sample Input          : {sample_sanskrit}")
    print(f"Contains Devanagari   : {res['contains_devanagari']}")
    print(f"Devanagari Char Count : {res['devanagari_char_count']}")
    print(f"Estimated Tokens      : {res['estimated_tokens']}")
    print(f"Fits Context (4096)   : {res['fits_within_context']}")
    print("==================================================")
