import { getServerSession } from "next-auth";
import Profile from "@/app/profile/profile";
export default async function Page() {
  const session = await getServerSession();

  return (
    <div className="flex items-center h-full justify-center ">
      <div className="flex flex-col my-20">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <Profile name={session?.user?.name || ""} />
        </div>
      </div>
    </div>
  );
}
