import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail, templates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    const user = await db.users.findUnique({ email });
    if (user && user.emailVerified) {
      // Generate a 6-digit password recovery code
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await db.tokens.create(email, otp, "reset", 15); // Valid for 15 mins

      // Send the recovery email
      await sendEmail(email, "Reset Your Prajvaya Password", templates.passwordResetCode(otp));
    }

    // Return generic success to prevent email verification probing/enumeration
    return NextResponse.json({
      message: "If this email address exists in our registry, a password recovery code has been sent.",
    });
  } catch (err: any) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ error: "An unexpected error occurred during password recovery." }, { status: 500 });
  }
}
