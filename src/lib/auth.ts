"use server";

import { hash } from "bcrypt";
import prisma from "../lib/prisma";
import { isEmail, isStrongPassword } from "validator";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const jelszo = formData.get("jelszo") as string;
  const megerositettJelszo = formData.get("megerositettJelszo") as string;

  if (!isEmail(email)) {
    return { emailError: "Érvénytelen email cím" };
  }

  const letezoFelhasznalo = await prisma.felhasznalo.findUnique({
    where: { email },
  });

  if (letezoFelhasznalo) {
    return { letezoFelhasznaloError: "Ez az email cím regisztrálva van" };
  }

  if (!isStrongPassword(jelszo)) {
    return { jelszoErossegError: "A jelszó nem elég erős" };
  }

  if (jelszo !== megerositettJelszo) {
    return { megerositettJelszoError: "A jelszó nem egyezik" };
  }

  try {
    const hasheltJelszo = await hash(jelszo, 10);
    await prisma.felhasznalo.create({
      data: {
        email,
        jelszo: hasheltJelszo,
      },
    });
  } catch (prismaError) {
    return { prismaError };
  }
  redirect("/bejelentkezes");
}
