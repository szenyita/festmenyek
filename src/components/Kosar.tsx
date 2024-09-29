import Image from "next/image";

export default function Kosar() {
  return (
    <div className="w-max flex flex-col absolute top-12 right-0 bg-white rounded-md px-4 pt-3 pb-5 shadow-[0_0_10px_0_rgba(0,0,0,0.5)]">
      <h2 className="text-xl font-semibold">Kosár Tartalma</h2>
      <div className="flex flex-col gap-2 my-2">
        <div className="flex items-start">
          <Image
            src="https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            height={100}
            width={100}
            className="rounded-md"
          />
          <div className="mx-2">
            <div className="">
              <span className="font-semibold mr-6">Kutyus</span>
              <span className="">20.000 Ft</span>
            </div>
            <div className="flex justify-between w-full py-1">
              <span className="text-sm text-gray-500">1 db</span>
              <span className="text-sm text-red-500 cursor-pointer">
                <Image src="/kuka.svg" alt="" height={20} width={20} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-start">
          <Image
            src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            height={100}
            width={100}
            className="rounded-md"
          />
          <div className="mx-2">
            <div className="">
              <span className="font-semibold mr-6">Kutyus</span>
              <span className="">20.000 Ft</span>
            </div>
            <div className="flex justify-between py-1 w-full">
              <span className="text-sm text-gray-500">1 db</span>
              <span className="text-sm text-red-500 cursor-pointer">
                <Image src="/kuka.svg" alt="" height={20} width={20} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-semibold">Végösszeg:</span>
          <span className="font-semibold text-sm text-gray-500">40.000 Ft</span>
        </div>
        <button className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95">
          Pénztár
        </button>
      </div>
    </div>
  );
}
