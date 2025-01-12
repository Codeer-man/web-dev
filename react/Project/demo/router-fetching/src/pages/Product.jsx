import { useState, useEffect, useRef } from "react";
import ShoppingCart from "./ShoppingCart";

export default function Product() {
  const [isFetched, setIsFetched] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const horizontalScrolllbar = useRef(null);

  const scrollLeft = () => {
    if (horizontalScrolllbar.current) {
      horizontalScrolllbar.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (horizontalScrolllbar.current) {
      horizontalScrolllbar.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

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
      setLoading(false);
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
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 z-10"
          >
            &#8592;
          </button>

          {/* Horizontal Scrollable Product List */}
          <div
            ref={horizontalScrolllbar}
            className="flex overflow-x-auto scroll-smooth gap-4 p-4 border border-gray-300 rounded-lg"
          >
            {data.map((product) => (
              <div
                key={product.id}
                className="min-w-[250px] border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="mt-2 text-green-600 font-bold">
                  ${product.price}
                </p>
                <div>
                  {" "}
                  <ShoppingCart />
                </div>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 z-10"
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
}
