/*
  Warnings:

  - Added the required column `Meal` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodEntry" ADD COLUMN     "Meal" VARCHAR(50) NOT NULL;
