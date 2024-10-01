"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const rendelesek = [
  {
    id: 1,
    termekek: [
      { id: 1, name: "Poló", price: 10000 },
      { id: 2, name: "Ing", price: 20000 },
      { id: 3, name: "Pulcsi", price: 15000 },
    ],
    datum: "2022.01.01",
  },
  {
    id: 2,
    termekek: [
      { id: 1, name: "Poló", price: 10000 },
      { id: 2, name: "Ing", price: 20000 },
      { id: 3, name: "Pulcsi", price: 15000 },
    ],
    datum: "2022.01.01",
  },
  {
    id: 6342142,
    termekek: [
      { id: 1, name: "Poló", price: 10000 },
      { id: 2, name: "Ing", price: 20000 },
      { id: 3, name: "Pulcsi", price: 15000 },
    ],
    datum: "2022.01.01",
  },
];

function formatCurrency(number: number) {
  return (
    new Intl.NumberFormat("hu-HU", {
      minimumFractionDigits: 0,
    }).format(number) + " Ft"
  );
}

export default function Rendelesek() {
  const params = useParams();
  const rendelesId = Number(params.id);
  const rendeles = rendelesek.find((r) => r.id === rendelesId);

  if (!rendeles) {
    return <div>Rendelés nem található.</div>;
  }

  return (
    <div className="mt-6 mx-12 mb-auto flex flex-col min-h-[calc(100vh-280px)] lg:w-[660px] lg:mx-auto lg:mt-16">
      <div className="mb-6 text-lg ">
        <p className="font-semibold">Rendelés Azonosító</p>
        <p>{rendeles.id}</p>
      </div>
      <div className="mb-6 text-lg">
        <p className="font-semibold">Dátum</p> <p>{rendeles.datum}</p>
      </div>

      <h2 className="font-semibold text-lg">Termékek</h2>
      <div className="grid grid-cols-2 gap-2 py-1 px-2 bg-black text-white rounded-t-md border-black border-t-2 border-l-2 border-r-2 md:w-[660px]">
        <div>Név</div>
        <div>Vételár</div>
      </div>
      {rendeles.termekek.map((termek) => (
        <div
          key={termek.id}
          className="gap-2 py-1 px-2 odd:bg-gray-200 border-gray-200 border-l-2 border-r-2 last:rounded-b-md last:border-b-2 md:w-[660px]"
        >
          <Link
            href={`/termekek/${termek.id}`}
            className="grid grid-cols-2 hover:text-red-400 active:scale-95 transiton ease-in-out duration-300"
          >
            <div>{termek.name}</div>
            <div>{formatCurrency(termek.price)}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
