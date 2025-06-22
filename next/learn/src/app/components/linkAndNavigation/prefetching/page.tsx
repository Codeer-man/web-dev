import Link from "next/link";
import React from "react";

export default function Prefetching() {
  return (
    <div>
      <h1>Prefetching</h1>
      {/* prefetch when the user hover or the button comes to the viewPoint */}
      <Link href={"/game/gta6"}>Go to game</Link>
      {/* no prefetching */}
      <a href="/game/gta6">Go to game</a>
    </div>
  );
}
