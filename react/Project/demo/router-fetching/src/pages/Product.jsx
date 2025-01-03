import { useState } from "react";

export default function Product() {
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState();

  const fetchingdata = async () => {
    if (!isFetched) {
      try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
          throw new Error(`HTTPS Error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setIsFetched(true);
        setIsVisible(true); // here is the question
        setData(data.products); // here is the question
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    }
    // setIsVisible(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Product Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isFetched && isVisible ? (
          data.map((product) => (
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
          ))
        ) : (
          <button
            onClick={fetchingdata}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {" "}
            show products
            {/* {isVisible ? "Hide Products" : "Show Products"} */}
          </button>
        )}
      </div>
    </div>
  );
}
