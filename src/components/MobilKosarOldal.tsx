import Image from "next/image";

export default function MobilKosarOldal() {
  return (
    <div className="pt-4 text-black w-full flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold mb-6">Kosár Tartalma</h2>
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="w-8/12 border-gray-300 border-2 rounded-md overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt=""
            height={600}
            width={600}
            className="w-full h-auto"
          />
          <div className="p-2">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Kutyus</p>
              <Image
                src="/kuka.svg"
                alt=""
                height={22}
                width={22}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between">
              <p className="text-lg text-gray-500">20.000 Ft</p>{" "}
            </div>
          </div>
        </div>
        <div className="w-8/12 border-gray-300 border-2 rounded-md overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt=""
            height={600}
            width={600}
            className="w-full h-auto"
          />
          <div className="p-2">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Kutyus</p>
              <Image
                src="/kuka.svg"
                alt=""
                height={22}
                width={22}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between">
              <p className="text-lg text-gray-500">20.000 Ft</p>{" "}
            </div>
          </div>
        </div>
        <div className="w-8/12 border-gray-300 border-2 rounded-md overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt=""
            height={600}
            width={600}
            className="w-full h-auto"
          />
          <div className="p-2">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Kutyus</p>
              <Image
                src="/kuka.svg"
                alt=""
                height={22}
                width={22}
                className="cursor-pointer"
              />
            </div>
            <div className="flex justify-between">
              <p className="text-lg text-gray-500">20.000 Ft</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-8/12 pb-10 mt-10">
        <div className="flex flex-col">
          <span className="font-semibold text-xl">Végösszeg</span>
          <span className="font-semibold text-md text-gray-500">40.000 Ft</span>
        </div>
        <button className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95">
          Pénztár
        </button>
      </div>
    </div>
  );
}
