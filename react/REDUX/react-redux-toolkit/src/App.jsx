import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increaseByAmount,
  increment,
} from "./features/counter/CounterSlice";

export default function App() {
  const [amount, setAmount] = useState();
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }
  return (
    <div>
      <button onClick={handleIncrement}> +</button>
      <p>counter :{count}</p>
      <button onClick={handleDecrement}>-</button>

      <input
        type="number"
        placeholder="enter a number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch(increaseByAmount(amount));
        }}
      >
        Inc by Amt
      </button>
    </div>
  );
}
