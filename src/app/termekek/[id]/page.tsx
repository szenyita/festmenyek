import Image from "next/image";
import prisma from "@/lib/prisma";

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

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:items-start lg:mt-12 lg:mb-12">
      <div className="flex flex-col mt-5 md:mb-12 w-[300px] lg:w-[600px]">
        <div className="mb-2">
          <Image
            src={festmeny?.kep!}
            alt=""
            width={600}
            height={400}
            className="rounded-lg w-full aspect-[3/2] object-cover]"
          />
        </div>
        <div className="flex flex-wrap justify-between"></div>
      </div>
      <div className="mt-8 md:mt-5 md:ml-8 flex flex-col items-start w-[300px]">
        <h1 className="text-xl lg:text-2xl mb-1 lg:mb-4 font-semibold">
          {festmeny!.nev}
        </h1>
        <p className="text-gray-400 lg:text-md">{festmeny!.leiras}</p>
        <p className="font-semibold mt-4 lg:text-lg">
          {formatPrice(festmeny!.ar)}
        </p>

        <div>
          {!festmeny!.elerheto && (
            <p className="text-red-400 mt-2 font font-semibold">
              A festmény nem elérhető
            </p>
          )}
          <button
            className={`mb-12 mt-3 text-lg text-white bg-gold border-gold border-2 rounded-md px-1.5 py-0.5 ${
              festmeny!.elerheto
                ? "hover:bg-white hover:text-gold transition ease-in-out duration-300 active:scale-90"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!festmeny!.elerheto}
          >
            Kosárba
          </button>
        </div>
      </div>
    </div>
  );
}
