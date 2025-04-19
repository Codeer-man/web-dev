import React, { useReducer, useState } from "react";

const initialstate = {
  task: [],
  completed: 0,
};

let id = 1;

const reducer = (state, action) => {
  switch (action.type) {
    case "add_data":
      const newTasks = [
        ...state.task,
        {
          id: id++,
          title: action.payload.title,
          description: action.payload.description,
          completed: false,
        },
      ];
      return {
        ...state,
        task: newTasks,
        completed: newTasks.filter((task) => task.completed).length,
      };

    case "delete_task":
      const filteredTasks = state.task.filter(
        (task) => task.id !== action.payload
      );
      const newCompleted = filteredTasks.filter(
        (task) => task.completed
      ).length;
      return {
        ...state,
        task: filteredTasks,
        completed: newCompleted,
      };
    case "toggle":
      const updatedTasks = state.task.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      const completedCount = updatedTasks.filter(
        (task) => task.completed
      ).length;
      return {
        ...state,
        task: updatedTasks,
        completed: completedCount,
      };
    default:
      return state;
  }
};

export default function Taskmanage() {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "add_data", payload: data });
    setData({
      title: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    dispatch({ type: "delete_task", payload: id });
  };

  function handleToggle(id) {
    dispatch({ type: "toggle", payload: id });
  }

  return (
    <div className="h-screen w-screen p-20">
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label>Task</label>
          <input
            type="text"
            value={data.title}
            name="title"
            onChange={handleChange}
            placeholder="task"
          />
          <label>Descirption</label>
          <input
            type="text"
            value={data.description}
            name="description"
            onChange={handleChange}
            placeholder="desc"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <ul>
        {state.task.map((task) => (
          <li key={task.id}>
            <div> Title: {task.title}</div>
            <div> description: {task.description}</div>
            <button onClick={() => handleDelete(task.id)}>Delete</button> <br />
            <button onClick={() => handleToggle(task.id)}>
              {task.completed ? "completed" : "Not completed"}
            </button>
          </li>
        ))}
      </ul>
      <div>Count complete {state.completed}</div>
    </div>
  );
}
