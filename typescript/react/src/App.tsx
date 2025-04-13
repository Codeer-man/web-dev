import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { todo } from "./types/todo";

function App() {
  const [todo, setTodo] = useState<todo[]>([]);

  const addTodoHandler = (text: string) => {
    const id = Math.random().toString();
    setTodo([...todo, { id, text }]);
  };

  const removeTodoHandler = (todoId: string) => {
    const newTodoList = todo.filter((todo: todo) => {
      return todo.id !== todoId;
    });
    setTodo(newTodoList);
  };
  return (
    <main className="max-w-6xl mx-auto my-6 ">
      <AddTodo onAddTodo={addTodoHandler} />
      <TodoList removeTodoHandler={removeTodoHandler} items={todo} />
    </main>
  );
}

export default App;
