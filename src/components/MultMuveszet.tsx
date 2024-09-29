import Image from "next/image";
import Link from "next/link";

const items = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kutya 1",
    description: "Pici kiskutya",
    price: "20.000 Ft",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kutya 2",
    description: "Pici kiskutya",
    price: "20.000 Ft",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kutya 3",
    description: "Pici kiskutya",
    price: "20.000 Ft",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kutya 4",
    description: "Pici kiskutya",
    price: "20.000 Ft",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kutya 5",
    description: "Pici kiskutya",
    price: "20.000 Ft",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kutya 6",
    description: "Pici kiskutya",
    price: "20.000 Ft",
  },
  {
    id: 7,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kutya 7",
    description: "Pici kiskutya",
    price: "20.000 Ft",
  },
  {
    id: 8,
    image:
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: "Kutya 8",
    description: "Pici kiskutya",
    price: "20.000 Ft",
  },
];

export default function UjTermekek() {
  return (
    <div className="mb-20">
      <h1 className="flex justify-center items-center text-3xl font-semibold w-full align-center h-[16vh]">
        A Múlt Művészete
      </h1>
      <div className="flex xl:justify-around px-[8vw] xl:px-[12vw] items-center flex-wrap gap-5 justify-center">
        {items.map((item) => (
          <div
            key={item.id}
            className={`border-gray-300 border-2 rounded-md overflow-hidden shadow-md md:w-2/5 w-4/5 xl:w-1/5 lg:w-2/5 ${
              item.id > 4 ? "hidden xl:block xl:mt-10" : ""
            }`}
          >
            <Link href={`/termekek/${item.id}`}>
              <Image
                src={item.image}
                alt=""
                height={0}
                width={0}
                sizes="100vw"
                className="w-full xl:w-[20vw] h-auto"
              />
            </Link>
            <div className="pt-2 pb-4 px-4 flex flex-col gap-2">
              <div className="flex justify-between items-start font-semibold">
                <p className="text-lg">{item.name}</p>
                <p>{item.price}</p>
              </div>
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-400">{item.description}</p>
                <button className="text-sm text-gold border-gold border-2 rounded-full px-1.5 py-0.5 hover:bg-gold hover:text-white transition ease-in-out duration-300 active:scale-90">
                  Kosárba
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
