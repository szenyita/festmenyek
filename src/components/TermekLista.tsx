"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function generateItems(count: number) {
  const items = [];

  const categories = ["kutya", "kiskutya", "vau", "kisvau"];
  const sizes = ["xs", "s", "m", "l", "xl"];
  const colors = ["fekete", "feher", "piros", "kek", "zold"];
  const genders = ["ferfi", "noi"];

  for (let i = 1; i <= count; i++) {
    items.push({
      id: i + count * 1000,
      name: "Kutya",
      price: 10000,
      image:
        "https://images.pexels.com/photos/46505/swiss-shepherd-dog-dog-pet-portrait-46505.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Pici kiskutya",
      nem: genders[Math.floor(Math.random() * genders.length)],
      kategoria: categories[Math.floor(Math.random() * categories.length)],
      meret: sizes[Math.floor(Math.random() * sizes.length)],
      szin: colors[Math.floor(Math.random() * colors.length)],
      letrehozva: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ),
      eladottMennyiseg: Math.floor(Math.random() * 100),
    });
  }

  for (let i = 1; i <= count; i++) {
    items.push({
      id: i + count,
      name: "Kutya",
      price: 10000,
      image:
        "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Pici kiskutya",
      nem: genders[Math.floor(Math.random() * genders.length)],
      kategoria: categories[Math.floor(Math.random() * categories.length)],
      meret: sizes[Math.floor(Math.random() * sizes.length)],
      szin: colors[Math.floor(Math.random() * colors.length)],
      letrehozva: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ),
      eladottMennyiseg: Math.floor(Math.random() * 100),
    });
  }

  return items;
}

const termekek = generateItems(40);
const itemsPerPage = 12;

export default function TermekLista() {
  return (
    <Suspense>
      <TermekListaKomponens />
    </Suspense>
  );
}

export function TermekListaKomponens() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState(termekek);
  const searchParams = useSearchParams();

  useEffect(() => {
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const rendezes = searchParams.get("rendezes");
    const search = searchParams.get("search");
    const nem = searchParams.get("nem");
    const kategoria = searchParams.get("kategoria");
    const meret = searchParams.get("meret");
    const szin = searchParams.get("szin");

    let filtered = [...termekek];

    if (min) {
      filtered = filtered.filter((item) => item.price >= parseInt(min));
    }
    if (max) {
      filtered = filtered.filter((item) => item.price <= parseInt(max));
    }
    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearch.toLowerCase()) ||
          item.desc.toLowerCase().includes(lowerSearch.toLowerCase())
      );
    }
    if (nem) {
      filtered = filtered.filter((item) => item.nem === nem);
    }
    if (kategoria) {
      filtered = filtered.filter((item) => item.kategoria === kategoria);
    }
    if (meret) {
      filtered = filtered.filter((item) => item.meret === meret);
    }
    if (szin) {
      filtered = filtered.filter((item) => item.szin === szin);
    }
    if (rendezes) {
      switch (rendezes) {
        case "novekvo":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "csokkeno":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "legujabb":
          filtered.sort(
            (a, b) => b.letrehozva.getTime() - a.letrehozva.getTime()
          );
          break;
        case "legnepszerubb":
          filtered.sort((a, b) => b.eladottMennyiseg - a.eladottMennyiseg);
          break;
      }
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchParams]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className=" md:mx-16 lg:mx-20 xl:mx-28 2xl:mx-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 md:mt-32 lgx:mt-20 gap-6">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className={`border-gray-300 border-2 rounded-md overflow-hidden shadow-md w-full `}
          >
            <Link href={`/termekek/${item.id}`}>
              <Image
                src={item.image}
                alt=""
                height={0}
                width={0}
                sizes="100vw"
                className="w-full aspect-[3/2] object-cover"
              />
            </Link>
            <div className="pt-2 pb-4 px-4 flex flex-col gap-2">
              <div className="flex justify-between items-start font-semibold">
                <p className="text-lg">{item.name}</p>
                <p>{item.price}</p>
              </div>
              <div className="flex gap-6 justify-between items-start">
                <p className="text-sm text-gray-400">{item.desc}</p>
                <button className="text-sm text-red-400 border-red-400 border-2 rounded-full px-1.5 py-0.5 hover:bg-red-400 hover:text-white transition ease-in-out duration-300 active:scale-90">
                  Kosárba
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-9 mb-12 flex justify-between items-center">
        <button
          className={`text-white bg-red-400 border-2 border-red-400 rounded-md w-24 py-2 hover:bg-white hover:text-red-400 hover:border-red-400 transition ease-in-out duration-300 active:scale-95 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Előző
        </button>
        <span className="text-gray-600">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`text-white bg-red-400 border-2 border-red-400 rounded-md w-24 py-2 hover:bg-white hover:text-red-400 hover:border-red-400 transition ease-in-out duration-300 active:scale-95 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Következő
        </button>
      </div>
    </div>
  );
}
