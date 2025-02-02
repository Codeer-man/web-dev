import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogIn() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username: login.username,
          password: login.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again."); // Simple error handling
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text" // Use type="text" for username
              value={login.username}
              placeholder="Username"
              name="username"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={login.password}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => navigate("/register")}
          >
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
}
