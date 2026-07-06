import React, { useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 90000 },
  { id: 2, name: "Phone", category: "Electronics", price: 45000 },
  { id: 3, name: "Shoes", category: "Fashion", price: 3500 },
  { id: 4, name: "Watch", category: "Fashion", price: 5000 },
  { id: 5, name: "Book", category: "Books", price: 700 },
];

type selectCategory = "All" | "Electronics" | "Fashion" | "Books";
type sortByPrice = "high-to-low" | "low-to-high";

export default function Catelogy() {
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState<selectCategory>("All");
  const [sort, setSort] = useState<sortByPrice | "">("");

  const filterProduct = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      selectCategory === "All" || product.category === selectCategory;
    return matchSearch && matchCategory;
  });

  let filtered = [...filterProduct];

  if (sort === "high-to-low") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "low-to-high") {
    filtered.sort((a, b) => a.price - b.price);
  }
  console.log(filtered);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        id="product-category"
        value={selectCategory}
        onChange={(e) => setSelectCategory(e.target.value as selectCategory)}
      >
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Books">Books</option>
      </select>

      <select
        id="soty-prrice"
        value={sort}
        onChange={(e) => setSort(e.target.value as sortByPrice)}
      >
        <option value="">Default</option>
        <option value="high-to-low">High to low</option>
        <option value="low-to-high">low to high</option>
      </select>

      <div>
        {filtered.length > 0 ? (
          <div>
            {filtered.map((p) => (
              <div key={p.id}>
                <h4>Title: {p.name}</h4>
                <p>Category: {p.category} </p>
                <p>Price : {p.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No product with that name</p>
        )}
      </div>
    </div>
  );
}
