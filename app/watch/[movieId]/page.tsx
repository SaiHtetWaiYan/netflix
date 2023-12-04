"use client";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Watch({ params }: { params: { movieId: string } }) {
  const router = useRouter();
  const { movieId } = params;
  const { data } = useMovie(movieId);
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          className="text-white cursor-pointer"
          size={40}
          onClick={() => router.back()}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>

      <video src={data?.videoUrl} autoPlay controls className="h-full w-full" />
    </div>
  );
}
