import ArModositas from "./ArModositas";
import KeszletModositas from "./KeszletModositas";
import NullaKeszletesTermekek from "./NullaKeszletesTermekek";
import SzinValtozatHozzaadas from "./SzinValtozatHozzaadas";
import TermekHozzaadas from "./TermekHozzaadas";
import TermekTorles from "./TermekTorles";

export default function Vezerlopult() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-20 border-2 mx-[9vw] py-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-12">Vezérlőpult</h2>
      <div className="flex flex-wrap justify-between gap-2 pb-[2vw]">
        <TermekHozzaadas />
        <SzinValtozatHozzaadas />
        <KeszletModositas />
        <NullaKeszletesTermekek />
        <ArModositas />
        <TermekTorles />
      </div>
    </div>
  );
}
