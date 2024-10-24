import Image from "next/image";
import Link from "next/link";

const slide = {
  id: 3,
  image:
    "https://images.pexels.com/photos/428111/pexels-photo-428111.jpeg?auto=compress&cs=tinysrgb&w=600",
  description: "Vásároljon anonim festményeket",
  title: "Magyar művészktől",
  button: "Alkotások megtekintése",
};
export default function Diavetito() {
  return (
    <div className="h-[calc(100vh-4rem)]  relative">
      <div className="w-full">
        <div className="flex-1">
          <Image
            src={slide.image}
            alt=""
            fill={true}
            quality={100}
            className="object-cover object-center block"
          />
          <div className="text-white text-shadow-outline font-semibold absolute flex flex-col gap-2 justify-center items-center bottom-[20vh] left-0 right-0 md:text-xl md:gap-6 xl:text-2xl">
            <p>{slide.description}</p>
            <h1 className="text-3xl md:text-5xl xl:text-6xl">{slide.title}</h1>
            <Link
              href="/termekek"
              className="bg-white text-black border-2 border-white hover:bg-transparent hover:text-white rounded-md px-4 py-2 xl:text-xl active:scale-95 transition ease-in-out duration-300"
            >
              {slide.button}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-center w-full absolute bottom-[5vh] xl:bottom-[8vh]"></div>
    </div>
  );
}
