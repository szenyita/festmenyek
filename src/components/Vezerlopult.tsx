import FestmenyModositas from "./FestmenyModositas";
import FestmenyHozzaadas from "./FestmenyHozzaadas";
import FestmenyTorles from "./FestmenyTorles";
import FestmenyVisszahozas from "./FestmenyVisszahozas";

export default function Vezerlopult() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 border-2 mx-[9vw] py-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-12">Vezérlőpult</h2>
      <div className="flex flex-wrap justify-between gap-2 pb-[2vw]">
        <FestmenyHozzaadas />
        <FestmenyModositas />
        <FestmenyTorles />
        <FestmenyVisszahozas />
      </div>
    </div>
  );
}
