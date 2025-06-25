"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export default function LoginButton() {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <Button
      onClick={handleLogin}
      className="w-full bg-teal-500 hover:bg-teal-600 text-white py-6 text-base font-md"
    >
      <span>Sign In with Google</span>
    </Button>
  );
}
