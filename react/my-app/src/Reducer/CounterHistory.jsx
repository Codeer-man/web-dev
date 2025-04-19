import { set } from "lodash";
import React, { useReducer, useState } from "react";

const initialState = {
  count: 0,
  step: 1,
  history: [],
};

let id = 1;

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      const newInCount = state.count + state.step;
      return {
        ...state,
        count: newInCount,
        history: [...state.history, { id: id++, number: newInCount }],
      };
    case "decrement":
      const newDecCount = state.count - state.step;
      return {
        ...state,
        count: newDecCount,
        history: [...state.history, { id: id++, number: newDecCount }],
      };
    case "reset":
      return {
        ...state,
        count: 0,
        history: [...state.history, { id: id++, number: 0 }],
      };
    case "step_counter":
      return { ...state, step: action.payload };

    case "clear_history":
      return { ...state, history: [] };

    default:
      return state;
  }
};

export default function CounterHistory() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="h-screen w-screen p-10">
      <input
        type="number"
        value={state.step}
        onChange={(e) =>
          dispatch({ type: "step_counter", payload: Number(e.target.value) })
        }
      />
      <div>
        <div>{state.count}</div>

        <h1>history</h1>
        <ul>
          {state.history.map((data) => (
            <li key={data.id}>
              <div> {data.number}</div>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => dispatch({ type: "increment" })}>increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>

      <button onClick={() => dispatch({ type: "clear_history" })}>
        Clear history
      </button>
    </div>
  );
}
