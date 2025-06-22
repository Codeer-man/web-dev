"use server";

import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { posts } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  try {
    // get current user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to create a post",
      };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      };
    } else if (!description) {
      return {
        success: false,
        message: "description is required",
      };
    } else if (!content) {
      return {
        success: false,
        message: "content is required",
      };
    }

    // create slug
    const slug = slugify(title);

    // check if slug already exists
    const existingSlug = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingSlug) {
      return {
        success: false,
        message: "Slug already exists Please try another one",
      };
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post created successfully",
      post: newPost,
      slug,
    };
  } catch (error) {
    return {
      success: false,
      message: "something error occured",
      error: error,
    };
  }
}
