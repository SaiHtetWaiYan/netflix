import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const body = await req.json();
    const { movieId } = body;
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) {
      throw new Error("Invalid ID");
    }
    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favouriteIds: {
          push: movieId,
        },
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const body = await req.json();
    const { movieId } = body;
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) {
      throw new Error("Invalid ID");
    }
    const updatedFavouriteIds = without(currentUser.favouriteIds, movieId);

    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favouriteIds: updatedFavouriteIds,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 400 });
  }
}
