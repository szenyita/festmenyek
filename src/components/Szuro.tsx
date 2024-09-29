"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const nem = [
  { id: 1, name: "Női" },
  { id: 2, name: "Férfi" },
];

const kategoria = [
  { id: 1, name: "Kutya" },
  { id: 2, name: "Kiskutya" },
  { id: 3, name: "Vau" },
  { id: 4, name: "Kisvau" },
];

const meret = [
  { id: 1, name: "XS", order: 1 },
  { id: 2, name: "S", order: 2 },
  { id: 3, name: "M", order: 3 },
  { id: 4, name: "L", order: 4 },
  { id: 5, name: "XL", order: 5 },
];

const termekek = [
  { id: 1, name: "Poló", price: 10000 },
  { id: 2, name: "Ing", price: 20000 },
  { id: 3, name: "Pulcsi", price: 15000 },
];

const szin = [
  { id: 1, name: "Fehér" },
  { id: 2, name: "Fekete" },
  { id: 3, name: "Szürke" },
  { id: 4, name: "Zöld" },
  { id: 5, name: "Kék" },
];

const rendezesOpciok = [
  { id: 1, name: "Ár növekvő" },
  { id: 2, name: "Ár csökkenő" },
  { id: 3, name: "Legújabb" },
  { id: 4, name: "Legnépszerűbb" },
];

type AccentsMap = {
  [key: string]: string;
};

function removeAccents(str: string) {
  const accentsMap: AccentsMap = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ö: "o",
    ő: "o",
    ú: "u",
    ü: "u",
    ű: "u",
  };

  return str
    .toLowerCase()
    .replace(/[áéíóöőúüű]/g, (match) => accentsMap[match] || match);
}

function SzuroOpciok() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [search, setSearch] = useState("");

  const handleSearch = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const exclude = ["Kategória", "Nem", "Méret", "Szín", "Rendezés"];

    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (exclude.includes(e.target.value)) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="justify-center items-center px-[8vw] flex-wrap gap-2 flex">
      <select
        name="nem"
        id=""
        className="py-1 px-2 rounded-full border-2 border-black cursor-pointer"
        onChange={handleSearch}
      >
        <option>Nem</option>
        {nem.map((item) => (
          <option key={item.id} value={removeAccents(item.name)}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        name="kategoria"
        id=""
        className="py-1 px-2 rounded-full border-2 border-black cursor-pointer"
        onChange={handleSearch}
      >
        <option>Kategória</option>
        {kategoria.map((item) => (
          <option key={item.id} value={removeAccents(item.name)}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        name="meret"
        id=""
        className="py-1 px-2 rounded-full border-2 border-black cursor-pointer"
        onChange={handleSearch}
      >
        <option>Méret</option>
        {meret
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <option key={item.id} value={removeAccents(item.name)}>
              {item.name}
            </option>
          ))}
      </select>
      <select
        name="szin"
        id=""
        className="py-1 px-2 rounded-full border-2 border-black cursor-pointer"
        onChange={handleSearch}
      >
        <option>Szín</option>
        {szin.map((item) => (
          <option key={item.id} value={removeAccents(item.name)}>
            {item.name}
          </option>
        ))}
      </select>
      <input
        name="min"
        type="text"
        className="py-1 px-2 rounded-full border-2 border-black w-40"
        onChange={handleSearch}
        placeholder={`Min: ${termekek
          .reduce(
            (min, termek) => (termek.price < min ? termek.price : min),
            termekek[0].price
          )
          .toString()}`}
      />
      <input
        name="max"
        type="text"
        className="py-1 px-2 rounded-full border-2 border-black w-40"
        onChange={handleSearch}
        placeholder={`Max: ${termekek
          .reduce(
            (max, termek) => (termek.price > max ? termek.price : max),
            termekek[0].price
          )
          .toString()}`}
      />

      <select
        name="rendezes"
        className="py-1 px-2 rounded-full border-2 border-black bg-black text-white cursor-pointer"
        onChange={handleSearch}
      >
        <option>Rendezés</option>
        {rendezesOpciok.map((item) => (
          <option key={item.id} value={removeAccents(item.name)}>
            {item.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Kerés"
        className="py-1 px-2 rounded-full border-2 border-black md:hidden w-50"
      />
      <button className="flex md:hidden">
        <Image src="kereso2.svg" alt="" width={30} height={30} />
      </button>
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
      <div
        className={`flex md:hidden ${
          open ? "justify-center pl-[46px]" : "justify-end"
        } items-start px-4 cursor-pointer`}
      >
        {open && (
          <Suspense>
            <SzuroOpciok />
          </Suspense>
        )}
        <Image
          src={open ? "/szuronem.svg" : "/szuro.svg"}
          alt=""
          width={30}
          height={30}
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
}
