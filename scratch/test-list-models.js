const apiKey = process.env.API_KEY || "YOUR_GEMINI_KEY_HERE";

console.log("Listing models enabled for this API key...");

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
  .then(async (res) => {
    console.log(`Status Code: ${res.status}`);
    const text = await res.text();
    console.log("Response:", text.slice(0, 1000));
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });
