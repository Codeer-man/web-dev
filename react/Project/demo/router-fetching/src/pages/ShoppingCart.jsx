import React, { useReducer } from "react";

// Initial state for the cart
const initialCartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product } = action.payload;

      // Check if the product already exists in the cart
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        // Update quantity if the product exists
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.price,
              }
            : item
        );
        return {
          ...state,
          cartItems: updatedCartItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        };
      }

      // Add new product to the cart
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { ...product, quantity: 1, totalPrice: product.price },
        ],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      };
    }

    case "REMOVE_FROM_CART": {
      const { id } = action.payload;

      const removedItem = state.cartItems.find((item) => item.id === id);

      const updatedCartItems = state.cartItems.filter((item) => item.id !== id);

      return {
        ...state,
        cartItems: updatedCartItems,
        totalItems: state.totalItems - removedItem.quantity,
        totalPrice: state.totalPrice - removedItem.totalPrice,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      const updatedCartItems = state.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity, totalPrice: quantity * item.price }
          : item
      );

      const updatedTotalItems = updatedCartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      const updatedTotalPrice = updatedCartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        totalItems: updatedTotalItems,
        totalPrice: updatedTotalPrice,
      };
    }

    case "CLEAR_CART":
      return initialCartState;

    default:
      return state;
  }
};

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Example products
  const products = [
    { id: 1, name: "Product 1", price: 100 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() =>
                dispatch({ type: "ADD_TO_CART", payload: { product } })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 border-t pt-4">
        {state.cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {state.cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p className="font-bold">Price: ${item.totalPrice}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: { id: item.id },
                      })
                    }
                  >
                    Remove
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="w-12 text-center border rounded"
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: { id: item.id, quantity: +e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            ))}
            <div className="mt-4">
              <p>Total Items: {state.totalItems}</p>
              <p className="font-bold text-lg">
                Total Price: ${state.totalPrice}
              </p>
            </div>
            <button
              className="mt-4 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
