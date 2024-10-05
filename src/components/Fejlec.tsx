"use client";

import FejlecIkonok from "./FejlecIkonok";
import Kereso from "./Kereso";
import Menu from "./Menu";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Fejlec() {
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10">
      <div
        className={`${
          context.contextFelhasznalo?.jogosultsag === "Admin"
            ? "bg-blue-200"
            : ""
        }
      ${
        context.contextFelhasznalo?.jogosultsag === "Szallito"
          ? "bg-blue-200"
          : ""
      }
      ${
        context.contextFelhasznalo?.jogosultsag === "Felhasznalo"
          ? "bg-blue-200"
          : ""
      }
      bg-gray-200 flex justify-between items-center px-4 lg:px-9 xl:px-12 h-16 relative shadow-md`}
      >
        <div className="flex items-center flex-1 gap-2 ">
          <Link href="/" className=" text-2xl font-semibold flex gap-2">
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
            <h1 className="flex-shrink-0">Anonim Művészek</h1>
          </Link>
        </div>
        {context.contextFelhasznalo?.jogosultsag !== "Szallito" && (
          <div className="w-2/3 flex justify-end">
            <Kereso />
            <FejlecIkonok />
            <Menu />
          </div>
        )}
      </div>
    </div>
  );
}
