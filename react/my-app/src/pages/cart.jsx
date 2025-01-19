import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addDynamicStyles = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
      }
      h1 {
        font-size: 1.875rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
      }
      .cart-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .cart-item {
        background-color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .cart-item h3 {
        font-weight: bold;
        font-size: 1.125rem;
        margin-bottom: 0.5rem;
      }
      .cart-item .description {
        color: #4B5563;
        margin-bottom: 0.5rem;
      }
      .cart-item .price {
        color: #059669;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      .quantity-container {
        color: #374151;
        margin-bottom: 0.5rem;
      }
      .quantity-container input {
        width: 4rem;
        padding: 0.5rem;
        border: 1px solid #D1D5DB;
        border-radius: 0.25rem;
        margin-left: 0.5rem;
      }
      .remove-button {
        background-color: #EF4444;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      .remove-button:hover {
        background-color: #DC2626;
      }
      .cart-footer {
        margin-top: 1.5rem;
      }
      .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .footer-content h2 {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .continue-shopping {
        background-color: #3B82F6;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      .continue-shopping:hover {
        background-color: #2563EB;
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    addDynamicStyles();
  }, []);

  const navigate = useNavigate();

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Item removed from cart.");
  };

  const calculateTotal = () =>
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some products!</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p className="price">${item.price}</p>
              <p className="quantity-container">
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  min="1"
                />
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-button"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="footer-content">
            <h2>Total: ${calculateTotal()}</h2>
            <button onClick={navigateHome} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
