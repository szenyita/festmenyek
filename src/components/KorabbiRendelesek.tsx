"use client";

import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getPreviousOrders } from "@/lib/rendelesKezeles";
import { useRouter } from "next/navigation";

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

export default function KorabbiRendelesek() {
  const [rendelesek, setRendelesek] = useState<Rendeles[]>([]);
  const [noPrev, setNoPrev] = useState("");
  const context = useContext(AuthContext);

  useEffect(() => {
    const fetchRendelesek = async () => {
      if (context?.contextFelhasznalo) {
        const rendelesek = await getPreviousOrders(
          context.contextFelhasznalo.felhasznaloId
        );
        if (rendelesek.length > 0) {
          setRendelesek(rendelesek);
        } else {
          setNoPrev("Nincsenek korábbi rendelések.");
        }
      }
    };

    fetchRendelesek();
  }, [context]);

  const router = useRouter();

  if (!context?.contextFelhasznalo) {
    router.push("/bejelentkezes");
  }

  return (
    <div className="mx-12 sm:mx-24  md:mx-60 lg:mx-12 mb-12 lg:w-1/3">
      <h1 className="mb-3 mt-10 md:mt-5 font-semibold text-lg">
        Korábbi Rendelések
      </h1>
      {rendelesek.length > 0 ? (
        <div className="grid grid-cols-3 py-1 px-2 bg-black text-white rounded-t-md border-black border-t-2 border-l-2 border-r-2">
          <div className="px-2">Azonosító</div>
          <div className="px-2">Végösszeg</div>
          <div className="px-2">Dátum</div>
        </div>
      ) : (
        <p>{noPrev}</p>
      )}
      {rendelesek.map((rendeles) => (
        <div
          key={rendeles.rendelesId}
          className="py-1 px-2 odd:bg-gray-200 border-gray-200 border-l-2 border-r-2 last:rounded-b-md last:border-b-2"
        >
          <Link
            href={`/rendelesek/${rendeles.rendelesId}`}
            className="grid grid-cols-3 hover:text-gold active:scale-95 transition ease-in-out duration-300"
          >
            <div className="px-2">{rendeles.rendelesId}</div>
            <div className="px-2">
              {formatCurrency(
                rendeles.festmenyek.reduce((a, b) => a + b.ar, 0)
              )}
            </div>
            <div className="px-2">
              {rendeles.datum.toLocaleDateString("hu-HU")}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
