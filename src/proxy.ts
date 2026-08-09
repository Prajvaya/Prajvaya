import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: any) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isAdminPage = pathname.startsWith("/admin");

  if (isDashboard || isAdminPage) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Decode JWT payload manually to be fully compatible with Next.js Edge Runtime
      const parts = session.split(".");
      if (parts.length !== 3) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("session");
        return response;
      }

      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const padLen = (4 - (base64.length % 4)) % 4;
      const padded = base64 + "=".repeat(padLen);
      
      const payloadJson = atob(padded);
      const payload = JSON.parse(payloadJson);

      // Verify expiration (exp is in seconds, Date.now() in milliseconds)
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("session");
        return response;
      }

      // Check role authorization for admin area
      if (isAdminPage && payload.role !== "Admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (err) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("session");
      return response;
    }
  }

  // Redirect authenticated sessions away from guest-only auth pages
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  if (isAuthPage && session) {
    try {
      const parts = session.split(".");
      if (parts.length === 3) {
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const padLen = (4 - (base64.length % 4)) % 4;
        const padded = base64 + "=".repeat(padLen);
        const payloadJson = atob(padded);
        const payload = JSON.parse(payloadJson);

        if (payload.exp && Date.now() < payload.exp * 1000) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    } catch (err) {
      // If token is invalid, let them browse the auth pages
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
