/*
  Warnings:

  - Made the column `pokedex` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnail` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `hp` to the `Details` table without a default value. This is not possible if the table is not empty.
  - Made the column `type` on table `Details` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "pokedex" SET NOT NULL,
ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL;

-- AlterTable
ALTER TABLE "Details" DROP COLUMN "hp",
ADD COLUMN     "hp" INTEGER NOT NULL,
ALTER COLUMN "type" SET NOT NULL;
