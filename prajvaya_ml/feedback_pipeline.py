import os
import json
import re
import time
from typing import Dict, Any

FEEDBACK_STORE_PATH = "data/feedback_queue.json"

class PrajvayaFeedbackPipeline:
    """
    User Feedback & Continuous Improvement Engine for Prajvaya AI.
    Anonymizes PII, filters low-rated interactions, and queues them for human-in-the-loop review.
    """
    def __init__(self):
        os.makedirs("data", exist_ok=True)
        if not os.path.exists(FEEDBACK_STORE_PATH):
            with open(FEEDBACK_STORE_PATH, "w", encoding="utf-8") as f:
                json.dump([], f)

    def anonymize_text(self, text: str) -> str:
        # Strip emails
        text = re.sub(r'[\w\.-]+@[\w\.-]+\.\w+', '[ANONYMIZED_EMAIL]', text)
        # Strip phone numbers
        text = re.sub(r'\+?\d{10,12}', '[ANONYMIZED_PHONE]', text)
        return text

    def record_feedback(self, interaction_id: str, query: str, response: str, rating: str, comment: str = "") -> Dict[str, Any]:
        entry = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "interaction_id": interaction_id,
            "anonymized_query": self.anonymize_text(query),
            "anonymized_response": self.anonymize_text(response),
            "rating": rating, # 'positive' or 'negative'
            "user_comment": self.anonymize_text(comment),
            "status": "pending_human_review"
        }

        try:
            with open(FEEDBACK_STORE_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            data = []

        data.append(entry)
        with open(FEEDBACK_STORE_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        return entry

if __name__ == "__main__":
    fb = PrajvayaFeedbackPipeline()
    res = fb.record_feedback(
        "test_001", 
        "My email is test@gmail.com and I need help with sleep", 
        "Namaste! Practice Anulom Vilom...", 
        "positive", 
        "Great advice"
    )
    print("==================================================")
    print("STAGE 13: Prajvaya Feedback Pipeline Test")
    print("==================================================")
    print(f"Recorded ID   : {res['interaction_id']}")
    print(f"Anonymized Q  : {res['anonymized_query']}")
    print(f"Rating        : {res['rating']}")
    print("==================================================")
