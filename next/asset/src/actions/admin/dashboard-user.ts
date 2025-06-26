"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { category } from "@/lib/db/schema/asset";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
