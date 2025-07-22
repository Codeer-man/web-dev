import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {};
// ssg
// make dynamic page  server side rendering
export async function generateStaticParams() {
  // return in key value pair value should be in string
  //! method1
  // return [{ blogId: "1" }];
  //! method 2
  // const respones = await fetch("api");
  // const data = respones.json();
  // return data.map((d) => ({ blogId: d.id }));
}

// to prevent dynamic generation or exclude not existing id
export const dynamicParams = false;

// isr
// revalidate page
export const revalidate = 5;

export default function ServerSideGeneration() {
  return <div>ServerSideGeneration</div>;
}
