import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function EditLayout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [update, setUpdate] = useState({
    username: "",
    role: "",
  });
  const { authorizeToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/admin/updateUser/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: authorizeToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User updated successfully:", data);
        navigate("/admin"); // Navigate to the admin page after successful update
      } else {
        console.error("error in the link");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={update.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="text"
          name="role"
          value={update.role}
          onChange={handleChange}
          placeholder="Role"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
