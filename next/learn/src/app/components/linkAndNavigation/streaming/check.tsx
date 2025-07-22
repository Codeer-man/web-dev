import React from "react";

export default async function Check() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return <div>Check</div>;
}
