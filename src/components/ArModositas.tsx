"use client";

import { useState, useEffect, ChangeEvent } from "react";

const termekek = [
  { id: 1, ar: 10000 },
  { id: 2, ar: 20000 },
  { id: 3, ar: 15000 },
  { id: 4, ar: 25000 },
];

export default function ArModositas() {
  const [open, setOpen] = useState(false);
  const [termekAzonosito, setTermekAzonosito] = useState<number | null>(null);
  const [ar, setAr] = useState<number | null>(null);

  useEffect(() => {
    if (termekAzonosito) {
      const termek = termekek.find((t) => t.id === termekAzonosito);
      setAr(termek ? termek.ar : null);
    } else {
      setAr(null);
    }
  }, [termekAzonosito]);

  function handleAzonositoChange(e: ChangeEvent<HTMLInputElement>) {
    setTermekAzonosito(parseInt(e.target.value));
  }

  function handleArChange(e: ChangeEvent<HTMLInputElement>) {
    setAr(parseInt(e.target.value));
  }

  return (
    <div>
      <button
        className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
        onClick={() => setOpen((prev) => !prev)}
      >
        Ár Módosítása
      </button>
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
            <h1 className="text-xl font-semibold mb-4">Ár Módosítása</h1>
            <div className="flex flex-col">
              <label>Termék Azonosító</label>
              <input
                type="number"
                className="border rounded-md p-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={termekAzonosito || ""}
                onChange={handleAzonositoChange}
              />
              <label>Ár</label>
              <input
                type="number"
                className="border rounded-md p-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={ar || ""}
                onChange={handleArChange}
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-red-400 text-white border-2 border-red-400 rounded-md px-4 py-2 hover:bg-white hover:text-red-400 transition ease-in-out duration-300 active:scale-95"
                onClick={() => setOpen((prev) => !prev)}
              >
                Vissza
              </button>
              <button
                className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
                onClick={() => setOpen((prev) => !prev)}
              >
                Mentés
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
