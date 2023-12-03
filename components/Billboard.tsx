"use client";
import useBillboard from "@/hooks/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import PlayButton from "@/components/PlayButton";
import { useCallback } from "react";
import useInfoModal from "@/hooks/useInfoModal";
const Billboard = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();
  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [data?.id, openModal]);
  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      />
      <div className="absolute top-[30%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-2xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-2xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <Button variant="secondary" onClick={handleOpenModal}>
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
