import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || '"Prajvaya" <noreply@prajvaya.com>';

// Helper to log emails locally when SMTP is not configured.
const logEmailLocally = async (to: string, subject: string, html: string) => {
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
};

export const sendEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          password: SMTP_PASS,
        },
      } as any);

      await transporter.sendMail({
        from: SMTP_FROM,
        to,
        subject,
        html,
      });
      return true;
    } catch (err) {
      console.error("SMTP Mail Send Failed. Falling back to local file logging.", err);
      await logEmailLocally(to, subject, html);
      return true;
    }
  } else {
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
    .header h1 {
      color: #c29d66;
      font-family: 'Cinzel', serif;
      font-size: 24px;
      margin: 0;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
    .body {
      padding: 40px;
      color: #fbf9f4;
      line-height: 1.7;
    }
    .body p {
      font-size: 14px;
      margin: 0 0 20px 0;
      font-weight: 300;
    }
    .otp-code {
      display: inline-block;
      letter-spacing: 0.25em;
      font-size: 32px;
      font-weight: 700;
      color: #dec095;
      background-color: rgba(194, 157, 102, 0.1);
      border: 1px dashed rgba(194, 157, 102, 0.4);
      padding: 10px 30px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
    }
    .btn {
      display: inline-block;
      background-color: #c29d66;
      color: #1c1c1c !important;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: bold;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin: 20px 0;
      transition: background-color 0.3s;
    }
    .footer {
      background-color: #0b1f13;
      padding: 30px 40px;
      text-align: center;
      font-size: 11px;
      color: rgba(251, 249, 244, 0.6);
      border-top: 1px solid rgba(194, 157, 102, 0.2);
    }
    .footer a {
      color: #dec095;
      text-decoration: none;
      margin: 0 10px;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>Prajvaya</h1>
      </div>
      <div class="body">
        ${contentHtml}
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Prajvaya. All rights reserved.</p>
        <p>
          <a href="https://prajvaya.com" target="_blank">Website</a> |
          <a href="https://linkedin.com" target="_blank">LinkedIn</a> |
          <a href="https://github.com" target="_blank">GitHub</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const templates = {
  verificationCode: (name: string, code: string): string => baseTemplate(
    "Verify Your Account",
    `
    <p>Dear ${name},</p>
    <p>Thank you for initiating your registration with Prajvaya. To verify ownership of your email address, please use the following One-Time Password (OTP) verification code:</p>
    <div style="text-align: center;">
      <div class="otp-code">${code}</div>
    </div>
    <p>This verification code is valid for 15 minutes. If you did not make this request, you can safely ignore this email.</p>
    `
  ),
  welcome: (name: string): string => baseTemplate(
    "Welcome to Prajvaya 🌿",
    `
    <p>Hello ${name},</p>
    <p>Thank you for joining <strong>Prajvaya</strong>. We are thrilled to welcome you to our cohort.</p>
    <p>Prajvaya operates at the intersection of classical Indian wisdom and modern systems engineering. We believe technology should respect human attention, heal digital minds, restore community bonds, and align with natural laws. By verifying your account, you are now officially part of this cohort.</p>
    <div style="text-align: center;">
      <a href="https://prajvaya.com" class="btn" target="_blank">Access Portal</a>
    </div>
    <p>Feel free to reach out to us at <a href="mailto:prajvaya@gmail.com" style="color: #dec095;">prajvaya@gmail.com</a> for any collaborative queries.</p>
    `
  ),
  adminNewUser: (name: string, email: string, date: string): string => baseTemplate(
    "New User Registered",
    `
    <p><strong>System Log Alert: New User Registered</strong></p>
    <hr style="border: 0; border-top: 1px solid rgba(194,157,102,0.2); margin: 20px 0;" />
    <table style="width: 100%; font-size: 13px; color: #fbf9f4;">
      <tr>
        <td style="width: 35%; padding: 8px 0; color: #c29d66;"><strong>Name:</strong></td>
        <td style="padding: 8px 0;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #c29d66;"><strong>Email:</strong></td>
        <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #dec095;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #c29d66;"><strong>Timestamp:</strong></td>
        <td style="padding: 8px 0;">${date}</td>
      </tr>
    </table>
    `
  ),
  newsletterVerify: (code: string): string => baseTemplate(
    "Confirm Your Subscription",
    `
    <p>Hello,</p>
    <p>We received a request to subscribe this email address to the Prajvaya Newsletter updates log. To verify ownership, please input the following One-Time Password (OTP) verification code inside the signup panel:</p>
    <div style="text-align: center;">
      <div class="otp-code">${code}</div>
    </div>
    <p>If you did not sign up for this subscription, you can safely disregard this email.</p>
    `
  ),
  newsletterWelcome: (): string => baseTemplate(
    "Newsletter Subscribed 🌿",
    `
    <p>Hello,</p>
    <p>This email is to confirm that your subscription to the <strong>Prajvaya Newsletter</strong> is officially verified and active.</p>
    <p>You will receive updates on our technical projects, research publications, and community node events directly in your inbox.</p>
    <div style="text-align: center;">
      <a href="https://prajvaya.com" class="btn" target="_blank">Visit Site</a>
    </div>
    `
  ),
  adminNewSubscriber: (email: string, date: string): string => baseTemplate(
    "New Subscriber Added",
    `
    <p><strong>System Log Alert: New Newsletter Subscriber</strong></p>
    <hr style="border: 0; border-top: 1px solid rgba(194,157,102,0.2); margin: 20px 0;" />
    <table style="width: 100%; font-size: 13px; color: #fbf9f4;">
      <tr>
        <td style="width: 35%; padding: 8px 0; color: #c29d66;"><strong>Subscriber Email:</strong></td>
        <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #dec095;">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #c29d66;"><strong>Timestamp:</strong></td>
        <td style="padding: 8px 0;">${date}</td>
      </tr>
    </table>
    `
  ),
  passwordResetCode: (code: string): string => baseTemplate(
    "Reset Your Password",
    `
    <p>Hello,</p>
    <p>A request was received to reset your Prajvaya account password. To authorize this reset, please use the following One-Time Password (OTP) recovery code:</p>
    <div style="text-align: center;">
      <div class="otp-code">${code}</div>
    </div>
    <p>This recovery code will expire in 15 minutes. If you did not make this request, we recommend checking your security logs or updating your account credentials immediately.</p>
    `
  ),
};
