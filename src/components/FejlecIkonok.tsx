"use client";
import Image from "next/image";
import Fiok from "./Fiok";
import { useState, useContext, Suspense } from "react";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function FejlecIkonok() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  function Kosar() {
    const formatPrice = (price: number) => {
      return (
        price.toLocaleString("hu-HU", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) + " Ft"
      );
    };

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

    return (
      <div className="w-max flex flex-col absolute top-12 right-0 bg-white rounded-md px-4 pt-3 pb-5 shadow-[0_0_10px_0_rgba(0,0,0,0.5)]">
        <h2 className="text-xl font-semibold">Kosár Tartalma</h2>
        <div className="flex flex-col gap-2 my-2">
          {cart.map((item) => (
            <div key={item.festmenyId} className="flex items-start">
              <div className="w-16">
                <Image
                  src={item.kep}
                  alt={item.nev}
                  height={100}
                  width={100}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="mx-2 w-full">
                <div className="flex justify-between w-full gap-12">
                  <span className="font-semibold mr-6">{item.nev}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => removeFromCart(item.festmenyId)}
                  >
                    <Image
                      src="/kuka.svg"
                      alt="Remove"
                      height={20}
                      width={20}
                    />
                  </span>
                </div>
                <div className="flex justify-between w-full py-1">
                  <span className="text-sm text-gray-500">
                    {formatPrice(item.ar)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="font-semibold">Végösszeg:</span>
            <span className="font-semibold text-sm text-gray-500">
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
      </div>
    );
  }

  const context = useContext(CartContext);

  if (!context) {
    return null;
  }
  const { cart: cartItems } = context;

  return (
    <div className="md:flex w-1/3 justify-end hidden relative">
      <Image
        src="/fiok.svg"
        alt=""
        width={26}
        height={26}
        className="cursor-pointer mr-4 md:mr-6"
        onClick={() => setProfileOpen((prev) => !prev)}
      />
      {profileOpen && <Fiok />}
      <div className="items-center flex relative">
        <Image
          src="/kosar.svg"
          alt=""
          width={26}
          height={26}
          className="cursor-pointer"
          onClick={() => setCartOpen((prev) => !prev)}
        />
        {cartItems.length > 0 && (
          <div className="absolute top-0 left-4 bg-gold rounded-full w-4 h-4 flex justify-center items-center text-white text-xs">
            {cartItems.length}
          </div>
        )}
      </div>
      {cartOpen &&
        (cartItems.length > 0 ? (
          <Kosar />
        ) : (
          <div className="absolute top-12 right-0 bg-white rounded-md px-4 py-3 shadow-[0_0_10px_0_rgba(0,0,0,0.5)]">
            A kosár üres
          </div>
        ))}
    </div>
  );
}
