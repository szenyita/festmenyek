import Diagram from "@/components/Diagram";
import Vezerlopult from "@/components/Vezerlopult";
import ToroltFestmenyek from "@/components/ToroltFestmenyek";

export default async function TermekKezeles() {
  return (
    <div>
      <Diagram />
      <Vezerlopult />
      <ToroltFestmenyek />
    </div>
  );
}
