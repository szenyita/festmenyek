"use client";

const adatok = {
  vezeteknev: "Veteteknev",
  keresztnev: "Keresztnev",
  telefon: "123456789",
  email: "j6JyY@example.com",
  varos: "Varos",
  iranyitoszam: "1234",
  utca: "Utca",
  hazszam: "123",
  emelet: "Emelet",
  ajto: "Ajto",
  csengo: "Csego",
};
export default function SzemelyesAdatok() {
  return (
    <form
      className="mx-12 sm:mx-24 md:mx-60 lg:mx-12 lg:w-1/3 lg:flex lg:flex-wrap lg:justify-between"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="lg:w-[48%]">
        <h1 className="mb-3 mt-5 font-semibold text-lg">Személyes Adatok</h1>
        <label>Vezetéknév</label>
        <input
          type="text"
          placeholder={adatok.vezeteknev}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
        <label>Keresztnév</label>
        <input
          type="text"
          placeholder={adatok.keresztnev}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
        <label>Telefonszám</label>
        <input
          type="text"
          placeholder={adatok.telefon}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
        <label>E-mail</label>
        <input
          type="text"
          placeholder={adatok.email}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
      </div>
      <div className="lg:w-[48%]">
        <h1 className="mb-3 font-semibold text-lg mt-5">Cím</h1>
        <label>Város</label>
        <input
          type="text"
          placeholder={adatok.varos}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
        <label>Irányítószám</label>
        <input
          type="text"
          placeholder={adatok.iranyitoszam}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
        <label>Utca</label>
        <input
          type="text"
          placeholder={adatok.utca}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
        <label>Házszám</label>
        <input
          type="text"
          placeholder={adatok.hazszam}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
        <label>Emelet</label>
        <input
          type="text"
          placeholder={adatok.emelet}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
        <label>Ajtó</label>
        <input
          type="text"
          placeholder={adatok.ajto}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
        <label>Csengő</label>
        <input
          type="text"
          placeholder={adatok.csengo}
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
        />
      </div>
      <button className="lg:mb-16 bg-black text-white w-full border-2 border-black mt-4 rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95">
        Módosít
      </button>
    </form>
  );
}
