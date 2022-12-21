-- CreateTable
CREATE TABLE "AdminsEntry" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "PhoneNumber" INTEGER NOT NULL,

    CONSTRAINT "AdminsEntry_pkey" PRIMARY KEY ("id")
);
