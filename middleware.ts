import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const user = req.cookies.get("jamal_user");

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // allow login page
  if (req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // protect admin
  if (isAdminRoute && !user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};