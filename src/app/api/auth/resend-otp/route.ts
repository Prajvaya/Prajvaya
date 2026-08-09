import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail, templates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json();

    if (!email || !type) {
      return NextResponse.json({ error: "Email and type are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address format." }, { status: 400 });
    }

    if (type !== "verify" && type !== "reset" && type !== "subscribe") {
      return NextResponse.json({ error: "Invalid token type requested." }, { status: 400 });
    }

    // Generate a new 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await db.tokens.create(email, otp, type, 15); // Valid for 15 mins

    console.log(`\n==================================================`);
    console.log(`[PRAJ VAYA AUTH] Resend OTP (${type}) for ${email}: ${otp}`);
    console.log(`==================================================\n`);

    // Determine corresponding template and dispatch reliably
    if (type === "verify") {
      const user = await db.users.findUnique({ email });
      const name = user ? user.name : "User";
      await sendEmail(email, "Verify Your Prajvaya Account", templates.verificationCode(name, otp));
    } else if (type === "reset") {
      await sendEmail(email, "Reset Your Prajvaya Password", templates.passwordResetCode(otp));
    } else if (type === "subscribe") {
      await sendEmail(email, "Confirm Your Prajvaya Subscription", templates.newsletterVerify(otp));
    }

    return NextResponse.json({
      message: "A new OTP verification code has been dispatched to your inbox.",
      ...(process.env.NODE_ENV !== "production" ? { debugOtp: otp } : {}),
    });
  } catch (err: any) {
    console.error("Resend OTP error:", err);
    return NextResponse.json({ error: "Failed to dispatch a new verification code." }, { status: 500 });
  }
}
