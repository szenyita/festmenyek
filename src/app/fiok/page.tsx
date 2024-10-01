import KorabbiRendelesek from "@/components/KorabbiRendelesek";
import SzemelyesAdatok from "@/components/SzemelyesAdatok";

export default function Fiok() {
  return (
    <div className="flex flex-col lg:flex-row justify-center">
      <SzemelyesAdatok />
      <KorabbiRendelesek />
    </div>
  );
}
