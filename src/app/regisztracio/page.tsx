import Link from "next/link";

export default function Regisztracio() {
  return (
    <form className="flex flex-col items-center mt-6 sm:mt-24 mb-60">
      <div className="flex flex-col sm:border-2 pt-12 pb-16 px-12 rounded-lg">
        <h1 className="mb-5 font-semibold text-lg">Bejelentkezés</h1>
        <label>Email</label>
        <input
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          type="text"
        />
        <label>Jelszó</label>
        <input
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          type="password"
        />
        <label>Jelszó megerősítés</label>
        <input
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          type="password"
        />
        <button className="bg-black border-2 border-black text-white rounded-md py-2 hover:bg-white hover:text-black active:scale-95 transition ease-in-out duration-300">
          Regisztráció
        </button>
        <p className="mt-6 mb-2 flex justify-center">
          Van fiókod? Jelentkezz be!
        </p>
        <Link
          href="/bejelentkezes"
          className="flex justify-center bg-gray-400 border-2 border-gray-400 text-white rounded-md py-2 hover:bg-white hover:text-gray-400 active:scale-95 transition ease-in-out duration-300"
        >
          Bejelentkezés
        </Link>
      </div>
    </form>
  );
}
