import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized. Session cookie missing." }, { status: 401 });
    }

    const payload = verifyToken(sessionCookie);
    if (!payload || payload.role !== "Admin") {
      return NextResponse.json({ error: "Forbidden. Admin clearance required." }, { status: 403 });
    }

    const users = await db.users.findMany();
    const subscribers = await db.subscribers.findMany();

    // Remove hashed passwords before returning
    const safeUsers = users.map(({ passwordHash, ...user }) => user);

    // Registration stats over time (e.g. counts per date)
    const statsByDate: { [key: string]: number } = {};
    users.forEach((u) => {
      const date = u.registrationDate.split("T")[0]; // YYYY-MM-DD
      statsByDate[date] = (statsByDate[date] || 0) + 1;
    });

    const statistics = {
      totalUsers: users.length,
      verifiedUsers: users.filter((u) => u.emailVerified).length,
      unverifiedUsers: users.filter((u) => !u.emailVerified).length,
      disabledUsers: users.filter((u) => u.status === "Disabled").length,
      totalSubscribers: subscribers.length,
      verifiedSubscribers: subscribers.filter((s) => s.verified).length,
      registrationsTimeline: Object.keys(statsByDate).map((date) => ({
        date,
        count: statsByDate[date],
      })),
    };

    return NextResponse.json({
      users: safeUsers,
      subscribers,
      statistics,
    });
  } catch (err: any) {
    console.error("Admin data route error:", err);
    return NextResponse.json({ error: "Failed to compile admin registry data." }, { status: 500 });
  }
}

// Admin can toggle account status (Active / Disabled) or change roles
export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const payload = verifyToken(sessionCookie);
    if (!payload || payload.role !== "Admin") {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const { targetUserId, status, role } = await request.json();

    if (!targetUserId) {
      return NextResponse.json({ error: "Target user ID is required." }, { status: 400 });
    }

    const user = await db.users.findUnique({ id: targetUserId });
    if (!user) {
      return NextResponse.json({ error: "Target user not found." }, { status: 404 });
    }

    // Prevent Admin from disabling their own account or changing their own role
    if (user.id === payload.userId) {
      return NextResponse.json({ error: "You cannot disable your own admin account or edit your own role." }, { status: 400 });
    }

    const updates: Partial<typeof user> = {};
    if (status !== undefined) updates.status = status;
    if (role !== undefined) updates.role = role;

    await db.users.update(user.id, updates);

    return NextResponse.json({ message: "User status updated successfully." });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to update user status." }, { status: 500 });
  }
}
