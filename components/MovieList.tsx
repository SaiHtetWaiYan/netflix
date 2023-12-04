"use client";
import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "@/components/MovieCard";
import { useRouter, usePathname } from "next/navigation";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  const router = useRouter();
  const pathname = usePathname();

  if (isEmpty(data)) {
    return null;
  }

  const shouldShowShowAllButton = !pathname.startsWith("/collection");

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div className="flex justify-between items-center">
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        {shouldShowShowAllButton && (
          <p
            onClick={() => router.push(`/collection/${title}`)}
            className="text-white text-sm md:text-md lg:text-xl hover:font-bold hover:text-red-600 mb-4 cursor-pointer"
          >
            Show All
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
        {data.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
