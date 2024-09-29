import Link from "next/link";

const rendelesek = [
  {
    id: 1,
    termekek: [
      { id: 1, name: "Poló", price: 10000 },
      { id: 2, name: "Ing", price: 20000 },
      { id: 3, name: "Pulcsi", price: 15000 },
    ],
    datum: "2022.01.01",
  },
  {
    id: 2,
    termekek: [
      { id: 1, name: "Poló", price: 10000 },
      { id: 2, name: "Ing", price: 20000 },
      { id: 3, name: "Pulcsi", price: 15000 },
    ],
    datum: "2022.01.01",
  },
  {
    id: 3,
    termekek: [
      { id: 1, name: "Poló", price: 10000 },
      { id: 2, name: "Ing", price: 20000 },
      { id: 3, name: "Pulcsi", price: 15000 },
    ],
    datum: "2022.01.01",
  },
  {
    id: 4,
    termekek: [
      { id: 1, name: "Poló", price: 10000 },
      { id: 2, name: "Ing", price: 20000 },
      { id: 3, name: "Pulcsi", price: 15000 },
    ],
    datum: "2022.01.01",
  },
  {
    id: 5,
    termekek: [
      { id: 1, name: "Poló", price: 10000 },
      { id: 2, name: "Ing", price: 20000 },
      { id: 3, name: "Pulcsi", price: 15000 },
    ],
    datum: "2022.01.01",
  },
  {
    id: 6342142,
    termekek: [
      { id: 1, name: "Poló", price: 110000 },
      { id: 2, name: "Ing", price: 20000 },
      { id: 3, name: "Pulcsi", price: 15000 },
    ],
    datum: "2022.01.01",
  },
];

function formatCurrency(number: number) {
  return (
    new Intl.NumberFormat("hu-HU", {
      minimumFractionDigits: 0,
    }).format(number) + " Ft"
  );
}

export default function KorabbiRendelesek() {
  return (
    <div className="mx-12 sm:mx-24  md:mx-60 lg:mx-12 mb-12 lg:w-1/3">
      <h1 className="mb-3 mt-10 md:mt-5 font-semibold text-lg">
        Korábbi Rendelések
      </h1>
      <div className="grid grid-cols-3 gap-2 py-1 px-2 bg-black text-white rounded-t-md border-black border-t-2 border-l-2 border-r-2">
        <div>Azonosító</div>
        <div>Végösszeg</div>
        <div>Dátum</div>
      </div>
      {rendelesek.map((rendeles) => (
        <div
          key={rendeles.id}
          className="gap-2 py-1 px-2 odd:bg-gray-200 border-gray-200 border-l-2 border-r-2 last:rounded-b-md last:border-b-2"
        >
          <Link
            href={`/rendelesek/${rendeles.id}`}
            className="grid grid-cols-3 hover:text-red-400 active:scale-95 transition ease-in-out duration-300"
          >
            <div>{rendeles.id}</div>
            <div>
              {formatCurrency(
                rendeles.termekek.reduce((a, b) => a + b.price, 0)
              )}
            </div>
            <div>{rendeles.datum}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
