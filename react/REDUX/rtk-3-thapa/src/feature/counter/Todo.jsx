import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "../../store/todo";
export default function Todo() {
  const task = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAdd = () => {
    dispatch(addTodo(input));
    setInput("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-600 ">
      <div className="bg-white p-8 rounded-xl flex flex-col gap-4 w-full max-w-md shadow-lg">
        <div className="space-x-2">
          <label className="text-sm font-medium font-poppins">Task input</label>
          <input
            type="text"
            placeholder="Enter the task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-2 border rounded-xl w-full mt-2"
          />
          <button
            onClick={handleAdd}
            className="mt-4 p-2 rounded-xl text-sm bg-gray-400 hover:bg-gray-500 text-white"
          >
            Add Task
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-2 p-2 border rounded-xl w-full"
          >
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="uncomplete">Uncomplete</option>
          </select>
        </div>
        <ul className="mt-4 border-t-2 pt-4">
          {task
            .filter((task) => {
              if (filter === "all") return true;
              if (filter === "complete") return task.complete;
              if (filter === "uncomplete") return !task.complete;
            })
            .map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center py-2"
              >
                <span
                  style={{
                    textDecoration: task.complete ? "line-through" : "none",
                  }}
                  className="cursor-pointer"
                  onClick={() => handleToggle(task.id)}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="ml-2 p-2 cursor-pointer rounded-xl text-sm bg-gray-400 hover:bg-gray-500 text-white"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
