const apiKey = process.env.API_KEY || "YOUR_GEMINI_KEY_HERE";

const configs = [
  { url: "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent" },
  { url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent" },
  { url: "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent" },
  { url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" }
];

async function testAll() {
  for (const config of configs) {
    console.log(`\nTesting: ${config.url}...`);
    try {
      const res = await fetch(`${config.url}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "Hello" }] }]
        })
      });
      console.log(`Status Code: ${res.status}`);
      const text = await res.text();
      console.log("Response Snippet:", text.slice(0, 300));
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
}

testAll();
