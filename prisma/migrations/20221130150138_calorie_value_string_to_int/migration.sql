/*
  Warnings:

  - Changed the type of `calorieValue` on the `FoodEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FoodEntry" DROP COLUMN "calorieValue",
ADD COLUMN     "calorieValue" INTEGER NOT NULL;
