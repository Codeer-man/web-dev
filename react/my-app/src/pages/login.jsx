import { useState } from "react";

const Login = () => {
  // State variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State for storing registered email and password
  const [storedEmail, setStoredEmail] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  // Function to validate password (at least 6 characters and one special character)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  // Handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters long and include at least one special character."
      );
      return;
    }

    // Check if the credentials match the registered ones
    if (email === storedEmail && password === storedPassword) {
      setError("");
      setIsAuthenticated(true);
      alert("Login Successful");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  // Handle user registration (store email and password in state)
  const handleRegister = () => {
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters long and include at least one special character."
      );
      return;
    }

    // Store email and password in state
    setStoredEmail(email);
    setStoredPassword(password);

    setError("");
    alert("Registration Successful. You can now log in.");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        {isAuthenticated ? "Welcome Back!" : "Login Page"}
      </h1>

      {/* Form to login */}
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "10px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Password input */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "10px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Error message */}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "16px",
            borderRadius: "4px",
            border: "none",
            marginTop: "10px",
          }}
        >
          Login
        </button>
      </form>

      {/* Register Button */}
      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: "16px",
          borderRadius: "4px",
          border: "none",
          marginTop: "10px",
        }}
      >
        Register
      </button>

      {/* Displaying Registered Data after Successful Login */}
      {isAuthenticated && storedEmail && storedPassword && (
        <div style={{ marginTop: "20px" }}>
          <h2>Registered User</h2>
          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{storedEmail}</td>
                <td>
                  <input
                    type="password"
                    value={storedPassword}
                    disabled
                    style={{
                      width: "100%",
                      padding: "8px",
                      textAlign: "center",
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Login;
