"use client";

import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Fiok({
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
      className="flex flex-col absolute top-12 right-[50px] bg-white rounded-md px-2 py-1 shadow-[0_0_10px_0_rgba(0,0,0,0.5)]"
      onMouseLeave={() => setProfileOpen(false)}
    >
      {context.contextFelhasznalo && (
        <div>
          <Link
            href="/fiok"
            className="hover:text-gold active:scale-95 transition ease-in-out duration-300 cursor-pointer"
            onClick={() => setProfileOpen(false)}
          >
            Fiók
          </Link>
          <p
            onClick={() => {
              context.setContextFelhasznalo(null);
              context.setContextToken(null);
              setProfileOpen(false);
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
        >
          Bejelentkezés
        </Link>
      )}
    </div>
  );
}
