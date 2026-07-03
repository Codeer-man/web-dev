import { useEffect, useState } from "react";

export default function Timer() {
  const [timer, setTimer] = useState(new Date());
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimer(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div>
      {timer.toLocaleDateString()} <br />
      {timer.toLocaleTimeString()} <br />
      <button onClick={() => setIsRunning((prev) => !prev)}>
        {isRunning ? "Stop time" : "Start time"}
      </button>
    </div>
  );
}
