import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

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
        toast.success("The data has been edited");
        navigate("/admin/users");
      } else {
        console.error("error in the link");
        toast.error("username already exits");
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
        <select name="role" value={update.role} onChange={handleChange}>
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="user">user</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
