import { connectTodb, db } from "@/lib/db";
import { userTable } from "@/lib/db/schema/user.sql";
import { logger } from "@/lib/logger/logger";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "please fill all the fileds",
        },
        { status: 400 }
      );
    }
    await connectTodb();

    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1);
    console.log(existingUser.length, "length");

    if (existingUser.length !== 0) {
      return NextResponse.json(
        { message: "user email already exists" },
        { status: 400 }
      );
    }

    const hashPassowrd = await bcrypt.hash(password, 10);

    const newUser: typeof userTable.$inferInsert = {
      email: email,
      password: hashPassowrd,
    };

    const newlyCreatedUser = await db.insert(userTable).values(newUser);
    logger.info("new user created");
    return NextResponse.json(
      {
        success: true,
        message: "new user has been created",
        data: newlyCreatedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { error: error, message: "Invalid server erorr" },
      { status: 401 }
    );
  }
}
