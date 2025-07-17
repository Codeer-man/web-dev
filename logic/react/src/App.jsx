import React, { useState, useEffect } from "react";

const initialState = {
  id: Date.now(),
  text: "",
  complete: false,
  status: "Not started",
};

export default function App() {
  const [task, setTask] = useState(initialState);
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState("");

  // Load tasks from sessionStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(sessionStorage.getItem("todo"));
    if (savedTasks) {
      setTaskList(savedTasks);
    }
  }, []);

  // Save taskList to sessionStorage on every change
  useEffect(() => {
    sessionStorage.setItem("todo", JSON.stringify(taskList));
  }, [taskList]);

  function handleChange(e) {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: name === "complete" ? value === "true" : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (task.text === "") {
      return setError("Text must not be empty");
    } else if (task.status === "") {
      return setError("You must put a status");
    }

    setTaskList((prev) => [...prev, { ...task, id: Date.now() }]);
    setTask(initialState);
    setError("");
  }

  function handleToggle(id) {
    const updated = taskList.map((t) =>
      t.id === id ? { ...t, complete: !t.complete } : t
    );
    setTaskList(updated);
  }

  function handleDelete(id) {
    const updated = taskList.filter((t) => t.id !== id);
    setTaskList(updated); // Automatically updates sessionStorage via useEffect
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="grid grid-rows-2 h-[50%] border-2 rounded-xl p-4 w-[50%]">
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            className="border-2 rounded-md p-1 w-full"
            type="text"
            placeholder="Enter your task"
            value={task.text}
            name="text"
            onChange={handleChange}
          />
          <select
            className="border-2 p-1 rounded-md w-full"
            value={task.status}
            onChange={handleChange}
            name="status"
          >
            <option value="Not started">Not started</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
          <select
            className="border-2 p-1 rounded-md w-full"
            value={task.complete}
            onChange={handleChange}
            name="complete"
          >
            <option value={false}>Incomplete</option>
            <option value={true}>Complete</option>
          </select>
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded-md"
            type="submit"
          >
            Add Task
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>

        <div className="mt-4 overflow-y-auto max-h-60">
          {taskList && taskList.length > 0 ? (
            taskList.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-1 border-b"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.complete}
                    onChange={() => handleToggle(task.id)}
                  />
                  <span className={task.complete ? "line-through" : ""}>
                    {task.text}
                  </span>
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                  {/* You can add Edit button here */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
