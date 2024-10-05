"use client";

import { loginUser } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Bejelentkezes({
  searchParams,
}: {
  searchParams: { redirect: string };
}) {
  const [emailError, setEmailError] = useState<string | null>();
  const [bejelentkezesError, setBejelentkezesError] = useState<string | null>();
  const [error, setError] = useState<string | null>();

  const router = useRouter();

  const context = useContext(AuthContext);
  if (!context) {
    return;
  }

  const {
    setContextFelhasznalo,
    setContextToken,
    contextFelhasznalo,
    contextToken,
  } = context;

  const handleSubmit = async (formData: FormData) => {
    const { emailError, bejelentkezesError, error, felhasznalo, token } =
      await loginUser(formData);
    setEmailError(emailError);
    setBejelentkezesError(bejelentkezesError);
    setError(error);
    console.log(token);
    if (token && felhasznalo) {
      setContextFelhasznalo(felhasznalo);
      setContextToken(token);
      console.log(felhasznalo, token);
      console.log(contextFelhasznalo);
      console.log(contextToken);
      if (felhasznalo.jogosultsag === "Admin") {
        router.push("/admin");
      } else if (felhasznalo.jogosultsag === "Szallito") {
        router.push("/szallito");
      } else if (searchParams.redirect) {
        router.push("/penztar");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col items-center mt-6 sm:mt-24 mb-60"
    >
      <div className="flex flex-col sm:border-2 pt-12 px-12 pb-16 rounded-lg">
        <h1 className="mb-5 font-semibold text-lg">Bejelentkezés</h1>
        {searchParams.redirect && (
          <p className="text-red-500">Vásárlás előtt jelentkezz be</p>
        )}
        <label className="mt-5">Email</label>
        <input
          id="email"
          name="email"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          type="email"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
        <label>Jelszó</label>
        <input
          id="jelszo"
          name="jelszo"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          type="password"
        />

        {bejelentkezesError && (
          <p className="text-red-500">{bejelentkezesError}</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-black border-2 border-black text-white rounded-md py-2 hover:bg-white hover:text-black active:scale-95 transition ease-in-out duration-300"
        >
          Bejelentkezés
        </button>
        <p className="mt-6 mb-2 flex justify-center">
          Nincs fiókod? Regisztrálj!
        </p>
        <Link
          href="/regisztracio"
          className="flex justify-center bg-gray-400 border-2 border-gray-400 text-white rounded-md py-2 hover:bg-white hover:text-gray-400 active:scale-95 transition ease-in-out duration-300"
        >
          Regisztráció
        </Link>
      </div>
    </form>
  );
}
