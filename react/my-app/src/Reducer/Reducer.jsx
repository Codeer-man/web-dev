import React, { useReducer } from "react";

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}
export default function Reducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {" "}
      <div>{state.count}</div>{" "}
      <div onClick={() => dispatch({ type: "increment" })}>increment</div>
      <div onClick={() => dispatch({ type: "decrement" })}>decrement</div>
      <div onClick={() => dispatch({ type: "reset" })}>reset</div>
    </div>
  );
}
