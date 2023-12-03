import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export async function GET() {
  try {
    const movies = await prismadb.movie.findMany();
    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
