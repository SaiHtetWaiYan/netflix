import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    const { movieId } = params;

    if (typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }
    if (!movieId) {
      throw new Error("Invalid ID");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      throw new Error("Invalid ID");
    }
    return NextResponse.json(movie);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
