import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorHandling() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 Page not found</h1>
      <button onClick={() => navigate("/")}>Go to home page</button>
    </div>
  );
}
