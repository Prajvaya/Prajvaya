import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail, templates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email, token } = await request.json();

    if (!email || !token) {
      return NextResponse.json({ error: "Email and verification token are required." }, { status: 400 });
    }

    // Verify token
    const dbToken = await db.tokens.findUnique({ email, token, type: "subscribe" });
    if (!dbToken) {
      return NextResponse.json({ error: "Invalid subscription verification code." }, { status: 400 });
    }

    const now = new Date().toISOString();
    if (dbToken.expiresAt < now) {
      await db.tokens.delete(dbToken.id);
      return NextResponse.json({ error: "Verification code has expired. Please subscribe again." }, { status: 400 });
    }

    // Set verified flag
    await db.subscribers.update(email, { verified: true });

    // Remove token
    await db.tokens.delete(dbToken.id);

    // Send newsletter welcome email
    await sendEmail(email, "Prajvaya Updates Log Subscribed 🌿", templates.newsletterWelcome());

    // Send admin notification
    const subDate = new Date().toLocaleString();
    await sendEmail("prajvaya@gmail.com", "New Newsletter Subscriber", templates.adminNewSubscriber(email, subDate));

    return NextResponse.json({
      message: "Newsletter subscription confirmed.",
    });
  } catch (err: any) {
    console.error("Newsletter verify error:", err);
    return NextResponse.json({ error: "Failed to verify subscription." }, { status: 500 });
  }
}
