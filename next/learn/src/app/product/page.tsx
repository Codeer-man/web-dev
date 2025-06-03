import Link from "next/link";
import React from "react";

export default function page() {
  const product = [
    { id: 1, product: "mango", price: 23 },
    { id: 2, product: "apple", price: 324 },
    { id: 3, product: "shau", price: 34 },
  ];

  return (
    <div>
      <div className="grid  gap-4">
        {product.map((data) => (
          <div key={data.id}>
            <div>
              product: {data.product} <br />
              price: {data.price} <br />
              <Link href={`/product/${data.id}`}>view Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
