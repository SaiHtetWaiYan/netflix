"use client";
import React, { useCallback, useMemo } from "react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";
import { AiOutlinePlus } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
interface FavouriteButtonProps {
  movieId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavourites } = useFavourites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourite = useCallback(async () => {
    let response;

    if (isFavourite) {
      response = await axios.delete("/api/add-fav-movie", {
        data: { movieId },
      });
    } else {
      response = await axios.post("/api/add-fav-movie", { movieId });
    }
    const updatedFavourites = response?.data?.favouriteIds;
    mutate({
      ...currentUser,
      favouriteIds: updatedFavourites,
    });
    mutateFavourites();
  }, [isFavourite, movieId, currentUser, mutate, mutateFavourites]);

  return (
    <div
      onClick={toggleFavourite}
      className="cursor-pointer group/items w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      {isFavourite ? (
        <FaHeart className="text-red-700 " size={25} />
      ) : (
        <AiOutlinePlus className="text-white " size={25} />
      )}
    </div>
  );
};

export default FavouriteButton;
