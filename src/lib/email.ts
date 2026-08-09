import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Helper to log emails locally when SMTP is not configured.
const logEmailLocally = async (to: string, subject: string, html: string) => {
  try {
    const dirPath = path.join(process.cwd(), "scratch", "emails");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const fileName = `email_${Date.now()}_${to.replace(/[@.]/g, "_")}.html`;
    const filePath = path.join(dirPath, fileName);

    const fileContent = `<!--
To: ${to}
Subject: ${subject}
Date: ${new Date().toISOString()}
-->
${html}`;

    await fs.promises.writeFile(filePath, fileContent, "utf-8");
    console.log(`[Email Mock Log] Sent email to ${to}. Subject: "${subject}". Mock file: ${filePath}`);
  } catch (err) {
    console.log(`[Email Mock Log - Memory Fallback] Sent email to ${to}. Subject: "${subject}".`);
  }
};

export const sendEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
  const host = process.env.SMTP_HOST || "";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const from = process.env.SMTP_FROM || '"Prajvaya" <prajvaya@gmail.com>';

  if (host && user && pass) {
    try {
      const isGmail = host.includes("gmail");
      const transporter = nodemailer.createTransport(
        isGmail
          ? {
              service: "gmail",
              auth: { user, pass },
              tls: { rejectUnauthorized: false },
            }
          : ({
              host,
              port,
              secure: port === 465,
              auth: { user, pass },
              tls: { rejectUnauthorized: false },
            } as any)
      );

      const info = await transporter.sendMail({
        from,
        to,
        subject,
        html,
      });

      console.log(`[Email Dispatch Success] Sent email to ${to}. MessageId: ${info.messageId}`);
      return true;
    } catch (err: any) {
      console.error(`[SMTP Mail Send Error] Failed to send email to ${to}:`, err?.message || err);
      await logEmailLocally(to, subject, html);
      return true;
    }
  } else {
    console.warn(`[SMTP Missing Config] SMTP_HOST/USER/PASS not set. Falling back to local logging.`);
    await logEmailLocally(to, subject, html);
    return true;
  }
};

// --- EMAIL TEMPLATES ---

const baseTemplate = (title: string, contentHtml: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #fbf9f4;
      color: #1c1c1c;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #fbf9f4;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #121212;
      border: 1px solid #c29d66;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    .header {
      background-color: #0b1f13;
      padding: 30px 40px;
      text-align: center;
      border-bottom: 1px solid rgba(194, 157, 102, 0.2);
    }
    .brand-title {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #fbf9f4;
      margin: 0;
    }
    .brand-sub {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.2em;
      color: #c29d66;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .content {
      padding: 40px;
      color: #e5e5e5;
      font-size: 15px;
      line-height: 1.6;
    }
    .heading {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 20px;
      color: #c29d66;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .code-box {
      background-color: #1c1c1c;
      border: 1px border-gold/30;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin: 24px 0;
    }
    .code {
      font-family: monospace;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 0.25em;
      color: #c29d66;
    }
    .btn {
      display: inline-block;
      background-color: #c29d66;
      color: #121212;
      font-weight: 600;
      font-size: 14px;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .footer {
      background-color: #0d0d0d;
      padding: 20px 40px;
      text-align: center;
      font-size: 12px;
      color: #888888;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="brand-title">PRAJVAYA</div>
        <div class="brand-sub">Victory through Intellect</div>
      </div>
      <div class="content">
        ${contentHtml}
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Prajvaya AI Platform. Rebuilding the future with remembered wisdom.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const templates = {
  verificationCode: (name: string, code: string) =>
    baseTemplate(
      "Verify Your Email",
      `
      <h2 class="heading">Welcome, ${name}</h2>
      <p>Thank you for creating an account on the Prajvaya AI Platform. To complete your registration and verify your email address, please use the following 6-digit verification code:</p>
      <div class="code-box">
        <div class="code">${code}</div>
      </div>
      <p style="font-size: 13px; color: #aaaaaa;">This verification code will expire in 15 minutes. If you did not initiate this request, you can safely ignore this email.</p>
    `
    ),

  passwordReset: (name: string, code: string) =>
    baseTemplate(
      "Reset Your Password",
      `
      <h2 class="heading">Password Reset Request</h2>
      <p>Hello ${name}, we received a request to reset your password for your Prajvaya account. Use the code below to complete the reset:</p>
      <div class="code-box">
        <div class="code">${code}</div>
      </div>
      <p style="font-size: 13px; color: #aaaaaa;">This code will expire in 15 minutes. If you did not request a password reset, please secure your account immediately.</p>
    `
    ),

  passwordResetCode: (code: string) =>
    baseTemplate(
      "Reset Your Password",
      `
      <h2 class="heading">Password Reset Request</h2>
      <p>We received a request to reset your password for your Prajvaya account. Use the code below to complete the reset:</p>
      <div class="code-box">
        <div class="code">${code}</div>
      </div>
      <p style="font-size: 13px; color: #aaaaaa;">This code will expire in 15 minutes. If you did not request a password reset, please secure your account immediately.</p>
    `
    ),

  newsletterVerify: (code: string) =>
    baseTemplate(
      "Confirm Subscription",
      `
      <h2 class="heading">Confirm Your Subscription</h2>
      <p>Thank you for subscribing to the Prajvaya Journal. Use the code below to verify your email:</p>
      <div class="code-box">
        <div class="code">${code}</div>
      </div>
    `
    ),

  welcome: (name: string) =>
    baseTemplate(
      "Welcome to Prajvaya",
      `
      <h2 class="heading">Account Verified</h2>
      <p>Hello ${name}, your Prajvaya account is now fully active! You have complete access to the Prajvaya AI Platform, 6 Specialized Companions, and the Interactive Wisdom Library.</p>
      <p>Join our community of forward-thinkers bridging timeless ancient wisdom with cutting-edge technology.</p>
      <a href="https://chat.whatsapp.com/HS6dVyedqtAKvGlkVjQSdJ" class="btn" target="_blank">Join Prajvaya Community</a>
    `
    ),

  adminNewUser: (name: string, email: string, date: string) =>
    baseTemplate(
      "New User Registered",
      `
      <h2 class="heading">New User Registration Alert</h2>
      <p>A new user has joined the Prajvaya AI Platform!</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
    `
    ),

  newsletterWelcome: () =>
    baseTemplate(
      "Welcome to Prajvaya Updates Log",
      `
      <h2 class="heading">Subscription Confirmed! 🌿</h2>
      <p>Thank you for subscribing to the Prajvaya Journal. You will receive curated perspectives on Vedic philosophy, AI architecture, and sustainable tech.</p>
    `
    ),

  adminNewSubscriber: (email: string, date: string) =>
    baseTemplate(
      "New Newsletter Subscriber",
      `
      <h2 class="heading">New Subscriber Alert</h2>
      <p>A new user has subscribed to the Prajvaya Journal!</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
    `
    )
};
