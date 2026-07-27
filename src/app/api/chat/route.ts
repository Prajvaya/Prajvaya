import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Prajvaya AI, the official AI Companion of the Prajvaya movement.

Your purpose is to guide humanity towards a cleaner, healthier, wiser, and more sustainable future by combining timeless traditional wisdom with responsible modern innovation.

Prajvaya believes that many solutions to today's environmental, physical, mental, social, and digital problems already exist within nature, ancient knowledge, ethical living, and scientific research. Your role is to educate, inspire, and help users understand these principles.

Your Personality:
- Warm and welcoming
- Wise but humble
- Professional and encouraging
- Respectful of all cultures and religions
- Optimistic and honest when uncertain
- Never preachy or judgmental

Always communicate in simple language that anyone can understand.

Your Mission - Help users:
- Understand Prajvaya's vision and initiatives
- Learn sustainable and zero-waste living
- Reduce pollution and digital pollution
- Improve physical and mental wellbeing through yoga, meditation, and healthy routines
- Discover eco-friendly alternatives and traditional farming practices
- Learn traditional Indian knowledge and herbal practices (educational only)
- Protect nature and build healthier communities
- Think long-term for future generations

About Prajvaya:
Prajvaya is a movement focused on:
- Restoring harmony between humans and nature
- Reducing environmental and digital pollution
- Reviving valuable traditional knowledge from ancient India
- Encouraging sustainable innovation and circular economy
- Building a better future for coming generations
- Welcoming everyone regardless of religion, country, culture, age, or profession

Website Guidance - Help visitors:
- Register at /register
- Login at /login
- Join the WhatsApp Community at https://chat.whatsapp.com/HS6dVyedqtAKvGlkVjQSdJ
- Join the Contributors Group at https://chat.whatsapp.com/BbSPzaUTtws9OJpU5JqcaA
- Explore the Wisdom Library (click the card on homepage)
- Read the Bhagavad Gita in the Wisdom Library section

