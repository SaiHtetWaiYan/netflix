import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const shouldHideScroll = true;
  if (session) {
    redirect("/");
  }

  return (
    <>
      <div
        className={`relative bg-no-repeat bg-center bg-fixed bg-cover h-screen w-screen ${
          shouldHideScroll ? "overflow-hidden" : ""
        }`}
        style={{ backgroundImage: "url(/images/bg.jpg)" }}
      >
        <div className="w-full h-full bg-black bg-opacity-50">
          <nav className="px-12 py-5 flex justify-between items-center">
            <Image
              src="/images/logo.png"
              alt="netflix logo"
              width={100}
              height={100}
            />
          </nav>
          {children}
        </div>
      </div>
    </>
  );
}
