import { PostListProps } from "@/lib/types";
import React, { Suspense } from "react";
import PostCard from "./postCard";

export default function PostList({ posts }: PostListProps) {
  return (
    <Suspense fallback={<div>Loading .... Please wait </div>}>
      <div className="grid grid-cols-1 my-12 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-4">
        {posts.map((data) => (
          <PostCard key={data.id} post={data} />
        ))}
      </div>
    </Suspense>
  );
}
