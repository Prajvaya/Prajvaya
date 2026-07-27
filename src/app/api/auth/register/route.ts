import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { sendEmail, templates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    // 1. Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
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

    // 2. Prevent duplicate email registration
    const existingUser = await db.users.findUnique({ email });
    if (existingUser) {
      if (existingUser.emailVerified) {
        return NextResponse.json({ error: "This email is already registered." }, { status: 400 });
      }
      // If user exists but is not verified, we can let them re-register (override/update password & name)
      // or simply send a new OTP. Let's update details and send a new OTP.
      const passwordHash = await bcrypt.hash(password, 10);
      await db.users.update(existingUser.id, {
        name,
        passwordHash,
      });

      // Generate a new 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await db.tokens.create(email, otp, "verify", 15); // Valid for 15 mins

      // Send verification email
      await sendEmail(email, "Verify Your Prajvaya Account", templates.verificationCode(name, otp));

      return NextResponse.json({
        message: "An unverified account already exists. A new verification OTP code has been sent.",
        email,
      });
    }

    // 3. Hash password and save new user
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await db.users.create({
      name,
      email,
      passwordHash,
      emailVerified: false,
    });

    // 4. Generate 6-digit verification code OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await db.tokens.create(email, otp, "verify", 15); // Valid for 15 mins

    // 5. Send verification code
    await sendEmail(email, "Verify Your Prajvaya Account", templates.verificationCode(name, otp));

    return NextResponse.json({
      message: "Registration successful! Please verify your email with the OTP sent to your inbox.",
      email,
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "An unexpected error occurred during registration." }, { status: 500 });
  }
}
