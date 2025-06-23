import PostForm from "@/components/post/post-form";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { Metadata } from "next";

import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Edit the page",
  description: "Here the ower of the blog can edit the page",
};

export default async function BlogEditSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/");
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound;
  }

  if (post?.authorId !== session!.user.id) {
    redirect("/");
  }

  return (
    <div className="max:w-7xl">
      <h1 className="max:w-2xl mt-5 font-bold text-4xl mb-6">Edit Post</h1>
      <PostForm
        isEditing={true}
        post={{
          id: post.id,
          title: post.title,
          description: post.description,
          content: post.content,
          slug: post.slug,
        }}
      />
    </div>
  );
}
