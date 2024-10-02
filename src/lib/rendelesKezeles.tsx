"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export async function addOrder(formData: FormData) {
  const data: { [key: string]: any } = {};

  const felhasznaloId = formData.get("felhasznaloId") as string;

  const vezeteknev = formData.get("vezeteknev") as string;
  data.vezeteknev = vezeteknev;

  const keresztnev = formData.get("keresztnev") as string;
  data.keresztnev = keresztnev;

  const telefonszam = formData.get("telefonszam") as string;
  data.telefonszam = telefonszam;

  const varos = formData.get("varos") as string;
  data.varos = varos;

  const iranyitoszamFn = formData.get("iranyitoszam") as string;
  const iranyitoszam = parseInt(iranyitoszamFn);
  data.iranyitoszam = iranyitoszam;

  const utca = formData.get("utca") as string;
  data.utca = utca;

  const hazszamFn = formData.get("hazszam") as string;
  const hazszam = parseInt(hazszamFn);
  data.hazszam = hazszam;

  const emeletFn = formData.get("emelet") as string;
  const emelet = parseInt(emeletFn);
  if (emelet) {
    data.emelet = emelet;
  }

  const ajtoFn = formData.get("ajto") as string;
  const ajto = parseInt(ajtoFn);
  if (ajto) {
    data.ajto = ajto;
  }

  const csengoFn = formData.get("csengo") as string;
  const csengo = parseInt(csengoFn);
  if (csengo) {
    data.csengo = csengo;
  }

  const festmenyIds = formData.getAll("festmenyIds") as string[];
  if (festmenyIds.length === 0) {
    return { errorMessage: "At least one painting must be selected" };
  }

  try {
    await prisma.rendeles.create({
      data: {
        ...data,
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
