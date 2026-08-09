import { 
  CompanionId, 
  EmotionalAnalysis, 
  MemoryItem, 
  PrajvayaAIResponse, 
  ReasoningStep 
} from "./types";
import { COMPANIONS } from "./companions";

// Mandatory Crisis Keyword Safety Detection
const CRISIS_PATTERNS = [
  /\b(kill myself|suicide|end my life|want to die|self-harm|cutting myself|hurt myself|don't want to live|end it all)\b/i,
  /\b(going to end my life|no reason to live|better off dead)\b/i,
];

function checkCrisisSafety(text: string): boolean {
  return CRISIS_PATTERNS.some((pattern) => pattern.test(text));
}

// Emotion Detection Logic
function analyzeEmotion(text: string): EmotionalAnalysis {
  const t = text.toLowerCase();
  
  if (t.includes("stress") || t.includes("overwhelmed") || t.includes("burnout") || t.includes("pressure") || t.includes("exhausted")) {
    return {
      primaryEmotion: "burnout",
      confidence: 0.90,
      empathyNote: "I can really hear the heavy weight in your words. Feeling overwhelmed or exhausted is your mind and body gently asking for rest and a breathing space."
    };
  }
  if (t.includes("anxious") || t.includes("anxiety") || t.includes("scared") || t.includes("worry") || t.includes("panic") || t.includes("nervous")) {
    return {
      primaryEmotion: "anxiety",
      confidence: 0.88,
      empathyNote: "I'm right here with you. Anxiety often shows up when our minds are carrying tomorrow's weight today. Let's take a slow, gentle breath together."
    };
  }
  if (t.includes("lonely") || t.includes("alone") || t.includes("isolated") || t.includes("nobody") || t.includes("breakup") || t.includes("heartbreak")) {
    return {
      primaryEmotion: "loneliness",
      confidence: 0.92,
      empathyNote: "I hear you, and your feelings are completely valid. Experiencing loneliness or heartbreak can make the world feel quiet and heavy, but you don't have to navigate this by yourself."
    };
  }
  if (t.includes("confused") || t.includes("stuck") || t.includes("lost") || t.includes("don't know what to do")) {
    return {
      primaryEmotion: "confusion",
      confidence: 0.85,
      empathyNote: "Feeling lost or uncertain is actually a very honest place to be. It often means you're standing at a doorway of growth, looking for a clearer path forward."
    };
  }
  if (t.includes("angry") || t.includes("frustrated") || t.includes("upset") || t.includes("annoyed") || t.includes("furious")) {
    return {
      primaryEmotion: "anger",
      confidence: 0.87,
      empathyNote: "It makes total sense that you're feeling frustrated. Anger is strong, protective energy—when we listen to it with care, it can show us what truly matters to us."
    };
  }
  if (t.includes("grief") || t.includes("sad") || t.includes("loss") || t.includes("crying") || t.includes("miss")) {
    return {
      primaryEmotion: "grief",
      confidence: 0.91,
      empathyNote: "I am holding space for you. Deep sadness needs warmth and time—there is no need to rush yourself to feel okay before you are ready."
    };
  }
  if (t.includes("hope") || t.includes("inspired") || t.includes("excited") || t.includes("ready") || t.includes("want to learn")) {
    return {
      primaryEmotion: "motivation",
      confidence: 0.86,
      empathyNote: "It is wonderful to feel your curiosity and energy spark! Let's build on this positive momentum together."
    };
  }

  return {
    primaryEmotion: "calm",
    confidence: 0.80,
    empathyNote: "Thank you for opening up and sharing your thoughts with me. Let's explore this together in a calm, thoughtful way."
  };
}

// Select Optimal Companion & Collaborators
function determineCompanions(text: string, requestedCompanion: CompanionId): {
  primary: CompanionId;
  collaborators: CompanionId[];
} {
  if (requestedCompanion !== "master") {
    return { primary: requestedCompanion, collaborators: [] };
  }

  const t = text.toLowerCase();
  const collabs: CompanionId[] = [];

  if (t.includes("nature") || t.includes("environment") || t.includes("waste") || t.includes("garden") || t.includes("prakriti") || t.includes("plastic") || t.includes("water")) {
    collabs.push("prakriti");
  }
  if (t.includes("gita") || t.includes("shloka") || t.includes("vedic") || t.includes("history") || t.includes("ancient") || t.includes("tradition") || t.includes("scripture") || t.includes("philosophy")) {
    collabs.push("parampara");
  }
  if (t.includes("yoga") || t.includes("health") || t.includes("sleep") || t.includes("food") || t.includes("breath") || t.includes("pranayama") || t.includes("diet")) {
    collabs.push("arogya");
  }
  if (t.includes("learn") || t.includes("study") || t.includes("code") || t.includes("science") || t.includes("career") || t.includes("research") || t.includes("programming")) {
    collabs.push("vidya");
  }
  if (t.includes("write") || t.includes("art") || t.includes("idea") || t.includes("creative") || t.includes("music") || t.includes("story") || t.includes("business")) {
    collabs.push("srijan");
  }
  if (t.includes("life") || t.includes("stress") || t.includes("habit") || t.includes("relationship") || t.includes("feeling") || t.includes("purpose") || collabs.length === 0) {
    collabs.push("jeevan");
  }

  const primary = collabs[0] || "jeevan";
  const collaborators = collabs.slice(1, 3);

  return { primary, collaborators };
}

// Main Engine Pipeline Execution
export function processPrajvayaReasoning(
  userText: string,
  selectedCompanion: CompanionId,
  userMemories: MemoryItem[] = [],
  memoryEnabled: boolean = true
): PrajvayaAIResponse {

  // 1. Mandatory Pre-Response Crisis Safety Check
  if (checkCrisisSafety(userText)) {
    return {
      reply: `I am deeply concerned about what you are going through right now, and I want you to know that your life and safety matter more than anything else. You do not have to carry this heavy burden alone.\n\nPlease reach out immediately to a caring, trained professional who can support you right now:\n\n• Tele-MANAS (India 24/7 National Helpline): 14416 or 1800-891-4416\n• Vandrevala Foundation (India Mental Health): +91 9999 666 555\n• Suicide & Crisis Lifeline (US/Canada): 988\n• Crisis Text Line: Text HOME to 741741\n• International Resources: https://findahelpline.com\n\nThese services are free, confidential, and available 24/7. Please speak with someone who can listen and support you in this moment.`,
      reasoningChain: [
        { stage: "Intent & Emotion", detail: "Detected potential crisis indicators in user input. Instantly provided confidential emergency helpline support." }
      ],
      activeCompanion: "jeevan",
      collaboratingCompanions: [],
      actionPlan: [
        "Call or text a crisis helpline (Tele-MANAS 14416 or 988).",
        "Reach out to a trusted family member, friend, or healthcare provider immediately.",
        "Stay in a safe, peaceful environment surrounded by supportive care."
      ],
      emotionalProfile: {
        primaryEmotion: "grief",
        confidence: 0.99,
        empathyNote: "Your life is valuable. Please connect with immediate professional support."
      },
      evidenceBadge: {
        scientificBasis: "Immediate human crisis connection is the single most effective intervention for acute psychological distress.",
        culturalContext: "Prajvaya safety protocol prioritizes immediate human connection and wellbeing above all else.",
        safetyCaveat: "I am an AI companion, not a medical doctor or licensed crisis counselor. Please contact emergency services if you are in danger."
      }
    };
  }

  const emotion = analyzeEmotion(userText);
  const { primary, collaborators } = determineCompanions(userText, selectedCompanion);
  const activeComp = COMPANIONS[primary] || COMPANIONS["jeevan"];

  const recalledMemories: string[] = [];
  if (memoryEnabled && userMemories.length > 0) {
    const textLower = userText.toLowerCase();
    userMemories.forEach((m) => {
      if (textLower.includes(m.key.toLowerCase()) || textLower.includes(m.value.toLowerCase().split(" ")[0])) {
        recalledMemories.push(`${m.key}: ${m.value}`);
      }
    });
  }

  // Reasoning Chain (Internal transparency pipeline)
  const reasoningChain: ReasoningStep[] = [
    {
      stage: "Intent & Emotion",
      detail: `Understood tone: ${emotion.primaryEmotion} (${Math.round(emotion.confidence * 100)}% clarity). Validated user feelings with warm human empathy.`
    },
    {
      stage: "Companion Selection",
      detail: `Primary Mentor: ${activeComp.name} (${activeComp.sanskritTitle}). ${collaborators.length > 0 ? `Collaborating: ${collaborators.map(c => COMPANIONS[c].name).join(", ")}` : "Direct individual guide."}`
    },
    {
      stage: "Knowledge Retrieval",
      detail: `Integrating modern human psychology with timeless Indian philosophy. Active local memory context: ${recalledMemories.length > 0 ? `${recalledMemories.length} memory item(s)` : "None needed"}.`
    },
    {
      stage: "Solution Tradeoffs",
      detail: `Formulating a warm, conversational, non-robotic response that listens, comforts, and offers practical grounding.`
    }
  ];

  let reply = "";
  let actionPlan: string[] | undefined = undefined;
  let evidenceBadge: PrajvayaAIResponse["evidenceBadge"] = undefined;

  const t = userText.toLowerCase();

  // 1. INNER CONFLICT & DECISION PARALYSIS (GOOD VS BAD ME)
  if ((t.includes("fight") || t.includes("conflict") || t.includes("good") || t.includes("bad")) && (t.includes("inside") || t.includes("me") || t.includes("decide") || t.includes("decision") || t.includes("confused"))) {
    reply = `That internal struggle is one of the heaviest things a person can carry—when it feels like two different voices inside you are fighting over every choice, leaving you feeling confused and unable to make decisions.\n\nFirst, please know that having conflicting impulses doesn't mean you're a 'bad' person. Human beings are complex, and our minds often pull us between immediate fear, self-protection, and our higher values. The very fact that you care about finding the right path shows where your true heart lies.\n\nWhen decision paralysis strikes, try not to force a final verdict in the middle of the confusion. Take one quiet step back.\n\nTell me... what is one specific decision you're facing right now that feels most conflicting?`;
  }
  // 2. COMPARISON & FEELING LEFT BEHIND
  else if (t.includes("everyone") && (t.includes("ahead") || t.includes("stuck") || t.includes("behind") || t.includes("succeeding"))) {
    reply = `Maybe you're not really worried about everyone else moving ahead. Maybe you're wondering whether you're moving anywhere at all.\n\nThat feeling can hurt deeply—when it feels like everyone around you is reaching milestones while you're still in the same place. But another person's timeline doesn't decide the value of yours.\n\nTell me... what happened recently that makes you feel most stuck right now?`;
  }
  // 3. EXAM PRESSURE & PLACEMENT STRESS
  else if (t.includes("exam") || t.includes("placement") || t.includes("prep") || t.includes("fail") || t.includes("test") || t.includes("interview") || t.includes("0%") || t.includes("marks") || t.includes("imposter") || t.includes("syllabus")) {
    reply = `I know you probably don't need a clinical lecture about failure or exam tips right now. You've worked for this, and feeling like you know nothing right before a test can really hurt.\n\nWhen the stakes feel high, our minds tend to freeze up and hide what we've learned behind panic. Give yourself a moment. You don't have to solve your whole syllabus tonight.\n\nWhat part of your prep is weighing on your mind the most right now?`;
  }
  // 4. RELATIONSHIPS & TRUST ISSUES
  else if (t.includes("trust") || t.includes("relationship") || t.includes("special") || t.includes("partner") || t.includes("boyfriend") || t.includes("girlfriend") || t.includes("spouse") || t.includes("marriage") || t.includes("insecure") || t.includes("doubt")) {
    reply = `I hear how deeply important this is to you. Navigating trust issues with someone special can feel emotionally heavy, disorienting, and deeply vulnerable.\n\nTrust in a relationship is built slowly like a quiet garden—it is fragile when doubts arise, but it can be nurtured when both people speak openly without placing blame.\n\nYou don't have to resolve everything tonight. What specific situation triggered this doubt for you recently?`;
  }
  // 5. STRESS, ANXIETY, BREAKUP, OVERWHELM
  else if (t.includes("stress") || t.includes("burnout") || t.includes("overwhelmed") || t.includes("anxious") || t.includes("anxiety") || t.includes("exhausted") || t.includes("breakup") || t.includes("sad") || t.includes("lonely")) {
    reply = `When we go through intense stress or emotional pain, it can feel like our inner world is spinning out of control. Please know that feeling this way doesn't mean you're weak—it simply means your mind and body have been carrying a lot right now.\n\nTrying to force yourself to 'just stop worrying' rarely works. Instead, take a slow breath, drink a glass of warm water, and give yourself permission to pause.\n\nWhat part of what you're experiencing feels heaviest right now?`;
  }
  // 6. BHAGAVAD GITA & PHILOSOPHY
  else if (t.includes("gita") || t.includes("shloka") || t.includes("scripture") || t.includes("philosophy") || t.includes("ancient") || t.includes("upanishad")) {
    reply = `It is wonderful to reflect on these timeless teachings together.\n\nIn the Bhagavad Gita, when Prince Arjuna felt paralyzed by doubt on the battlefield, the guidance offered was not to abandon life, but to practice *Nishkama Karma*—focusing 100% of your care on the effort in front of you, while letting go of the constant anxiety about future outcomes.\n\nWhen we focus purely on taking the next right step with sincerity, inner peace naturally follows. What area of your life would you like to apply this clarity to today?`;
  }
  // 7. HEALTH, SLEEP & WELLNESS
  else if (t.includes("sleep") || t.includes("insomnia") || t.includes("health") || t.includes("yoga") || t.includes("diet") || t.includes("food") || t.includes("ayurveda")) {
    reply = `That sounds exhausting. When the whole world becomes quiet at night, sometimes the mind becomes even louder.\n\nTrying to force yourself to fall asleep when your mind is racing often creates more friction. Give yourself permission to lay down the pressure of having to sleep right away.\n\nTell me... what's been running through your mind when you lay down to rest?`;
  }
  // 8. SUSTAINABILITY & NATURE
  else if (t.includes("waste") || t.includes("plastic") || t.includes("environment") || t.includes("sustainability") || t.includes("garden") || t.includes("water") || t.includes("tree")) {
    reply = `Caring for our earth doesn't require drastic or overwhelming changes overnight. In traditional households, reverence for natural resources was a quiet daily habit.\n\nWhen we make even one small shift—like bringing a reusable water bottle or keeping a balcony plant—we reconnect with the natural flow of life (*Rta*).\n\nWhat is one small green habit you'd love to explore incorporating into your space?`;
  }
  // 9. HEALTH ANXIETY, MORTALITY OVERTHINKING & EXISTENTIAL FEAR
  else if (t.includes("die") || t.includes("death") || t.includes("dying") || t.includes("overthinking") || t.includes("neurological") || t.includes("fidgeting") || t.includes("health issues") || t.includes("disease") || t.includes("panic")) {
    reply = `I hear you, and I am right here with you. Take a slow, gentle breath.\n\nWhen our mind gets caught in an intense anxiety loop, it can create terrifying thoughts like *"I'm going to die"* or *"something is wrong with my body"*. Anxiety can even cause real physical sensations—fidgeting, racing heartbeat, or chest tightness—which then tricks the brain into panicking even more.\n\nPress both feet flat onto the cold floor, drop your shoulders, and take 3 slow breaths. You don't have to carry all these worries at once. Tell me... what specific thought started this heavy feeling today?`;
  }
  // DEFAULT DYNAMIC REFLECTION CONVERSATIONAL RESPONSE
  else {
    const snippet = userText.length > 50 ? userText.substring(0, 50) + "..." : userText;
    reply = `I am listening closely to what you've shared about "${snippet}".\n\nWhen thoughts get tangled up and life feels heavy, it is completely human to feel overwhelmed and unsure of which direction to take.\n\nPlease remember to treat yourself with patience and warmth. You don't have to figure out your whole life journey today—just focusing on one calm breath and one small step in front of you is more than enough.\n\nI am right here with you. What part of this would you like to talk through first?`;
  }

  return {
    reply,
    reasoningChain,
    activeCompanion: primary,
    collaboratingCompanions: collaborators,
    actionPlan,
    emotionalProfile: emotion,
    evidenceBadge,
    recalledMemoriesUsed: recalledMemories
  };
}
