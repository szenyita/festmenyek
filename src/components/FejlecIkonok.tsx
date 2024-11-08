"use client";
import Image from "next/image";
import { useState, useContext, Suspense, useEffect, useRef } from "react";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useClickOutside } from "@/lib/useClickOutside";

type CartItem = {
  ar: number;
  datum: Date;
  ev: number;
  festmenyId: string;
  kep: string;
  leiras: string;
  meret: string;
  nev: string;
  rendelesId: string | null;
  stilus: string;
};

export default function FejlecIkonok() {
  const {
    visible: cartOpen,
    setVisible: setCartOpen,
    ref: kosarRef,
  } = useClickOutside();
  const {
    visible: profileOpen,
    setVisible: setProfileOpen,
    ref: fiokRef,
  } = useClickOutside();

  function Kosar({
    setCartOpen,
    cartItems,
  }: {
    setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cartItems: CartItem[];
  }) {
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
      <div ref={kosarRef}>
        {cartItems.length === 0 && (
          <div className="absolute top-12 right-0 bg-white rounded-md px-4 py-3 shadow-[0_0_10px_0_rgba(0,0,0,0.5)] z-50">
            A kosár üres
          </div>
        )}
        {cartItems.length > 0 && (
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
                        onClick={() => {
                          removeFromCart(item.festmenyId);
                          if (cart.length === 1) {
                            setCartOpen(false);
                          }
                        }}
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
                onClick={() => {
                  handleCheckout();
                  setCartOpen(false);
                }}
                className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
              >
                Pénztár
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  function Fiok({
    setProfileOpen,
  }: {
    setProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    const context = useContext(AuthContext);
    if (!context) {
      return null;
    }

    return (
      <div
        ref={fiokRef}
        className="flex flex-col absolute top-12 right-[50px] bg-white rounded-md px-2 py-1 shadow-[0_0_10px_0_rgba(0,0,0,0.5)]"
      >
        {context.contextFelhasznalo && (
          <div>
            <p className="hover:text-gold active:scale-95 transition ease-in-out duration-300 cursor-pointer">
              <Link href="/fiok" onClick={() => setProfileOpen(false)}>
                Fiók
              </Link>
            </p>
            <p
              onClick={() => {
                context.setContextFelhasznalo(null);
                context.setContextToken(null);
                setProfileOpen(false);
                if (
                  window.location.pathname === "/penztar" ||
                  window.location.pathname === "/fiok"
                ) {
                  window.location.href = "/";
                }
              }}
              className="hover:text-gold active:scale-95 transition ease-in-out duration-300 cursor-pointer"
            >
              Kijelentkezés
            </p>
          </div>
        )}
        {!context.contextFelhasznalo && (
          <Link
            href="/bejelentkezes"
            className="hover:text-gold active:scale-95 transition ease-in-out duration-300"
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            Bejelentkezés
          </Link>
        )}
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
        onClick={() => {
          setProfileOpen((prev) => !prev);
          setCartOpen(false);
        }}
      />
      {profileOpen && <Fiok setProfileOpen={setProfileOpen} />}
      <div className="items-center flex relative">
        <Image
          src="/kosar.svg"
          alt=""
          width={26}
          height={26}
          className="cursor-pointer"
          onClick={() => {
            setCartOpen((prev) => !prev);
            setProfileOpen(false);
          }}
        />
        {cartItems.length > 0 && (
          <div className="absolute top-0 left-4 bg-gold rounded-full w-4 h-4 flex justify-center items-center text-white text-xs">
            {cartItems.length}
          </div>
        )}
      </div>
      {cartOpen && <Kosar setCartOpen={setCartOpen} cartItems={cartItems} />}
    </div>
  );
}
