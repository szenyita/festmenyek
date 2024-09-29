"use client";

import { createContext, useState, useEffect } from "react";

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

const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  isInCart: (itemId: string) => boolean;
} | null>(null);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const itemExists = cart.some(
      (cartItem: CartItem) => cartItem.festmenyId === item.festmenyId
    );
    if (!itemExists) {
      setCart((prevCart: CartItem[]) => [...prevCart, item]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart: CartItem[]) =>
      prevCart.filter((cartItem) => cartItem.festmenyId !== itemId)
    );
  };

  const isInCart = (itemId: string) => {
    return cart.some((cartItem: CartItem) => cartItem.festmenyId === itemId);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}
export { CartContext };
