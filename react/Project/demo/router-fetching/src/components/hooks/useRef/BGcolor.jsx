import { useRef } from "react";

export default function BGcolor() {
  const colorRef = useRef(null);

  const handleClick = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    
      colorRef.current.style.backgroundColor = randomColor;
    
  };
  return (
    <div>
      <div ref={colorRef}>change color</div>
      <button onClick={handleClick}>click here </button>
    </div>
  );
}
