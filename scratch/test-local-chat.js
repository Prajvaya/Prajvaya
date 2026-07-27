const http = require("http");

const data = JSON.stringify({
  messages: [
    { sender: "ai", content: "Welcome!" },
    { sender: "user", content: "hello" }
  ]
});

console.log("Sending POST request to http://localhost:3000/api/chat...");

const req = http.request(
  {
    hostname: "localhost",
    port: 3000,
    path: "/api/chat",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  },
  (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    let body = "";
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log("Response Body:", body);
    });
  }
);

req.on("error", (error) => {
  console.error("Connection Error:", error.message);
});

req.write(data);
req.end();
