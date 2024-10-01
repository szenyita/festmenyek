"use client";

import { useState } from "react";

export default function Mennyiseg() {
  const [mennyiseg, setMennyiseg] = useState(1);

  const handleMennyisegNo = () => {
    setMennyiseg((prev) => prev + 1);
  };

  const handleMennyisegCsokken = () => {
    if (mennyiseg > 1) {
      setMennyiseg((prev) => prev - 1);
    }
  };

  return (
    <div className="flex font-semibold text-lg">
      <button
        className="bg-gray-100 px-2 rounded-l-xl border-l-2 border-t-2 border-b-2  active:bg-gray-200 transition ease-in-out duration-300"
        onClick={() => handleMennyisegCsokken()}
      >
        -
      </button>
      <p className="bg-gray-100 border-t-2 border-b-2 w-6 flex justify-center text-md">
        {mennyiseg}
      </p>
      <button
        className="bg-gray-100 px-2 rounded-r-xl border-r-2 border-t-2 border-b-2 active:bg-gray-200 transition ease-in-out duration-300"
        onClick={() => handleMennyisegNo()}
      >
        +
      </button>
    </div>
  );
}
