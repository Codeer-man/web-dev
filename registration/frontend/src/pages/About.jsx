import React from "react";
import { useAuth } from "../store/auth";

export default function About() {
  const { user } = useAuth();

  return (
    <div>
      {user.username},{user.email},{user._id}
    </div>
  );
}
