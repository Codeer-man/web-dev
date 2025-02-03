import React from "react";
import { NavLink } from "react-router-dom";

export default function ErrorHandling() {
  return (
    <div>
      <h1>404 Page not found</h1>
      <NavLink to={"/"}>Go to home page</NavLink>
    </div>
  );
}
