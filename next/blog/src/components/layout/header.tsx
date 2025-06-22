"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth-client";
import UserMenu from "../auth/userMenu";
import ThemeToggle from "@/Theme-provider/theme-toggle";

export default function Header() {
  const { data: session, isPending } = useSession();
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
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-3xl text-fuchsia-200 font-semibold mr-10"
          >
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
          <div className="hidden md:block">{/* search  */}</div>

          <ThemeToggle />
          <div className="flex items-center gap-2">
            {isPending ? null : session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <Button
                onClick={() => router.push("/auth")}
                className="px-5 bg-fuchsia-200 text-black py-2 cursor-pointer"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
