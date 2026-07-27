import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ user: null });
    }

    const payload = verifyToken(sessionCookie);
    if (!payload) {
      return NextResponse.json({ user: null });
    }

    const user = await db.users.findUnique({ id: payload.userId });
    if (!user || user.status === "Disabled") {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        registrationDate: user.registrationDate,
        lastLogin: user.lastLogin,
      },
    });
  } catch (err) {
    return NextResponse.json({ user: null });
  }
}

// Support updating profiles (Full Name, Password) inside this session route via POST/PUT
export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const payload = verifyToken(sessionCookie);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { name, currentPassword, newPassword } = await request.json();

    const user = await db.users.findUnique({ id: payload.userId });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const updates: Partial<typeof user> = {};

    if (name) {
      if (name.trim().length === 0) {
        return NextResponse.json({ error: "Name cannot be empty." }, { status: 400 });
      }
      updates.name = name;
    }

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required to change password." }, { status: 400 });
      }
      
      const bcrypt = await import("bcryptjs");
      const match = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!match) {
        return NextResponse.json({ error: "Incorrect current password." }, { status: 400 });
      }

      if (newPassword.length < 8 || !/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
        return NextResponse.json(
          { error: "New password must be at least 8 characters long and contain both letters and numbers." },
          { status: 400 }
        );
      }

      updates.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updates).length > 0) {
      await db.users.update(user.id, updates);
    }

    return NextResponse.json({
      message: "Profile updated successfully.",
      user: {
        id: user.id,
        name: updates.name || user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}
