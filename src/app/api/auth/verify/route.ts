import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail, templates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email, token } = await request.json();

    if (!email || !token) {
      return NextResponse.json({ error: "Email and verification token are required." }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanToken = String(token).trim();

    // Find the token in the database
    const dbToken = await db.tokens.findUnique({ email: cleanEmail, token: cleanToken, type: "verify" });
    if (!dbToken) {
      return NextResponse.json({ error: "Invalid verification code. Please check your OTP and try again." }, { status: 400 });
    }

    // Check expiration
    const now = new Date().toISOString();
    if (dbToken.expiresAt < now) {
      await db.tokens.delete(dbToken.id);
      return NextResponse.json({ error: "Verification code has expired. Please click 'Resend OTP' to get a fresh code." }, { status: 400 });
    }

    // Find and update the user
    const user = await db.users.findUnique({ email });
    if (!user) {
      return NextResponse.json({ error: "User account not found." }, { status: 404 });
    }

    // Activate the user
    await db.users.update(user.id, { emailVerified: true });

    // Clean up/delete the token so it cannot be reused
    await db.tokens.delete(dbToken.id);

    // Send welcome success email
    await sendEmail(email, "Welcome to Prajvaya 🌿", templates.welcome(user.name));

    // Send admin notification email
    const regDate = new Date().toLocaleString();
    await sendEmail("prajvaya@gmail.com", "New User Registration", templates.adminNewUser(user.name, email, regDate));

    return NextResponse.json({
      message: "Your email has been verified. You may now login to access your dashboard.",
    });
  } catch (err: any) {
    console.error("Verification error:", err);
    return NextResponse.json({ error: "An unexpected error occurred during email verification." }, { status: 500 });
  }
}
