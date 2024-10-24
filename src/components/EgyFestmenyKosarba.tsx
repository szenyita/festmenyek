"use client";

import { CartContext } from "@/context/CartContext";
import { Festmeny } from "@prisma/client";
import { useContext } from "react";

export default function EgyFestmenyKosarba({
  festmeny,
}: {
  festmeny: Festmeny | null;
}) {
  const context = useContext(CartContext);
  if (!context) {
    return null;
  }

  const { addToCart, isInCart } = context;

  return (
    <div>
      {!festmeny!.elerheto && (
        <p className="text-red-400 mt-2 font font-semibold">
          A festmény nem elérhető
        </p>
      )}
      <button
        onClick={() => addToCart(festmeny!)}
        disabled={isInCart(festmeny!.festmenyId) || !festmeny!.elerheto}
        className={`mb-12 mt-3 text-lg border-2 rounded-md px-1.5 py-0.5 ${
          festmeny!.elerheto ? "" : "opacity-50 cursor-not-allowed"
        }
        ${
          isInCart(festmeny!.festmenyId)
            ? "text-gold bg-white border-gold transition ease-in-out duration-300 active:scale-90 cursor-not-allowed"
            : "text-white border-gold bg-gold hover:bg-white hover:text-gold  transition ease-in-out duration-300 active:scale-90"
        }
        `}
      >
        {isInCart(festmeny!.festmenyId) ? "Kosárban" : "Kosárba"}
      </button>
    </div>
  );
}
