/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `FoodEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodEntry" ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FoodEntry_userEmail_key" ON "FoodEntry"("userEmail");
