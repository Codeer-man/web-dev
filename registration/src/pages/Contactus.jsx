import { useState } from "react";

export default function Contactus() {
  const [formdata, setFomrData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [SubmittedData, setSubmittedData] = useState([]);
  const [errors, setError] = useState({});

  const validation = () => {
    let Fileerror = {};

    if (!formdata.username) {
      Fileerror.username = "Username is required";
    } else if (formdata.username.length < 3) {
      Fileerror.username = "Username must be at least 3 characters long";
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formdata.email) {
      Fileerror.email = "Email is required";
    } else if (!emailPattern.test(formdata.email)) {
      Fileerror.email = "Please enter a valid email address";
    }

    if (!formdata.message) {
      Fileerror.message = "Message is required";
    } else if (formdata.message.length < 10) {
      Fileerror.message = "There must be at least 10 characters";
    }

    setError(Fileerror);
    return Object.keys(Fileerror).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) return;

    setSubmittedData((prevdata) => [...prevdata, formdata]);
    console.log(formdata);

    setFomrData({ username: "", email: "", message: "" });
    setError({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFomrData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-lg w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              value={formdata.username}
              placeholder="Username"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.username && (
              <div className="text-red-600">{errors.username}</div>
            )}
            <input
              type="email"
              name="email"
              value={formdata.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && <div className="text-red-600">{errors.email}</div>}
            <textarea
              name="message"
              value={formdata.message}
              placeholder="Message"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.message && (
              <div className="text-red-600">{errors.message}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none cursor-pointer"
            >
              Submit
            </button>
          </form>

          {/*show data */}
          <div className="mt-8">
            {SubmittedData.length > 0 ? (
              SubmittedData.map((data, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <h3 className="text-xl font-semibold">Submitted Data</h3>
                  <div>
                    <strong>Username:</strong> {data.username}
                  </div>
                  <div>
                    <strong>Email:</strong> {data.email}
                  </div>
                  <div>
                    <strong>Message:</strong> {data.message}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-600">No data submitted yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
