"use client";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push(`/watch/${movieId}`)}>
        <BsFillPlayFill size={20} className="mr-1" />
        Play
      </Button>
    </div>
  );
};

export default PlayButton;
