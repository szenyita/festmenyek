"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";

const szinek = [
  { id: 1, name: "Szürke" },
  { id: 2, name: "Piros" },
  { id: 3, name: "Fehér" },
  { id: 4, name: "Fekete" },
];

const szinValtozatok = [
  { termekId: 1, name: "Szürke" },
  { termekId: 2, name: "Piros" },
  { termekId: 3, name: "Fehér" },
  { termekId: 4, name: "Fekete" },
];

export default function SzinValtozatHozzaadas() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageLimitError, setImageLimitError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + images.length > 5) {
      setImageLimitError(true);
      setFadeOut(false);
      return;
    }
    setImages([...images, ...files]);
    setImageLimitError(false);
  };

  useEffect(() => {
    if (imageLimitError) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setImageLimitError(false);
        }, 500);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [imageLimitError]);

  const getAvailableColors = (id: number | null) => {
    if (!id) return [];
    const usedColors = szinValtozatok
      .filter((valtozat) => valtozat.termekId === id)
      .map((valtozat) => valtozat.name);
    return szinek.filter((szin) => !usedColors.includes(szin.name));
  };

  const availableColors = getAvailableColors(selectedId);

  return (
    <div>
      <button
        className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
        onClick={() => setOpen((prev) => !prev)}
      >
        Szín Változat Hozzáadása
      </button>
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
            <h1 className="text-xl font-semibold mb-4">
              Szín Változat Hozzáadása
            </h1>
            <div className="flex flex-col">
              <label>Termék Azonosító</label>
              <input
                type="number"
                className="border rounded-md p-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(e) => setSelectedId(parseInt(e.target.value))}
              />
              <label>Szín</label>
              <select className="cursor-pointer border rounded-md p-2 mb-2">
                <option disabled selected></option>
                {availableColors.map((szin) => (
                  <option key={szin.id} value={szin.name}>
                    {szin.name}
                  </option>
                ))}
              </select>
              <label>Képek</label>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                <button
                  type="button"
                  className="bg-gray-200 text-black border-2 border-gray-200 rounded-md px-4 py-2 w-full text-left"
                >
                  Kép kiválasztása
                </button>
              </div>
              <div className="mt-2">
                {images.length > 0 && (
                  <div className="flex gap-2">
                    {images.map((file, index) => (
                      <Image
                        height={100}
                        width={100}
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-20 h-20 object-cover"
                      />
                    ))}
                  </div>
                )}
                {imageLimitError && (
                  <p
                    className={`text-red-500 mt-4 transition-opacity duration-500 ${
                      fadeOut ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    Maximum 5 kép feltöltése engedélyezett.
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-red-400 text-white border-2 border-red-400 rounded-md px-4 py-2 hover:bg-white hover:text-red-400 transition ease-in-out duration-300 active:scale-95"
                onClick={() => setOpen((prev) => !prev)}
              >
                Vissza
              </button>
              <button
                className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
                onClick={() => setOpen((prev) => !prev)}
              >
                Mentés
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
