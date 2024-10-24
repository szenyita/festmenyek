import Image from "next/image";
import prisma from "@/lib/prisma";
import EgyFestmenyKosarba from "@/components/EgyFestmenyKosarba";

export default async function Termek({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);
  const festmeny = await prisma.festmeny.findUnique({
    where: {
      festmenyId: id,
    },
  });

  const formatPrice = (price: number) => {
    return (
      price.toLocaleString("hu-HU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) + " Ft"
    );
  };

  const formatSize = (size: string) => {
    const [h, w] = size.slice(1).split("x");
    return `${h} cm x ${w} cm`;
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center lg:mt-12 lg:mb-12 min-h-[calc(100vh-64px-192px-96px)]">
      <div className="flex flex-col mt-5 md:mb-12 w-[330px] lg:w-[600px]">
        <div className="border-gray-300 border-2 rounded-md overflow-hidden shadow-md h-fit mb-2 sticky top-[132px]">
          <Image
            src={festmeny?.kep!}
            alt=""
            width={600}
            height={400}
            className="w-full aspect-[3/2] object-cover]"
          />
        </div>
        <div className="flex flex-wrap justify-between"></div>
      </div>
      <div className="mt-8 md:mt-5 md:ml-8 flex flex-col items-start w-[300px]">
        <h1 className="text-xl lg:text-2xl mb-1 lg:mb-4 font-semibold">
          {festmeny!.nev}
        </h1>
        <p className="text-gray-500 lg:text-md">{festmeny!.leiras}</p>
        <p className="lg:text-md mt-2">Stílus: {festmeny!.stilus}</p>
        <p className="lg:text-md">Év: {festmeny!.ev}</p>
        <p className="lg:text-md">Méret: {formatSize(festmeny!.meret)}</p>
        <p className="font-semibold mt-4 lg:text-lg">
          {formatPrice(festmeny!.ar)}
        </p>
        <EgyFestmenyKosarba festmeny={festmeny} />
      </div>
    </div>
  );
}
