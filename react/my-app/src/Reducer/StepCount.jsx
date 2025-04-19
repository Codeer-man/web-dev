import React, { useReducer } from "react";

const initialState = {
  // Fixed typo in variable name (was 'initalState')
  count: 0,
  step: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "step":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      return state; // Added return
  }
}

export default function StepCount() {
  // Fixed component name
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      {state.count}

      <div>
        <label>steps</label>
        <input
          type="number"
          value={state.step}
          onChange={(e) =>
            dispatch({ type: "step", payload: Number(e.target.value) })
          }
        />
      </div>

      <button onClick={() => dispatch({ type: "increment" })}>increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  );
}
