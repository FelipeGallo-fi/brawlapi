-- CreateTable
CREATE TABLE "Personaje" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "poder" INTEGER NOT NULL,

    CONSTRAINT "Personaje_pkey" PRIMARY KEY ("id")
);
