"use client";

import { useState } from "react";

const termekek = [
  {
    id: 1,
    name: "Termek 1",
    leiras: "Termek 1 Leiras",
    nem: "Noi",
    kategoria: "Kategoria 1",
    szin: "Fekete",
    meret: "M",
    keszlet: 0,
    letrehozva: "2024-09-17",
  },
  {
    id: 2,
    name: "Termek 2",
    leiras: "Termek 2 Leiras",
    nem: "Ferfi",
    kategoria: "Kategoria 2",
    szin: "Fekete",
    meret: "L",
    keszlet: 0,
    letrehozva: "2024-09-18",
  },
  {
    id: 3,
    name: "Termek 3",
    leiras: "Termek 3 Leiras",
    nem: "Ferfi",
    kategoria: "Kategoria 3",
    szin: "Feher",
    meret: "XL",
    keszlet: 0,
    letrehozva: "2024-09-19",
  },
  {
    id: 4,
    name: "Termek 4",
    leiras: "Termek 4 Leiras",
    nem: "Noi",
    kategoria: "Kategoria 4",
    szin: "Piros",
    meret: "S",
    keszlet: 0,
    letrehozva: "2024-09-01",
  },
  {
    id: 5,
    name: "Termek 5",
    leiras: "Termek 5 Leiras",
    nem: "Ferfi",
    kategoria: "Kategoria 5",
    szin: "Fekete",
    meret: "XS",
    keszlet: 0,
    letrehozva: "2024-09-17",
  },
];

type Termek = {
  id: number;
  name: string;
  leiras: string;
  nem: string;
  kategoria: string;
  szin: string;
  meret: string;
  keszlet: number;
  letrehozva: string;
};

export default function NullaKeszletesTermekek() {
  const [open, setOpen] = useState(false);
  const [openOne, setOpenOne] = useState(false);

  const [termek, setTermek] = useState<Termek>({
    id: 0,
    name: "",
    leiras: "",
    nem: "",
    kategoria: "",
    szin: "",
    meret: "",
    keszlet: 0,
    letrehozva: "2024-09-17",
  });

  const openSingle = (termek: Termek) => {
    setTermek(termek);
    setOpenOne((prev) => !prev);
  };

  return (
    <div>
      <button
        className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
        onClick={() => setOpen((prev) => !prev)}
      >
        Nulla Készletes Termékek
      </button>
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
            <h1 className="text-xl font-semibold mb-4">
              Nulla Készletes Termékek
            </h1>
            <div className="grid grid-cols-3 gap-2 py-1 px-2 bg-black text-white rounded-t-md border-black border-t-2 border-l-2 border-r-2">
              <div>Azonosító</div>
              <div>Termék Név</div>
              <div>Létrehozva</div>
            </div>
            {termekek.map((termek) => (
              <div
                key={termek.id}
                className="gap-2 py-1 px-2 odd:bg-gray-200 border-gray-200 border-l-2 border-r-2 last:rounded-b-md last:border-b-2"
              >
                <div
                  className="grid grid-cols-3 hover:text-red-400 active:scale-95 transition ease-in-out duration-300 cursor-pointer"
                  onClick={() => openSingle(termek)}
                >
                  <div>{termek.id}</div>
                  <div>{termek.name}</div>
                  <div>{termek.letrehozva}</div>
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-red-400 text-white border-2 border-red-400 rounded-md px-4 py-2 hover:bg-white hover:text-red-400 transition ease-in-out duration-300 active:scale-95"
                onClick={() => setOpen((prev) => !prev)}
              >
                Vissza
              </button>
            </div>
          </div>
        </div>
      )}
      {openOne && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
            <div className="grid grid-cols-2 rounded-md border">
              <h3 className="p-2 font-semibold bg-gray-200">
                Termék Azonosító
              </h3>
              <p className="p-2 bg-gray-200">{termek?.id}</p>
              <h3 className="p-2 font-semibold">Termék Neve</h3>
              <p className="p-2">{termek?.name}</p>
              <h3 className="p-2 font-semibold bg-gray-200">Leírás</h3>
              <p className="p-2 bg-gray-200">{termek?.leiras}</p>
              <h3 className="p-2 font-semibold">Nem</h3>
              <p className="p-2">{termek?.nem}</p>
              <h3 className="p-2 font-semibold bg-gray-200">Kategória</h3>
              <p className="p-2 bg-gray-200">{termek?.kategoria}</p>
              <h3 className="p-2 font-semibold">Szín</h3>
              <p className="p-2">{termek?.szin}</p>
              <h3 className="p-2 font-semibold bg-gray-200">Méret</h3>
              <p className="p-2 bg-gray-200">{termek?.meret}</p>
              <h3 className="p-2 font-semibold">Készlet</h3>
              <p className="p-2">{termek?.keszlet}</p>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-red-400 text-white border-2 border-red-400 rounded-md px-4 py-2 hover:bg-white hover:text-red-400 transition ease-in-out duration-300 active:scale-95"
                onClick={() => setOpenOne((prev) => !prev)}
              >
                Vissza
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
