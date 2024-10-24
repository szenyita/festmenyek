"use client";

import { useState } from "react";
import { softDeleteFestmeny } from "@/lib/festmenyKezeles";

export default function FestmenyTorles() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    await softDeleteFestmeny(formData);
    setOpen(false);
  };

  return (
    <div>
      <button
        className="w-[15vw] bg-red-400 text-white border-2 border-red-400 rounded-md px-4 py-2 hover:bg-white hover:text-red-400 transition ease-in-out duration-300 active:scale-95"
        onClick={() => setOpen((prev) => !prev)}
      >
        Festmény Törlése
      </button>
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <form
            action={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8 w-1/3"
          >
            <h1 className="text-xl font-semibold mb-4">Festmény Törlése</h1>
            <div className="flex flex-col">
              <label>Festmény Azonosító</label>
              <input
                id="festmenyId"
                name="festmenyId"
                type="string"
                className="border rounded-md p-2 mb-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-black text-white border-2 border-black rounded-md px-4 py-2 hover:bg-white hover:text-black transition ease-in-out duration-300 active:scale-95"
                onClick={() => setOpen((prev) => !prev)}
              >
                Vissza
              </button>
              <button
                type="submit"
                className="bg-red-400 text-white border-2 border-red-400 rounded-md px-4 py-2 hover:bg-white hover:text-red-400 transition ease-in-out duration-300 active:scale-95"
              >
                Törlés
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
