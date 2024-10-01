"use client";

import { useState } from "react";
import { updateFestmeny } from "@/lib/festmenyKezeles";

const stilusok = [
  { id: 1, name: "Absztrakt" },
  { id: 2, name: "Impresszionizmus" },
  { id: 3, name: "Realizmus" },
  { id: 4, name: "Posztimpresszionizmus" },
  { id: 5, name: "Fauvizmus" },
  { id: 6, name: "Futurizmus" },
  { id: 7, name: "Kubizmus" },
  { id: 8, name: "Romantika" },
];

const meretek = [
  { id: 1, name: "m40x60" },
  { id: 2, name: "m50x60" },
  { id: 3, name: "m60x90" },
  { id: 4, name: "m90x120" },
];

export default function FestmenyModositas() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    updateFestmeny(formData);
    setOpen(false);
  };

  return (
    <div>
      <button
        className="w-[15vw] bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
        onClick={() => setOpen((prev) => !prev)}
      >
        Festmény Módosítása
      </button>
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <form
            action={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8 w-1/3"
          >
            <h1 className="text-xl font-semibold mb-4">Festmény Módosítása</h1>
            <div className="flex flex-col">
              <label>Festmény Id</label>
              <input
                id="festmenyId"
                name="festmenyId"
                type="text"
                className="border rounded-md p-2 mb-2"
              />
              <label>Festmény Neve</label>
              <input
                id="nev"
                name="nev"
                type="text"
                className="border rounded-md p-2 mb-2"
              />
              <label>Leírás</label>
              <input
                id="leiras"
                name="leiras"
                type="text"
                className="border rounded-md p-2 mb-2"
              />
              <label>Stílus</label>
              <select
                id="stilus"
                name="stilus"
                className="cursor-pointer border rounded-md p-2 mb-2"
              >
                <option disabled selected></option>
                {stilusok.map((stilus) => (
                  <option key={stilus.id} value={stilus.name}>
                    {stilus.name}
                  </option>
                ))}
              </select>
              <label>Méret</label>
              <select
                id="meret"
                name="meret"
                className="cursor-pointer border rounded-md p-2 mb-2"
              >
                <option disabled selected></option>
                {meretek.map((meret) => (
                  <option key={meret.id} value={meret.name}>
                    {meret.name}
                  </option>
                ))}
              </select>
              <label>Év</label>
              <input
                id="ev"
                name="ev"
                type="number"
                className="border rounded-md p-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <label>Ár</label>
              <input
                id="ar"
                name="ar"
                type="number"
                className="border rounded-md p-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <label>Kép</label>
              <input
                id="kep"
                name="kep"
                type="text"
                className="border rounded-md p-2 mb-2"
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
                type="submit"
                className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
              >
                Mentés
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
