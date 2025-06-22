"use client";
import React, { startTransition, useTransition } from "react";
import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/actions/post-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const postSchema = z.object({
  title: z.string().min(3, { message: "Title must be 3 character long" }),
  description: z
    .string()
    .min(10, { message: "Description must be 10 character long" })
    .max(255, { message: "Derscription should not exclude 255 character" }),
  content: z
    .string()
    .min(10, { message: "Description must be 10 character long" }),
});

type postFormValues = z.infer<typeof postSchema>;

export default function PostForm() {
  const [isPending, transaction] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  async function onFormSubmit(data: postFormValues) {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        let res;
        res = await createPost(formData);
        if (res.success) {
          toast("New Post has been created");
          // router.refresh();
          router.push("/");
        } else {
          toast(res.message);
        }
      } catch (error) {
        console.error("Failed to create post", error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter Blog Title"
          {...register("title")}
          disabled={isPending}
        />
        {errors?.title && (
          <p className="text-md text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter the post description"
          disabled={isPending}
          {...register("description")}
        />
        {errors?.description && (
          <p className="text-md text-red-600">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Enter the post content"
          className="min-h-[250px] resize-none"
          disabled={isPending}
          {...register("content")}
        />
        {errors?.content && (
          <p className="text-md text-red-600">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="mt-8 w-full">
        {isPending ? "Saving Post..." : "Create Post"}
      </Button>
    </form>
  );
}
