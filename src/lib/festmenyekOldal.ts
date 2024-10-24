"use server";

import prisma from "./prisma";

export async function getFestmenyek() {
  const festmenyek = await prisma.festmeny.findMany({
    where: { elerheto: true },
  });
  return festmenyek;
}
