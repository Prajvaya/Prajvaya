import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail, templates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address format." }, { status: 400 });
    }

    // Check if they are already verified
    const existing = await db.subscribers.findUnique(email);
    if (existing && existing.verified) {
      return NextResponse.json({ error: "This email is already subscribed." }, { status: 400 });
    }

    // Create subscriber (unverified)
    await db.subscribers.create(email);

    // Generate a 6-digit subscriber confirmation OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await db.tokens.create(email, otp, "subscribe", 15);

    // Send the subscriber verification email
    await sendEmail(email, "Confirm Your Prajvaya Subscription", templates.newsletterVerify(otp));

    return NextResponse.json({
      message: "Subscription pending. Please verify your email with the OTP sent to your inbox.",
      email,
    });
  } catch (err: any) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Failed to initiate subscription." }, { status: 500 });
  }
}
