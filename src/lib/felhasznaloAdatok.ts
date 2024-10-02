"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export async function addPersonalData(formData: FormData) {
  const data: { [key: string]: any } = {};

  const felhasznaloId = formData.get("felhasznaloId") as string;
  if (felhasznaloId) {
    data.felhasznaloId = felhasznaloId;
  }

  const vezeteknev = formData.get("vezeteknev") as string;
  if (vezeteknev) {
    data.vezeteknev = vezeteknev;
  }

  const keresztnev = formData.get("keresztnev") as string;
  if (keresztnev) {
    data.keresztnev = keresztnev;
  }

  const telefonszam = formData.get("telefonszam") as string;
  if (telefonszam) {
    data.telefonszam = telefonszam;
  }

  const varos = formData.get("varos") as string;
  if (varos) {
    data.varos = varos;
  }

  const iranyitoszamFn = formData.get("iranyitoszam") as string;
  const iranyitoszam = parseInt(iranyitoszamFn);
  if (iranyitoszam) {
    data.iranyitoszam = iranyitoszam;
  }

  const utca = formData.get("utca") as string;
  if (utca) {
    data.utca = utca;
  }

  const hazszamFn = formData.get("hazszam") as string;
  const hazszam = parseInt(hazszamFn);
  if (hazszam) {
    data.hazszam = hazszam;
  }

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

  try {
    await prisma.felhasznalo.update({
      where: {
        felhasznaloId,
      },
      data,
    });
    revalidatePath("/fiok");
    return { successMessage: "Sikeresen mentve" };
  } catch (error) {
    console.log(error);
    return { errorMessage: "Hiba merült fel, próbálja újra" };
  }
}

export async function getPersonalData(felhasznaloId: string) {
  const felhasznalo = await prisma.felhasznalo.findUnique({
    where: {
      felhasznaloId,
    },
  });
  return felhasznalo;
}
