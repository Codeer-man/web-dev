"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { Button } from "../ui/button";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be 8 characters long"),
});

type loginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const loginform = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onsubmit(value: loginFormValues) {
    setLoading(true);

    try {
      console.log(value);
    } catch (error) {}
  }

  return (
    <Form {...loginform}>
      <form className="space-y-4" onSubmit={loginform.handleSubmit(onsubmit)}>
        <FormField
          control={loginform.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Email" {...field} />
              </FormControl>
              <FormMessage/>

            </FormItem>
          )}
        />
        <FormField
          control={loginform.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full disabled:bg-gray-50 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
