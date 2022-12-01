/*
  Warnings:

  - Changed the type of `takenAt` on the `FoodEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FoodEntry" DROP COLUMN "takenAt",
ADD COLUMN     "takenAt" TIMESTAMP(3) NOT NULL;
