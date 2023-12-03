"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavourites = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/fav-movies",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFavourites;
