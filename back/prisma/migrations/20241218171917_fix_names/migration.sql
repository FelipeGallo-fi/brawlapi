/*
  Warnings:

  - You are about to drop the column `Ataque` on the `Brawler` table. All the data in the column will be lost.
  - You are about to drop the column `Defensa` on the `Brawler` table. All the data in the column will be lost.
  - Added the required column `defensa` to the `Brawler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poder` to the `Brawler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brawler" DROP COLUMN "Ataque",
DROP COLUMN "Defensa",
ADD COLUMN     "defensa" INTEGER NOT NULL,
ADD COLUMN     "poder" INTEGER NOT NULL;
