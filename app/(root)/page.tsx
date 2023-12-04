"use client";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
import Footer from "@/components/Footer";
export default function Home() {
  const { data: movies = [] } = useMovieList();
  const lastFourMovies = movies.slice(-4);
  const { data: favourites = [] } = useFavourites();
  const lastFourFavourites = favourites.slice(-4);
  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="py-10">
        <MovieList title="Trending Now" data={lastFourMovies} />
      </div>
      <div className="pb-40">
        <MovieList title="My List" data={lastFourFavourites} />
      </div>
      <Footer />
    </>
  );
}
