import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathaname = request.nextUrl.pathname;
  const session = getSessionCookie(request);

  if (session && pathaname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log(session);
}
