import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [twoFactorClient()],
});

export const { getSession, useSession, signIn, signOut } = authClient;
