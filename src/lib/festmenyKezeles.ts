"use server";

import { Meret, Stilus } from "@prisma/client";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import { unlinkSync } from "fs";

export async function addFestmeny(formData: FormData) {
  const nev = formData.get("nev") as string;
  const leiras = formData.get("leiras") as string;
  const stilus = formData.get("stilus") as Stilus;
  const meret = formData.get("meret") as Meret;
  const stringEv = formData.get("ev") as string;
  const stringAr = formData.get("ar") as string;
  const kep: File = formData.get("kep") as unknown as File;

  if (!kep) {
    throw new Error("Kép megadása kötelező");
  }

  const bytes = await kep.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await fs.mkdir(`public/kepek`, { recursive: true });
  const pathName = `/kepek/${crypto.randomUUID()}.jpg`;
  await fs.writeFile(`public${pathName}`, buffer);

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
        kep: pathName.toString(),
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
    revalidatePath("/admin");
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
    revalidatePath("/admin");
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
  const kep: File = formData.get("kep") as unknown as File;

  let pathName: string | null = null;

  if (kep) {
    const prev = await prisma.festmeny.findUnique({ where: { festmenyId } });

    const bytes = await kep.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await fs.mkdir(`public/kepek`, { recursive: true });
    unlinkSync(`public${prev!.kep}`);
    pathName = `/kepek/${crypto.randomUUID()}.jpg`;
    await fs.writeFile(`public${pathName}`, buffer);
  }

  const ev = stringEv ? parseInt(stringEv) : null;
  const ar = stringAr ? parseInt(stringAr) : null;

  const updateData: {
    nev?: string;
    leiras?: string;
    stilus?: Stilus;
    meret?: Meret;
    ev?: number;
    ar?: number;
    kep?: string;
  } = {};

  if (nev) updateData.nev = nev;
  if (leiras) updateData.leiras = leiras;
  if (stilus) updateData.stilus = stilus;
  if (meret) updateData.meret = meret;
  if (ev !== null) updateData.ev = ev;
  if (ar !== null) updateData.ar = ar;
  if (pathName) updateData.kep = pathName.toString();

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

export async function getDeletedFestmeny() {
  const festmenyek = await prisma.festmeny.findMany({
    where: { elerheto: false, rendelesId: null },
  });
  return festmenyek;
}
