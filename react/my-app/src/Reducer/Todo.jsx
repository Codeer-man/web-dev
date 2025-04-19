import React, { useReducer, useState } from "react";

const initialState = {
  todos: [],
};

let idcounter = 1;

function reducer(state, action) {
  switch (action.type) {
    case "Add_todo":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: idcounter++, text: action.payload, completed: false },
        ],
      };
    case "Toggle_complete":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "Task_Delete":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

export default function Todo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");

  const handleAddInput = () => {
    if (input.trim() === "") return;
    dispatch({ type: "Add_todo", payload: input });
    setInput("");
  };

  const handleToggle = (id) => {
    dispatch({ type: "Toggle_complete", payload: id });
  };
  const handleDelete = (id) => {
    dispatch({ type: "Task_Delete", payload: id });
  };

  //   console.log(state.todos[0].completed);
  //   console.log(state.todos[0].completed);

  return (
    <div className="h-screen w-screen">
      <div className="p-20">
        <label>Data input</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Input task"
        />
        <button onClick={handleAddInput}>Add data</button>
      </div>
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id} className=" flex gap-10">
            <span
              onClick={() => handleToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            {todo.completed ? "completed" : "not Completed"}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
