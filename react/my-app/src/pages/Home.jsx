import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      const productToAdd = {
        id: Date.now(),
        ...newProduct,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity),
      };
      setProducts((prev) => [...prev, productToAdd]);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        quantity: 1,
      });
    }
  };

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }
    setCartItems(updatedCart);
    alert("Product added to cart successfully!");
  };

  const deleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((item) => item.id !== productId);
      setProducts(updatedProducts);
    }
  };

  const viewCart = () => {
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg mb-12 hover:shadow-xl transition-transform transform hover:-translate-y-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Product Name", name: "name", type: "text" },
            { label: "Price", name: "price", type: "number" },
            { label: "Category", name: "category", type: "text" },
            { label: "Quantity", name: "quantity", type: "number" },
          ].map(({ label, name, type }) => (
            <div className="flex flex-col" key={name}>
              <label className="text-sm font-medium text-gray-600 mb-2">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={newProduct[name]}
                onChange={handleInputChange}
                required
                className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
              className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform transform hover:-translate-y-1"
        >
          Add Product
        </button>
      </form>

      <button
        onClick={viewCart}
        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-transform transform hover:-translate-y-1 mb-6"
      >
        View Cart
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product List</h2>
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>{product.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div> 
          ))
        ) : (
          <p>No products available. Add some products!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
