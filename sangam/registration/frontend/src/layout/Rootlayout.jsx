import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer";

export default function Rootlayout() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Footer - Always at the bottom */}
        <Footer />
      </div>
    </div>
  );
}
