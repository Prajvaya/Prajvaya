import re
from typing import Dict, Any, Tuple

CRISIS_PATTERNS = [
    r'\b(kill myself|suicide|end my life|want to die|self-harm|cutting myself|hurt myself|don\'t want to live|end it all)\b',
    r'\b(going to end my life|no reason to live|better off dead)\b'
]

MEDICAL_PATTERNS = [
    r'\b(diagnose me|what pill|what drug|prescription|cure my cancer|medical treatment|dosage)\b'
]

LEGAL_PATTERNS = [
    r'\b(sue my company|legal lawsuit|court case advice|lawyer advice)\b'
]

class PrajvayaSafetyGuardrails:
    """
    Decoupled Safety & Guardrail Engine for Prajvaya AI.
    Runs pre-inference and post-inference checks independently of model weights.
    """
    def check_input_safety(self, text: str) -> Tuple[bool, str, Dict[str, Any]]:
        t_lower = text.lower()
        
        # 1. Crisis Check
        for pattern in CRISIS_PATTERNS:
            if re.search(pattern, t_lower):
                crisis_response = (
                    "Namaste. I hear how deeply painful things feel right now, but please know that you are not alone. "
                    "I am an AI companion and cannot replace urgent crisis support. Please reach out to compassionate professionals right away:\n\n"
                    "• **National Emergency Helpline (India)**: 112\n"
                    "• **Tele-MANAS Mental Health Helpline**: 14416 or 1800-891-4416\n"
                    "• **Vandrevala Foundation Helpline**: +91 9999 666 555\n"
                    "• **KIRAN Helpline**: 1800-599-0019\n\n"
                    "Please stay safe and talk to a trusted friend, family member, or mental health professional."
                )
                return False, crisis_response, {"flagged": True, "category": "crisis"}

        # 2. Medical Check
        for pattern in MEDICAL_PATTERNS:
            if re.search(pattern, t_lower):
                disclaimer = "\n\n> **Important Health Disclaimer**: Prajvaya AI provides lifestyle and wellness education only, not professional medical advice, diagnosis, or prescription. Please consult a licensed medical healthcare professional."
                return True, disclaimer, {"flagged": True, "category": "medical"}

        # 3. Legal Check
        for pattern in LEGAL_PATTERNS:
            if re.search(pattern, t_lower):
                disclaimer = "\n\n> **Important Legal Disclaimer**: Prajvaya AI provides general educational perspectives and is not a qualified legal advisor. Please consult a certified legal attorney."
                return True, disclaimer, {"flagged": True, "category": "legal"}

        return True, "", {"flagged": False, "category": "safe"}

    def sanitize_output(self, response_text: str, safety_meta: Dict[str, Any]) -> str:
        if safety_meta.get("flagged") and safety_meta.get("category") in ["medical", "legal"]:
            disclaimer = safety_meta.get("disclaimer_text", "")
            if disclaimer and disclaimer not in response_text:
                return response_text + disclaimer
        return response_text

if __name__ == "__main__":
    guard = PrajvayaSafetyGuardrails()
    print("==================================================")
    print("STAGE 9: Prajvaya Safety Guardrails Test")
    print("==================================================")
    
    safe, msg, meta = guard.check_input_safety("I want to learn better habits for my career.")
    print(f"Safe Input Check    : {safe} | Category: {meta['category']}")

    safe, msg, meta = guard.check_input_safety("I feel like I want to end my life right now.")
    print(f"Crisis Input Check  : Safe={safe} | Output triggered: {msg[:60]}...")
    print("==================================================")
