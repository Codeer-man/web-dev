import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Corrected import statement for axios

export default function Register() {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    username: "",
    email: "",
    phoneNum: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    phoneNum: "",
    password: "",
    general: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submitting (if validation is uncommented)
    // if (!validation()) {
    //   return;
    // }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register", 
        {
          username: register.username,
          email: register.email,
          phone: register.phoneNum,
          password: register.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status); // Log the status code for debugging
      console.log("Response data:", response.data); // Log the response data

      navigate("/login");
      // Clear form on success
      setRegister({
        username: "",
        email: "",
        phoneNum: "",
        password: "",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      setError({
        general:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegister((prevData) => ({
      ...prevData,
      [name]: name === "phoneNum" ? value.replace(/\D/g, "") : value, // Only allow digits for phone number
    }));
  };

  return (
    <div className="max-w-md overflow-hidden mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={register.username}
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.username && (
            <div className="text-red-600 mt-1">{error.username}</div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={register.email}
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.email && (
            <div className="text-red-600 mt-1">{error.email}</div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="tel"
            value={register.phoneNum}
            name="phoneNum"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.phoneNum && (
            <div className="text-red-600 mt-1">{error.phoneNum}</div>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            value={register.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.password && (
            <div className="text-red-600 mt-1">{error.password}</div>
          )}
        </div>

        {error.general && (
          <div className="text-red-600 mt-2 text-center">{error.general}</div>
        )}

        <button
          type="submit"
          className="w-full cursor-pointer py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>

      <div className="mt-4 text-center">
        <span
          className="cursor-pointer text-blue-700 hover:underline"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </span>
      </div>
    </div>
  );
}
