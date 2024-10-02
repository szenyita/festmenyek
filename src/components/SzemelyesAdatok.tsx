"use client";

import { addPersonalData, getPersonalData } from "@/lib/felhasznaloAdatok";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useState } from "react";
import { CartContext } from "@/context/CartContext";
import { addOrder } from "@/lib/rendelesKezeles";
import { usePathname, useRouter } from "next/navigation";

export default function SzemelyesAdatok() {
  const [successMessage, setSuccessMessage] = useState<string | null>();
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [vezeteknev, setVezeteknev] = useState<string | null>();
  const [keresztnev, setKeresztnev] = useState<string | null>();
  const [telefonszam, setTelefonszam] = useState<string | null>();
  const [varos, setVaros] = useState<string | null>();
  const [iranyitoszam, setIranyitoszam] = useState<string | null>();
  const [utca, setUtca] = useState<string | null>();
  const [hazszam, setHazszam] = useState<string | null>();
  const [emelet, setEmelet] = useState<string | null>();
  const [ajto, setAjto] = useState<string | null>();
  const [csengo, setCsengo] = useState<string | null>();
  const [paymemtSuccessMessage, setPaymemtSuccessMessage] = useState<
    string | null
  >();
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<
    string | null
  >();
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    if (pathname === "/fiok") {
      const message = await addPersonalData(formData);
      if (message.successMessage) {
        setSuccessMessage(message.successMessage);
      } else {
        setErrorMessage(message.errorMessage);
      }
    } else if (pathname === "/penztar") {
      cartContext?.cart.forEach((item) => {
        formData.append(`festmenyIds`, item.festmenyId);
      });
      const { paymemtSuccessMessage, paymentErrorMessage } = await addOrder(
        formData
      );

      if (paymemtSuccessMessage) {
        cartContext?.cart.map((item) =>
          cartContext?.removeFromCart(item.festmenyId)
        );
        setPaymemtSuccessMessage(paymemtSuccessMessage);
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } else {
        setPaymentErrorMessage(paymentErrorMessage);
      }
    }
  };

  const formatPrice = (price: number) => {
    return (
      price.toLocaleString("hu-HU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) + " Ft"
    );
  };

  const cartContext = useContext(CartContext);
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  if (!cartContext) {
    return null;
  }

  const gettingPersonalData = async () => {
    const felhasznaloAdatok = await getPersonalData(
      context.contextFelhasznalo?.felhasznaloId!
    );

    setVezeteknev(felhasznaloAdatok?.vezeteknev);
    setKeresztnev(felhasznaloAdatok?.keresztnev);
    setTelefonszam(felhasznaloAdatok?.telefonszam);
    setVaros(felhasznaloAdatok?.varos);
    setIranyitoszam(felhasznaloAdatok?.iranyitoszam?.toString());
    setUtca(felhasznaloAdatok?.utca);
    setHazszam(felhasznaloAdatok?.hazszam?.toString());
    setEmelet(felhasznaloAdatok?.emelet?.toString());
    setAjto(felhasznaloAdatok?.ajto?.toString());
    setCsengo(felhasznaloAdatok?.csengo?.toString());
  };

  gettingPersonalData();

  return (
    <form
      action={handleSubmit}
      className="mx-12 sm:mx-24 md:mx-60 lg:mx-12 lg:w-1/3 lg:flex lg:flex-wrap lg:justify-between"
    >
      <div className="lg:w-[48%]">
        <h1 className="mb-3 mt-5 font-semibold text-lg">Személyes Adatok</h1>
        <input
          type="text"
          id="felhasznaloId"
          name="felhasznaloId"
          value={context.contextFelhasznalo?.felhasznaloId}
          className="hidden"
          readOnly
        />
        <label>Vezetéknév</label>
        <input
          id="vezeteknev"
          name="vezeteknev"
          type="text"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          defaultValue={vezeteknev || ""}
        />
        <label>Keresztnév</label>
        <input
          id="keresztnev"
          name="keresztnev"
          type="text"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          defaultValue={keresztnev || ""}
        />
        <label>Telefonszám</label>
        <input
          id="telefonszam"
          name="telefonszam"
          type="text"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          defaultValue={telefonszam || ""}
        />
      </div>
      <div className="lg:w-[48%]">
        <h1 className="mb-3 font-semibold text-lg mt-5">Cím</h1>
        <label>Város</label>
        <input
          id="varos"
          name="varos"
          type="text"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          defaultValue={varos || ""}
        />
        <label>Irányítószám</label>
        <input
          id="iranyitoszam"
          name="iranyitoszam"
          type="number"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          defaultValue={iranyitoszam || ""}
        />
        <label>Utca</label>
        <input
          id="utca"
          name="utca"
          type="text"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
          defaultValue={utca || ""}
        />
        <label>Házszám</label>
        <input
          id="hazszam"
          name="hazszam"
          type="number"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          defaultValue={hazszam || ""}
        />
        <label>Emelet</label>
        <input
          id="emelet"
          name="emelet"
          type="number"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          defaultValue={emelet || ""}
        />
        <label>Ajtó</label>
        <input
          id="ajto"
          name="ajto"
          type="number"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          defaultValue={ajto || ""}
        />
        <label>Csengő</label>
        <input
          id="csengo"
          name="csengo"
          type="number"
          className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          defaultValue={csengo || ""}
        />
      </div>
      {successMessage && (
        <p className="font-semibold text-green-500">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="font-semibold text-red-400">{errorMessage}</p>
      )}
      {paymemtSuccessMessage && (
        <p className="font-semibold text-green-500">{paymemtSuccessMessage}</p>
      )}
      {paymentErrorMessage && (
        <p className="font-semibold text-red-400">{paymentErrorMessage}</p>
      )}
      {pathname === "/fiok" && (
        <button
          type="submit"
          className="lg:mb-16 bg-black text-white w-full border-2 border-black mt-4 rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
        >
          Módosít
        </button>
      )}
      {pathname === "/penztar" && (
        <button
          type="submit"
          className="lg:mb-16 bg-black text-white w-full border-2 border-black mt-4 rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
        >
          {`Fizet: ${formatPrice(
            cartContext.cart.reduce((sum, item) => sum + item.ar, 0)
          )}`}
        </button>
      )}
    </form>
  );
}
