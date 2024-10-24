"use client";

import { addPersonalData, getPersonalData } from "@/lib/felhasznaloAdatok";
import { AuthContext } from "@/context/AuthContext";
import { FormEvent, useContext, useEffect } from "react";
import { useState } from "react";
import { CartContext } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { getClientSecret } from "@/lib/payment";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export function Payment({ clientSecret }: { clientSecret: string }) {
  return (
    <div className="fixed inset-0 bg-white z-50 py-10 px-16 sm:px-[20vw] md:px-[30vw] lg:px-[35vw] pt-[20vh]">
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form />
      </Elements>
    </div>
  );
}

const Form = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (stripe === null || elements === null) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/sikeres-fizetes`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message!);
        } else {
          setErrorMessage("Ismeretlen hiba lépet fel.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold mb-4">Fizetés</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <PaymentElement />
      <button
        className={`lg:mb-16 bg-black text-white w-full border-2 border-black mt-4 rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95
          ${
            stripe === null || elements === null || isLoading
              ? "cursor-not-allowed disabled opacity-70"
              : ""
          }
          `}
      >
        {isLoading ? "Fizetés..." : "Fizetés"}
      </button>
    </form>
  );
};

export default function SzemelyesAdatok() {
  useEffect(() => {
    gettingPersonalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [paymentPage, setPaymentPage] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const [successMessage, setSuccessMessage] = useState<string | null>();
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [vezeteknev, setVezeteknev] = useState<string | null>();
  const [keresztnev, setKeresztnev] = useState<string | null>();
  const [telefonszam, setTelefonszam] = useState<string | null>();
  const [varos, setVaros] = useState<string | null>();
  const [iranyitoszam, setIranyitoszam] = useState<number | null>();
  const [utca, setUtca] = useState<string | null>();
  const [hazszam, setHazszam] = useState<number | null>();
  const [emelet, setEmelet] = useState<number | null>();
  const [ajto, setAjto] = useState<number | null>();
  const [csengo, setCsengo] = useState<number | null>();
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
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setErrorMessage(message.errorMessage);
      }
    } else if (pathname === "/penztar") {
      /*
    else if (pathname === "/penztar") {
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
        }, 3000);
      } else {
        setPaymentErrorMessage(paymentErrorMessage);
      }
    }
      */
      setPaymentPage(true);
      const clientSecretFetch = await getClientSecret(
        cartContext!.cart.reduce((sum, item) => sum + item.ar, 0),
        JSON.stringify(orderData)
      );
      setClientSecret(clientSecretFetch);
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
    setIranyitoszam(felhasznaloAdatok?.iranyitoszam);
    setUtca(felhasznaloAdatok?.utca);
    setHazszam(felhasznaloAdatok?.hazszam);
    setEmelet(felhasznaloAdatok?.emelet);
    setAjto(felhasznaloAdatok?.ajto);
    setCsengo(felhasznaloAdatok?.csengo);
  };

  const festmenyIds: string[] = [];

  cartContext?.cart.forEach((item) => {
    festmenyIds.push(item.festmenyId);
  });

  const orderData = {
    felhasznaloId: context.contextFelhasznalo?.felhasznaloId || null,
    vezeteknev: context.contextFelhasznalo?.vezeteknev || null,
    keresztnev: context.contextFelhasznalo?.keresztnev || null,
    telefonszam: context.contextFelhasznalo?.telefonszam || null,
    varos: context.contextFelhasznalo?.varos || null,
    iranyitoszam: context.contextFelhasznalo?.iranyitoszam || null,
    utca: context.contextFelhasznalo?.utca || null,
    hazszam: context.contextFelhasznalo?.hazszam || null,
    emelet: context.contextFelhasznalo?.emelet || null,
    ajto: context.contextFelhasznalo?.ajto || null,
    csengo: context.contextFelhasznalo?.csengo || null,
    festmenyIds,
  };

  return (
    <>
      {paymentPage && <Payment clientSecret={clientSecret} />}
      <form
        action={handleSubmit}
        className="mx-12 sm:mx-24 md:mx-60 lg:mx-12 lg:w-1/3  "
      >
        <div className="lg:flex lg:flex-wrap lg:justify-between">
          <div className="lg:w-[48%]">
            <h1 className="mb-3 mt-5 font-semibold text-lg">
              Személyes Adatok
            </h1>
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
              required
              onChange={(e) => setVezeteknev(e.target.value)}
              value={vezeteknev || ""}
            />
            <label>Keresztnév</label>
            <input
              id="keresztnev"
              name="keresztnev"
              type="text"
              className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
              required
              onChange={(e) => setKeresztnev(e.target.value)}
              value={keresztnev || ""}
            />
            <label>Telefonszám</label>
            <input
              id="telefonszam"
              name="telefonszam"
              type="text"
              className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
              required
              onChange={(e) => setTelefonszam(e.target.value)}
              value={telefonszam || ""}
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
              required
              onChange={(e) => setVaros(e.target.value)}
              value={varos || ""}
            />
            <label>Irányítószám</label>
            <input
              id="iranyitoszam"
              name="iranyitoszam"
              type="number"
              className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
              onChange={(e) => setIranyitoszam(parseInt(e.target.value))}
              value={iranyitoszam || ""}
            />
            <label>Utca</label>
            <input
              id="utca"
              name="utca"
              type="text"
              className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2"
              required
              onChange={(e) => setUtca(e.target.value)}
              value={utca || ""}
            />
            <label>Házszám</label>
            <input
              id="hazszam"
              name="hazszam"
              type="number"
              className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
              onChange={(e) => setHazszam(parseInt(e.target.value))}
              value={hazszam || ""}
            />
            <label>Emelet</label>
            <input
              id="emelet"
              name="emelet"
              type="number"
              className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setEmelet(parseInt(e.target.value))}
              value={emelet || ""}
            />
            <label>Ajtó</label>
            <input
              id="ajto"
              name="ajto"
              type="number"
              className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setAjto(parseInt(e.target.value))}
              value={ajto || ""}
            />
            <label>Csengő</label>
            <input
              id="csengo"
              name="csengo"
              type="number"
              className="border-2 border-gray-300 w-full rounded-md py-1 px-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onChange={(e) => setCsengo(parseInt(e.target.value))}
              value={csengo || ""}
            />
          </div>
        </div>
        {successMessage && (
          <p className="font-semibold text-green-500">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="font-semibold text-red-400">{errorMessage}</p>
        )}
        {paymemtSuccessMessage && (
          <p className="font-semibold text-green-500">
            {paymemtSuccessMessage}
          </p>
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
        {pathname === "/penztar" && !paymemtSuccessMessage && (
          <button
            type="submit"
            className="lg:mb-16 bg-black text-white w-full border-2 border-black mt-4 rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
          >
            {`Fizet: ${formatPrice(
              cartContext.cart.reduce((sum, item) => sum + item.ar, 0)
            )}`}
          </button>
        )}
        {pathname === "/penztar" && paymemtSuccessMessage && (
          <button
            type="submit"
            className="lg:mb-16 bg-black text-white w-full border-2 border-black mt-4 rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
          >
            Fizetés Animáció
          </button>
        )}
      </form>
    </>
  );
}
