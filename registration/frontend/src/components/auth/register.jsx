import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

export default function Register() {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState({});

  const {storetokenInLs} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(`Error: ${data.message}`);
        setError({ message: data.message });
        return;
      }

      storetokenInLs(data.token); // createContext
      localStorage.setItem("token", data.token);

      setRegister({ username: "", email: "", phone: "", password: "" });
      navigate("/login");

      toast.success("");
    } catch (error) {
      console.error("something went wrong", error);
      setError({ message: "Network error. Please try again later." });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegister((prevData) => ({
      ...prevData,
      [name]: value,
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
          {error.message && <div className="text-red-600">{error.message}</div>}
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
          {error.message && <div className="text-red-600">{error.message}</div>}
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={register.phone}
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.message && <div className="text-red-600">{error.message}</div>}
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
          {error.message && <div className="text-red-600">{error.message}</div>}
        </div>

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
