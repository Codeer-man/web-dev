"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "must be image format" })
    .max(20, { message: "Not over 20 character" })
    .min(3, { message: "Above 3 wrods is req" }),
  password: z
    .string()
    .max(20, { message: "Not over 20 character" })
    .min(8, { message: "Not over 20 character" }),
});

type loginFormValue = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<loginFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "example@gmail.com",
      password: "checkhere123",
    },
  });

  async function onSubmit(data: loginFormValue) {
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
        callbackURL: "/",
      });
      if (error) {
        console.log(error);
        setError("root", {
          message: "invalid crednetials",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      setError("root", {
        message: error as string,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email")}
        type="text"
        placeholder="enter your email"
      />
      {errors.email?.message}
      <input
        {...register("password")}
        type="password"
        placeholder="enter your password"
      />
      {errors.password?.message}
      <button type="submit">Submit</button>
      {errors.root?.message}
    </form>
  );
}
