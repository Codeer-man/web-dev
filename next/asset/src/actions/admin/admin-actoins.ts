"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { category } from "@/lib/db/schema/asset";
import { user } from "@/lib/db/schema/schema";
import { asc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { number, string, z } from "zod";

const categorySchema = z.object({
  name: string()
    .nonempty()
    .min(3, { message: "Must bet 3 three character long" })
    .max(50, { message: "Should not exceed 50" }),
});

export type categoryValue = z.infer<typeof categorySchema>;

export async function addNewCategoryAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session, "session");

  const userDetail = session?.user;

  if (!userDetail || userDetail.role !== "admin") {
    throw new Error("Only admin are allowed in the page ");
  }

  console.log("action triggered");
  try {
    const name = formData.get("name") as string;

    const validateFiles = categorySchema.parse({ name });

    const existingCategory = await db
      .select()
      .from(category)
      .where(eq(category.name, validateFiles.name))
      .limit(1);

    if (existingCategory.length > 0) {
      return {
        success: false,
        message: "The category name already exists",
      };
    }

    await db.insert(category).values({
      name: validateFiles.name,
    });
    revalidatePath("/admin/setting");

    return {
      success: true,
      message: "new Category has been added",
    };
  } catch (error) {
    console.error(error, "invalid server error");
    return {
      success: false,
      message: "Faild to add new category",
    };
  }
}

export async function getAllCategoryAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userDetail = session?.user;

  if (!userDetail || userDetail.role !== "admin") {
    throw new Error("Only admin are allowed in the page ");
  }

  try {
    return await db.select().from(category).orderBy(asc(category.name));
  } catch (error) {
    console.error(error, "invalid server error");
    return [];
  }
}

export async function getUserCountAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userDetail = session?.user;

  if (!userDetail || userDetail.role !== "admin") {
    throw new Error("Only admin are allowed in the page ");
  }

  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(user);

    return result[0]?.count || 0;
  } catch (error) {
    console.error(error, "invalid server error");
    return 0;
  }
}

export async function deleteCategoryAction(id: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userDetail = session?.user;

  if (!userDetail || userDetail.role !== "admin") {
    throw new Error("Only admin are allowed in the page ");
  }

  try {
    await db.delete(category).where(eq(category.id, id));

    revalidatePath("/admin/setting");

    return {
      success: true,
      message: "category deleted successfully",
    };
  } catch (error) {
    console.error(error, "invalid server error");
    return {
      success: false,
      message: "Failed to delete category",
    };
  }
}
