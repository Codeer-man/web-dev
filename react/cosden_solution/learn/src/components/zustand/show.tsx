import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useEffect } from "react";
import { useCounter } from "./store";

const logCount = () => {
  const count = useCounter.getState().count;
  console.log(count, "count");
};

const updateCount = () => {
  useCounter.setState({ count: 2 });
};

function App() {
  const count = useCounter((state) => state.count);
  const loading = useCounter((state) => state.loading);
  const increase = useCounter((state) => state.incrementAsync);
  const decrement = useCounter((state) => state.decrementAsync);
  const reset = useCounter((state) => state.reset);

  useEffect(() => {
    logCount();
    updateCount();
  }, []);
  console.log(loading);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>{!loading ? count : "loading..."}</p>
        <button disabled={loading} onClick={increase}>
          Increase
        </button>
        <button disabled={loading} onClick={decrement}>
          Decrease
        </button>
        <button disabled={loading} onClick={reset}>
          reset
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
