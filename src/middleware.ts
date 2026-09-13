import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/auth/jwt";

export const ADMIN_COOKIE_NAME = "uxi_admin_token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginRoute = pathname === "/admin/login";
  const isLoginApiRoute = pathname === "/api/admin/auth/login";

  // Extract token from cookie or Authorization header
  const cookieToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  const token = cookieToken || bearerToken;
  const isValidAdmin = token ? await verifyAdminToken(token) : null;

  // 1. If accessing the login page while already authenticated, redirect to /admin
  if (isLoginRoute) {
    if (isValidAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // 2. Allow login API endpoint without token
  if (isLoginApiRoute) {
    return NextResponse.next();
  }

  // 3. Protect API routes: /api/admin/*
  if (pathname.startsWith("/api/admin")) {
    if (!isValidAdmin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please authenticate as admin." },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // 4. Protect UI routes: /admin/*
  if (pathname.startsWith("/admin")) {
    if (!isValidAdmin) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
