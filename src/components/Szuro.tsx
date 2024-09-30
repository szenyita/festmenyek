"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

const stilus = [
  { id: 1, name: "Absztrakt" },
  { id: 2, name: "Impresszionizmus" },
  { id: 3, name: "Realizmus" },
  { id: 4, name: "Posztimpresszionizmus" },
  { id: 5, name: "Fauvizmus" },
  { id: 6, name: "Futurizmus" },
  { id: 7, name: "Kubizmus" },
  { id: 8, name: "Romantika" },
];

const megjelenes = [
  { id: 1, name: "2000 után", value: "2000-utan" },
  { id: 2, name: "1900 és 2000 között", value: "1900-2000" },
  { id: 3, name: "1900 előtt", value: "1900-elott" },
];

const meret = [
  { id: 1, name: "45 x 60", value: "m45x60", order: 1 },
  { id: 2, name: "50 x 60", value: "m50x60", order: 2 },
  { id: 3, name: "60 x 90", value: "m60x90", order: 3 },
  { id: 4, name: "90 x 120", value: "m90x120", order: 4 },
];

const rendezesOpciok = [
  { id: 1, name: "Ár növekvő", value: "ar-novekvo" },
  { id: 2, name: "Ár csökkenő", value: "ar-csokkeno" },
];

function SzuroOpciok() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("kereses") || "");

  const updateURL = (name: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      current.set(name, value);
    } else {
      current.delete(name);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (pathname.startsWith("/termekek")) {
      if (search) {
        params.set("kereses", search);
      } else {
        params.delete("kereses");
      }
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [search, searchParams, router, pathname]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pathname.startsWith("/termekek")) {
      router.push(`/termekek?kereses=${search}`);
    }
  };

  return (
    <div className="justify-center items-center px-[8vw] flex-wrap gap-2 flex flex-col md:flex-row">
      <select
        name="stilus"
        className="py-1 px-2 rounded-full border-2 border-black cursor-pointer w-full md:w-min"
        onChange={(e) => updateURL("stilus", e.target.value)}
        value={searchParams.get("stilus") || ""}
      >
        <option value="">Művészeti Stílus</option>
        {stilus.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        name="megjelenes"
        className="py-1 px-2 rounded-full border-2 border-black cursor-pointer w-full md:w-min"
        onChange={(e) => updateURL("megjelenes", e.target.value)}
        value={searchParams.get("megjelenes") || ""}
      >
        <option value="">Megjelenés</option>
        {megjelenes.map((item) => (
          <option key={item.id} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        name="meret"
        className="py-1 px-2 rounded-full border-2 border-black cursor-pointer w-full md:w-min"
        onChange={(e) => updateURL("meret", e.target.value)}
        value={searchParams.get("meret") || ""}
      >
        <option value="">Méret</option>
        {meret
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <option key={item.id} value={item.value}>
              {item.name}
            </option>
          ))}
      </select>
      <input
        name="min"
        type="number"
        className="py-1 px-2 rounded-full border-2 border-black w-full md:w-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="Min ár"
        onChange={(e) => updateURL("min", e.target.value)}
        value={searchParams.get("min") || ""}
      />
      <input
        name="max"
        type="number"
        className="py-1 px-2 rounded-full border-2 border-black w-full md:w-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="Max ár"
        onChange={(e) => updateURL("max", e.target.value)}
        value={searchParams.get("max") || ""}
      />
      <select
        name="rendezes"
        className="py-1 px-2 rounded-full border-2 border-black bg-black text-white cursor-pointer w-full md:w-min"
        onChange={(e) => updateURL("rendezes", e.target.value)}
        value={searchParams.get("rendezes") || ""}
      >
        <option value="">Rendezés</option>
        {rendezesOpciok.map((item) => (
          <option key={item.id} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>

      <form className="w-full md:w-auto md:hidden" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="kereses"
          placeholder="Keresés"
          className="py-1 px-2 rounded-full border-2 border-black w-full"
        />
      </form>
    </div>
  );
}

export default function Szuro() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-100 py-2 md:fixed md:top-16 md:w-full">
      <div className="hidden md:flex justify-center items-start">
        <Suspense>
          <SzuroOpciok />
        </Suspense>
      </div>
      <div className={`flex md:hidden ${"space-around"} items-start px-4 `}>
        <div className="flex-1"></div>
        {open && (
          <div className="flex-3">
            <Suspense>
              <SzuroOpciok />
            </Suspense>
          </div>
        )}
        <div className="flex-1 flex justify-end">
          <Image
            src={open ? "/szuronem.svg" : "/szuro.svg"}
            alt=""
            width={30}
            height={30}
            onClick={() => setOpen((prev) => !prev)}
            className="justify-end cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
