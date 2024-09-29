import Image from "next/image";
import Link from "next/link";

const items = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/8792984/pexels-photo-8792984.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Realizmus",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/2983299/pexels-photo-2983299.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Kubizmus",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/28663140/pexels-photo-28663140/free-photo-of-absztrakt-muveszi-texturazott-felulet-hideg-tonusokkal.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Fauvizmus",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/6154056/pexels-photo-6154056.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Futurizmus",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/1258740/pexels-photo-1258740.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Impresszionizmus",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/4046718/pexels-photo-4046718.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Romantika",
  },
];

export default function MuveszetiStilusok() {
  return (
    <div>
      <h1 className="flex justify-center items-center text-3xl font-semibold w-full align-center h-[16vh]">
        Kedvelt Stílusok
      </h1>
      <div className="flex lg:justify-between px-[8vw] lg:px-[12vw] xl:px-[6vw] items-center flex-wrap md:flex-nowrap gap-5 justify-center">
        {items.map((item) => (
          <div
            key={item.id}
            className={`border-gray-300 border-2 rounded-md overflow-hidden shadow-md w-2/5 md:w-3/5 lg:w-3/5 ${
              item.id > 4 ? "hidden xl:block" : ""
            }`}
          >
            <Link href={`/termekek?kategoria=${item.name}`}>
              <Image
                src={item.image}
                alt=""
                height={0}
                width={0}
                sizes="100vw"
                className="w-full lg:w-[20vw] h-auto"
              />
            </Link>
            <div className="flex justify-center items-center font-semibold text-md sm:text-2xl md:text-2xl py-3">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
