"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Header() {
  const router = useRouter();

  const Navbar = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create",
      href: "/post/create",
    },
  ];

  return (
    <header className="sticky top-0 z-10 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-3xl font-semibold mr-10">
            Logo
          </Link>
          <nav className="flex gap-6 text-sm font-medium">
            {Navbar.map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                className="hover:text-primary transition-colors"
              >
                {nav.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <div></div>
            <div></div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => router.push("/auth")}
                className="px-5 py-2 cursor-pointer"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
