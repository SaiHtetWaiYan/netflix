"use client";
import { useRouter } from "next/navigation";
export default function Profile({ name }: { name: string }) {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/")}>
      <div className="group flex-row w-44 mx-auto">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <img src="/images/default-blue.png" alt="Profile" />
        </div>
        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
          {name}
        </div>
      </div>
    </div>
  );
}
