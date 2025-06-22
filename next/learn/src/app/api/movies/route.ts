import { NextRequest } from "next/server";
import { movieData } from "./db";

export async function GET() {
  return new Response("hello world");
}

export async function POST(req: NextRequest) {
  let movies = await req.json();

  const newMovie = { ...movies };

  if (!newMovie) {
    throw Error;
  }

  return Response.json(movieData);
}
