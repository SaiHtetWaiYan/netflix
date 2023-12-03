import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    const favouriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favouriteIds,
        },
      },
    });
    return NextResponse.json(favouriteMovies);
  } catch (error) {
    console.log(error);
  }
}
