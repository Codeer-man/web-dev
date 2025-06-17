import { nextOptions } from "@/lib/auth/auth";
import { connectTodb, db } from "@/lib/db";
import { videoTable } from "@/lib/db/schema/video.sql";
import { logger } from "@/lib/logger/logger";
import { desc } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectTodb();
    const video = await db
      .select()
      .from(videoTable)
      .orderBy(desc(videoTable.createdAt));
    if (!video || video.length === 0) {
      return NextResponse.json(
        { data: [], message: "video array may be empty or undefined" },
        { status: 404 }
      );
    }
    logger.info("Got all the videos ");
    NextResponse.json({ success: true, data: video });
  } catch (error) {
    logger.error("api error invalid server", error);
    return NextResponse.json(
      {
        error: error,
        message: "invalid server error | failed to fetch videos",
      },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(nextOptions);
    if (!session) {
      return NextResponse.json(
        { message: "user is not authorized" },
        { status: 401 }
      );
    }
    await connectTodb();

    const {
      title,
      description,
      videoUrl,
      thumnailUrl,
      controls,
      transformation,
    } = await req.json();

    if (!title || !description || !videoUrl || !thumnailUrl) {
      return NextResponse.json(
        { message: "Please fill all the required feilds" },
        { status: 401 }
      );
    }

    const video: typeof videoTable.$inferInsert = {
      title,
      description,
      videoUrl,
      thumnailUrl,
      controls: controls || true,
      transformation: {
        height: 1920,
        width: 1080,
        quanlity: transformation?.quality || 100,
      },
    };

    const newVideo = await db.insert(videoTable).values(video);

    logger.info("new video uploaded");
    return NextResponse.json(newVideo);
  } catch (error) {
    logger.error(error as string, "invaild server error");
    return NextResponse.json(
      { message: "invalid serve error", error: error },
      { status: 400 }
    );
  }
}
