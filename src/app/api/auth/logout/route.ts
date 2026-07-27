import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Successfully logged out." });
    response.cookies.set({
      name: "session",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Clears the cookie instantly
    });
    return response;
  } catch (err) {
    return NextResponse.json({ error: "Logout failed." }, { status: 500 });
  }
}
