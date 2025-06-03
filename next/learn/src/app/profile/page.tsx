"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function page() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  console.log(router, "router");
  console.log(pathName, "pathname");
  console.log(searchParams, "search params");

  // searchParams methodss
  searchParams.get("name");
  searchParams.getAll("name");
  searchParams.has("name");
  //* keys entries foreach etc

  function NavigateToHome() {
    router.push("/");
  }

  return (
    <div>
      <div>
        <h1>Proilfe page</h1>
        <button onClick={NavigateToHome}>Go to home page</button>
      </div>
    </div>
  );
}
