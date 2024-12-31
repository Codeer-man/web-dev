import { useState } from "react";

export default function auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [storeEmail, setStoredEmail] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validation = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventdefault();

    if (!validation(password)) {
      setError(
        "Password must be at least 6 characters long and contain at least one special character"
      );
      return;
    }

    if (email === storeEmail && password === storePassword) {
      setIsAuthenticated(true);
      setError("");
      alert("sucessfully submitted");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleRegister = (e) => {
    e.preventdefault();
    if (!validation(password)) {
      setError(
        "Password must be at least 6 characters long and contain at least one special character"
      );
      return;
    }
    setError("");
    setStoredEmail(email);
    setStoredPassword(password);
  };

  return (
    <div
      style={{
        maxWidth: "300px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>
      <form>
        {/* Email Input */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <button
            type="button"
            onSubmit={handleRegister}
            style={{
              width: "48%",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            type="button"
            onSubmit={handleRegister}
            style={{
              width: "48%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
