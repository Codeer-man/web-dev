import { nextOptions } from "@/lib/auth/auth";
import NextAuth from "next-auth";

const handler = NextAuth(nextOptions)

export {handler as Post,handler as Get}