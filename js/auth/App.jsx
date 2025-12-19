import { useState } from "react";

export default function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ email: "", password: "" });
    setError("");
    setSubmittedData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (isRegister) {
      console.log("User registered:", formData);
      alert("Registration successful!");
    } else {
      console.log("User logged in:", formData);
      alert("Login successful!");
    }

    setError("");
    setSubmittedData(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isRegister ? "Register" : "Login"}
      </h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {!submittedData ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(true)}
                className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              {isRegister ? "Register" : "Login"}
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="px-4 py-2 text-indigo-600 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              Switch to {isRegister ? "Login" : "Register"}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="text-lg font-bold mt-4">Submitted Data</h3>
          <p className="mt-2">
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p className="mt-1">
            <strong>Password:</strong> {submittedData.password}
          </p>
          <button
            onClick={() => {
              setSubmittedData(null);
              setError("");
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
