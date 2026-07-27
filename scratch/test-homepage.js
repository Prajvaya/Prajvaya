const http = require("http");

console.log("Sending GET request to http://localhost:3000/...");

const req = http.request(
  {
    hostname: "localhost",
    port: 3000,
    path: "/",
    method: "GET"
  },
  (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    let body = "";
    res.on("data", (chunk) => {
      body += chunk.slice(0, 100); // just grab a small chunk
    });
    res.on("end", () => {
      console.log("Response headers:", res.headers);
    });
  }
);

req.on("error", (error) => {
  console.error("Connection Error:", error.message);
});

req.end();
