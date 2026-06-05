import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that require authentication
const protectedRoutes = ["/admin", "/dashboard", "/analytics", "/users", "/courses", "/books", "/chapters", "/topics", "/ai-ingestion", "/roles", "/settings"];

// Auth routes that should redirect if already logged in
const authRoutes = ["/login", "/signup", "/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isAdmin = token?.role === 'admin';

  // Protect admin routes - require admin role
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!isAdmin) {
      // Non-admin users trying to access admin routes get redirected to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Redirect authenticated admins away from auth pages
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated && isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
