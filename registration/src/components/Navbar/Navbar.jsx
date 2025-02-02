import React from "react";
import navlink from "./data";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-screen">
      <nav className="bg-white shadow-md">
        <div className="mx-auto px-7">
          <div className=" flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-blue-400">Logo</h1>
            <ul className="flex space-x-6">
              {navlink.map((links) => (
                <li key={links.id}>
                  <NavLink
                    to={links.path}
                    className={({ isActive }) =>
                      `text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                        isActive ? "font-bold text-blue-600" : ""
                      }`
                    }
                  >
                    {links.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
