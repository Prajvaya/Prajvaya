const apiKey = process.env.GROQ_API_KEY || "YOUR_GROQ_KEY_HERE";

console.log("Testing Groq Llama 3.3 70B API...\n");

fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are Prajvaya AI, a wise, warm AI companion for the Prajvaya sustainability movement." },
      { role: "user", content: "Hello" }
    ],
    temperature: 0.75,
    max_tokens: 300
  })
})
  .then(async (res) => {
    console.log(`Status: ${res.status}`);
    const data = await res.json();
    if (data.choices?.[0]?.message?.content) {
      console.log("\n✅ LIVE AI RESPONSE:\n");
      console.log(data.choices[0].message.content);
    } else {
      console.log("Full response:", JSON.stringify(data, null, 2));
    }
  })
  .catch(err => console.error("Error:", err.message));
