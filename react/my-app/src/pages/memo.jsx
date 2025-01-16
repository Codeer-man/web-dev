import { useState, useMemo } from "react";

const InitialProducts = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999 },
  { id: 2, name: "Shoes", category: "Clothing", price: 59 },
  { id: 3, name: "Phone", category: "Electronics", price: 799 },
  { id: 4, name: "Shirt", category: "Clothing", price: 19 },
  { id: 5, name: "Watch", category: "Accessories", price: 199 },
  { id: 6, name: "Headphones", category: "Electronics", price: 129 },
  { id: 7, name: "Sunglasses", category: "Accessories", price: 89 },
  { id: 8, name: "Jacket", category: "Clothing", price: 119 },
];

function ProductTable() {
  //state
  const [products, setProducts] = useState(InitialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
  });

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    return sorted;
  }, [searchTerm, sortOrder, products]);

  //handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //handle sort
  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleInputChange = (prev) => {
    const { name, value } = prev.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    // Validate input
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      alert("Please fill in all fields.");
      return;
    }

    // Add new product
    setProducts((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
      },
    ]);

    // Clear form fields
    setNewProduct({
      name: "",
      category: "",
      price: "",
    });
  };

  return (
    <div style={styles.container}>
      <h1>Product Table</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        style={styles.input}
      />

      <button onClick={handleSortChange} style={styles.button}>
        Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Add product</h1>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Name"
          onChange={handleInputChange}
          value={newProduct.name}
          name="name"
        />
        <input
          type="text"
          placeholder="Category"
          onChange={handleInputChange}
          value={newProduct.category}
          name="category"
        />
        <input
          type="number"
          placeholder="Price"
          onChange={handleInputChange}
          value={newProduct.price}
          name="price"
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

// Styles for the component
const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    width: "60%",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 0",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    border: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
};

export default ProductTable;
