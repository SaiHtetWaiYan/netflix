"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Profile({ name }: { name: string }) {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/")}>
      <div className="group flex-row w-44 mx-auto">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <Image
            src="/images/default-blue.png"
            alt="Profile"
            width={320}
            height={320}
          />
        </div>
        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
          {name}
        </div>
      </div>
    </div>
  );
}
