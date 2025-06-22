import { PostCardProps } from "@/lib/types";
import Link from "next/link";
import React from "react";

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="py-4 px-2 flex flex-col    border border-gray-400 rounded-lg cursor-pointer shadow-sm shadow-gray-50">
      <Link href={`/post/${post.slug}`} className="hover:underline">
        <h1 className="font-semibold text-2xl  p-2 text-center">
          {post.title.toUpperCase()}
        </h1>
      </Link>
      <h4 className="font-light text-md mb-6">
        {post.description} -{" "}
        {Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
        }).format(new Date(post.createdAt!))}
      </h4>
      <h2 className="font-medium text-lg ">{post.description}</h2>
    </div>
  );
}
