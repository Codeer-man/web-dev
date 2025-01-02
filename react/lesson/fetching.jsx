import React, { useState } from "react";

export default function fetching() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isFetched, setIsfetched] = useState(false);
  const [isVisible, setIsVisble] = useState(false);

  const fetchingData = async () => {
    if (!isFetched) {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error(`HTTPS Error: ${response.status}`);
        }
        const data = awaitresponse.json();
        console.log("Fetched Data:", data);
        setData(data);
        setIsfetched(true);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
    setIsVisble(!isVisible);
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Fetched Data
      </h1>

      <button
        onClick={fetchingData}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 mb-4 w-full sm:w-auto"
      >
        {isVisible
          ? "hide table"
          : isFetched
          ? "show table"
          : "data is fetching"}
      </button>
      {error && <p className="text-red-500 text-center">{Error}</p>}

      {isVisible && isFetched ? (
        data.map((post) => (
            <div key={post.id}>
                <div>{post.id}</div>
                <div>{post.title}</div>
                <div>{post.body}</div>
            </div>
        ))
      ) : (
        <p className="text-center text-gray-600">
          {!isFetched ? "Loading..." : ""}
        </p>
      )}
    </div>
  );
}
