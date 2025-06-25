import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const UserRole = "user";
const AdminRole = "admin";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    google: {
      clientId: process.env.CIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      mapProfileToUser: (profile) => {
        return {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: UserRole,
        };
      },
    },
  },
  plugins: [
    admin({
      adminRoles: [AdminRole],
      defaultRole: UserRole,
    }),
    nextCookies(),
  ],
});
