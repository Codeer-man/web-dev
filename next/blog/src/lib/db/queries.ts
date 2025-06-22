import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { posts } from "./schema";

export async function getAllPost() {
  try {
    const allPost = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
      with: {
        author: true,
      },
    });
    return allPost;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      with: {
        author: true,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
