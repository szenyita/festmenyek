"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import MobilKosarOldal from "./MobilKosarOldal";
import { CartContext } from "@/context/CartContext";

export default function MobilKosar() {
  const [open, setOpen] = useState(false);

  const context = useContext(CartContext);
  if (!context) {
    return null;
  }

  const { cart } = context;

  return (
    <div className="">
      <div
        className="cursor-pointer hover:text-gold ease-in-out duration-300 active:scale-95"
        onClick={() => setOpen((prev) => !prev)}
      >{`Kosár (${cart.length})`}</div>
      {open && (
        <div className="bg-white absolute top-0 left-0 h-[calc(100vh-4rem)] w-full flex flex-col items-center overflow-y-auto">
          <Image
            src="vissza.svg"
            alt=""
            height={30}
            width={30}
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer absolute top-4 right-4"
          />
          <MobilKosarOldal />
        </div>
      )}
    </div>
  );
}
