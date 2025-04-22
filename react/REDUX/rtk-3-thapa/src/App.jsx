// src/App.js
import React from "react";
import Counter from "./feature/counter/counter";
import Todo from "./feature/counter/todo";
import Calculator from "./feature/BMI/calculator";

function App() {
  return (
    <div className="overflow-hidden">
      <h2>My Redux App</h2>
      <Counter />
      <Calculator />
      <Todo />
    </div>
  );
}

export default App;
