"use client";
import { usePathname, useRouter } from "next/navigation";
export default function NotfoundPage() {
  const router = useRouter();
  const pathName = usePathname().replace("/", "");

  function HomePage() {
    router.push("/");
  }

  return (
    <div>
      The page name {pathName} you are looking for doesnot exists <br />
      <button className="bg-white text-black rounded-sm" onClick={HomePage}>
        Go to home page
      </button>
    </div>
  );
}
