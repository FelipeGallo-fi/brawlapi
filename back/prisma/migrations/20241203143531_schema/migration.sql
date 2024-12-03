-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_brawlerFav_fkey";

-- DropIndex
DROP INDEX "Usuario_brawlerFav_key";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "brawlerFav" SET DATA TYPE TEXT;
