"use client";

import Diagram from "@/components/Diagram";
import Vezerlopult from "@/components/Vezerlopult";
import ToroltFestmenyek from "@/components/ToroltFestmenyek";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function TermekKezeles() {
  const router = useRouter();
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  if (context.contextFelhasznalo?.jogosultsag !== "Admin") {
    router.push("/");
    return <div></div>;
  }

  return (
    <div>
      <Diagram />
      <Vezerlopult />
      <ToroltFestmenyek />
    </div>
  );
}
