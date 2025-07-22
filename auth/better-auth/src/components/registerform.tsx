"use client";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Write in proper format" }),
    name: z.string().min(3, { message: "Must be 3" }),
    password: z.string().min(8, { message: "Must be 8" }),
    confirmPassword: z.string().min(8, { message: "Must be 8" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password not matched to confirm password",
    path: ["confirmPassword"], //tells zod where to attact the error
  });

type registerFormValue = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<registerFormValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "manandart",
      email: "example@gmail.com",
      password: "checkhere123",
      confirmPassword: "checkhere123",
    },
  });

  async function onSubmit(data: registerFormValue) {
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          message: "confirm password does not match to password",
        });
      }
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/login",
      });

      if (error) {
        setError("root", {
          message: "Invalid credntials",
        });
        return;
      }

      const enableTwoFactor = async () => {
        const t2f = await authClient.twoFactor.enable({
          password: data.password,
        });
      };

      router.push("/login");
      console.log("New user created");
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
        {...register("name")}
        type="text"
        placeholder="enter your username"
      />
      {errors.name?.message}
      <input
        {...register("password")}
        type="text"
        placeholder="enter your password"
      />
      {errors.password?.message}
      <input
        {...register("confirmPassword")}
        type="text"
        placeholder="enter your confirmpasswrod"
      />
      {errors.confirmPassword?.message}
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
      {errors.root?.message}
    </form>
  );
}
