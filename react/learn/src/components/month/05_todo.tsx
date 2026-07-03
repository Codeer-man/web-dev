import React, { useEffect, useState } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState<string[]>(() => {
    const savedTasks = localStorage.getItem("task");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  function handleClick() {
    if (task.trim() === "") {
      return;
    }
    setTodo((prev) => [...prev, task]);

    setTask("");
  }

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(todo));
  }, [todo]);

  function handleRemove(index: number) {
    setTodo(todo.filter((_, i) => i !== index));
  }
  console.log(todo);

  return (
    <div>
      Task
      {todo.length > 0 ? (
        todo.map((task, i) => (
          <li key={i}>
            {i + 1}. {task}
            <button onClick={() => handleRemove(i)}> Delete</button>
          </li>
        ))
      ) : (
        <p>No task added yet</p>
      )}
      <p>Total task: {todo.length}</p>
      <input type="text" value={task} onChange={handleChange} />
      <button onClick={handleClick}>Add</button>
    </div>
  );
}
