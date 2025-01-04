import { useState } from "react";

export default function LogIn() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [StoreEmail, setStoreEmail] = useState("");
  const [StorePassword, setStorePassword] = useState("");

  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validation = (password) => {
    const PasswordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{6,}$/;
    return PasswordRegex.test(password); // Return the validation result
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validation(Password)) {
      setError(
        "Password must be at least 6 characters long and contain at least one special character."
      );
      return;
    }
    setStoreEmail(Email);
    setStorePassword(Password);
    setError("");
    alert("Registration Successful!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Email === StoreEmail && Password === StorePassword) {
      setIsAuthenticated(true);
      setError("");
      alert("Login Successful");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Authentication
        </h2>
        <form className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Email
            </label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              id="username"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleSubmit}
              type="button"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              type="button"
              className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
