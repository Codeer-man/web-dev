// src/components/AddTodo.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addtodo } from "../features/todos/TodoSlice";


const AddTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Don't dispatch if the text is empty
    dispatch(addtodo(text)); // Dispatching the action
    setText(""); // Clear the input field after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new todo"
        className="flex-1 p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;  // Ensure AddTodo is exported as default
