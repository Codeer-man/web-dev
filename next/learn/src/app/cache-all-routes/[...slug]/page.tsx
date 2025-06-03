import React from "react";

export default async function CatchAll({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  console.log(slug, "catch");

  return <div>catch all routes</div>;
}
