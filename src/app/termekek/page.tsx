import Szuro from "@/components/Szuro";
import TermekLista from "@/components/TermekLista";
import prisma from "@/lib/prisma";

export default async function Termekek() {
  const festmenyek = await prisma.festmeny.findMany();

  return (
    <div>
      <Szuro />
      <TermekLista festmenyek={festmenyek} />
    </div>
  );
}
