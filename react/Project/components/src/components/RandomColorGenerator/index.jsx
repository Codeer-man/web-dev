import { useRef } from "react";

export default function RandomColorGen() {
  const ColorRef = useRef();

  const handleChange = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    ColorRef.current.style.backgroundColor = randomColor;
  };

  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div
            ref={ColorRef}
            className="w-64 h-64 flex items-center justify-center text-white text-lg font-bold rounded-lg shadow-lg transition duration-300"
          >
            Click the button to change color
          </div>
          <button
            onClick={handleChange}
            className="mt-6 px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Click here
          </button>
        </div>
      </div>

      <div>
        
      </div>
    </div>
  );
}
