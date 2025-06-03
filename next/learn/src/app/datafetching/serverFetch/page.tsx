import React from "react";

interface Products {
  id: number;
  title: string;
  price: string;
  category: string;
}

interface ProductResponse {
  products: Products[];
  total: number;
}

async function getProducts(): Promise<ProductResponse> {
  const response = await fetch("https://dummyjson.com/products", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return await response.json();
}

export default async function ServerSideFetch() {
  const product = await getProducts();
  console.log(product);

  return (
    <div>
      <h1>Server side data fetching</h1>
      <h1>Here are the Products</h1>
      <div>
        {product.products.map((data) => (
          <div key={data.id}>
            <h2>{data.title}</h2>
            <p>Category: {data.category}</p>
            <p>Price: ${data.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
