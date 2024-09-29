"use client";
import { useState } from "react";

const rendelesek = [
  {
    id: 1,
    felhasznalo: {
      nev: "Kovács János",
      telefon: "+36 30 123 4567",
      varos: "Budapest",
      iranyitoszam: "1011",
      utca: "Fő utca",
      hazszam: "1",
      csengo: 1234,
      emelet: 3,
      ajto: 12,
    },
    datum: "2022.01.01",
    termekek: [
      { id: 1, name: "Poló", price: 10000 },
      { id: 2, name: "Ing", price: 20000 },
      { id: 3, name: "Pulcsi", price: 15000 },
    ],
  },
  {
    id: 2,
    felhasznalo: {
      nev: "Nagy Anna",
      telefon: "+36 20 987 6543",
      varos: "Debrecen",
      iranyitoszam: "4026",
      utca: "Kossuth utca",
      hazszam: "10",
    },
    datum: "2022.01.02",
    termekek: [
      { id: 1, name: "Kabát", price: 30000 },
      { id: 2, name: "Nadrág", price: 25000 },
    ],
  },
  {
    id: 3,
    felhasznalo: {
      nev: "Szabó Péter",
      telefon: "+36 70 456 7890",
      varos: "Miskolc",
      iranyitoszam: "3510",
      utca: "Arany János utca",
      hazszam: "5",
    },
    datum: "2022.01.03",
    termekek: [
      { id: 1, name: "Zokni", price: 5000 },
      { id: 2, name: "Sapka", price: 7000 },
    ],
  },
  {
    id: 4,
    felhasznalo: {
      nev: "Kiss Júlia",
      telefon: "+36 30 345 6789",
      varos: "Pécs",
      iranyitoszam: "7621",
      utca: "Váci Mihály utca",
      hazszam: "8",
    },
    datum: "2022.01.04",
    termekek: [
      { id: 1, name: "Könyv", price: 12000 },
      { id: 2, name: "Táska", price: 18000 },
    ],
  },
  {
    id: 5,
    felhasznalo: {
      nev: "Tóth László",
      telefon: "+36 70 321 4321",
      varos: "Szeged",
      iranyitoszam: "6720",
      utca: "Kálvária sugárút",
      hazszam: "3",
    },
    datum: "2022.01.05",
    termekek: [
      { id: 1, name: "Pulóver", price: 15000 },
      { id: 2, name: "Sál", price: 8000 },
    ],
  },
];

export default function SzallitasKezeles() {
  const [selectedRendeles, setSelectedRendeles] = useState<number | null>(null);

  const handleConfirmDelivery = () => {
    if (selectedRendeles !== null) {
      setSelectedRendeles(null);
    }
  };

  const selectedRendelesData = rendelesek.find(
    (r) => r.id === selectedRendeles
  );

  return (
    <div className="mx-12 sm:mx-24 md:mx-60 lg:mx-12 mb-12 lg:w-1/3">
      <h1 className="mb-3 mt-10 md:mt-5 font-semibold text-lg">
        Aktív Rendelések
      </h1>
      <div className="grid grid-cols-3 gap-2 py-1 px-2 bg-black text-white rounded-t-md border-black border-t-2 border-l-2 border-r-2">
        <div>Azonosító</div>
        <div>Cím</div>
        <div>Dátum</div>
      </div>
      {rendelesek.map((rendeles) => (
        <div
          key={rendeles.id}
          className="gap-2 py-1 px-2 odd:bg-gray-200 border-gray-200 border-l-2 border-r-2 last:rounded-b-md last:border-b-2"
        >
          <div
            onClick={() => setSelectedRendeles(rendeles.id)}
            className="grid grid-cols-3 cursor-pointer hover:text-red-400 active:scale-95 transition ease-in-out duration-300"
          >
            <div>{rendeles.id}</div>
            <div>
              {`${rendeles.felhasznalo.varos} ${rendeles.felhasznalo.iranyitoszam} ${rendeles.felhasznalo.utca} ${rendeles.felhasznalo.hazszam}`}
            </div>
            <div>{rendeles.datum}</div>
          </div>
        </div>
      ))}

      {selectedRendelesData && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-xl font-semibold mb-4">Rendelés Részletei</h2>
            <div className="mb-4">
              <p className="font-medium">Felhasználó neve:</p>
              <p>{selectedRendelesData.felhasznalo.nev}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Telefonszám:</p>
              <p>{selectedRendelesData.felhasznalo.telefon}</p>
            </div>
            {selectedRendelesData.felhasznalo.csengo && (
              <div className="mb-4">
                <p className="font-medium">Csengőszám:</p>
                <p>{selectedRendelesData.felhasznalo.csengo}</p>
              </div>
            )}
            {selectedRendelesData.felhasznalo.emelet && (
              <div className="mb-4">
                <p className="font-medium">Emelet:</p>
                <p>{selectedRendelesData.felhasznalo.emelet}</p>
              </div>
            )}
            {selectedRendelesData.felhasznalo.ajto && (
              <div className="mb-4">
                <p className="font-medium">Ajtó:</p>
                <p>{selectedRendelesData.felhasznalo.ajto}</p>
              </div>
            )}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-red-400 text-white border-2 border-red-400 rounded-md px-4 py-2 hover:bg-white hover:text-red-400 transition ease-in-out duration-300 active:scale-95"
                onClick={() => setSelectedRendeles(null)}
              >
                Vissza
              </button>
              <button
                type="button"
                className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
                onClick={handleConfirmDelivery}
              >
                Kiszállítás megerősítése
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
