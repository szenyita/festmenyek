"use client";

import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useContext } from "react";

export default function MobilKosarOldal() {
  const context = useContext(CartContext);
  const authContext = useContext(AuthContext);
  if (!context) {
    return null;
  }
  if (!authContext) {
    return null;
  }

  const { cart, removeFromCart } = context;
  const { contextFelhasznalo } = authContext;
  const totalPrice = cart.reduce((sum, item) => sum + item.ar, 0);

  const handleCheckout = () => {
    if (contextFelhasznalo) {
      window.location.href = "/penztar";
    } else {
      window.location.href = "/bejelentkezes?redirect=/penztar";
    }
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
    <div className="pt-4 text-black w-full flex flex-col items-center justify-center">
      {cart.length > 0 ? (
        <h2 className="text-3xl font-semibold mb-6">Kosár Tartalma</h2>
      ) : (
        <h2 className="text-3xl font-semibold mb-6">Üres a Kosár</h2>
      )}
      <div className="w-full flex flex-col gap-4 items-center">
        {cart.map((item) => (
          <div
            className="w-8/12 border-gray-300 border-2 rounded-md overflow-hidden"
            key={item.festmenyId}
          >
            <Image
              src={item.kep}
              alt=""
              height={600}
              width={600}
              className="w-full h-auto"
            />
            <div className="p-2">
              <div className="flex justify-between">
                <p className="font-semibold text-xl">{item.nev}</p>
                <span onClick={() => removeFromCart(item.festmenyId)}>
                  <Image
                    src="/kuka.svg"
                    alt=""
                    height={22}
                    width={22}
                    className="cursor-pointer"
                  />
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-lg text-gray-500">{formatPrice(item.ar)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="flex justify-between w-8/12 pb-10 mt-10">
          <div className="flex flex-col">
            <span className="font-semibold text-xl">Végösszeg</span>
            <span className="font-semibold text-md text-gray-500">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
          >
            Pénztár
          </button>
        </div>
      )}
    </div>
  );
}
