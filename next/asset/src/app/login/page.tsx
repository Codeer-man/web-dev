import LoginButton from "@/components/login/login-Btn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { Link2, Package } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md shadow">
        <CardHeader className="text-center">
          <div className="mx-auto p-2 rounded-full bg bg-teal-500 w-fit">
            <Package className="h-6 w-5 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-teal-500">
            Welcome Vack
          </CardTitle>
          <CardDescription className="text-slate-600">
            Sign In To Your Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginButton />
        </CardContent>
        <CardFooter className="flex justify-center ">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-teal-600 cursor-pointer"
          >
            {" "}
            Go To Home{" "}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
