import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/auth.jsx";
import { ToastContainer } from "react-toastify";
import "react"

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <App />
      <ToastContainer />
    </StrictMode>
  </AuthProvider>
);
