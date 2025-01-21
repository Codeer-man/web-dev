import React, { useEffect, useState } from "react";

export default function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [error, setError] = useState(null);

  const fetchProducts = async (skipValue) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=4&skip=${skipValue}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();

      setProducts((prevProducts) =>
        skipValue === 0 ? data.products : [...prevProducts, ...data.products]
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(skip);
  }, [skip]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + 4);
  };

  const isLoadMoreDisabled = products.length >= 20;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Products</h1>

      {error && (
        <div className="text-center text-red-600 font-semibold">
          Error: {error}
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center text-gray-600">
            No products available.
          </div>
        )
      )}

      {loading && (
        <p className="text-center text-lg font-semibold">Loading ...</p>
      )}

      {!loading && !isLoadMoreDisabled && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {isLoadMoreDisabled && (
        <div className="text-center text-gray-600 mt-4">
          No more products to load.
        </div>
      )}
    </div>
  );
}
