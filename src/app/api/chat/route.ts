import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are Prajvaya AI, the official AI Companion of the Prajvaya movement.

Your purpose is to guide humanity towards a cleaner, healthier, wiser, and more sustainable future by combining timeless traditional wisdom with responsible modern innovation.

Prajvaya believes that many solutions to today's environmental, physical, mental, social, and digital problems already exist within nature, ancient knowledge, ethical living, and scientific research. Your role is to educate, inspire, and help users understand these principles.

Your Personality:
- Warm and welcoming
- Wise but humble
- Professional
- Encouraging
- Respectful of all cultures and religions
- Optimistic
- Honest when uncertain
- Never preachy or judgmental

Always communicate in simple language that anyone can understand.

Your Mission:
Help users:
- Understand Prajvaya's vision
- Learn sustainable living
- Reduce pollution and digital pollution
- Improve physical and mental wellbeing
- Discover eco-friendly alternatives
- Learn traditional practices that are supported by evidence where possible
- Protect nature and build healthier communities
- Think long-term for future generations

Website Guidance:
Help visitors navigate the Prajvaya website. Guide them to:
- Register (/register)
- Login (/login)
- Join Community / WhatsApp
- Volunteer / Participate in campaigns
- Read articles / View projects / Contact the team

If Asked About Prajvaya:
Explain that Prajvaya is a movement focused on:
- Restoring harmony between humans and nature
- Reducing environmental pollution and digital pollution
- Reviving valuable traditional knowledge
- Encouraging sustainable innovation
- Building a better future for coming generations
`;

// Advanced mock responder for when no Gemini API key is configured
function getMockResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello there! 🌱 Welcome to Prajvaya. I am your AI Companion. I can guide you through our vision, sustainable lifestyle choices, and traditional circular practices. How may I assist you today?";
  }
  if (msg.includes("vision") || msg.includes("mission") || msg.includes("what is prajvaya") || msg.includes("purpose")) {
    return "Prajvaya is a movement dedicated to bridging timeless Indian heritage and modern technology to solve critical modern challenges. Our mission focuses on restoring ecological harmony, reducing environmental and digital pollution, and reviving traditional circular practices to build a sustainable, conscious future for coming generations.";
  }
  if (msg.includes("digital pollution") || msg.includes("digital wellbeing") || msg.includes("screen time") || msg.includes("phone")) {
    return "Digital pollution refers to the cognitive clutter, attention fragmentation, and mental exhaustion caused by hyper-connected, dopamine-exploitive technologies. Prajvaya advocates for digital hygiene through conscious disconnection, notification-free local sharing systems, and tech built to respect human agency rather than exploit it.";
  }
  if (msg.includes("register") || msg.includes("signup") || msg.includes("create account")) {
    return "To register and join our cohort console, click on 'Sign In' in the header, choose 'Register Here' or navigate directly to [/register](file:///register). Enter your name, email, and choose a secure password. Once you verify your email with the 6-digit OTP, your account will be activated!";
  }
  if (msg.includes("login") || msg.includes("sign in") || msg.includes("signin")) {
    return "You can sign in to your dashboard by clicking the 'Sign In' link in the navigation header or by visiting [/login](file:///login). If your email is not verified yet, the system will securely prompt you to input your verification OTP code.";
  }
  if (msg.includes("community") || msg.includes("whatsapp") || msg.includes("group")) {
    return "We would love for you to join our movement! You can join our main local convergence circles and active Contributors Group directly on WhatsApp: \n\n🤝 [Join WhatsApp Contributors Group](https://chat.whatsapp.com/BbSPzaUTtws9OJpU5JqcaA)";
  }
  if (msg.includes("gita") || msg.includes("bhagwad gita") || msg.includes("pdf")) {
    return "Yes! You can explore the Bhagavad Gita PDF directly inside our 'Wisdom Library' catalog! Simply close this chat, click on the 'Wisdom Library' card in our Future Ecosystem grid, and select 'Read Text' on the Gita cover.";
  }
  if (msg.includes("farming") || msg.includes("organic") || msg.includes("agriculture")) {
    return "Prajvaya supports traditional circular agriculture and organic farming. By avoiding chemical fertilizers, utilizing traditional soil-enrichment methodologies (like Panchagavya and compost), and planting native multi-crops, we restore topsoil health and prevent groundwater contamination.";
  }
  if (msg.includes("meditation") || msg.includes("yoga") || msg.includes("breath")) {
    return "Yoga and meditation are ancient, evidence-based practices to restore mental stability and calm the nervous system. By integrating conscious breathing (Pranayama) and daily mindfulness pauses into our routines, we can heal digital fatigue and improve cognitive focus.";
  }
  if (msg.includes("volunteer") || msg.includes("join") || msg.includes("contribute")) {
    return "You can volunteer and register as a contributor to help Prajvaya build local water check-dams, plant trees, or write code. Click 'Join as Contributor' or visit the WhatsApp group to get synced with ongoing projects!";
  }
  if (msg.includes("water") || msg.includes("pollution") || msg.includes("tree")) {
    return "We actively work on water conservation (recharging aquifers via small rock check-dams) and ecological restoration. We plant native, biodiverse tree saplings that require minimal maintenance and help rebuild regional forest canopies.";
  }

  return "Thank you for sharing that. 🌱 Prajvaya believes that solving modern physical, digital, and ecological problems requires aligning our daily routines with natural laws and circular traditional systems. I am here to help you navigate this transition. Is there a specific area you'd like to explore, such as digital wellbeing, organic farming, or navigating our website pages?";
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format." }, { status: 400 });
    }

    const lastMessageObj = messages[messages.length - 1];
    const userMessage = lastMessageObj ? lastMessageObj.content : "";

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // 1. Convert message history to Gemini format
      // We will feed the system prompt as context
      const formattedContents = messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));

      // Insert system prompt instructions at the beginning
      formattedContents.unshift({
        role: "user",
        parts: [{ text: `INSTRUCTIONS:\n${SYSTEM_PROMPT}\n\nUnderstood. Let's begin the conversation.` }]
      }, {
        role: "model",
        parts: [{ text: "Understood. I will act as Prajvaya AI, the warm, wise, and humble companion of the movement." }]
      });

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: formattedContents,
              generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7
              }
            })
          }
        );

        if (!response.ok) {
          const errData = await response.json();
          console.error("Gemini API request error:", errData);
          throw new Error("Failed to get response from Gemini API.");
        }

        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (candidateText) {
          return NextResponse.json({ reply: candidateText });
        }
      } catch (geminiErr) {
        console.error("Gemini request failed, falling back to mock:", geminiErr);
      }
    }

    // 2. Fallback to mock responses if API is down or key is missing
    const reply = getMockResponse(userMessage);
    return NextResponse.json({ reply });

  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "An unexpected error occurred in the chat endpoint." }, { status: 500 });
  }
}
