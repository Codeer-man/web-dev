import PostList from "@/components/post/post-list";
import { getAllPost } from "@/lib/db/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All The Post",
  description: "Here all the post of the user",
};

export default async function Home() {
  const posts = await getAllPost();

  return (
    <main className="p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className=" text-4xl font-bold text-center">
          Welcome to the blogs
        </h1>
        {posts.length === 0 ? (
          <div className="p-12">
            <h2 className="text-center font-medium">No Post yes</h2>
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </main>
  );
}
