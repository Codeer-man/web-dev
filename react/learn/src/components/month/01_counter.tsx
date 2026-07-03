// import { useState } from "react";

import { useReducer } from "react";

// export default function Counter() {
//   const [count, setCount] = useState<number>(0);
//   console.log(count);

//   const increment = () => setCount((prev) => prev + 1);
//   const decrement = () => setCount((prev) => prev - 1);
//   const reset = () => setCount(0);

//   return (
//     <div className="">
//       <h1>{count}</h1>
//       <button onClick={increment}>Add</button>
//       <button onClick={decrement}>sub</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
// }

// reducer method

type Action = "increment" | "decrement" | "reset";

export default function Counter() {
  function reducer(state: number, action: Action) {
    switch (action) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      case "reset":
        return (state = 0);
    }
  }

  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div className="">
      <h1>{count}</h1>
      <button onClick={() => dispatch("increment")}>Add</button>
      <button onClick={() => dispatch("decrement")}>sub</button>
      <button onClick={() => dispatch("reset")}>Reset</button>
    </div>
  );
}
