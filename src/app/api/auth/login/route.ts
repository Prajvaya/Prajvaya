import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await db.users.findUnique({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Block unverified logins
    if (!user.emailVerified) {
      // Re-trigger verification OTP send for user convenience
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await db.tokens.create(email, otp, "verify", 15);
      
      // Let's import sendEmail dynamically inside the route to avoid circular refs
      const { sendEmail, templates } = await import("@/lib/email");
      await sendEmail(email, "Verify Your Prajvaya Account", templates.verificationCode(user.name, otp));

      return NextResponse.json(
        { 
          error: "Your email address is unverified. A new verification OTP code has been sent.", 
          unverified: true,
          email 
        }, 
        { status: 403 }
      );
    }

    // Verify password hash
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Verify account status
    if (user.status === "Disabled") {
      return NextResponse.json({ error: "Your account is disabled. Please contact support." }, { status: 403 });
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Update last login timestamp
    await db.users.update(user.id, { lastLogin: new Date().toISOString() });

    const response = NextResponse.json({
      message: "Welcome back!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Save token as HttpOnly cookie
    const isProd = process.env.NODE_ENV === "production";
    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "An unexpected error occurred during login." }, { status: 500 });
  }
}
