import React, { useState } from "react";
import { CiStar } from "react-icons/ci";

export default function StarRating({ star = 5 }) {
  const [position, setPosition] = useState(0);
  const [hover, setHover] = useState(0);

  let start = Array.from({ length: star });

  return (
    <div className="w-screen flex gap-3 items-center justify-center overflow-hidden">
      {start.map((_, index) => {
        const starIndex = (index += 1);
        const active = starIndex <= (position || hover);

        return (
          <div key={index}>
            <CiStar
              className={`w-14 h-14 ${active ? "bg-yellow-300" : "bg-white"}`}
              onClick={() => setPosition(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(0)}
            />
          </div>
        );
      })}
    </div>
  );
}
