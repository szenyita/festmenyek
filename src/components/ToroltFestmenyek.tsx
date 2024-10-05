"use client";

import Image from "next/image";
import { getDeletedFestmeny } from "@/lib/festmenyKezeles";
import { useEffect, useState } from "react";
import { Meret, Stilus } from "@prisma/client";

export default function ToroltFestmenyek() {
  const [festmenyek, setFestmenyek] = useState<
    {
      festmenyId: string;
      nev: string;
      kep: string;
      ar: number;
      leiras: string;
      stilus: Stilus;
      ev: number;
      meret: Meret;
      datum: Date;
      elerheto: boolean;
      rendelesId: string | null;
    }[]
  >([]);

  const gettingDeletedFestmeny = async () => {
    const festmenyek = await getDeletedFestmeny();
    setFestmenyek(festmenyek);
  };

  useEffect(() => {
    gettingDeletedFestmeny();
  }, []);

  const formatPrice = (price: number) => {
    return (
      price.toLocaleString("hu-HU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) + " Ft"
    );
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-20 border-2 mx-[9vw] py-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-12">Törölt Festményekt</h2>
      <div className="flex flex-col gap-12">
        {festmenyek.length === 0 && (
          <p className="font-medium">Nincsenek törölt festmények</p>
        )}
        {festmenyek.map((festmeny) => (
          <div key={festmeny.festmenyId} className="flex mx-28">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src={festmeny.kep}
                alt="kep"
                width={100}
                height={100}
                className="h-full w-auto object-contain border-gray-300 border-2 rounded-md overflow-hidden shadow-md"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>
                <strong>Festmény Id: </strong>
                {festmeny.festmenyId}
              </p>
              <p>
                <strong>Festmény neve: </strong>
                {festmeny.nev}
              </p>
              <p>
                <strong>Leírás: </strong>
                {festmeny.leiras}
              </p>
              <p>
                <strong>Stílus: </strong>
                {festmeny.stilus}
              </p>
              <p>
                <strong>Méret: </strong>
                {festmeny.meret}
              </p>
              <p>
                <strong>Év: </strong>
                {festmeny.ev}
              </p>
              <p>
                <strong>Ár: </strong>
                {formatPrice(festmeny.ar)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
