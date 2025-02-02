import React from "react";

export default function Home() {
  return (
    <section className="relative bg-gray-800 text-white h-screen flex items-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 text-center z-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg mb-6">
          We offer exceptional products and services to help you succeed.
        </p>
        <buttom className="bg-blue-600 cursor-pointer text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
          Get Started
        </buttom>
      </div>
    </section>
  );
}
