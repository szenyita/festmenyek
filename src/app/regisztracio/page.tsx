"use client";

import { registerUser } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";

export default function Regisztracio() {
  const [emailError, setEmailError] = useState<string | null>();
  const [uresMezoError, setUresMezoError] = useState<string | null>();
  const [letezoFelhasznaloError, setLetezoFelhasznaloError] = useState<
    string | null
  >();
  const [jelszoErossegError, setJelszoErossegError] = useState<string | null>();
  const [megerositettJelszoError, setMegerositettJelszoError] = useState<
    string | null
  >();
  const [error, setError] = useState<string | null>();

  const handleSubmit = async (formData: FormData) => {
    const {
      emailError,
      uresMezoError,
      letezoFelhasznaloError,
      jelszoErossegError,
      megerositettJelszoError,
      error,
    } = await registerUser(formData);

    setEmailError(emailError);
    setUresMezoError(uresMezoError);
    setLetezoFelhasznaloError(letezoFelhasznaloError);
    setJelszoErossegError(jelszoErossegError);
    setMegerositettJelszoError(megerositettJelszoError);
    setError(error);
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col items-center pt-6 sm:mt-24 min-h-[calc(100vh-400px)]"
    >
      <div className="flex flex-col sm:border-2 pt-12 pb-16 px-12 rounded-lg">
        <h1 className="mb-5 font-semibold text-lg">Regisztráció</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          type="email"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
        {letezoFelhasznaloError && (
          <p className="text-red-500">{letezoFelhasznaloError}</p>
        )}
        <label htmlFor="jelszo">Jelszó</label>
        <input
          id="jelszo"
          name="jelszo"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          type="password"
        />
        {jelszoErossegError && (
          <p className="text-red-500">{jelszoErossegError}</p>
        )}
        <label htmlFor="megerositettJelszo">Jelszó megerősítés</label>
        <input
          id="megerositettJelszo"
          name="megerositettJelszo"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          type="password"
        />{" "}
        {uresMezoError && <p className="text-red-500">{uresMezoError}</p>}
        {megerositettJelszoError && (
          <p className="text-red-500">{megerositettJelszoError}</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-black border-2 border-black text-white rounded-md py-2 hover:bg-white hover:text-black active:scale-95 transition ease-in-out duration-300"
        >
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
