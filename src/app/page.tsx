import Diavetito from "@/components/Diavetito";
import FrissAlkotasok from "@/components/FrissAlkotasok";
import MuveszetiStilusok from "@/components/MuveszetiStilusok";
import MultMuveszet from "@/components/MultMuveszet";
import prisma from "@/lib/prisma";

export default async function ErkezesiOldal() {
  const multFestmenyek = await prisma.festmeny.findMany({
    orderBy: {
      ev: "desc",
    },
    take: 8,
  });

  const frissFestmenyek = await prisma.festmeny.findMany({
    orderBy: {
      ev: "desc",
    },
    take: 8,
  });

  return (
    <div className="">
      <Diavetito />
      <FrissAlkotasok festmenyek={frissFestmenyek} />
      <MuveszetiStilusok />
      <MultMuveszet festmenyek={multFestmenyek} />
    </div>
  );
}
