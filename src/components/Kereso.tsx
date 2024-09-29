"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";

export default function Kereso() {
  return (
    <Suspense>
      <Kereses />
    </Suspense>
  );
}

export function Kereses() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pathname.startsWith("/termekek")) {
      router.push(`/termekek?nev=${search}`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (pathname.startsWith("/termekek")) {
      if (search) {
        params.set("nev", search);
      } else {
        params.delete("nev");
      }
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [search, searchParams, router, pathname]);

  return (
    <form
      className="w-1/2 lg:w-2/3 hidden md:flex rounded-md px-4 py-2 bg-white"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="nev"
        placeholder="Keresés"
        className="w-full bg-transparent focus:outline-none focus:ring-0"
      />
      <button>
        <Image src="/kereso.svg" alt="" width={26} height={26} className="" />
      </button>
    </form>
  );
}
