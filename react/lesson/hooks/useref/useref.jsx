import React, { useRef } from "react";

export default function useref() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Simple useRef Example</h2>
      <input
        ref={inputRef} // Attach the ref to the input element
        type="text"
        placeholder="Click the button to focus"
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={handleFocus}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Focus the Input
      </button>
    </div>
  );
}
