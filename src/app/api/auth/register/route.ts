import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { sendEmail, templates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body provided." }, { status: 400 });
    }

    const { name, email, password, confirmPassword } = body;

    // 1. Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: "Invalid email address format." }, { status: 400 });
    }

    // Password validation: min 8 characters, must contain letter and number
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long and contain both letters and numbers." },
        { status: 400 }
      );
    }

    // Password confirmation validation
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    // 2. Hash password safely
    let passwordHash = "";
    try {
      passwordHash = await bcrypt.hash(password, 10);
    } catch (hashErr) {
      console.error("Password hash error:", hashErr);
      return NextResponse.json({ error: "Failed to process password encryption." }, { status: 500 });
    }

    // 3. Prevent duplicate email registration
    const existingUser = await db.users.findUnique({ email: cleanEmail });
    if (existingUser) {
      if (existingUser.emailVerified) {
        return NextResponse.json({ error: "This email is already registered." }, { status: 400 });
      }

      // If user exists but is unverified, update details and send a fresh OTP
      await db.users.update(existingUser.id, {
        name: cleanName,
        passwordHash,
      });

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await db.tokens.create(cleanEmail, otp, "verify", 15);

      // Safe email dispatch (never crashes registration if SMTP is unreachable)
      try {
        await sendEmail(cleanEmail, "Verify Your Prajvaya Account", templates.verificationCode(cleanName, otp));
      } catch (emailErr) {
        console.warn("Verification email dispatch warning:", emailErr);
      }

      return NextResponse.json({
        message: "An unverified account exists. A fresh verification OTP code has been generated.",
        email: cleanEmail,
      });
    }

    // 4. Create new user in DB
    const newUser = await db.users.create({
      name: cleanName,
      email: cleanEmail,
      passwordHash,
      emailVerified: false,
    });

    // 5. Generate 6-digit OTP token
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await db.tokens.create(cleanEmail, otp, "verify", 15);

    console.log(`\n==================================================`);
    console.log(`[PRAJ VAYA AUTH] Registration OTP for ${cleanEmail}: ${otp}`);
    console.log(`==================================================\n`);

    // 6. Fast non-blocking email dispatch (fires immediately in parallel)
    sendEmail(cleanEmail, "Verify Your Prajvaya Account", templates.verificationCode(cleanName, otp)).catch((emailErr) => {
      console.warn("Verification email dispatch warning:", emailErr);
    });

    return NextResponse.json({
      message: "Registration successful! Please check your email inbox (and Spam folder) for the 6-digit OTP code.",
      email: cleanEmail,
      ...(process.env.NODE_ENV !== "production" ? { debugOtp: otp } : {}),
    });
  } catch (err: any) {
    console.error("Registration error details:", err?.message || err);
    return NextResponse.json(
      { error: err?.message || "An unexpected error occurred during registration." },
      { status: 500 }
    );
  }
}
