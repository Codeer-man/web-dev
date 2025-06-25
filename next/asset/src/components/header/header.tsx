"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { LogOut, Package } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Header() {
  const pathname = usePathname();
  const isLoginPage: boolean = pathname === "/login";
  const router = useRouter();
  if (isLoginPage) return null;

  const { data: session, isPending } = useSession();
  const isAdmin = session?.user.role === "admin";
  const user = session?.user;

  async function handleLogout() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }
  console.log(session);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white">
      <div className=" container flex h-16 items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-teal-500">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className=" font-bold text-xl text-teal-600">
              Asset Platform
            </span>
          </Link>
          <nav className=" ml-6 space-x-10 items-center font-semibold text-lg">
            <Link
              className=" text-sm font-medium hover:text-teal-600"
              href={"/gallery"}
            >
              Gallery
            </Link>
            {!isPending && user && !isAdmin && (
              <>
                <Link
                  className=" text-sm font-medium hover:text-teal-600"
                  href={"/dashboard/assets"}
                >
                  Assets
                </Link>
                <Link
                  className=" text-sm font-medium hover:text-teal-600"
                  href={"/dashboard/purchase"}
                >
                  My Purchases
                </Link>
              </>
            )}

            {!isPending && user && isAdmin && (
              <>
                <Link
                  className=" text-sm font-medium hover:text-teal-600"
                  href={"/admin/assets-approval"}
                >
                  Assets Approval
                </Link>
                <Link
                  className=" text-sm font-medium hover:text-teal-600"
                  href={"/admin/setting"}
                >
                  setting
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className=" flex items-center gap-6">
          {isPending ? null : user ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className=" relative h-8 w-8 rounded-full"
                  >
                    <Avatar className=" w-8 border border-slate-400">
                      <AvatarFallback className="bg-teal-500 text-white">
                        {" "}
                        {user?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div className=" flex flex-col space-y-2 ">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className=" cursor-pointer text-red-500"
                  >
                    <LogOut className="mr-2 w-4 h-2" />
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href={"/login"}>
              <Button className="bg-teal-500 hover:bg-teal-600">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
