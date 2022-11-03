-- CreateTable
CREATE TABLE "FoodEntry" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "calorieValue" INTEGER NOT NULL,
    "takenAt" TEXT NOT NULL,

    CONSTRAINT "FoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodEntry_name_key" ON "FoodEntry"("name");
