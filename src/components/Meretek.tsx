"use client";

import { useState } from "react";

export default function Meretek() {
  const meretek = ["XS", "S", "M", "L", "XL"];
  const [valasztottMeret, setValasztottMeret] = useState("");

  return (
    <div className="flex gap-1">
      {meretek.map((meret) => (
        <button
          key={meret}
          onClick={() => setValasztottMeret(meret)}
          className={`w-8 h-8 flex justify-center items-center text-red-400 border-2 border-red-400 rounded-md hover:bg-red-400 hover:text-white transition ease-in-out duration-300 active:scale-95 ${
            valasztottMeret === meret ? "bg-red-400 text-white" : ""
          }`}
        >
          {meret}
        </button>
      ))}
    </div>
  );
}
