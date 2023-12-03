import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
export async function GET() {
  try {
    await serverAuth();
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return NextResponse.json(randomMovie[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
