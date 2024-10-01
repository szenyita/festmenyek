"use server";

import { Meret, Stilus } from "@prisma/client";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export async function addFestmeny(formData: FormData) {
  const nev = formData.get("nev") as string;
  const leiras = formData.get("leiras") as string;
  const stilus = formData.get("stilus") as Stilus;
  const meret = formData.get("meret") as Meret;
  const stringEv = formData.get("ev") as string;
  const stringAr = formData.get("ar") as string;
  const kep = formData.get("kep") as string;

  const ev = parseInt(stringEv);
  const ar = parseInt(stringAr);

  try {
    await prisma.festmeny.create({
      data: {
        nev,
        leiras,
        stilus,
        meret,
        ev,
        ar,
        kep,
      },
    });
    revalidatePath("/termekek");
    revalidatePath("/");
    console.log("Created");
  } catch (error) {
    console.error(error);
  }
}

export async function softDeleteFestmeny(formData: FormData) {
  const festmenyId = formData.get("festmenyId") as string;

  try {
    await prisma.festmeny.update({
      where: {
        festmenyId,
      },
      data: {
        elerheto: false,
      },
    });
    revalidatePath("/termek-kezeles");
    console.log("Soft deleted");
  } catch (error) {
    console.error(error);
  }
}

export async function bringbackFestmeny(formData: FormData) {
  const festmenyId = formData.get("festmenyId") as string;

  try {
    await prisma.festmeny.update({
      where: {
        festmenyId,
      },
      data: {
        elerheto: true,
      },
    });
    revalidatePath("/termek-kezeles");
    revalidatePath("/termekek");
    revalidatePath("/");
    console.log("Brought back");
  } catch (error) {
    console.error(error);
  }
}

export async function updateFestmeny(formData: FormData) {
  const festmenyId = formData.get("festmenyId") as string;
  const nev = formData.get("nev") as string;
  const leiras = formData.get("leiras") as string;
  const stilus = (formData.get("stilus") as Stilus) || null;
  const meret = (formData.get("meret") as Meret) || null;
  const stringEv = formData.get("ev") as string;
  const stringAr = formData.get("ar") as string;
  const kep = formData.get("kep") as string;

  const ev = stringEv ? parseInt(stringEv) : null;
  const ar = stringAr ? parseInt(stringAr) : null;

  const updateData: any = {};

  if (nev) updateData.nev = nev;
  if (leiras) updateData.leiras = leiras;
  if (stilus) updateData.stilus = stilus;
  if (meret) updateData.meret = meret;
  if (ev !== null) updateData.ev = ev;
  if (ar !== null) updateData.ar = ar;
  if (kep) updateData.kep = kep;

  try {
    await prisma.festmeny.update({
      where: {
        festmenyId,
      },
      data: updateData,
    });
    revalidatePath("/termek-kezeles");
    revalidatePath("/termekek");
    revalidatePath("/");
    revalidatePath(`/termekek/${festmenyId}`);
    console.log("Updated");
  } catch (error) {
    console.error(error);
  }
}
