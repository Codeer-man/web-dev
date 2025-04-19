import React, { useReducer } from "react";

const initialState = {
  light: "off",
};

function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      return { light: state.light === "off" ? "on" : "off" };

    default:
      state;
  }
}

export default function Light() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {state.light}
      <div onClick={() => dispatch({ type: "toggle" })}>Toggle the button</div>
    </div>
  );
}
