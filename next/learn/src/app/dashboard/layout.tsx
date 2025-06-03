import React from "react";

export default function AdminDashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>muji ka hereko hos</h1>
      <div>{children}</div>
    </div>
  );
}
