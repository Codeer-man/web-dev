import { useState } from "react";

const Service = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isFetched, setIsFetched] = useState(false); // State to track when data is fetched
  const [isDataVisible, setIsDataVisible] = useState(false); // State to toggle data visibility

  // Define the async fetch function
  const fetchData = async () => {
    if (!isFetched) {
      // Fetch data only if not already fetched
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error(`HTTP error!: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON from response
        console.log("Fetched Data:", data); // Log data to the console
        setData(data); // Update state with the fetched data
        setIsFetched(true); // Set state to true to show the fetched data
      } catch (error) {
        setError(error.message); // Store any error in the state
        console.error("Error fetching data:", error);
      }
    }

    // Toggle the visibility of the data
    setIsDataVisible(!isDataVisible);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Fetched Data
      </h1>

      {/* Button to fetch and show/hide data */}
      <button
        onClick={fetchData}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 mb-4 w-full sm:w-auto"
      >
        {isDataVisible
          ? "Hide Data"
          : isFetched
          ? "Show Data"
          : "Fetch and Show Data"}
      </button>

      {error && <p className="text-red-500 text-center">{Error}</p>}

      {/* Show loading message or table */}
      {isFetched && isDataVisible ? (
        <div>
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            Posts (Table View)
          </h2>
          <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Body</th>
              </tr>
            </thead>
            <tbody>
              {data.map((post) => (
                <tr key={post.id} className="border-t hover:bg-gray-100">
                  <td className="py-2 px-4 border">{post.id}</td>
                  <td className="py-2 px-4 border">{post.title}</td>
                  <td className="py-2 px-4 border">{post.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          {!isFetched ? "Loading..." : ""}
        </p>
      )}
    </div>
  );
};

export default Service;
