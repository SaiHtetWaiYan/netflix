"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BsChevronDown } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
export default function AccountMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <DropdownMenu onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative hover:bg-transparent ">
          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="profile" />
            </div>

            <BsChevronDown
              className={`text-white transition mt-1 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full bg-black text-white text-center"
        align="end"
        forceMount
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="focus:text-gray-300 focus:bg-transparent">
            <img
              className="w-8 rounded-md mr-4"
              src="/images/default-blue.png"
              alt="profile"
            />
            {session?.user?.name}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="focus:text-gray-300 focus:bg-transparent"
          onClick={() => signOut()}
        >
          <IoIosLogOut className="w-8 h-4  mr-4" />
          Sign out of Netflix
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
