"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getPreviousOrders } from "@/lib/rendelesKezeles";

type Rendeles = {
  rendelesId: string;
  datum: Date;
  felhasznaloId: string;
  vezeteknev: string;
  keresztnev: string;
  telefonszam: string;
  varos: string;
  iranyitoszam: number;
  utca: string;
  hazszam: number;
  emelet: number | null;
  ajto: number | null;
  csengo: number | null;
  festmenyek: {
    festmenyId: string;
    nev: string;
    kep: string;
    ar: number;
    leiras: string;
    stilus: string;
    ev: number;
    meret: string;
    datum: Date;
    rendelesId: string | null;
  }[];
};

function formatCurrency(number: number) {
  return (
    new Intl.NumberFormat("hu-HU", {
      minimumFractionDigits: 0,
    }).format(number) + " Ft"
  );
}

export default function Rendelesek() {
  const params = useParams();
  const [rendelesek, setRendelesek] = useState<Rendeles[]>([]);
  const context = useContext(AuthContext);
  useEffect(() => {
    const fetchRendelesek = async () => {
      if (context?.contextFelhasznalo) {
        const rendelesek = await getPreviousOrders(
          context.contextFelhasznalo.felhasznaloId
        );
        if (rendelesek) {
          setRendelesek(rendelesek);
        }
      }
    };

    fetchRendelesek();
  }, [context]);

  const rendelesId = params.id;
  const rendeles = rendelesek.find((r) => r.rendelesId === rendelesId);

  if (!context?.contextFelhasznalo) {
    return (
      <div className="mt-6 mx-12 mb-auto flex flex-col min-h-[calc(100vh-368px)] lg:w-[660px] lg:mx-auto lg:mt-16">
        <div className="mb-6 text-lg ">
          <p className="font-semibold">Rendelés Azonosító</p>
        </div>
        <div className="mb-6 text-lg">
          <p className="font-semibold">Dátum</p>
        </div>

        <h2 className="font-semibold text-lg">Termékek</h2>
        <div className="grid grid-cols-2 gap-2 py-1 px-2 bg-black text-white rounded-t-md border-black border-t-2 border-l-2 border-r-2 md:w-[660px]">
          <div>Név</div>
          <div>Vételár</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 mx-12 mb-auto flex flex-col min-h-[calc(100vh-368px)] lg:w-[660px] lg:mx-auto lg:mt-16">
      <div className="mb-6 text-lg ">
        <p className="font-semibold">Rendelés Azonosító</p>
        <p>{rendeles?.rendelesId}</p>
      </div>
      <div className="mb-6 text-lg">
        <p className="font-semibold">Dátum</p>{" "}
        <p>{rendeles?.datum.toLocaleDateString("hu-HU")}</p>
      </div>

      <h2 className="font-semibold text-lg">Termékek</h2>
      <div className="grid grid-cols-2 gap-2 py-1 px-2 bg-black text-white rounded-t-md border-black border-t-2 border-l-2 border-r-2 md:w-[660px]">
        <div>Név</div>
        <div>Vételár</div>
      </div>
      {rendeles?.festmenyek.map((termek) => (
        <div
          key={termek.festmenyId}
          className="gap-2 py-1 px-2 odd:bg-gray-200 border-gray-200 border-l-2 border-r-2 last:rounded-b-md last:border-b-2 md:w-[660px]"
        >
          <Link
            href={`/termekek/${termek.festmenyId}`}
            className="grid grid-cols-2 hover:text-gold active:scale-95 transiton ease-in-out duration-300"
          >
            <div>{termek.nev}</div>
            <div>{formatCurrency(termek.ar)}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
