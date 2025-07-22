import React, { Suspense } from "react";
import Check from "./check";

export default function page() {
  return (
    <div>
      <Suspense fallback="loading...">
        <Check />
      </Suspense>
    </div>
  );
}
