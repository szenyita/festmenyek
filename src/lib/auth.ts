"use server";

import { compare, hash } from "bcrypt";
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
  } catch (error) {
    return { error: "Regisztrációs hiba történt" };
  }
  redirect("/bejelentkezes");
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const jelszo = formData.get("jelszo") as string;

  if (!isEmail(email)) {
    return { emailError: "Érvénytelen email cím" };
  }

  const felhasznalo = await prisma.felhasznalo.findUnique({
    where: { email },
  });

  if (!felhasznalo) {
    return { bejelentkezesError: "Helytelen email cím vagy jelszó" };
  }

  const jelszoEgyezik = await compare(jelszo, felhasznalo.jelszo);

  if (!jelszoEgyezik) {
    return { bejelentkezesError: "Helytelen email cím vagy jelszó" };
  }

  try {
    // Token
  } catch (error) {
    return { error: "Bejelentkezési hiba történt" };
  }

  redirect("/");
}
