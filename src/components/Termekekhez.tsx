"use client";

import { redirect, useRouter } from "next/navigation";

export default function Termekekhez({ text }: { text: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/termekek")}
      className="mb-[20vh] bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
    >
      {text}
    </button>
  );
}
