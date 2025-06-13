import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectTodb, db } from "../db";
import { userTable } from "../db/schema/user.sql";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { logger } from "../logger/logger";

export const nextOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_secret!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_secret!,
    }),
    CredentialsProvider({
      name: "credentials", //* optional,
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credential, req) {
        if (!credential?.email || !credential.password) {
          throw new Error("Credentials not found or provided");
        }
        try {
          await connectTodb();
          const findUser = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, credential.email))
            .limit(1);

          if (findUser.length !== 0) {
            throw new Error("User does not exit with the email");
          }

          const comparePassword = await bcrypt.compare(
            credential.password,
            findUser[0].password
          );

          if (!comparePassword) {
            throw new Error("Password doesnot match");
          }

          logger.info("New user created successfully");
          return {
            id: findUser[0].id.toString(),
            email: findUser[0].email,
          };
        } catch (error) {
          logger.error("Invalid server error", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
