import FejlecIkonok from "./FejlecIkonok";
import Kereso from "./Kereso";
import Menu from "./Menu";
import Image from "next/image";
import Link from "next/link";

export default function Fejlec() {
  return (
    <div className="sticky top-0 z-10">
      <div className="bg-gray-200 flex justify-between items-center px-6 lg:px-9 xl:px-12 h-16 relative shadow-md">
        <div className="flex items-center flex-1 gap-2 ">
          <Link href="/" className=" text-2xl font-semibold flex gap-2">
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
            <h1>Poloshop</h1>
          </Link>
          <div className="hidden xl:flex xl-flex-1 justify-around ml-4 w-1/4">
            <Link
              href="/termekek?nem=noi"
              className="hover:text-red-400 active:scale-95 transition ease-in-out duration-300"
            >
              Női
            </Link>
            <Link
              href="/termekek?nem=ferfi"
              className="hover:text-red-400 active:scale-95 transition ease-in-out duration-300"
            >
              Férfi
            </Link>
          </div>
        </div>
        <div className="w-2/3 flex justify-end">
          <Kereso />
          <FejlecIkonok />
          <Menu />
        </div>
      </div>
    </div>
  );
}
