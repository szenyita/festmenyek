"use client";
import { useEffect, useState } from "react";
import { getDeliveries, setToDelivered } from "@/lib/szallitasKezeles";

type Rendeles = {
  rendelesId: string;
  datum: Date;
  felhasznaloId: string;
  vezeteknev: string;
  keresztnev: string;
  telefonszam: string;
  varos: string;
  iranyitoszam: number;
  utca: string;
  hazszam: number;
  emelet: number | null;
  ajto: number | null;
  csengo: number | null;
  kiszallitva: boolean | null;
};

export default function SzallitasKezeles() {
  const [rendelesek, setRendelesek] = useState<Rendeles[]>([]);

  const getRendelesek = async () => {
    const aktivRendelesek = await getDeliveries();
    setRendelesek(aktivRendelesek);
  };

  useEffect(() => {
    getRendelesek();
  }, []);

  const [selectedRendeles, setSelectedRendeles] = useState<string | null>(null);

  const handleConfirmDelivery = () => {
    if (selectedRendeles !== null) {
      setToDelivered(selectedRendeles);
      setSelectedRendeles(null);
      getRendelesek();
    }
  };

  const selectedRendelesData = rendelesek.find(
    (r) => r.rendelesId === selectedRendeles
  );

  if (rendelesek.length === 0) {
    return (
      <div className="h-[calc(100vh-192px-64px)] flex justify-center pt-20 font-semibold">
        Nincsenek aktív rendelések
      </div>
    );
  }

  return (
    <div className="mx-12 sm:mx-24 md:mx-60 lg:mx-12 mb-12 lg:w-1/3">
      <h1 className="mb-3 mt-10 md:mt-5 font-semibold text-lg">
        Aktív Rendelések
      </h1>
      <div className="grid grid-cols-3 gap-2 py-1 px-2 bg-black text-white rounded-t-md border-black border-t-2 border-l-2 border-r-2">
        <div>Azonosító</div>
        <div>Cím</div>
        <div>Dátum</div>
      </div>
      {rendelesek.map((rendeles) => (
        <div
          key={rendeles.rendelesId}
          className="gap-2 py-1 px-2 odd:bg-gray-200 border-gray-200 border-l-2 border-r-2 last:rounded-b-md last:border-b-2"
        >
          <div
            onClick={() => setSelectedRendeles(rendeles.rendelesId)}
            className="grid grid-cols-3 cursor-pointer hover:text-red-400 active:scale-95 transition ease-in-out duration-300"
          >
            <div>{rendeles.rendelesId}</div>
            <div>
              {`${rendeles.varos} ${rendeles.iranyitoszam} ${rendeles.utca} ${rendeles.hazszam}`}
            </div>
            <div>{rendeles.datum.toString()}</div>
          </div>
        </div>
      ))}

      {selectedRendelesData && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Rendelés Részletei</h2>
            <div className="mb-4">
              <p className="font-medium">Felhasználó neve:</p>
              <p className="text-gray-600">
                {selectedRendelesData.vezeteknev}
                {selectedRendelesData.keresztnev}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Telefonszám:</p>
              <p className="text-gray-600">
                {selectedRendelesData.telefonszam}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Város:</p>
              <p className="text-gray-600">{selectedRendelesData.varos}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Irányítószám:</p>
              <p className="text-gray-600">
                {selectedRendelesData.iranyitoszam}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Utca:</p>
              <p className="text-gray-600">{selectedRendelesData.utca}</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Házszám:</p>
              <p className="text-gray-600">{selectedRendelesData.hazszam}</p>
            </div>
            {selectedRendelesData.emelet && (
              <div className="mb-4">
                <p className="font-medium">Emelet:</p>
                <p className="text-gray-600">{selectedRendelesData.emelet}</p>
              </div>
            )}
            {selectedRendelesData.ajto && (
              <div className="mb-4">
                <p className="font-medium">Ajtó:</p>
                <p className="text-gray-600">{selectedRendelesData.ajto}</p>
              </div>
            )}
            {selectedRendelesData.csengo && (
              <div className="mb-4">
                <p className="font-medium">Csengőszám:</p>
                <p className="text-gray-600">{selectedRendelesData.csengo}</p>
              </div>
            )}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-red-400 text-white border-2 border-red-400 rounded-md px-4 py-2 hover:bg-white hover:text-red-400 transition ease-in-out duration-300 active:scale-95"
                onClick={() => setSelectedRendeles(null)}
              >
                Vissza
              </button>
              <button
                type="button"
                className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
                onClick={handleConfirmDelivery}
              >
                Kiszállítás megerősítése
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
