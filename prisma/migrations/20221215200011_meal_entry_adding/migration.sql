-- CreateTable
CREATE TABLE "MealEntry" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "foodName" VARCHAR(50) NOT NULL,
    "calorieValue" INTEGER NOT NULL,
    "takenAt" INTEGER NOT NULL,
    "Meal" VARCHAR(50) NOT NULL,

    CONSTRAINT "MealEntry_pkey" PRIMARY KEY ("id")
);
