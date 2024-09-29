import Image from "next/image";
import Link from "next/link";

const items = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kategória 1",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kategória 2",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kategória 3",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kategória 4",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kategória 5",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kategória 6",
  },
];

export default function NepszeruTermekek() {
  return (
    <div>
      <h1 className="flex justify-center items-center text-3xl font-semibold w-full align-center h-[16vh]">
        Termék Kategóriák
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
