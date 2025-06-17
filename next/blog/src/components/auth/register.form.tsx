"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

const registerSchema = z
  .object({
    userName: z
      .string()
      .min(3, "UserName must be over 3 character long")
      .max(25, "UserName must be below 25 character"),
    email: z
      .string()
      .email("Please enter a valid email")
      .max(30, "Please enter below 30 words "),
    password: z
      .string()
      .min(8, "Password must contain at least 8 character(s)")
      .max(30, "Passowrd must not excelude 30 character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password does not match to Password",
    path: ["confirmPassword"],
  });

type registerFormValue = z.infer<typeof registerSchema>;

interface registerFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: registerFormProps) {
  const [loading, setLoading] = useState(false);
  const registerForm = useForm<registerFormValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      password: "",
      email: "",
      confirmPassword: "",
    },
  });

  async function onsubmit(
    values: registerFormValue
    // e: React.FormEvent<HTMLFormElement>
  ) {
    console.log(values);

    setLoading(true);
    try {
      const { error } = await signUp.email({
        name: values.userName,
        email: values.email,
        password: values.password,
      });
      if (error) {
        toast("failed to create account! Please try again");
        setLoading(false);
        return;
      }
      toast("Your account has been created successfullt,");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onsubmit)}
        className="space-y-4"
      >
        <FormField
          control={registerForm.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input placeholder="Enter your userName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirm password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Confirm Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full disabled:bg-gray-500 cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Created Account"}
        </Button>
      </form>
    </Form>
  );
}
