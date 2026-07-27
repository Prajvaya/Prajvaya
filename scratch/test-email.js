const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Load variables manually from .env.local
const envPath = path.join(__dirname, "..", ".env.local");
if (!fs.existsSync(envPath)) {
  console.error("Error: .env.local file not found.");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf-8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || "";
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    envVars[key] = value;
  }
});

const host = envVars.SMTP_HOST;
const port = parseInt(envVars.SMTP_PORT, 10);
const user = envVars.SMTP_USER;
const pass = envVars.SMTP_PASS;

console.log("--- DIAGNOSTIC SMTP TEST ---");
console.log(`Connecting to: ${host}:${port}`);
console.log(`User account: ${user}`);
console.log(`Password length: ${pass ? pass.length : 0} characters`);
console.log("----------------------------");

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Verification Failed!");
    console.error("Error Details:", error);
    
    if (error.code === "EAUTH" || error.message.includes("Username and Password not accepted")) {
      console.log("\n💡 SOLUTION: Google rejected your password because 2-Step Verification is enabled or standard passwords are blocked. You must use a 16-digit Google App Password instead of your regular password. Please see my previous steps on how to generate one!");
    }
  } else {
    console.log("✅ Success! Your mail server configuration is 100% correct and ready to deliver real emails.");
  }
  process.exit(0);
});
