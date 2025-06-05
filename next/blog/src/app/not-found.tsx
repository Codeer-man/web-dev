"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

export default function PageNotFound() {
  const pathname = usePathname().replace("/", "");

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] gap-4">
      <h1 className="font-bold text-6xl ">404</h1>
      <h2 className="font-semibold text-3xl">Page not found</h2>
      <h3 className=" text-xl font-light text-gray-400 ">
        The page named {pathname} that you are looking for does not exist
      </h3>
      <Button asChild className="py-5">
        <Link href={"/"}>Return to home page</Link>
      </Button>
    </div>
  );
}
