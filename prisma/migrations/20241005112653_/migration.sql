/*
  Warnings:

  - The values [TermekKezelo,SzallitasKezelo] on the enum `Jogosultsag` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Jogosultsag_new" AS ENUM ('Admin', 'Szallito', 'Felhasznalo');
ALTER TABLE "Felhasznalo" ALTER COLUMN "jogosultsag" DROP DEFAULT;
ALTER TABLE "Felhasznalo" ALTER COLUMN "jogosultsag" TYPE "Jogosultsag_new" USING ("jogosultsag"::text::"Jogosultsag_new");
ALTER TYPE "Jogosultsag" RENAME TO "Jogosultsag_old";
ALTER TYPE "Jogosultsag_new" RENAME TO "Jogosultsag";
DROP TYPE "Jogosultsag_old";
ALTER TABLE "Felhasznalo" ALTER COLUMN "jogosultsag" SET DEFAULT 'Felhasznalo';
COMMIT;
