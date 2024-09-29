"use client";

import { ChangeEvent, useState, useEffect } from "react";

const szinek = [
  { id: 1, name: "Szürke" },
  { id: 2, name: "Piros" },
  { id: 3, name: "Fehér" },
  { id: 4, name: "Fekete" },
];

const meretek = [
  { id: 1, name: "M", order: 3 },
  { id: 2, name: "L", order: 4 },
  { id: 3, name: "XL", order: 5 },
  { id: 4, name: "S", order: 2 },
  { id: 5, name: "XS", order: 1 },
];

const variansok = [
  {
    variansId: 1,
    termekId: 1,
    name: "Termek 1",
    szin: "Fekete",
    meret: "M",
    keszlet: 10,
  },
  {
    variansId: 2,
    termekId: 1,
    name: "Termek 1",
    szin: "Fehér",
    meret: "L",
    keszlet: 5,
  },
  {
    variansId: 3,
    termekId: 2,
    name: "Termek 2",
    szin: "Feher",
    meret: "XL",
    keszlet: 3,
  },
  {
    variansId: 4,
    termekId: 2,
    name: "Termek 2",
    szin: "Feher",
    meret: "S",
    keszlet: 0,
  },
];

export default function KeszletModositas() {
  const [open, setOpen] = useState(false);
  const [termekAzonosito, setTermekAzonosito] = useState<number | null>(null);
  const [szin, setSzin] = useState<string | "">("");
  const [meret, setMeret] = useState<string | "">("");
  const [elerhetoSzinek, setElerhetoSzinek] = useState<string[]>([]);
  const [keszlet, setKeszlet] = useState<number | null>(null);

  useEffect(() => {
    if (termekAzonosito) {
      const colors = elerhetoSzinekIdAlapjan(termekAzonosito);
      setElerhetoSzinek(colors);
    }
  }, [termekAzonosito]);

  useEffect(() => {
    if (termekAzonosito && szin && meret) {
      const stock = getKeszlet(termekAzonosito, szin, meret);
      setKeszlet(stock);
    }
  }, [termekAzonosito, szin, meret]);

  function elerhetoSzinekIdAlapjan(termekId: number): string[] {
    const szurtVariansok = variansok.filter(
      (varians) => varians.termekId === termekId
    );

    const szinek = szurtVariansok.map((varians) => varians.szin);
    const egyediSzinek = Array.from(new Set(szinek));

    return egyediSzinek;
  }

  function getKeszlet(termekId: number, szin: string, meret: string): number {
    const varians = variansok.find(
      (v) => v.termekId === termekId && v.szin === szin && v.meret === meret
    );
    return varians ? varians.keszlet : 0;
  }

  function idChange(e: ChangeEvent<HTMLInputElement>) {
    setTermekAzonosito(parseInt(e.target.value));
  }

  function szinChange(e: ChangeEvent<HTMLSelectElement>) {
    setSzin(e.target.value);
  }

  function meretChange(e: ChangeEvent<HTMLSelectElement>) {
    setMeret(e.target.value);
  }

  return (
    <div>
      <button
        className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
        onClick={() => setOpen((prev) => !prev)}
      >
        Készlet Módosítása
      </button>
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
            <h1 className="text-xl font-semibold mb-4">Készlet Módosítása</h1>
            <div className="flex flex-col">
              <label>Termék Azonosító</label>
              <input
                type="number"
                className="border rounded-md p-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={termekAzonosito || ""}
                onChange={idChange}
              />
              <label>Szín</label>
              <select
                className="cursor-pointer border rounded-md p-2 mb-2"
                value={szin}
                onChange={szinChange}
              >
                <option disabled value=""></option>
                {elerhetoSzinek.map((szinOption) => (
                  <option key={szinOption} value={szinOption}>
                    {szinOption}
                  </option>
                ))}
              </select>
              <label>Méret</label>
              <select
                className="cursor-pointer border rounded-md p-2 mb-2"
                value={meret}
                onChange={meretChange}
              >
                <option disabled value=""></option>
                {meretek.map((meretOption) => (
                  <option key={meretOption.id} value={meretOption.name}>
                    {meretOption.name}
                  </option>
                ))}
              </select>
              <label>Készlet</label>
              <input
                type="number"
                className="border rounded-md p-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={keszlet!}
                readOnly
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
