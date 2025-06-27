"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { assets, category } from "@/lib/db/schema/asset";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const fileSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  categoryId: z.number().positive("please select a category"),
  fileUrl: z.string().url("Please enter a vallid url"),
  thumnail: z.string().url("Please enter a vallid url"),
  publicId: z.string(),
});

export async function getCategoriesAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  try {
    return await db.select().from(category);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function PostAssetAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("User must be logged in");
  }

  try {


    const validateFields = fileSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      categoryId: Number(formData.get("categoryId")),
      fileUrl: formData.get("fileUrl"),
      thumnail: formData.get("thumnail"),
      publicId: formData.get("publicId") || formData.get("fileUrl"),
    });

    await db.insert(assets).values({
      title: validateFields.title,
      description: validateFields.description,
      categoryId: validateFields.categoryId,
      thumnail: validateFields.thumnail,
      publicId: validateFields.publicId,
      fileUrl: validateFields.fileUrl,
      isAppreoved: "pending",
      userId: session.user.id,
    });

    revalidatePath("/dashboard/assets");

    return {
      success: true,
      message: "Sucessfully uploaded",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Invalid error while uploading asset",
    };
  }
}

export async function getUserAssetsActions(userId: string) {
  try {
    const data = db
      .select()
      .from(assets)
      .where(eq(assets.userId, userId))
      .orderBy(desc(assets.createdAt));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
