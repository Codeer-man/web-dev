// app/[slug]/page.tsx
import { Metadata } from "next";
import React from "react";

const dummydata = {
  "1": {
    title: "one",
  },
  "2": {
    title: "maio",
  },
  "3": {
    title: "three",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = dummydata[params.slug as keyof typeof dummydata];

  return {
    title: data?.title || "Default Title",
    description: "hello world",
  };
}

export default async function DynamicMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = dummydata[params.slug as keyof typeof dummydata];

  return (
    <div>
      <h1>{data?.title || "No Title Found"}</h1>
    </div>
  );
}
