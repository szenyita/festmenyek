"use client";
import Image from "next/image";
import Fiok from "./Fiok";
import Kosar from "./Kosar";
import { useState } from "react";

export default function FejlecIkonok() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="md:flex w-1/3 justify-end hidden relative">
      <Image
        src="/fiok.svg"
        alt=""
        width={26}
        height={26}
        className="cursor-pointer mr-4 md:mr-6"
        onClick={() => setProfileOpen((prev) => !prev)}
      />
      {profileOpen && <Fiok />}
      <div className="items-center flex relative">
        <Image
          src="/kosar.svg"
          alt=""
          width={26}
          height={26}
          className="cursor-pointer"
          onClick={() => setCartOpen((prev) => !prev)}
        />
        <div className="absolute top-0 left-4 bg-red-400 rounded-full w-4 h-4 flex justify-center items-center text-white text-xs">
          2
        </div>
      </div>
      {cartOpen && <Kosar />}
    </div>
  );
}
