"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsChevronDown } from "react-icons/bs";
export default function MobileMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative hover:bg-transparent">
          <p className="text-white text-sm mr-2">Browse</p>
          <BsChevronDown
            className={`text-white transition mt-1 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-full bg-black text-white text-center"
        align="end"
        forceMount
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="focus:text-gray-300 focus:bg-transparent">
            Home
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:text-gray-300 focus:bg-transparent">
            Series
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:text-gray-300 focus:bg-transparent">
            Films
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:text-gray-300 focus:bg-transparent">
            New & Popular
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:text-gray-300 focus:bg-transparent">
            My List
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:text-gray-300 focus:bg-transparent">
            Browse by Languages
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
