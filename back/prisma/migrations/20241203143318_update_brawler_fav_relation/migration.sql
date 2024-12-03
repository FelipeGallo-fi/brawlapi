/*
  Warnings:

  - A unique constraint covering the columns `[brawlerFav]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `brawlerFav` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "brawlerFav",
ADD COLUMN     "brawlerFav" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Brawler" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "rareza" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "ataque" TEXT NOT NULL,
    "super" TEXT NOT NULL,
    "starPower" TEXT NOT NULL,
    "gadget" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "Brawler_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brawler_nombre_key" ON "Brawler"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_brawlerFav_key" ON "Usuario"("brawlerFav");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_brawlerFav_fkey" FOREIGN KEY ("brawlerFav") REFERENCES "Brawler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
