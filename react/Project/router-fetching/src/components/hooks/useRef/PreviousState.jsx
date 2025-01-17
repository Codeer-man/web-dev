import  { useState, useRef, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div className="p-4">
      <h1>Current Count: {count}</h1>
      <h2>Previous Count: {prevCountRef.current}</h2>
      <div>
        <button 
          onClick={() => setCount(count + 1)} 
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;
