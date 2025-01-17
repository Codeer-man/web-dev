import { useRef } from "react";

export default function Focus() {
  const FocusRef = useRef(null);

  const handleClick = () => {
    FocusRef.current.focus();
  };
  return (
    <div>
      <form>
      <input 
        ref={FocusRef} 
        type="text" 
        className="border p-2 rounded" 
        placeholder="Type something here..." 
      />

        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}
