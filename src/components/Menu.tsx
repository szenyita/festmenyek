"use client";
import MobilKosarLink from "./MobilKosarLink";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="md:hidden justify-end">
      <Image
        src={open ? "/menuzar.svg" : "/menu.svg"}
        alt="menu"
        width={30}
        height={30}
        className="cursor-pointer"
        onClick={handleClick}
      />
      {open && (
        <div className="bg-black text-white absolute top-16 left-0 w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-around text-lg py-20">
          <Link href="/" className="hover:text-red-400" onClick={handleClick}>
            Kezdőlap
          </Link>
          <Link
            href="/termekek?nem=noi"
            className="hover:text-red-400"
            onClick={handleClick}
          >
            Női
          </Link>
          <Link
            href="/termekek?nem=ferfi"
            className="hover:text-red-400"
            onClick={handleClick}
          >
            Férfi
          </Link>
          <Link
            href="/fiok"
            className="hover:text-red-400"
            onClick={handleClick}
          >
            Fiók
          </Link>
          <MobilKosarLink />
          <Link href="/" className="hover:text-red-400" onClick={handleClick}>
            Kijelentkezés
          </Link>
        </div>
      )}
    </div>
  );
}
