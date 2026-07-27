const http = require("http");

console.log("Sending GET request to http://localhost:3000/api/auth/session...");

const req = http.request(
  {
    hostname: "localhost",
    port: 3000,
    path: "/api/auth/session",
    method: "GET"
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

req.end();
