import { postContentProps } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import PostDeleteButton from "./post-deleteButton";

export default function PostContent({ content }: postContentProps) {
  const { post, isAuthor } = content;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
        By <CardDescription>{post.author.name} </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-lg mb-6">{post.content}</p>
        <p className="text-muted-foreground font-bold text-3xl mb-6">
          {post.description}
        </p>
      </CardContent>
      {isAuthor && (
        <CardFooter>
          <div className="space-x-6">
            <Button
              asChild
              variant={"outline"}
              size={"icon"}
              className="px-8 py-5"
            >
              <Link href={`/post/edit/${post.slug}`}>
                Edit <Pencil />
              </Link>
            </Button>
            <PostDeleteButton postId={post.id} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
