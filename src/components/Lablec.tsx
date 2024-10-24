"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Lablec() {
  const [isLoading, setIsLoading] = useState(true);

  const context = useContext(AuthContext);
  const pathname = usePathname();

  useEffect(() => {
    if (context) {
      setIsLoading(false);
    }
  }, [context]);

  if (!context) {
    return null;
  }

  if (context.contextFelhasznalo?.jogosultsag === "Szallito") {
    return <div></div>;
  }

  if (pathname !== "/szallito") {
    return <LablecKomponens />;
  }

  return <>{!isLoading && <LablecKomponens />}</>;
}

function LablecKomponens() {
  return (
    <div className="flex px-[10vw] bg-gray-200 mt-12">
      <div className="flex-1 flex flex-col gap-2 py-8">
        {/*LOGO*/}
        <div className="flex items-center justify-center gap-1">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
          </Link>
          <p className="font-semibold text-2xl">Anonim Műcsarnok</p>
        </div>
        {/*SOCIAL*/}
        <div className="flex items-center justify-center gap-2">
          <Link href="/">
            <Image src="/facebook.svg" alt="facebook" width={24} height={24} />
          </Link>
          <Link href="/">
            <Image
              src="/instagram.svg"
              alt="instagram"
              width={24}
              height={24}
            />
          </Link>
          <Link href="/">
            <Image src="/tiktok.svg" alt="tiktok" width={24} height={24} />
          </Link>
        </div>
        {/*BIZTONSÁGOS VÁSÁRLÁS*/}
        <div className="flex items-center justify-center">
          <Link href="/">Biztonságos Vásárlás</Link>
        </div>
        {/*ÜGYFÉLSZOLGÁLAT*/}
        <div className="flex items-center justify-center">
          <Link href="/">Ügyfélszolgálat</Link>
        </div>
      </div>
      {/*NAGYOBB KIJELZŐK*/}
      <div className="hidden md:flex-1 md:flex md:flex-col md:justify-between md:items-center md:py-8 lg:hidden">
        <h2 className="font-semibold">Népszerű Stílusok</h2>
        <Link href="/termekek?stilus=Impresszionizmus">Impresszionizmus</Link>
        <Link href="/termekek?stilus=Realizmus">Realizmus</Link>
        <Link href="/termekek?stilus=Fauvizmus">Fauvizmus</Link>
        <Link href="/termekek?stilus=Kubizmus">Kubizmus</Link>
      </div>
      <div className="hidden lg:flex-1 lg:flex lg:flex-col lg-justify-between lg:items-center lg:py-8">
        <h2 className="font-semibold">Népszerű Stílusok</h2>
        <Link href="/termekek?stilus=Impresszionizmus">Impresszionizmus</Link>
        <Link href="/termekek?stilus=Realizmus">Realizmus</Link>
        <Link href="/termekek?stilus=Fauvizmus">Fauvizmus</Link>
        <Link href="/termekek?stilus=Kubizmus">Kubizmus</Link>
      </div>
      <div className="hidden lg:flex-1 lg:flex lg:flex-col lg-justify-between lg:items-center lg:py-8">
        <h2 className="font-semibold">Festmény Méretek</h2>
        <Link href="/termekek?meret=m40x60">40 cm x 60 cm</Link>
        <Link href="/termekek?meret=m50x60">50 cm x 60 cm</Link>
        <Link href="/termekek?meret=m60x90">60 cm x 90 cm</Link>
        <Link href="/termekek?meret=m90x120">90 cm x 120 cm</Link>
      </div>
    </div>
  );
}
