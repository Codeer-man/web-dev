import React, { useReducer } from "react";

export default function Reducer() {
    const initialState = { count: 0 };


  const reducer = (state, action) => {
    switch (action.type) {
      case "Increment":
        return { count: action.count + 1 };
      case "Decrement":
        return { count: action.count + 1 };
      case "IncrResetement":
        return initialState;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
        <h1>{state.count}</h1>
      <div onClick={() => dispatch({ type: "Increment" })}>Increment</div>
      <div onClick={() => dispatch({ type: "Decrement" })}>Decrement</div>
      <div onClick={() => dispatch({ type: "Reset" })}>Reset</div>
    </div>
  );
}
