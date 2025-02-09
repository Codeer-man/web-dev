import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export default function UserLayout() {
  const [user, setUser] = useState([]);

  const { authorizeToken } = useAuth();

  const fetchdata = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/user", {
        method: "GET",
        headers: {
          Authorization: authorizeToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        console.log("this is ", data.data);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User List</h1>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {user && user.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.map(({ username, email, phone, role, _id }) => (
              <div
                key={_id}
                className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200"
              >
                <p className="text-lg font-semibold text-gray-800">
                  {username}
                </p>
                <p className="text-gray-600 font-bold text-sm"> _Id: {_id}</p>
                <p className="text-gray-600 font-semibold">email: {email}</p>
                <p className="text-gray-600 font-semibold">Phone: {phone}</p>
                <span className="inline-block px-3 py-1 mt-2 text-sm font-medium rounded-full text-white bg-blue-500">
                  {role}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Cannot find the data</p>
        )}
      </div>
    </div>
  );
}
