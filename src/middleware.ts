import { decrypt, PayloadType } from "@/lib/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const auth_token = request.cookies.get("auth_token");
  const { pathname } = request.nextUrl;

  if (pathname === "/logout") {
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.cookies.delete("auth_token");
    response.cookies.getAll();
    return response;
  }

  if (!auth_token || pathname === "/") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const payload: PayloadType = await decrypt(auth_token.value);
  const backoffice = payload?.role === "admin";
  const client = payload?.role === "client";

  if (pathname === "/launcher") {
    if (backoffice) {
      return NextResponse.redirect(new URL("/backoffice", request.url));
    }
    if (client) {
      return NextResponse.redirect(new URL("/app", request.url));
    }
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.cookies.delete("auth_token");
    response.cookies.getAll();
    return response;
  }

  if (backoffice && pathname.includes("backoffice")) {
    return NextResponse.next();
  }

  if (client && pathname.includes("app")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|api|auth|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
