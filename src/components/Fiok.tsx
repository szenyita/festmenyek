import Link from "next/link";

export default function Fiok() {
  return (
    <div className="flex flex-col absolute top-12 right-[50px] bg-white rounded-md px-2 py-1 shadow-[0_0_10px_0_rgba(0,0,0,0.5)]">
      <Link
        href="/fiok"
        className="hover:text-red-400 active:scale-95 transition ease-in-out duration-300"
      >
        Fiók
      </Link>
      <Link
        href="/"
        className="hover:text-red-400 active:scale-95 transition ease-in-out duration-300"
      >
        Kijelentkezés
      </Link>
    </div>
  );
}
