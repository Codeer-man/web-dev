import { useEffect, useState } from "react";

// cannot be called inside a loop or condition means you should call it at top level

//dependency
// [] - run once
// [value]- run once automatically when component renders / when value triggered
// empty -run on every rendering
export default function UseEffect() {
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    console.log("it got triggered");
  }, [trigger]);

  return (
    <div>
      <button onClick={() => setTrigger((prev) => !prev)}>Click</button>
    </div>
  );
}
