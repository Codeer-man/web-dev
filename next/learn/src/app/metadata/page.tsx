import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Metadata example",
  description: "this is the meatadata example of writing metadata",
};

export default function MetaDataExample() {
  const example = [
    {
      id: 1,
      title: "one",
    },
    {
      id: 2,
      title: "two",
    },
    {
      id: 3,
      title: "three",
    },
  ];
  return (
    <div>
      <h1>Metadata examples </h1>
      <ul>
        {example.map((data) => (
          <li key={data.id}>
            <Link href={`/metadata/${data.id}`}>{data.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
