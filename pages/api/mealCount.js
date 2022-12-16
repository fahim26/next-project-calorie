import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method dis-allowed" });
  }

  let today = Math.floor(Date.now() / 1000);
    // let day = today.getDate();
  let lastD = today - 7*24*3600;
  console.log("***** ",today);
  try {
    // const foodEntries = await prisma.FoodEntry.findMany({
      
    //   where: {
    //     takenAt:{
    //       gte: lastD,
    //     },
    //   },

    // });
    // console.log("conditon: ",foodEntries);

    const foodEntries = await prisma.FoodEntry.groupBy({
      by: ["userEmail"],
      where: {
        takenAt:{
          gte: lastD,
        },
      },
      _avg: {
        calorieValue: true,
      },
    });
    console.log("-------- avg val: ",foodEntries);
    // const today = moment();
    // const res = Array(7)
    //   .fill()
    //   .map(() => today.subtract(1, "d").format("YYYY-MM-DD"));
    let id = 1;
    let result = foodEntries.map((item) => {
      const container = {};
      container["id"] = id++;
      container["userEmail"] = item.userEmail;
      container["averageCalorie"] = item._avg.calorieValue;

      return container;
    });
    console.log("DDsss:", result);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
