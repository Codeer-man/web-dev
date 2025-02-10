import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export default function ContactLayout() {
  const [contactdata, setContactdata] = useState([]);
  const { authorizeToken } = useAuth();

  const fetchdata = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin/contact", {
        method: "GET",
        headers: {
          Authorization: authorizeToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContactdata(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.log("Something went wrong in the URL");
    }
  };
  const deleteContact = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/deleteContact/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizeToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContactdata((prevdata) =>
          prevdata.filter((user) => user._id !== _id)
        );
        // fetchdata();
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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Contact Messages
        </h2>

        {contactdata && contactdata.length > 0 ? (
          <div className="space-y-4">
            {contactdata.map(({ _id, username, email, message }) => (
              <div
                key={_id}
                className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200"
              >
                <div className="text-lg font-semibold text-gray-800">
                  {username}
                </div>
                <div className="text-gray-600">{email}</div>
                <div className="text-gray-500 mt-2">{message}</div>
                <button onClick={() => deleteContact(_id)}>Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Nothing to show</p>
        )}
      </div>
    </div>
  );
}
