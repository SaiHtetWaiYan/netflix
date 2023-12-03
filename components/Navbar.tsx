"use client";
import { useState, useEffect } from "react";
import NavbarItem from "@/components/NavbarItem";
import MobileMenu from "@/components/MobileMenu";
import AccountMenu from "@/components/AccountMenu";
import { BsBell, BsSearch } from "react-icons/bs";
import Image from "next/image";
const TOP_OFFSET = 66;
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          isScrolled && "bg-zinc-900 bg-opacity-90"
        }`}
      >
        <Image
          className="h-4 lg:h-7"
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <MobileMenu />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <AccountMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
