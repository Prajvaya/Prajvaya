import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, token, password, confirmPassword } = await request.json();

    if (!email || !token || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    // Password validation: min 8 characters, letters & numbers
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long and contain both letters and numbers." },
        { status: 400 }
      );
    }

    // Look up token
    const dbToken = await db.tokens.findUnique({ email, token, type: "reset" });
    if (!dbToken) {
      return NextResponse.json({ error: "Invalid or incorrect recovery code." }, { status: 400 });
    }

    // Check expiration
    const now = new Date().toISOString();
    if (dbToken.expiresAt < now) {
      await db.tokens.delete(dbToken.id);
      return NextResponse.json({ error: "Recovery code has expired. Please request a new one." }, { status: 400 });
    }

    // Find user
    const user = await db.users.findUnique({ email });
    if (!user) {
      return NextResponse.json({ error: "User account not found." }, { status: 404 });
    }

    // Update password
    const passwordHash = await bcrypt.hash(password, 10);
    await db.users.update(user.id, { passwordHash });

    // Clean up recovery token
    await db.tokens.delete(dbToken.id);

    return NextResponse.json({
      message: "Password reset successful! You may now login with your new credentials.",
    });
  } catch (err: any) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "An unexpected error occurred during password reset." }, { status: 500 });
  }
}
