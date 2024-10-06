"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { getFestmenyek } from "@/lib/festmenyekOldal";

type Festmeny = {
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
};

export default function TermekLista() {
  return (
    <Suspense>
      <TermekListaKomponens />
    </Suspense>
  );
}

export function TermekListaKomponens() {
  const [festmenyek, setFestmenyek] = useState<Festmeny[]>([]);

  const gettingFestmenyek = async () => {
    const festmenyek = await getFestmenyek();
    setFestmenyek(festmenyek);
  };

  useEffect(() => {
    gettingFestmenyek();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState(festmenyek);
  const searchParams = useSearchParams();

  useEffect(() => {
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const rendezes = searchParams.get("rendezes");
    const kereses = searchParams.get("kereses");
    const stilus = searchParams.get("stilus");
    const ev = searchParams.get("megjelenes");
    const meret = searchParams.get("meret");

    let filtered = [...festmenyek];

    if (min) {
      filtered = filtered.filter((item) => item.ar >= parseInt(min));
    }
    if (max) {
      filtered = filtered.filter((item) => item.ar <= parseInt(max));
    }
    if (kereses) {
      const lowerSearch = kereses.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.nev.toLowerCase().includes(lowerSearch.toLowerCase()) ||
          item.stilus.toLowerCase().includes(lowerSearch.toLowerCase())
      );
    }
    if (stilus) {
      filtered = filtered.filter((item) => item.stilus === stilus);
    }
    if (ev) {
      switch (ev) {
        case "1900-elott":
          filtered = filtered.filter((item) => item.ev < 1900);
          break;
        case "1900-2000":
          filtered = filtered.filter(
            (item) => item.ev >= 1900 && item.ev <= 2000
          );
          break;
        case "2000-utan":
          filtered = filtered.filter((item) => item.ev > 2000);
          break;
      }
    }
    if (meret) {
      filtered = filtered.filter((item) => item.meret === meret);
    }
    if (rendezes) {
      switch (rendezes) {
        case "ar-novekvo":
          filtered.sort((a, b) => a.ar - b.ar);
          break;
        case "ar-csokkeno":
          filtered.sort((a, b) => b.ar - a.ar);
          break;
      }
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchParams, festmenyek]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const context = useContext(CartContext);
  if (!context) {
    return null;
  }

  const { addToCart, isInCart } = context;

  const formatPrice = (price: number) => {
    return (
      price.toLocaleString("hu-HU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) + " Ft"
    );
  };

  return (
    <div className="mx-8 md:mx-16 lg:mx-20 xl:mx-28 2xl:mx-40 min-h-[calc(100vh-48px-64px-192px-80px)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 md:mt-32 lgx:mt-20 gap-6 items-center">
        {filteredItems.map((item) => (
          <div
            key={item.festmenyId}
            className={`border-gray-300 border-2 rounded-md overflow-hidden shadow-md h-fit`}
          >
            <Link href={`/termekek/${item.festmenyId}`} className="">
              <Image
                src={item.kep}
                alt=""
                layout="responsive"
                width={100}
                height={100}
                sizes="100vw"
                className="w-full"
              />
            </Link>
            <div className="pt-2 pb-4 px-4 flex flex-col gap-2">
              <div className="flex justify-between items-start font-semibold">
                <p className="text-lg">{item.nev}</p>
                <p>{formatPrice(item.ar)}</p>
              </div>
              <div className="flex gap-6 justify-between items-start">
                <p className="text-sm text-gray-400">{item.stilus}</p>
                <button
                  className={`text-sm border-2 rounded-full px-1.5 py-0.5 transition ease-in-out duration-300 active:scale-90 ${
                    isInCart(item.festmenyId)
                      ? "text-white bg-gold border-gold cursor-not-allowed"
                      : "text-gold border-gold hover:bg-gold hover:text-white"
                  }`}
                  onClick={() => addToCart(item)}
                  disabled={isInCart(item.festmenyId)}
                >
                  {isInCart(item.festmenyId) ? "Kosárban" : "Kosárba"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
