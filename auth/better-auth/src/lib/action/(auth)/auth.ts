"use server";

import { auth } from "@/lib/auth";
import { loginForm } from "@/types/auth";

export async function login({ email, password }: loginForm) {
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return {
      success: false,
      message: "Email and password are required",
    };
  }
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });

    if (response.ok) {
      return {
        success: true,
        message: "Logged in successfully",
      };
    }
  } catch (error) {
    console.error(error);

    return;
  }
}
