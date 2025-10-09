import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Define protected routes (including root path)
  const isProtectedRoute =
    nextUrl.pathname === "/" ||
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/analysis") ||
    nextUrl.pathname.startsWith("/library") ||
    nextUrl.pathname.startsWith("/settings") ||
    nextUrl.pathname.startsWith("/profile");

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if logged in and trying to access login or register
  if (
    isLoggedIn &&
    (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/analysis/:path*",
    "/library/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
