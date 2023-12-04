"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export default function Watch({ params }: { params: { moviesUrl: string } }) {
  const { moviesUrl } = params;
  const title = moviesUrl.replace(/%20/g, " ").replace(/[^a-zA-Z\s]/g, "");
  const [movies, setMovies] = useState([]);

  const { data: trendingMovies } = useMovieList();
  const { data: myFavouriteMovies } = useFavourites();
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    if (title === "Trending Now") {
      setMovies(trendingMovies || []);
    }

    if (title === "My List") {
      setMovies(myFavouriteMovies || []);
    }
  }, [title, trendingMovies, myFavouriteMovies]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="py-20">
        <MovieList title={title} data={movies} />
      </div>
      <Footer />
    </>
  );
}
