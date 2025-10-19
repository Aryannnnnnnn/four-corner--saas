import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Define public routes (pages that don't require authentication)
  const publicRoutes = [
    "/",
    "/about",
    "/login",
    "/register",
    "/forgot-password",
    "/contact",
    "/listings",
    "/home-financing",
    "/success-stories",
    "/analyze-your-property",
    "/analysis",
    "/analyze",
    "/search",
  ];

  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some(route => {
    if (route === "/") {
      return nextUrl.pathname === "/";
    }
    return nextUrl.pathname.startsWith(route);
  });

  // Redirect to login if accessing protected route without auth
  if (!isPublicRoute && !isLoggedIn) {
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
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|luxury.jpg|hero-image-logotype.png|logoo.png).*)",
  ],
};
