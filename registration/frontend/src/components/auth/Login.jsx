import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

export default function LogIn() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({});
  const { storetokenInLs } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Fixed typo
        },
        body: JSON.stringify(login),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("HTTP error:", data.error);
        setError({ message: data?.message || "something went wrong" });
        return;
      }
      storetokenInLs(data.token); // OR

      setLogin({ username: "", password: "" });
      navigate("/");

      // toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      setError({ message: "Network error. Please try again" });
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
              type="text"
              value={login.username}
              placeholder="Username"
              name="username"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error.message && (
              <div className="text-red-600">{error.message}</div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={login.password}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {error.message && (
              <div className="text-red-600">{error.message}</div>
            )}
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
