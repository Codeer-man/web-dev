import { useState, useCallback, memo } from "react";
import { Star, CheckCircle, Circle, AlertCircle } from "lucide-react";
import PropTypes from "prop-types";

const Task = memo(({ task, onComplete, onPriorityChange }) => (
  <div className="task">
    <div className="task-left">
      <button
        onClick={() => onComplete(task.id)}
        className="task-complete-button"
      >
        {task.completed ? (
          <CheckCircle className="task-icon completed" size={24} />
        ) : (
          <Circle className="task-icon" size={24} />
        )}
      </button>
      <span
        className={`task-text ${task.completed ? "task-text-completed" : ""}`}
      >
        {task.text}
      </span>
    </div>
    <button
      onClick={() => onPriorityChange(task.id)}
      className="task-priority-button"
    >
      <Star
        className={`task-priority-icon ${task.priority ? "priority" : ""}`}
        size={24}
      />
    </button>
  </div>
));

Task.displayName = "Task";

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.bool.isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onPriorityChange: PropTypes.func.isRequired,
};

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review code PR", completed: false, priority: true },
    { id: 2, text: "Update documentation", completed: false, priority: false },
    { id: 3, text: "Plan sprint meeting", completed: true, priority: true },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const handleComplete = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handlePriorityChange = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority: !task.priority } : task
      )
    );
  }, []);

  const handleAddTask = useCallback(
    (event) => {
      event.preventDefault();
      if (!newTask.trim()) return;

      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          text: newTask.trim(),
          completed: false,
          priority: false,
        },
      ]);
      setNewTask("");
    },
    [newTask]
  );

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "completed":
        return task.completed;
      case "active":
        return !task.completed;
      case "priority":
        return task.priority;
      default:
        return true;
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    priority: tasks.filter((t) => t.priority).length,
  };

  return (
    <div className="task-manager">
      <style>
        {`
          .task-manager {
            max-width: 600px;
            margin: 0 auto;
            padding: 16px;
            font-family: Arial, sans-serif;
          }
          .stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 16px;
          }
          .stat-item {
            text-align: center;
          }
          .stat-number {
            font-size: 1.5rem;
            font-weight: bold;
          }
          .add-task-form {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
          }
          .task-input {
            flex-grow: 1;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .add-task-button {
            padding: 8px 16px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .add-task-button:hover {
            background-color: #0056b3;
          }
          .filter-buttons {
            display: flex;
            justify-content: space-between;
            margin-bottom: 16px;
          }
          .filter-button {
            padding: 8px 16px;
            background-color: #f1f1f1;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .filter-button.active {
            background-color: #007bff;
            color: #fff;
          }
          .task-list {
            margin-top: 16px;
          }
          .task {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-bottom: 8px;
          }
          .task-left {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .task-text {
            font-size: 1rem;
          }
          .task-text-completed {
            text-decoration: line-through;
            color: #6c757d;
          }
          .task-complete-button {
            background: none;
            border: none;
            cursor: pointer;
          }
          .task-priority-button {
            background: none;
            border: none;
            cursor: pointer;
          }
          .task-priority-icon.priority {
            color: gold;
          }
          .no-tasks {
            text-align: center;
            color: #6c757d;
            font-size: 1rem;
            margin-top: 16px;
          }
          .no-tasks-icon {
            margin-bottom: 8px;
          }
        `}
      </style>
      {/* Stats Section */}
      <div className="stats">
        {[
          { label: "Total Tasks", value: stats.total },
          { label: "Completed", value: stats.completed },
          { label: "Priority", value: stats.priority },
        ].map((stat) => (
          <div className="stat-item" key={stat.label}>
            <div className="stat-number">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="add-task-button">
          Add Task
        </button>
      </form>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["all", "active", "completed", "priority"].map((filterType) => (
          <button
            key={filterType}
            onClick={() => handleFilterChange(filterType)}
            className={`filter-button ${filter === filterType ? "active" : ""}`}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onPriorityChange={handlePriorityChange}
            />
          ))
        ) : (
          <div className="no-tasks">
            <AlertCircle className="no-tasks-icon" />
            No tasks found
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
