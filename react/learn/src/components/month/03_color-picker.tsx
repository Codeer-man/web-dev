import { useState } from "react";

export default function ColorPicker() {
  //lazy initilizer: you pass function instead of a value
  // it renders or runs only once
  const [color, setColor] = useState(() => {
    return localStorage.getItem("color") ?? "#000000";
  });

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextColor = e.target.value;
    setColor(nextColor);
    localStorage.setItem("color", nextColor);
  }

  async function copyColor() {
    try {
      await navigator.clipboard.writeText(color);
      alert("Color copied");
    } catch (error) {
      console.error("Failed to copy", error);
    }
  }

  return (
    <div>
      <input type="color" value={color} onChange={handleColorChange} />
      <input type="text" value={color} onChange={handleColorChange} />
      <br />
      <button onClick={copyColor}>Copy color</button>
      <div
        style={{
          backgroundColor: color,
          height: 100,
          width: 100,
          marginTop: 20,
        }}
      ></div>
    </div>
  );
}
