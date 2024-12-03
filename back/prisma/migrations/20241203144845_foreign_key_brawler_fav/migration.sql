/*
  Warnings:

  - Changed the type of `brawlerFav` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "brawlerFav",
ADD COLUMN     "brawlerFav" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_brawlerFav_fkey" FOREIGN KEY ("brawlerFav") REFERENCES "Brawler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
