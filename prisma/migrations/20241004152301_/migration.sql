-- CreateEnum
CREATE TYPE "Stilus" AS ENUM ('Absztrakt', 'Impresszionizmus', 'Realizmus', 'Posztimpresszionizmus', 'Fauvizmus', 'Futurizmus', 'Kubizmus', 'Romantika');

-- CreateEnum
CREATE TYPE "Meret" AS ENUM ('m45x60', 'm50x60', 'm60x90', 'm90x120');

-- CreateEnum
CREATE TYPE "Jogosultsag" AS ENUM ('TermekKezelo', 'SzallitasKezelo', 'Felhasznalo');

-- CreateTable
CREATE TABLE "Festmeny" (
    "festmenyId" TEXT NOT NULL,
    "nev" TEXT NOT NULL,
    "kep" TEXT NOT NULL,
    "ar" INTEGER NOT NULL,
    "leiras" TEXT NOT NULL,
    "stilus" "Stilus" NOT NULL,
    "ev" INTEGER NOT NULL,
    "meret" "Meret" NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "elerheto" BOOLEAN NOT NULL DEFAULT true,
    "rendelesId" TEXT,

    CONSTRAINT "Festmeny_pkey" PRIMARY KEY ("festmenyId")
);

-- CreateTable
CREATE TABLE "Felhasznalo" (
    "felhasznaloId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jelszo" TEXT NOT NULL,
    "vezeteknev" TEXT,
    "keresztnev" TEXT,
    "telefonszam" TEXT,
    "varos" TEXT,
    "iranyitoszam" INTEGER,
    "utca" TEXT,
    "hazszam" INTEGER,
    "emelet" INTEGER,
    "ajto" INTEGER,
    "csengo" INTEGER,
    "jogosultsag" "Jogosultsag" NOT NULL DEFAULT 'Felhasznalo',

    CONSTRAINT "Felhasznalo_pkey" PRIMARY KEY ("felhasznaloId")
);

-- CreateTable
CREATE TABLE "Rendeles" (
    "rendelesId" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "felhasznaloId" TEXT NOT NULL,
    "vezeteknev" TEXT NOT NULL,
    "keresztnev" TEXT NOT NULL,
    "telefonszam" TEXT NOT NULL,
    "varos" TEXT NOT NULL,
    "iranyitoszam" INTEGER NOT NULL,
    "utca" TEXT NOT NULL,
    "hazszam" INTEGER NOT NULL,
    "emelet" INTEGER,
    "ajto" INTEGER,
    "csengo" INTEGER,
    "kiszallitva" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Rendeles_pkey" PRIMARY KEY ("rendelesId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Felhasznalo_email_key" ON "Felhasznalo"("email");

-- AddForeignKey
ALTER TABLE "Festmeny" ADD CONSTRAINT "Festmeny_rendelesId_fkey" FOREIGN KEY ("rendelesId") REFERENCES "Rendeles"("rendelesId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rendeles" ADD CONSTRAINT "Rendeles_felhasznaloId_fkey" FOREIGN KEY ("felhasznaloId") REFERENCES "Felhasznalo"("felhasznaloId") ON DELETE RESTRICT ON UPDATE CASCADE;
