import { useState, useEffect } from "react";

export default function Product() {
  const [isFetched, setIsFetched] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const fetchingdata = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("https://dummyjson.com/products");

      if (!response.ok) {
        throw new Error(`HTTPS Error: ${response.status}`);
      }

      const data = await response.json();
      setData(data.products); // Update the state with the fetched products
      setIsFetched(true); // Mark as fetched
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); g
    }
  };

  useEffect(() => {
    fetchingdata();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Product Page</h1>

      {loading && (
        <p className="text-center text-gray-600">Loading products...</p>
      )}

      {error && <p className="text-red-500 text-center mb-6">Error: {error}</p>}

      {!loading && !error && isFetched && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="mt-2 text-green-600 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
