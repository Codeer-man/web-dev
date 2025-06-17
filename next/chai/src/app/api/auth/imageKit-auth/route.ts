import { logger } from "@/lib/logger/logger";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const { signature, token, expire } = getUploadAuthParams({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
      privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY as string,
    });
    return Response.json({
      signature,
      token,
      expire,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    logger.error("Invalid server error", error);
    return Response.json(
      { message: "Error in the api", error: error },
      { status: 401 }
    );
  }
}
