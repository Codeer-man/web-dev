import React, { useReducer, useState } from "react";

// Initial state
const initialState = {
  todos: [], // List of to-dos
  totalTodos: 0, // Count of total todos
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
        totalTodos: state.totalTodos + 1,
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        totalTodos: state.totalTodos - 1,
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    default:
      throw new Error("Unhandled action type: " + action.type);
  }
};

export default function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: inputValue });
      setInputValue("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <h2>Total Todos: {state.totalTodos}</h2>
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            <span
              onClick={() =>
                dispatch({ type: "TOGGLE_TODO", payload: todo.id })
              }
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_TODO", payload: todo.id })
              }
              style={{ marginLeft: "8px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
        style={{ marginTop: "16px", backgroundColor: "orange", padding: "8px" }}
      >
        Clear Completed
      </button>
    </div>
  );
}
