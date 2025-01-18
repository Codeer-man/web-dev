import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Rating({ stars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(e) {
    setRating(e);
  }

  function handleMouseEnter(e) {
    setHover(e);
  }

  function handleMouseLeave(e) {
    setHover(rating);
  }

  return (
    <div className="flex justify-center items-center space-x-2">
      {[...Array(stars)].map((_, index) => {
        index += 1;

        return (
          <FaStar
            key={index}
            className={`cursor-pointer transition-transform duration-200 ${
              index <= (rating || hover)
                ? "text-yellow-400 scale-110"
                : "text-gray-400"
            }`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            size={40}
          />
        );
      })}
    </div>
  );
}
