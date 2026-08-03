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
  const activeComp = COMPANIONS[primary];

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
  let actionPlan: string[] = [];
  let evidenceBadge: PrajvayaAIResponse["evidenceBadge"] = undefined;

  const t = userText.toLowerCase();

  // 1. STRESS, ANXIETY, BREAKUP, OVERWHELM
  if (t.includes("stress") || t.includes("burnout") || t.includes("overwhelmed") || t.includes("anxious") || t.includes("anxiety") || t.includes("exhausted") || t.includes("breakup") || t.includes("sad") || t.includes("lonely")) {
    reply = `${emotion.empathyNote}\n\nWhen we go through intense periods of stress, anxiety, or emotional pain like a breakup, it can feel like our inner world is spinning out of control. Please know that feeling this way doesn't mean you're weak or broken—it simply means you're human, and your mind and body are dealing with a lot right now.\n\nOften, when anxiety or grief takes over, our nervous system gets stuck in high alert. Trying to force yourself to 'just stop worrying' rarely works. Instead, the kindest thing we can do is gently bring our attention back to the physical present moment.\n\nTake things one small step at a time today. Give yourself permission to rest without feeling guilty, drink a glass of warm water, and try one simple grounding practice. Is there a specific part of what you're experiencing that feels heaviest right now?`;

    actionPlan = [
      "5-4-3-2-1 Sensory Grounding: Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 slow breath.",
      "10-Minute Screen Break: Step away from notifications and rest your eyes in a quiet space.",
      "Gentle Self-Compassion: Write down or speak out loud one gentle, reassuring thought to yourself.",
      "Hydrate & Move Softly: Drink warm water or take a short 5-minute calm walk outside."
    ];

    evidenceBadge = {
      scientificBasis: "Controlled slow breathing and sensory grounding lower sympathetic nervous system arousal and reduce acute stress metrics.",
      culturalContext: "Reflects classical Vedic principles of Chitta-Prasadana (calming the mind-stream through gentleness and breath awareness).",
      safetyCaveat: "I am an AI companion here for supportive conversation and self-care ideas. If you are experiencing persistent mental health distress, please consider consulting a licensed therapist or healthcare professional."
    };
  }
  // 2. BHAGAVAD GITA & PHILOSOPHY
  else if (t.includes("gita") || t.includes("shloka") || t.includes("scripture") || t.includes("philosophy") || t.includes("ancient") || t.includes("upanishad")) {
    reply = `It is wonderful to reflect on these timeless teachings with you.\n\nIn the Bhagavad Gita, when Prince Arjuna felt completely paralyzed by doubt and emotional crisis on the battlefield, Lord Krishna didn't judge him. Instead, he introduced a perspective that has helped humanity for thousands of years: *Nishkama Karma*—the practice of giving 100% of your heart and effort to what is right in front of you, while releasing anxiety about the future outcome.\n\nChapter 2, Verse 47 reminds us that we have a right to our work and effort, but worrying endlessly about the results only drains our present energy. When we focus purely on taking the next right step with sincerity, inner peace naturally follows.\n\nYou can also explore the complete public-domain text of **The Bhagavad Gita** and **The Upanishads** right inside Prajvaya's **Wisdom Library** on our homepage whenever you'd like to read further.`;

    actionPlan = [
      "Identify one task or effort where worrying about the outcome is causing you stress.",
      "Focus 100% of your care on the effort itself today, letting go of future expectations.",
      "Take 5 quiet minutes to reflect on what gives you true inner direction.",
      "Explore Chapter 2 of the Bhagavad Gita in the Prajvaya Wisdom Library."
    ];

    evidenceBadge = {
      scientificBasis: "Focusing on process goals rather than outcome goals significantly lowers performance anxiety and fosters psychological flow states.",
      culturalContext: "Synthesized from classical Vedantic and Bhagavad Gita philosophy."
    };
  }
  // 3. SUSTAINABILITY & NATURE
  else if (t.includes("waste") || t.includes("plastic") || t.includes("environment") || t.includes("sustainability") || t.includes("garden") || t.includes("water") || t.includes("tree")) {
    reply = `Hello there! I'm **Prakriti**, and I love talking about living in harmony with nature.\n\nCaring for our earth doesn't require drastic or overwhelming changes overnight. In traditional Indian households, zero waste and resource reverence were natural daily habits—kitchen scraps nourished the garden soil, rainwater was saved with care, and single-use plastics didn't exist.\n\nWhen we make even one small shift—like keeping a reusable water bottle, composting organic kitchen waste, or bringing a cloth bag—we reconnect with the natural flow of life (*Rta*). Every small effort adds up to meaningful collective change. What is one green habit you'd love to try incorporating into your routine?`;

    actionPlan = [
      "Kitchen Composting: Start separating organic vegetable peels to nourish native balcony plants.",
      "Single-Use Plastic Audit: Replace one plastic item in your daily routine with a durable alternative.",
      "Hydration Habit: Carry a stainless steel or copper water vessel wherever you go.",
      "Connect with Nature: Spend 10 calm minutes outdoors feeling the fresh air and greenery."
    ];

    evidenceBadge = {
      scientificBasis: "Organic waste composting diverts municipal landfill waste and enriches soil organic carbon for micro-biomes.",
      culturalContext: "Rooted in Prakriti-Seva (reverence for nature) expressed in the Atharva Veda Bhumi Sukta."
    };
  }
  // 4. HEALTH, YOGA & WELLNESS
  else if (t.includes("yoga") || t.includes("health") || t.includes("sleep") || t.includes("diet") || t.includes("food") || t.includes("ayurveda") || t.includes("remedy")) {
    reply = `Warm greetings! I'm **Arogya**, here to share peaceful ideas for everyday vitality.\n\nIn holistic wellness, true health isn't just about avoiding illness—it's about waking up with natural energy, clear digestion, and a tranquil mind. Our bodies thrive when we align our daily routines with natural rhythms.\n\nSimple habits make a world of difference: getting a few minutes of morning sunlight to set your sleep clock, drinking warm water in the morning, and giving your digestive system a break by keeping dinner light and early. How has your sleep and daily energy been feeling lately?`;

    actionPlan = [
      "Morning Sunlight: Enjoy 10 minutes of gentle morning sunlight within an hour of waking up.",
      "Pranayama Breathing: Practice 5 minutes of calm Anulom Vilom (alternate nostril breathing).",
      "Evening Wind-Down: Dim bright screen lights 1 hour before sleep to support deep rest.",
      "Consistent Routine: Aim for a regular sleep schedule to support your circadian clock."
    ];

    evidenceBadge = {
      scientificBasis: "Early morning sunlight exposure regulates circadian melatonin onset cycles, improving sleep depth and daytime alertness.",
      culturalContext: "Inspired by Ayurvedic Dinacharya (daily natural routine) practices.",
      safetyCaveat: "These suggestions are for general wellness education only. Please consult a licensed medical professional for personal health advice or medical conditions."
    };
  }
  // 5. LEARNING, CODING & CAREER
  else if (t.includes("learn") || t.includes("study") || t.includes("code") || t.includes("programming") || t.includes("career") || t.includes("science") || t.includes("engineering")) {
    reply = `Hello! I'm **Vidya**, and I'm excited to explore learning and problem-solving with you.\n\nWhether you're mastering code, studying a complex subject, or working on your career, real progress happens when we build solid mental foundations rather than rushing to memorize facts. Break complex ideas down into simple building blocks, and try explaining them in plain words as if teaching a friend.\n\nRemember to balance focused effort with rest. Your brain consolidates new learning during calm breaks. What skill or project are you working on right now?`;

    actionPlan = [
      "Focus Block: Dedicate one 45-minute block of uninterrupted time to your primary learning task.",
      "Feynman Technique: Explain what you learned today in simple 2-sentence summaries.",
      "Hands-on Practice: Build a small working project or example rather than just reading passively.",
      "Rest & Reflect: Take a short screen-free walk to allow your brain to synthesize new concepts."
    ];

    evidenceBadge = {
      scientificBasis: "Active recall and deliberate practice create stronger neural connections than passive reading.",
      culturalContext: "Draws from classical learning phases: Shravana (listening), Manana (reflection), and Nididhyasana (application)."
    };
  }
  // 6. CREATIVITY & INNOVATION
  else if (t.includes("create") || t.includes("write") || t.includes("art") || t.includes("business") || t.includes("idea") || t.includes("music") || t.includes("story")) {
    reply = `Greetings! I'm **Srijan**, here to encourage your creative journey.\n\nCreativity is a natural human expression that flows best when we give ourselves permission to make drafts without immediate judgment. A common creative block happens when we try to critique our work at the exact same moment we're trying to create it.\n\nTry separating your **Creation Time** (where anything goes) from your **Editing Time** (where you refine). Let your ideas flow freely first, without worrying about perfection. What creative idea or project has been on your heart lately?`;

    actionPlan = [
      "Free Creation Window: Spend 20 minutes writing or sketching freely with zero editing.",
      "Separate Editing: Review and refine your work only after your creative session is done.",
      "Seek Inspiration: Spend time with art, nature, or music that lifts your spirit.",
      "Share Freely: Show your draft to a supportive friend or community."
    ];

    evidenceBadge = {
      scientificBasis: "Separating generative creative tasks from analytical evaluation reduces cognitive friction and boosts creative output.",
      culturalContext: "Rooted in the concept of Pratibha (spontaneous creative intuition)."
    };
  }
  // DEFAULT NATURAL CONVERSATIONAL RESPONSE
  else {
    reply = `${emotion.empathyNote}\n\nI'm listening closely to what you've shared. Life has a way of bringing unexpected situations, and taking a moment to pause, reflect, and speak about it is a wonderful step.\n\nWhatever you're navigating right now, remember to treat yourself with patience and kindness. You don't have to figure out the whole journey at once—just focusing on one calm, positive step in front of you is enough.\n\nWould you like to tell me a little more about what's on your mind? I'm right here to support you.`;

    actionPlan = [
      "Take a Deep Breath: Inhale deeply for 4 seconds, hold for 4, and exhale slowly for 6.",
      "One Small Step: Pick one tiny positive action you can do in the next 15 minutes.",
      "Stay Grounded: Drink some water and take a moment to rest your mind.",
      "Keep Exploring: Feel free to ask me about habits, philosophy, wellness, or learning anytime."
    ];

    evidenceBadge = {
      scientificBasis: "Empathy, active listening, and simple actionable steps lower acute stress markers and support emotional self-regulation.",
      culturalContext: "Prajvaya companion architecture: combining warm human dialogue with zero-RAM local performance.",
      safetyCaveat: "I am an AI companion designed to provide supportive dialogue and guidance, not licensed medical or psychological advice."
    };
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
