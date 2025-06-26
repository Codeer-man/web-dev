import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { timestamp } = await request.json();
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: "Next-asset-management",
      },
      process.env.CLOUD_API_SECRET as string
    );

    return NextResponse.json(
      {
        timestamp,
        signature,
        apiKey: process.env.CLOUD_API_KEY,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while generation cloudinary signature", error);
    return NextResponse.json(
      {
        error,
        message: "Failed to generate signarure",
      },
      { status: 500 }
    );
  }
}
