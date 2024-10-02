"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export async function addOrder(formData: FormData) {
  const felhasznaloId = formData.get("felhasznaloId") as string;

  const vezeteknev = formData.get("vezeteknev") as string;

  const keresztnev = formData.get("keresztnev") as string;

  const telefonszam = formData.get("telefonszam") as string;

  const varos = formData.get("varos") as string;

  const iranyitoszamFn = formData.get("iranyitoszam") as string;
  const iranyitoszam = parseInt(iranyitoszamFn);

  const utca = formData.get("utca") as string;

  const hazszamFn = formData.get("hazszam") as string;
  const hazszam = parseInt(hazszamFn);

  const emeletFn = formData.get("emelet") as string;
  const emelet = parseInt(emeletFn);

  const ajtoFn = formData.get("ajto") as string;
  const ajto = parseInt(ajtoFn);

  const csengoFn = formData.get("csengo") as string;
  const csengo = parseInt(csengoFn);

  const festmenyIds = formData.getAll("festmenyIds") as string[];

  try {
    await prisma.rendeles.create({
      data: {
        vezeteknev,
        keresztnev,
        telefonszam,
        varos,
        iranyitoszam,
        utca,
        hazszam,
        emelet: emelet || null,
        ajto: ajto || null,
        csengo: csengo || null,
        felhasznalo: { connect: { felhasznaloId } },
        festmenyek: {
          connect: festmenyIds.map((id) => ({ festmenyId: id })),
        },
      },
    });
    await prisma.festmeny.updateMany({
      where: { festmenyId: { in: festmenyIds } },
      data: { elerheto: false },
    });
    revalidatePath("/fiok");
    return { paymemtSuccessMessage: "Sikeres fizetés" };
  } catch (error) {
    console.log(error);
    return { paymentErrorMessage: "Hiba merült fel, próbálja újra" };
  }
}