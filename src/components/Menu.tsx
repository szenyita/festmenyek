"use client";
import { AuthContext } from "@/context/AuthContext";
import MobilKosarLink from "./MobilKosarLink";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

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
          <Link
            href="/"
            className="hover:text-gold ease-in-out duration-300 active:scale-95"
            onClick={handleClick}
          >
            Kezdőlap
          </Link>
          {context.contextFelhasznalo && (
            <Link
              href="/fiok"
              className="hover:text-gold ease-in-out duration-300 active:scale-95"
              onClick={handleClick}
            >
              Fiók
            </Link>
          )}
          <MobilKosarLink />
          {context.contextFelhasznalo && (
            <p
              className="hover:text-gold ease-in-out duration-300 active:scale-95"
              onClick={() => {
                context.setContextFelhasznalo(null);
                context.setContextToken(null);
              }}
            >
              Kijelentkezés
            </p>
          )}
          {!context.contextFelhasznalo && (
            <Link
              href="/bejelentkezes"
              className="hover:text-gold ease-in-out duration-300 active:scale-95"
              onClick={handleClick}
            >
              Bejelentkezés
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
