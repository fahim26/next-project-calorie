/*
  Warnings:

  - The primary key for the `FoodEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `FoodEntry` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE "FoodEntry" DROP CONSTRAINT "FoodEntry_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(5),
ADD CONSTRAINT "FoodEntry_pkey" PRIMARY KEY ("id");
