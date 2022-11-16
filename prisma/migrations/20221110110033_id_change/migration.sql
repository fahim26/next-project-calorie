/*
  Warnings:

  - The primary key for the `FoodEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "FoodEntry" DROP CONSTRAINT "FoodEntry_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FoodEntry_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FoodEntry_id_seq";
