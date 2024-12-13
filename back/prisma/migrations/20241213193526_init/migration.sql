-- CreateTable
CREATE TABLE "Batalla" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "brawlerId" INTEGER NOT NULL,
    "resultado" TEXT NOT NULL,

    CONSTRAINT "Batalla_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Batalla" ADD CONSTRAINT "Batalla_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batalla" ADD CONSTRAINT "Batalla_brawlerId_fkey" FOREIGN KEY ("brawlerId") REFERENCES "Brawler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
