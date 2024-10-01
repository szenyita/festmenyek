import Diavetito from "@/components/Diavetito";
import BelepoAlkotasok from "@/components/BelepoAlkotasok";
import MuveszetiStilusok from "@/components/MuveszetiStilusok";
import MultMuveszet from "@/components/MultMuveszet";
import prisma from "@/lib/prisma";

export default async function ErkezesiOldal() {
  const multFestmenyek = await prisma.festmeny.findMany({
    orderBy: {
      ev: "asc",
    },
    take: 8,
  });

  const belepoFestmenyek = await prisma.festmeny.findMany({
    orderBy: {
      ar: "asc",
    },
    take: 8,
  });

  return (
    <div className="">
      <Diavetito />
      <MultMuveszet festmenyek={multFestmenyek} />
      <MuveszetiStilusok />
      <BelepoAlkotasok festmenyek={belepoFestmenyek} />
    </div>
  );
}
