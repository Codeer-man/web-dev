import React, { useReducer } from "react";

const initiaState = {
  count: 0,
  name: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return {
        ...state,
        count: state.count - 1,
      };
    case "reset":
      return { ...state, count: 0 };
    case "setName":
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

export default function Reducer() {
  const [state, dispatch] = useReducer(reducer, initiaState);

  return (
    <div>
      <h1>Count:{state.count} </h1>
      <h1>Name:{state.name} </h1>
      <button onClick={() => dispatch({ type: "increment" })}>add</button>
      <button onClick={() => dispatch({ type: "decrement" })}>add</button>
      <button onClick={() => dispatch({ type: "reset" })}>add</button>
      <input
        type="text"
        value={state.name}
        onChange={(e) => dispatch({ type: "setName", payload: e.target.value })}
      />
    </div>
  );
}
