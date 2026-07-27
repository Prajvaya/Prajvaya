const apiKey = process.env.API_KEY || "YOUR_GEMINI_KEY_HERE";
const model = "gemini-2.0-flash";
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

console.log("Sending direct test request to Google Gemini API...");

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    contents: [{ role: "user", parts: [{ text: "Hello" }] }]
  })
})
  .then(async (res) => {
    console.log(`Status Code: ${res.status}`);
    const text = await res.text();
    console.log("Response Body:", text);
  })
  .catch((err) => {
    console.error("Fetch Error:", err.message);
  });
