import { 
  CompanionId, 
  EmotionalAnalysis, 
  EmotionType, 
  MemoryItem, 
  PrajvayaAIResponse, 
  ReasoningStep 
} from "./types";
import { COMPANIONS } from "./companions";

// Emotion Detection Logic
function analyzeEmotion(text: string): EmotionalAnalysis {
  const t = text.toLowerCase();
  
  if (t.includes("stress") || t.includes("overwhelmed") || t.includes("burnout") || t.includes("pressure") || t.includes("exhausted")) {
    return {
      primaryEmotion: "burnout",
      confidence: 0.88,
      empathyNote: "I hear the weight in your words. Burnout and feeling overwhelmed are your body's valid signals asking for pace restoration."
    };
  }
  if (t.includes("anxious") || t.includes("anxiety") || t.includes("scared") || t.includes("worry") || t.includes("nervous")) {
    return {
      primaryEmotion: "anxiety",
      confidence: 0.85,
      empathyNote: "Anxiety often arises when our minds try to solve tomorrow's problems today. Let us pause and ground ourselves right here."
    };
  }
  if (t.includes("lonely") || t.includes("alone") || t.includes("isolated") || t.includes("nobody")) {
    return {
      primaryEmotion: "loneliness",
      confidence: 0.90,
      empathyNote: "Feeling isolated is a quiet kind of pain. Please remember that seeking connection is a fundamental human need, not a weakness."
    };
  }
  if (t.includes("confused") || t.includes("stuck") || t.includes("lost") || t.includes("don't know what to do")) {
    return {
      primaryEmotion: "confusion",
      confidence: 0.82,
      empathyNote: "Feeling stuck often means you are at a crossroads where old habits no longer serve your growth."
    };
  }
  if (t.includes("angry") || t.includes("frustrated") || t.includes("upset") || t.includes("annoyed")) {
    return {
      primaryEmotion: "anger",
      confidence: 0.86,
      empathyNote: "Frustration is powerful energy. When acknowledged without judgment, it can be redirected toward constructive transformation."
    };
  }
  if (t.includes("grief") || t.includes("sad") || t.includes("loss") || t.includes("crying")) {
    return {
      primaryEmotion: "grief",
      confidence: 0.89,
      empathyNote: "Grief and deep sadness require gentle honor and time. There is no rush to 'fix' what needs to be felt."
    };
  }
  if (t.includes("hope") || t.includes("inspired") || t.includes("excited") || t.includes("ready") || t.includes("want to learn")) {
    return {
      primaryEmotion: "motivation",
      confidence: 0.84,
      empathyNote: "Your motivation and willingness to learn are wonderful sparks for meaningful progress!"
    };
  }

  return {
    primaryEmotion: "calm",
    confidence: 0.75,
    empathyNote: "Thank you for reaching out. Let us examine your inquiry thoughtfully."
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

  // Keywords mapping
  if (t.includes("nature") || t.includes("environment") || t.includes("waste") || t.includes("garden") || t.includes("prakriti") || t.includes("plastic") || t.includes("water")) {
    collabs.push("prakriti");
  }
  if (t.includes("gita") || t.includes("shloka") || t.includes("vedic") || t.includes("history") || t.includes("ancient") || t.includes("tradition") || t.includes("scripture")) {
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

  // Generate Multi-stage Reasoning Chain
  const reasoningChain: ReasoningStep[] = [
    {
      stage: "Intent & Emotion",
      detail: `Detected tone: ${emotion.primaryEmotion} (${Math.round(emotion.confidence * 100)}% certainty). Intent: ${userText.slice(0, 50)}...`
    },
    {
      stage: "Companion Selection",
      detail: `Assigned Primary Guide: ${activeComp.name} (${activeComp.sanskritTitle}). ${collaborators.length > 0 ? `Collaborating: ${collaborators.map(c => COMPANIONS[c].name).join(", ")}` : "Single domain focus."}`
    },
    {
      stage: "Root Problem",
      detail: `Deconstructing input to address systemic root causes rather than surface symptoms.`
    },
    {
      stage: "Knowledge Retrieval",
      detail: `Synthesizing peer-reviewed evidence with traditional heritage wisdom. Memory context: ${recalledMemories.length > 0 ? `${recalledMemories.length} item(s) integrated` : "None active"}.`
    },
    {
      stage: "Solution Tradeoffs",
      detail: `Formulating practical, low-friction steps designed for sustainable long-term adoption.`
    },
    {
      stage: "Action Plan",
      detail: `Structuring daily actionable checklist and follow-up guidance.`
    }
  ];

  // Specific Topic Generators
  let reply = "";
  let actionPlan: string[] = [];
  let evidenceBadge: PrajvayaAIResponse["evidenceBadge"] = undefined;

  const t = userText.toLowerCase();

  // 1. STRESS / BURNOUT / MENTAL WELLBEING
  if (t.includes("stress") || t.includes("burnout") || t.includes("overwhelmed") || t.includes("anxious") || t.includes("exhausted") || t.includes("tired")) {
    reply = `${emotion.empathyNote}\n\nWhen we experience chronic stress or digital fatigue, modern neuroscience and ancient wisdom agree on one thing: **the nervous system cannot be argued with; it must be physically regulated.**\n\n### 🌿 Root Analysis & Perspective\nModern life places our attention in a state of continuous partial alert (notifications, screens, multi-tasking). In classical Vedic science, this is understood as an excess of *Vata dosha* (air/space element in motion), leading to mental fragmentation.\n\n### 💡 Synthesized Approach\nInstead of forcing yourself to 'think positive', we begin with biological grounding.`;

    actionPlan = [
      "10-Minute Morning Anulom Vilom (Alternate Nostril Breathing) to activate parasympathetic vagal tone.",
      "1-Hour Morning Screen Protocol: Keep phone in another room for 60 minutes after waking up.",
      "Barefoot Soil Contact (Grounding): 10 minutes standing on natural soil or grass daily.",
      "Single-Tasking Window (Ekagratha): Dedicate one 45-minute uninterrupted block to a single task without tabs."
    ];

    evidenceBadge = {
      scientificBasis: "Controlled slow breathing stimulates vagal nerve activity, lowering cortisol and heart rate variability (HRV) metrics.",
      culturalContext: "Vedic Pranayama and Dhyana principles emphasize regulating Prana (breath) to stabilize Chitta (mind stream).",
      safetyCaveat: "If chronic stress or anxiety causes persistent distress, please consult a qualified healthcare or mental health professional."
    };
  }
  // 2. BHAGAVAD GITA & SACRED TEXTS
  else if (t.includes("gita") || t.includes("shloka") || t.includes("scripture") || t.includes("philosophy") || t.includes("ancient") || t.includes("upanishad")) {
    reply = `Welcome to classical Indian philosophical inquiry. 📖\n\nThe Bhagavad Gita is not merely a historical or religious manuscript—it is an internal psychological manual written for moments of existential doubt (*Vishada*).\n\n### 📜 Core Wisdom: Nishkama Karma (Detached Action)\n*Chapter 2, Verse 47*: **Karmanye vadhikaraste ma phaleshu kadachana**\n\n> *"You have a right to your prescribed duty, but never to the fruits of your actions. Never consider yourself the cause of the results, nor be attached to inaction."*\n\n### 🧠 Modern Relevance\nPsychologically, anxiety is caused by obsessing over outcomes we cannot fully control. Focusing 100% on the quality of execution while releasing attachment to future results reduces performance anxiety and fosters deep flow state (*Samadhi*).\n\nYou can read the full PDF of **The Bhagavad Gita** directly in Prajvaya's **Wisdom Library** on our website homepage!`;

    actionPlan = [
      "Identify one goal where outcome anxiety is draining you.",
      "Write down the controllable inputs (your daily efforts) vs uncontrollable variables (outcomes).",
      "Dedicate yourself 100% to the input for 7 days without checking results.",
      "Explore Chapter 2 of the Bhagavad Gita in our Wisdom Library."
    ];

    evidenceBadge = {
      scientificBasis: "Focusing on process-oriented goals over outcome-oriented goals yields higher task persistence and lower acute anxiety.",
      culturalContext: "Vedic Vedantic Darshana (Non-dual school of thought) contextualized within Bhagavad Gita synthesis."
    };
  }
  // 3. SUSTAINABILITY, ZERO WASTE & ENVIRONMENT
  else if (t.includes("waste") || t.includes("plastic") || t.includes("environment") || t.includes("sustainability") || t.includes("garden") || t.includes("water") || t.includes("tree")) {
    reply = `Greetings from **Prakriti** 🌱. Environmental stewardship begins by transforming our local consumption loops from linear (buy-use-discard) to circular.\n\n### 🌏 Root Principles of Regenerative Living\nTraditional Indian homes maintained zero waste naturally: kitchen scraps nourished soil (*Panchagavya* / compost), cloth replaced single-use paper/plastics, and water was harvested regionally via check-dams and *johads*.\n\n### 💧 Actionable Regenerative Practices\n1. **Wet Waste Circularity**: Convert daily vegetable peels into aerobic compost for native balcony plants.\n2. **Micro-Plastic Audit**: Replace plastic kitchen containers and synthetic scrubbers with clay/brass vessels and natural loofahs.\n3. **Rainwater Recharging**: Support local rock-fill check-dams and aquifer recharge wells.`;

    actionPlan = [
      "Start a simple bucket compost for kitchen organic waste this week.",
      "Carry a reusable stainless-steel water container everywhere.",
      "Plant one native multi-benefit sapling (like Neem, Tulsi, or Peepal).",
      "Join our WhatsApp Community to participate in regional check-dam building projects."
    ];

    evidenceBadge = {
      scientificBasis: "Organic waste diversion reduces methane generation in municipal landfills and restores soil organic carbon (SOC).",
      culturalContext: "Prakriti-Seva (stewardship of mother earth) as described in Atharva Veda (Bhumi Sukta)."
    };
  }
  // 4. HEALTH, YOGA & DIET
  else if (t.includes("yoga") || t.includes("health") || t.includes("sleep") || t.includes("diet") || t.includes("food") || t.includes("ayurveda") || t.includes("remedy")) {
    reply = `Greetings from **Arogya** 🧘. Health is not merely the absence of disease—it is the active presence of vitality (*Ojas*), clear digestion (*Agni*), and mental composure.\n\n### ☀️ Circadian Alignment (Dinacharya)\nOur biological clocks are governed by suprachiasmatic nucleus rhythms tied to solar light cycles. When we eat late or stare at bright screens at night, circadian disruption alters hormone secretion.\n\n### 🍃 Preventive Daily Hygiene\n• **Early Hydration**: Drink warm water stored in copper/earthenware upon waking.\n• **Light Exposure**: Get 10–15 minutes of direct morning sunlight within 1 hour of dawn.\n• **Night Fasting**: Finish your last meal at least 3 hours before sleep to allow full digestive rest.`;

    actionPlan = [
      "Practice 15 minutes of Surya Namaskar (Sun Salutations) at sunrise.",
      "Switch off bright artificial lights 1 hour before sleeping.",
      "Eat fresh, seasonally available whole foods (Ahara).",
      "Maintain a consistent sleep window (10 PM to 6 AM)."
    ];

    evidenceBadge = {
      scientificBasis: "Morning sunlight exposure sets melatonin onset rhythms 14 hours later, dramatically improving deep sleep architecture.",
      culturalContext: "Ayurvedic Dinacharya (daily routine) principles from Charaka and Sushruta Samhitas.",
      safetyCaveat: "This information is for educational and wellness guidance only. It is not medical advice. Consult a licensed medical practitioner for any health conditions."
    };
  }
  // 5. LEARNING, CODING & CAREER
  else if (t.includes("learn") || t.includes("study") || t.includes("code") || t.includes("programming") || t.includes("career") || t.includes("science") || t.includes("engineering")) {
    reply = `Greetings from **Vidya** 🎓. True intellectual mastery comes from building deep mental models, not memorizing surface facts.\n\n### 🧠 The Feynman-Vedic Learning Synthesis\n1. **First-Principles Decomposition**: Break any complex system (code, calculus, physics) down to its fundamental undeniable truths.\n2. **Active Recall & Teaching**: Explain the concept in plain, simple language as if teaching a child.\n3. **Identify & Bridge Gaps**: Re-examine original documentation whenever you hit an ambiguity.\n\n### 💻 Systems Engineering & Tech Mindset\nTechnology should be built for human liberation and ecological harmony. When writing software or studying systems, focus on clean architecture, minimal resource footprint, and long-term sustainability.`;

    actionPlan = [
      "Pick one core subject or skill you want to master.",
      "Set up a 90-minute daily focused study block with zero phone interruptions.",
      "Build one small working project instead of watching passive video tutorials.",
      "Document your learnings in a structured digital archive."
    ];

    evidenceBadge = {
      scientificBasis: "Active recall and spaced repetition strengthen synaptic neural pathways significantly faster than passive reading.",
      culturalContext: "Shravana (attentive hearing), Manana (reflection), and Nididhyasana (deep internalization) learning methodology."
    };
  }
  // 6. CREATIVITY, ART & INNOVATION
  else if (t.includes("create") || t.includes("write") || t.includes("art") || t.includes("business") || t.includes("idea") || t.includes("music") || t.includes("story")) {
    reply = `Greetings from **Srijan** 💡. Creativity is the spontaneous flow of universal intelligence (*Pratibha*) through authentic human expression.\n\n### 🎨 Overcoming Creative Blocks\nCreative resistance occurs when the inner critic attempts to edit while the creator is attempting to generate. Separating the **Creation Phase** from the **Editing Phase** is critical.\n\n### 🌟 Eco-Innovation & Storytelling\nCombine traditional motifs or natural patterns with modern design aesthetics. Whether writing a story, composing music, or founding an eco-friendly enterprise, ground your creation in purpose and genuine problem-solving.`;

    actionPlan = [
      "Write for 15 minutes every morning without backspacing or editing (Morning Pages).",
      "Draw inspiration from natural geometry (Fibonacci spirals, leaf venation, honeycombs).",
      "Share your prototype or draft with one trusted person for constructive feedback.",
      "Build for real human value, not superficial trends."
    ];

    evidenceBadge = {
      scientificBasis: "Divergent thinking exercises lower prefrontal cortex inhibition, allowing novel associations between disparate memory nodes.",
      culturalContext: "Srijan and Kalatmak Expression in classical Indian Aesthetics (Rasa Theory)."
    };
  }
  // GENERAL DEFAULT SYNTHESIS
  else {
    reply = `Welcome to **Prajvaya AI** 🌱. I am your integrated intelligence guide, synthesized from classical wisdom, modern scientific principles, and regenerative human values.\n\n${emotion.empathyNote}\n\n### 🔍 How I Can Assist You:\nI operate through specialized companions dedicated to distinct pillars of human life:\n\n• **Jeevan** 🌿: Mental wellbeing, stress regulation, habits & direction\n• **Prakriti** 🌏: Zero-waste living, rainwater harvesting & eco-sustainability\n• **Parampara** 📜: Ancient Indian philosophy, shlokas & classical knowledge\n• **Arogya** 🧘: Circadian routines, yoga, pranayama & preventive health education\n• **Vidya** 🎓: Structured learning, software engineering & critical thinking\n• **Srijan** 💡: Creative writing, artistic ideation & eco-innovation\n\nFeel free to select a specific companion tab or ask me any question about daily routine, purpose, sustainability, or our platform!`;

    actionPlan = [
      "Select a companion tab above that fits your current focus.",
      "Ask a specific question about daily routine, stress, or eco-living.",
      "Explore the Bhagavad Gita in our Wisdom Library on the homepage.",
      "Join our WhatsApp Community to connect with local cohorts."
    ];
  }

  // Inject recalled memory context into response if available
  if (recalledMemories.length > 0) {
    reply = `*(Recalling your saved context: ${recalledMemories.join(" | ")})*\n\n` + reply;
  }

  return {
    reply,
    activeCompanion: primary,
    collaboratingCompanions: collaborators,
    emotionalProfile: emotion,
    reasoningChain,
    recalledMemoriesUsed: recalledMemories,
    evidenceBadge,
    actionPlan
  };
}
