"use server";

import prisma from "./prisma";

export async function getDeliveries() {
  const rendelesek = await prisma.rendeles.findMany({
    where: {
      kiszallitva: false,
    },
    orderBy: {
      datum: "asc",
    },
  });
  return rendelesek;
}

export async function setToDelivered(rendelesId: string) {
  try {
    await prisma.rendeles.update({
      where: {
        rendelesId,
      },
      data: {
        kiszallitva: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
