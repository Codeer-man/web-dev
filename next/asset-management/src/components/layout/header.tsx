"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();

  const isLogin: boolean = pathname === "/login";

  if (isLogin) {
    return null;
  }

  return <div>Header</div>;
}
