import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method dis-allowed" });
  }

  try {
    const JsonData = JSON.parse(req.body);
    const { apiType, ...data } = JsonData;
    // const apiType = JSON.parse(req.body.apiType);
    console.log(
      "++++++++++++++++++++  UPDATE LIST ++++++++++++++++ :",
      data,
      "-----",
      apiType
    );
    const { calorieValue, ...rest } = data;
    const c = parseInt(calorieValue);
    console.log("0000 :", data);
    if (apiType === "admin") {
      const newDataFoodEntry = await prisma.FoodEntry.update({
        where: { id: data.id },
        data: { ...rest, calorieValue: c },
      });
      res.send(newDataFoodEntry);
    } else if (apiType === "user") {
      const newDataMealEntry = await prisma.MealEntry.update({
        where: { id: data.id },
        data: { ...rest, calorieValue: c },
      });
      res.send(newDataMealEntry);
    }

    // res.status(200).json({d,message: "Successfully created"});
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
