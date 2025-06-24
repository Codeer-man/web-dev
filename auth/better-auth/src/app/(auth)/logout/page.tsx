import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export default async function POST() {
  await auth.api.signOut({
    headers: await headers(),
  });

  return NextResponse.json({ success: true });
}
