"use client";

import Image from "next/image";
import { useState } from "react";
import MobilKosarOldal from "./MobilKosarOldal";

export default function MobilKosar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <div onClick={() => setOpen((prev) => !prev)}>Kosár (1)</div>
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
