import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
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
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      >
        <div className="w-full h-full bg-black bg-opacity-50">
          <nav className="px-12 py-5">
            <img src="/images/logo.png" alt="netflix logo" className="h-10" />
          </nav>
          {children}
        </div>
      </div>
    </>
  );
}
