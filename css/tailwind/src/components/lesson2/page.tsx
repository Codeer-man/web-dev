import { Outlet } from "react-router-dom";
import Hero from "./hero";

export default function Themeing() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-neutral-900">
      <Hero />

      <Outlet />
    </div>
  );
}
