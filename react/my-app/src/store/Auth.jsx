import React, { useState } from "react";

const users = {
  admin: { username: "admin", password: "admin123", role: "admin" },
  user: { username: "user", password: "user123", role: "user" },
};

function Auth() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(sessionStorage.getItem("role") || "");

  const login = () => {
    if (
      users.admin.username === userName &&
      users.admin.password === password
    ) {
      sessionStorage.setItem("role", "admin");
      setRole("admin");
    } else if (
      users.user.username === userName &&
      users.user.password === password
    ) {
      sessionStorage.setItem("role", "user");
      setRole("user");
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("role");
    setRole("");
    setPassword("");
    setUserName("");
  };

  const displayPage = () => {
    if (role === "admin") {
      return (
        <div>
          <h1>Admin Page</h1>
          <p>Welcome to the admin page</p>
          <button onClick={logout}>Logout</button>
        </div>
      );
    } else if (role === "user") {
      return (
        <div>
          <h1>User Page</h1>
          <p>Welcome to the user page</p>
          <button onClick={logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Login Page</h1>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={login}>Login</button>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Welcome to the shop</h1>
      {displayPage()}
    </div>
  );
}

export default Auth;
