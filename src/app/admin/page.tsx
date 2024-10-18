"use client";

import Diagram from "@/components/Diagram";
import Vezerlopult from "@/components/Vezerlopult";
import ToroltFestmenyek from "@/components/ToroltFestmenyek";
import { Suspense, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Diavetito from "@/components/Diavetito";

export default function TermekKezeles() {
  const router = useRouter();
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  if (context.contextFelhasznalo?.jogosultsag !== "Admin") {
    router.push("/");
    return <Diavetito />;
  }

  return (
    <div>
      <Suspense
        fallback={
          <div className="flex flex-col items-center mx-[9vw] border-2 rounded-lg mt-8 py-6">
            <h2 className=" text-2xl font-semibold">Értékesítési Adatok</h2>
            <div className="flex justify-center pt-10 font-semibold"></div>
          </div>
        }
      >
        <Diagram />
      </Suspense>
      <Vezerlopult />
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center mt-8 mb-[2vw] border-2 mx-[9vw] py-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-12">Törölt Festményekt</h2>
          </div>
        }
      >
        <ToroltFestmenyek />
      </Suspense>
    </div>
  );
}
