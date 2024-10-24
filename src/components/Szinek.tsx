"use client";

import { useState } from "react";

export default function Szinek() {
  const szinek = [
    { nev: "Szürke", szin: "gray-400" },
    { nev: "Piros", szin: "red-400" },
    { nev: "Fehér", szin: "white" },
    { nev: "Fekete", szin: "black" },
  ];
  const [valasztottSzin, setValasztottSzin] = useState("");

  return (
    <div className="flex gap-0.5">
      {szinek.map((szin) => (
        <div
          key={szin.nev}
          className={`rounded-full flex items-center justify-center border-[2px]  ${
            valasztottSzin === szin.nev
              ? "border-gray-300 "
              : "border-transparent"
          }`}
        >
          <div
            className={`bg-${
              szin.szin
            } cursor-pointer rounded-full w-5 h-5 m-[1px]  hover:border-${
              szin.szin
            } transition ease-in-out duration-300 active:scale-95 border-[1px] border-black ${
              valasztottSzin === szin.nev ? `border-${szin.szin}` : ""
            }`}
            onClick={() => setValasztottSzin(szin.nev)}
          ></div>
        </div>
      ))}
    </div>
  );
}
