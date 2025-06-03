import Link from "next/link";
import React from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <nav>
          <Link href={"/home"}>Home</Link>
          <Link href={"/about"}>about</Link>
          <Link href={"/contact"}>contact</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
