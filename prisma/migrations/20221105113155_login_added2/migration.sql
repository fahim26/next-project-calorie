/*
  Warnings:

  - You are about to drop the column `name` on the `FoodEntry` table. All the data in the column will be lost.
  - Added the required column `foodName` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodEntry" DROP COLUMN "name",
ADD COLUMN     "foodName" VARCHAR(50) NOT NULL;
