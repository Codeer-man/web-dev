import React, { useState, type ReactNode } from "react";
import { useTodo } from "./todo";

export default function TodoShow() {
  const [task, setTask] = useState<string>("");
  const { items, add, update, remove, status, updateStatus } =
    useTodo.getState();

  function handlSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handlSubmit}>
        <input
          type="text"
          value={task}
          name="add"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
