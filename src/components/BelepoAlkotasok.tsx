"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

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

export default function BelepoAlkotasok({
  festmenyek,
}: {
  festmenyek: Festmeny[];
}) {
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
    <div>
      <h1 className="flex justify-center items-center text-3xl font-semibold w-full align-center h-[16vh]">
        Belépő Alkotások
      </h1>
      <div className="flex xl:justify-around px-[8vw] xl:px-[12vw] items-center flex-wrap gap-5 justify-center">
        {festmenyek?.map((item, index) => (
          <div
            key={item.festmenyId}
            className={`border-gray-300 border-2 rounded-md overflow-hidden shadow-md md:w-5/12 w-4/5 2xl:w-1/5 lg:w-2/5 mb-16 ${
              index > 3 ? "hidden 2xl:block 2xl:mt-10" : ""
            }`}
          >
            <div className="h-[300px] w-full relative">
              <Link href={`/termekek/${item.festmenyId}`}>
                <Image src={item.kep} alt="" layout="fill" objectFit="cover" />
              </Link>
            </div>
            <div className="pt-2 pb-4 px-4 flex flex-col gap-2">
              <div className="flex justify-between items-start font-semibold">
                <p className="text-lg">{item.nev}</p>
                <p className="text-nowrap pl-2">{formatPrice(item.ar)}</p>
              </div>
              <div className="flex justify-between items-start">
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
