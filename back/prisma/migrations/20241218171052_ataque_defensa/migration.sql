/*
  Warnings:

  - Added the required column `Ataque` to the `Brawler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Defensa` to the `Brawler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brawler" ADD COLUMN     "Ataque" INTEGER NOT NULL,
ADD COLUMN     "Defensa" INTEGER NOT NULL;
