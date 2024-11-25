/*
  Warnings:

  - You are about to drop the `Personaje` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Personaje";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "copas" INTEGER NOT NULL DEFAULT 0,
    "brawlerFav" TEXT NOT NULL,
    "monedas" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombre_key" ON "Usuario"("nombre");
