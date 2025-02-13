import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaUsers, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../store/auth";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user.role === "admin") {
    return navigate("/");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-900 text-white transition-all duration-300 p-4 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className={`${isSidebarOpen ? "text-xl" : "hidden"} font-bold`}>
            Admin Panel
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white focus:outline-none cursor-pointer"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700"
          >
            <FaTachometerAlt />
            {isSidebarOpen && <span>Home</span>}
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700"
          >
            <FaUsers />
            {isSidebarOpen && <span>Users</span>}
          </Link>
          <Link
            to="/admin/contact"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700"
          >
            <FaEnvelope />
            {isSidebarOpen && <span>Contact</span>}
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </div>

        {/* Page Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
