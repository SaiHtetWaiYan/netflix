import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    await serverAuth();

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

// import { NextResponse, NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   return NextResponse.json({
//     messsage: "hello world",
//   });
// }
