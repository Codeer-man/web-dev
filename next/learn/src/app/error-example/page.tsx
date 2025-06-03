import React from "react";

function errorHandler() {
  const num = Math.random() > 0.5;

  if (num) {
    throw new Error("number is smaller than 0.5");
  }

  const showNumber = [
    { id: 1, name: "one" },
    { id: 2, name: "two" },
    { id: 3, name: "three" },
  ];

  return showNumber;
}

export default function ErrorPage() {
  const error = errorHandler();

  return (
    <div>
      <h1>show</h1>
      {error.map((err) => (
        <div key={err.id}>
          <h1>{err.name}</h1>
        </div>
      ))}
    </div>
  );
}
