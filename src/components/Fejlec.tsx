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
      <div className="bg-gray-200 flex justify-between items-center px-4 lg:px-9 xl:px-12 h-16 relative shadow-md">
        <div className="flex items-center flex-1 gap-2 ">
          <Link
            href={`${
              context.contextFelhasznalo?.jogosultsag === "Szallito"
                ? "/szallito"
                : "/"
            }`}
            className="flex-shrink-0"
          >
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
          </Link>
          <h1 className="flex-shrink-0 text-2xl font-semibold flex gap-2">
            Anonim Műcsarnok
          </h1>
          {context.contextFelhasznalo?.jogosultsag === "Admin" && (
            <Link href="/admin">
              <Image
                src="/admin.svg"
                alt=""
                width={26}
                height={26}
                className="cursor-pointer mr-4 md:mr-6 hidden lg:block"
              />
            </Link>
          )}
        </div>
        {context.contextFelhasznalo?.jogosultsag !== "Szallito" && (
          <div className="w-2/3 flex justify-end">
            <Kereso />
            <FejlecIkonok />
            <Menu />
          </div>
        )}
        {context.contextFelhasznalo?.jogosultsag === "Szallito" && (
          <div
            className="w-2/3 flex justify-end"
            onClick={() => {
              context.setContextFelhasznalo(null);
              context.setContextToken(null);
            }}
          >
            <Image
              src="/kijelentkezes.svg"
              alt=""
              width={26}
              height={26}
              className="cursor-pointer mr-4 md:mr-6"
            />
          </div>
        )}
      </div>
    </div>
  );
}
