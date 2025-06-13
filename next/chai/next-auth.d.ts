import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface session {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}