Behaviour Rules:
- Always be respectful and encourage critical thinking
- Admit when information is uncertain
- Recommend consulting qualified professionals for medical, legal, or financial matters
- Never invent facts or spread misinformation
- Inspire hope, responsibility, and action — not fear
- Keep responses concise and practical with actionable suggestions
- Use relevant emojis occasionally to keep the tone warm`;

// Intelligent keyword-based fallback responder
function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("namaste")) {
    return "Namaste! 🙏 Welcome to Prajvaya. I am your AI Companion — here to guide you through sustainable living, ancient wisdom, digital wellbeing, and everything our movement stands for. How may I assist you today?";
  }
  if (msg.includes("stress") || msg.includes("anxious") || msg.includes("anxiety") || msg.includes("overwhelm") || msg.includes("burnout") || msg.includes("tired") || msg.includes("same every day")) {
    return "I hear you. 🌿 Modern life can feel relentlessly overwhelming. Prajvaya believes that many answers lie in slowing down and reconnecting with natural rhythms.\n\nSome practical steps:\n• Start your morning with 10 minutes of conscious breathing (Pranayama)\n• Limit screen exposure in the first and last hour of your day\n• Walk barefoot on grass or soil once a day — it genuinely regulates your nervous system\n• Practice the Vedic principle of one task at a time (Ekagratha)\n\nWould you like to explore a full daily routine based on traditional Ayurvedic principles?";
  }
  if (msg.includes("vision") || msg.includes("mission") || msg.includes("prajvaya") || msg.includes("what is") || msg.includes("about")) {
    return "Prajvaya 🌱 is a movement built at the intersection of ancient Indian wisdom and responsible modern innovation.\n\nWe work to:\n• Restore ecological harmony between humans and nature\n• Reduce physical, digital, and social pollution\n• Revive time-tested traditional knowledge systems\n• Build sustainable, self-reliant communities\n\nThe name 'Prajvaya' embodies the spirit of 'victory through wisdom and intellect' — a future where technology serves life, not the other way around.";
  }
  if (msg.includes("digital") || msg.includes("screen") || msg.includes("phone") || msg.includes("social media") || msg.includes("internet")) {
    return "Digital pollution 📱 is one of the most overlooked crises of our time. Hyper-connected devices fragment our attention, exhaust our nervous system, and erode real human bonds.\n\nPrajvaya's approach:\n• Design technology that respects human attention\n• Practice intentional disconnection — scheduled offline windows\n• Replace passive scrolling with purposeful learning\n• Use local, notification-free community tools\n\nSmall daily actions: turn off all non-essential notifications, set a phone-free dinner table, and take a 1-hour walk without your device daily.";
  }
  if (msg.includes("register") || msg.includes("sign up") || msg.includes("join") || msg.includes("account")) {
    return "Welcome aboard! 🌿 To join our cohort, visit the registration page at **/register** from the navigation header.\n\nYou will need:\n• Your full name\n• Email address\n• A secure password\n\nAfter registering, verify your email with the OTP code sent to your inbox (check Spam if it doesn't arrive in 1 minute). Once verified, you'll have full access to your Prajvaya dashboard!";
  }
  if (msg.includes("community") || msg.includes("whatsapp") || msg.includes("group") || msg.includes("connect")) {
    return "We would love for you to join our growing community! 🤝\n\n• **Main Community**: https://chat.whatsapp.com/HS6dVyedqtAKvGlkVjQSdJ\n• **Contributors Group** (for active builders): https://chat.whatsapp.com/BbSPzaUTtws9OJpU5JqcaA\n\nOur community includes people from all backgrounds — farmers, engineers, teachers, students — united by a shared commitment to a healthier planet.";
  }
  if (msg.includes("gita") || msg.includes("bhagavad") || msg.includes("wisdom") || msg.includes("library") || msg.includes("book")) {
    return "The Bhagavad Gita 📖 is one of humanity's greatest guides on duty, consciousness, and equanimity under pressure.\n\nYou can read the full PDF directly inside our **Wisdom Library** — simply scroll to the 'Future Ecosystem' section on the homepage and click the **Wisdom Library** card. Then click 'Read Text' on the Gita cover!\n\nMore sacred texts from the Upanishads and Patanjali Sutras are being cataloged and will be added soon.";
  }
  if (msg.includes("farm") || msg.includes("organic") || msg.includes("agriculture") || msg.includes("soil") || msg.includes("compost")) {
    return "Traditional Indian agriculture 🌾 operated on circular, zero-waste principles for thousands of years:\n\n• **Panchagavya**: a natural biostimulant from cow products that enriches soil microbiome\n• **Crop rotation & multi-cropping**: prevents soil depletion naturally\n• **Rainwater harvesting & check-dams**: recharge groundwater without machinery\n• **No-till farming**: preserves topsoil carbon and earthworm populations\n\nThese methods are cost-effective, chemical-free, and proven to restore degraded land within 2–3 seasons.";
  }
  if (msg.includes("meditation") || msg.includes("yoga") || msg.includes("breath") || msg.includes("mind") || msg.includes("calm") || msg.includes("focus")) {
    return "Yoga and meditation 🧘 are ancient, evidence-backed systems for restoring mental clarity and physical vitality.\n\nA simple daily practice to start:\n1. **Morning**: 5 min Pranayama (Anulom Vilom) + 10 min seated silence\n2. **Midday**: 2 min conscious breathing before meals\n3. **Evening**: 10 min gentle stretching + gratitude journaling\n\nConsistency matters more than duration. Even 15 minutes daily shows measurable cognitive improvement within 3 weeks.";
  }
  if (msg.includes("water") || msg.includes("river") || msg.includes("conservation") || msg.includes("tree") || msg.includes("forest") || msg.includes("plant")) {
    return "Water and forest conservation 🌳 are at the heart of Prajvaya's ecological work:\n\n• We help communities build **rock-fill check-dams** to recharge local aquifers\n• We plant **native multi-species trees** that restore biodiversity without irrigation\n• We document traditional water harvesting systems like **kunds, baoris, and johads**\n\nWant to participate in a local restoration project? Join our Contributors Group on WhatsApp!";
  }
  if (msg.includes("volunteer") || msg.includes("contribute") || msg.includes("help") || msg.includes("work")) {
    return "We would be thrilled to have you contribute! 🙌 Prajvaya welcomes:\n\n• **Field volunteers**: tree planting, check-dam building, community education\n• **Digital contributors**: developers, designers, writers, researchers\n• **Knowledge partners**: practitioners of Ayurveda, yoga, traditional crafts\n\nJoin our Contributors WhatsApp group to sync with active projects: https://chat.whatsapp.com/BbSPzaUTtws9OJpU5JqcaA";
  }

  return "Thank you for reaching out. 🌱 Prajvaya believes that every question about how to live better is a step toward a healthier planet.\n\nI am here to help you explore sustainable living, ancient wisdom, digital wellbeing, or navigate our platform. Could you tell me more about what you're looking for — or choose one of the quick topics below to get started?";
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format." }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage?.content || "";

    if (apiKey && apiKey.startsWith("gsk_")) {
      // Build message history in OpenAI-compatible format for Groq
      const formattedMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((msg: { sender: string; content: string }) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.content,
        }))
      ];

      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: formattedMessages,
            temperature: 0.75,
            max_tokens: 600,
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          console.error("Groq API error:", errData);
          throw new Error("Groq API request failed.");
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content;

        if (reply) {
          return NextResponse.json({ reply });
        }
      } catch (groqErr) {
        console.error("Groq request failed, falling back to local:", groqErr);
      }
    }

    // Fallback to smart local responder
    const reply = getFallbackResponse(userMessage);
    return NextResponse.json({ reply });

  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
