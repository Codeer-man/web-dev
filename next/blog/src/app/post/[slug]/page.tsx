import PostContent from "@/components/post/post-content";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function PostSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // get author information
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let isAuthor = session?.user?.id === post.authorId;

  const content = { post, isAuthor };

  return (
    <div>
      <PostContent content={content} />
    </div>
  );
}
