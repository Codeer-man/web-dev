import React, { useState, useRef } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // State to display the time
  const timerRef = useRef(null); // Ref to store the timer ID
  const isRunningRef = useRef(false); // Ref to track if the stopwatch is running

  const startTimer = () => {
    if (isRunningRef.current) return; // Prevent multiple timers from starting
    isRunningRef.current = true;
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear the timer interval
      timerRef.current = null;
      isRunningRef.current = false;
    }
  };

  const resetTimer = () => {
    stopTimer(); // Stop the timer before resetting
    setTime(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Stopwatch</h2>
      <p style={{ fontSize: "2rem", margin: "20px 0" }}>{time}s</p>
      <div>
        <button
          onClick={startTimer}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Stop
        </button>
        <button
          onClick={resetTimer}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
