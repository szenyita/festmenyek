"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const itemsPerPage = 12;

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

export default function TermekLista({
  festmenyek,
}: {
  festmenyek: Festmeny[];
}) {
  return (
    <Suspense>
      <TermekListaKomponens festmenyek={festmenyek} />
    </Suspense>
  );
}

export function TermekListaKomponens({
  festmenyek,
}: {
  festmenyek: Festmeny[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState(festmenyek);
  const searchParams = useSearchParams();
  const [cart, setCart] = useState<Festmeny[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const rendezes = searchParams.get("rendezes");
    const search = searchParams.get("search");
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
    if (search) {
      const lowerSearch = search.toLowerCase();
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
      filtered = filtered.filter((item) => item.ev === parseInt(ev));
    }
    if (meret) {
      filtered = filtered.filter((item) => item.meret === meret);
    }
    if (rendezes) {
      switch (rendezes) {
        case "novekvo":
          filtered.sort((a, b) => a.ar - b.ar);
          break;
        case "csokkeno":
          filtered.sort((a, b) => b.ar - a.ar);
          break;
        case "legujabb":
          filtered.sort((a, b) => b.datum.getTime() - a.datum.getTime());
          break;
      }
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchParams, festmenyek]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const addToCart = (festmeny: Festmeny) => {
    if (!cart.some((item) => item.festmenyId === festmeny.festmenyId)) {
      const updatedCart = [...cart, festmeny];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log(JSON.parse(localStorage.getItem("cart") || "[]"));
    }
  };

  const isInCart = (festmenyId: string) => {
    return cart.some((item) => item.festmenyId === festmenyId);
  };

  const formatPrice = (price: number) => {
    return (
      price.toLocaleString("hu-HU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) + " Ft"
    );
  };

  return (
    <div className="mx-8 md:mx-16 lg:mx-20 xl:mx-28 2xl:mx-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 md:mt-32 lgx:mt-20 gap-6">
        {currentItems.map((item) => (
          <div
            key={item.festmenyId}
            className={`border-gray-300 border-2 rounded-md overflow-hidden shadow-md w-full `}
          >
            <Link href={`/termekek/${item.festmenyId}`}>
              <Image
                src={item.kep}
                alt=""
                height={0}
                width={0}
                sizes="100vw"
                className="w-full aspect-[3/2] object-cover"
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
      <div className="mt-9 mb-12 flex justify-between items-center">
        <button
          className={`text-white bg-gold border-2 border-gold rounded-md w-24 py-2 hover:bg-white hover:text-gold hover:border-gold transition ease-in-out duration-300 active:scale-95 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Előző
        </button>
        <span className="text-gray-600">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`text-white bg-gold border-2 border-gold rounded-md w-24 py-2 hover:bg-white hover:text-gold hover:border-gold transition ease-in-out duration-300 active:scale-95 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Következő
        </button>
      </div>
    </div>
  );
}
