import React, { useEffect, useState } from "react";

export default function RandomImage() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("error while responsing");
        }

        const data = await response.json();

        setProduct(data.products);
      } catch (err) {
        console.error(err, "Invalid server error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const randomImage = Math.floor(Math.random() * product.length);

  return (
    <div>
      <img src={product[randomImage]?.images} alt="title" />{" "}
    </div>
  );
}
