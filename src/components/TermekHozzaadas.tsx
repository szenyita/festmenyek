"use client";

import { useState } from "react";

const nemek = [
  { id: 1, name: "Nő" },
  { id: 2, name: "Férfi" },
];

const kategoriak = [
  { id: 1, name: "Kutya" },
  { id: 2, name: "Kiskutya" },
  { id: 3, name: "Vau" },
  { id: 4, name: "Kisvau" },
];

export default function TermekHozzaadas() {
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const submit = () => {
    setOpen(false);
    setOpenSuccess(true);
  };

  return (
    <div>
      <button
        className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
        onClick={() => setOpen((prev) => !prev)}
      >
        Termék Hozzáadása
      </button>
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
            <h1 className="text-xl font-semibold mb-4">Termék Hozzáadása</h1>
            <div className="flex flex-col">
              <label>Termék Neve</label>
              <input type="text" className="border rounded-md p-2 mb-2" />
              <label>Leírás</label>
              <input type="text" className="border rounded-md p-2 mb-2" />
              <label>Nem</label>
              <select className="cursor-pointer border rounded-md p-2 mb-2">
                <option disabled selected></option>
                {nemek.map((nem) => (
                  <option key={nem.id} value={nem.name}>
                    {nem.name}
                  </option>
                ))}
              </select>
              <label>Kategória</label>
              <select className="cursor-pointer border rounded-md p-2 mb-2">
                <option disabled selected></option>
                {kategoriak.map((kategoria) => (
                  <option key={kategoria.id} value={kategoria.name}>
                    {kategoria.name}
                  </option>
                ))}
              </select>
              <label>Ár</label>
              <input
                type="number"
                className="border rounded-md p-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                onClick={() => submit()}
              >
                Mentés
              </button>
            </div>
          </div>
        </div>
      )}
      {openSuccess && (
        <div className="fixed inset-0 z-40">
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
              <h1 className="text-xl font-semibold mb-4">Termék hozzáadva</h1>
              <h3 className="text-lg mb-4">Termék Azonosító: 4546422352</h3>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
                  onClick={() => setOpenSuccess((prev) => !prev)}
                >
                  Vissza
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
