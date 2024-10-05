import KorabbiRendelesek from "@/components/KorabbiRendelesek";
import SzemelyesAdatok from "@/components/SzemelyesAdatok";

export default function Fiok() {
  return (
    <div className="flex flex-col lg:flex-row justify-center  pt-4 lg:pt-8">
      <SzemelyesAdatok />
      <KorabbiRendelesek />
    </div>
  );
}
