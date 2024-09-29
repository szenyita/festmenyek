import Mennyiseg from "@/components/Mennyiseg";
import Meretek from "@/components/Meretek";
import Szinek from "@/components/Szinek";
import Image from "next/image";

const item = {
  id: 1,
  name: "Kiskutya",
  description:
    "A pici kiskutya általában apró termetű, puha szőrű és rendkívül aranyos megjelenésű. Kicsi mancsai, gömbölyded pofija és nagy, ragyogó szemei különösen bájossá teszik. Szőre lehet rövid vagy hosszú, különféle színekben – fehér, fekete, barna, vagy akár foltos is. A kiskutyák kíváncsiak, játékosak, és gyakran szeleburdiak, minden apróság érdekli őket.",
  price: "20.000 Ft",
  image:
    "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=600",
  color: "Fehér",
  size: "M",
};

const list = [
  {
    id: 1,
    name: "Kiskutya",
    description:
      "A pici kiskutya általában apró termetű, puha szőrű és rendkívül aranyos megjelenésű. Kicsi mancsai, gömbölyded pofija és nagy, ragyogó szemei különösen bájossá teszik. Szőre lehet rövid vagy hosszú, különféle színekben – fehér, fekete, barna, vagy akár foltos is. A kiskutyák kíváncsiak, játékosak, és gyakran szeleburdiak, minden apróság érdekli őket.",
    price: "20.000 Ft",
    image:
      "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "Fehér",
    size: "M",
  },
  {
    id: 2,
    name: "Kiskutya",
    description:
      "A pici kiskutya általában apró termetű, puha szőrű és rendkívül aranyos megjelenésű. Kicsi mancsai, gömbölyded pofija és nagy, ragyogó szemei különösen bájossá teszik. Szőre lehet rövid vagy hosszú, különféle színekben – fehér, fekete, barna, vagy akár foltos is. A kiskutyák kíváncsiak, játékosak, és gyakran szeleburdiak, minden apróság érdekli őket.",
    price: "20.000 Ft",
    image:
      "https://images.pexels.com/photos/46505/swiss-shepherd-dog-dog-pet-portrait-46505.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "Fehér",
    size: "M",
  },
  {
    id: 3,
    name: "Kiskutya",
    description:
      "A pici kiskutya általában apró termetű, puha szőrű és rendkívül aranyos megjelenésű. Kicsi mancsai, gömbölyded pofija és nagy, ragyogó szemei különösen bájossá teszik. Szőre lehet rövid vagy hosszú, különféle színekben – fehér, fekete, barna, vagy akár foltos is. A kiskutyák kíváncsiak, játékosak, és gyakran szeleburdiak, minden apróság érdekli őket.",
    price: "20.000 Ft",
    image:
      "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "Fehér",
    size: "M",
  },
  {
    id: 4,
    name: "Kiskutya",
    description:
      "A pici kiskutya általában apró termetű, puha szőrű és rendkívül aranyos megjelenésű. Kicsi mancsai, gömbölyded pofija és nagy, ragyogó szemei különösen bájossá teszik. Szőre lehet rövid vagy hosszú, különféle színekben – fehér, fekete, barna, vagy akár foltos is. A kiskutyák kíváncsiak, játékosak, és gyakran szeleburdiak, minden apróság érdekli őket.",
    price: "20.000 Ft",
    image:
      "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "Fehér",
    size: "M",
  },
];

export default function Termek() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:items-start lg:mt-12 lg:mb-12">
      <div className="flex flex-col mt-5 md:mb-12 w-[300px] lg:w-[600px]">
        <div className="mb-2">
          <Image
            src="https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={600}
            height={400}
            className="rounded-lg w-full aspect-[3/2] object-cover]"
          />
        </div>
        <div className="flex flex-wrap justify-between">
          {list.map((item) => (
            <div key={item.id} className="w-[146px] md:w-[144px] pt-2">
              <Image
                src={item.image}
                alt=""
                width={144}
                height={108}
                className="rounded-lg w-full aspect-[3/2] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 md:mt-5 md:ml-8 flex flex-col items-start w-[300px]">
        <h1 className="text-xl lg:text-2xl mb-1 lg:mb-4 font-semibold">
          {item.name}
        </h1>
        <p className="text-gray-400 lg:text-md">{item.description}</p>
        <p className="font-semibold mt-4 lg:text-lg">{item.price}</p>
        <div className="flex gap-1 mt-2">
          <Szinek />
        </div>
        <div className="mt-3">
          <Meretek />
        </div>
        <div className="mt-3">
          <Mennyiseg />
        </div>
        <div>
          <button className="mb-12 mt-3 text-lg text-white bg-red-400 border-red-400 border-2 rounded-md px-1.5 py-0.5 hover:bg-white hover:text-red-400 transition ease-in-out duration-300 active:scale-90">
            Kosárba
          </button>
        </div>
      </div>
    </div>
  );
}
