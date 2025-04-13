import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";
import navlink from "./data";

export default function Navbar() {
  const { isloggedIn } = useAuth(); 

  const filteredLinks = navlink.filter((link) => {
    if (isloggedIn && link.label === "Login") return false; 
    if (!isloggedIn && link.label === "Logout") return false; 
    return true;
  });

  return (
    <div className="w-screen">
      <nav className="bg-white shadow-md">
        <div className="mx-auto px-7">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-blue-400">Logo</h1>
            <ul className="flex space-x-6">
              {filteredLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                        isActive ? "font-bold text-blue-600" : ""
                      }`
                    }
                  >
                    {link.label}
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
