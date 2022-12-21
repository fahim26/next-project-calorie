/*
  Warnings:

  - You are about to drop the `AdminsEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AdminsEntry";

-- CreateTable
CREATE TABLE "AdminEntry" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "PhoneNumber" INTEGER NOT NULL,

    CONSTRAINT "AdminEntry_pkey" PRIMARY KEY ("id")
);
