import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        const isPublic =
          pathname === "/" ||
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/api/video") ||
          pathname === "/auth/login" ||
          pathname === "/auth/register";

        if (isPublic) return true;

        return !!token;
      },
    },
  }
);
